import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, delay, exhaustMap, filter, from, map, takeWhile, tap, toArray } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Comment } from 'src/app/utils';
import { UIService } from './ui.service';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  loading = new BehaviorSubject<boolean>(false);
  count = new BehaviorSubject<number>(0);
  postIds = new BehaviorSubject<string[]>([]);
  comments = new BehaviorSubject<Comment[]>([]);

  constructor(
    private http: HttpClient,
    private UI: UIService,
  ) { }

  getComments(params: any = {}) {
    const page = params.page || 1;
    const limit = params.limit || 20;
    const text = params.text || '';
    const postId = params.postId || '';
    this.loading.next(true);
    this.http.get<Comment[]>(`${environment.COMMENTS_BASE_URL}/comments`,
      {
        params: postId ? { postId: postId } : {}
      })
      .pipe(
        //Delay just for show the loader
        delay(500),
        tap((res: Comment[]) => {
          !text && !postId ? this.managePostIdOptions(res) : null;
        }),
        map((res: Comment[]) => {
          let comments = res;
          //Local filtering by name, email, body
          if (text) {
            comments = comments.filter((comment: Comment) => {
              let takeTheComment = false;
              if (comment.name.toLowerCase().includes(text)) {
                takeTheComment = true;
              } else if (comment.email.toLowerCase().includes(text)) {
                takeTheComment = true;
              } else if (comment.body.toLowerCase().includes(text)) {
                takeTheComment = true;
              }
              return takeTheComment;
            })
          }
          this.count.next(comments.length);
          return comments;
        }),
        exhaustMap((res: Comment[]) => {
          return from(res)
        }),
        filter((res: Comment, index: number) => {
          return index >= (page - 1) * limit && index < page * limit
        }),
        toArray(),
        catchError((err: any) => {
          throw err;
        })
      )
      .subscribe(
        {
          next: (res: Comment[]) => {
            this.comments.next(res);
          },
          complete: () => {
            this.loading.next(false);
            this.UI.scrollTopHome();
          },
          error: (err: any) => {
            this.loading.next(false);
            console.log(err);
          }
        }
      );
  }

  //Creating an array of unique post ids for the searchbox select
  managePostIdOptions(comments: Comment[]) {
    let postIds: string[] = [];
    comments.map((comment: Comment) => comment.postId).forEach(id => {
      if (postIds.indexOf(id) === -1) {
        postIds.push(id);
      }
    });
    this.postIds.next(postIds);
  }
}


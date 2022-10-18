import { Component, Input, OnInit } from '@angular/core';
import { Comment } from 'src/app/utils';

@Component({
  selector: 'comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
  host: { class: 'comment' },
})
export class CommentComponent implements OnInit {

  @Input() comment: Comment | undefined;
  logo: string | undefined;
  username: string | undefined;

  constructor() { }

  ngOnInit(): void {
    this.logo = this.comment?.email.slice(0, 2);
    this.username = '@'+this.comment?.email.split('@')[0];
  }

}

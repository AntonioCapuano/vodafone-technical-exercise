import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CommentsService } from 'src/app/services/comments.service';
import { Comment } from 'src/app/utils';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss']
})
export class SearchBoxComponent implements OnInit, OnDestroy {

  form: FormGroup | undefined;
  options: string[] = [];

  constructor(
    public CS: CommentsService,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      text: ['', [Validators.minLength(3)]],
      postId: ['', []]
    })
    this.form.valueChanges.subscribe((value: any) => {
      console.log(value)
    })


  }

  search() {
    const { text, postId } = this.form?.value;
    this.CS.getComments({ postId: postId, text: text.toLowerCase() })
  }

  reset() {
    this.form?.patchValue({
      text: '',
      postId: ''
    });
    console.log(this.form?.value)
    this.CS.getComments();
  }

  isSearchDisabled() {
    const { text, postId } = this.form?.value;
    return this.form?.invalid || (!text && !postId)

  }
  isResetDisabled() {
    const { text, postId } = this.form?.value;
    return !(text.length || postId);
  }

  ngOnDestroy(): void {
  }


}

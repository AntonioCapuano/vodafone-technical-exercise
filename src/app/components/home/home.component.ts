import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommentsService } from 'src/app/services/comments.service';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  constructor(
    public CS: CommentsService,
  ) { }

  ngOnInit(): void {
    this.CS.getComments();
  }

  ngOnDestroy(): void {
    this.CS.comments.unsubscribe();
  }

}

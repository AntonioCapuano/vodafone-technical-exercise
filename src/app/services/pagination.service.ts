import { Injectable } from '@angular/core';
import { CommentsService } from './comments.service';

@Injectable({
  providedIn: 'root'
})
export class PaginationService {

  limit = 20;
  page = 1;
  pages = 0;
  count = 0;
  disabled = {
    previous: true,
    next: false,
  }

  constructor(
    private CS: CommentsService
  ) {
    this.CS.count.subscribe(count => {
      //Updating count every time the call is made, cause informations could change
      this.updatePaginationParameters(count);
    })
  }


  goFirstPage() {
    this.page = 1;
    this.CS.getComments();
  }

  goLastPage() {
    this.page = this.pages;
    this.CS.getComments({ page: this.pages })
  }

  isGoPreviousDisabled() {
    return this.page <= 1;
  }

  isGoNextDisabled() {
    return this.page >= this.pages;
  }

  isGoFirstDisabled() {
    return this.page === 1;
  }

  isGoLastDisabled() {
    return this.page === this.pages;
  }

  goPreviousPage() {
    if (!(this.page - 1 < 0)) {
      this.page--;
      this.CS.getComments({ page: this.page });
    }
  }

  goNextPage() {
    if (!(this.page + 1 > this.pages)) {
      this.page++;
      this.CS.getComments({ page: this.page });
    }
  }

  updatePaginationParameters(count: number) {
    //if the counter changes it means that I have applied a filter, so I reset the page to 1
    if (this.count != count) {
      this.page = 1;
    }
    //Updating count
    this.count = count;
    //Updating pages count. If the module is not equals to 0 then add 1 for one more pages
    let pages = Math.trunc(count / this.limit);
    this.pages = count % this.limit === 0 ? pages : pages + 1;
  }
}

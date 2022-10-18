import { Component, OnInit } from '@angular/core';
import { PaginationService } from 'src/app/services/pagination.service';

@Component({
  selector: 'pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
  providers: [PaginationService]
})
export class PaginationComponent implements OnInit {

  constructor(
    public pagination: PaginationService
  ) { }

  ngOnInit(): void {
  }

}

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { NgForOf, NgIf } from '@angular/common';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
  imports: [IonicModule, NgForOf, NgIf],
  standalone: true,
})
export class PaginationComponent implements OnInit {
  @Output() changePage = new EventEmitter<number | string>();
  @Input() currentPage!: number;
  @Input() pages!: number[];
  @Input() num!: number;

  pagesToView!: number[];
  constructor() {}

  ngOnInit() {
    // console.log(this.currentPage);
    // this.changePagesToView();
  }

  onButtonPageClickHandler(i: number | string) {
    this.changePage.emit(i);
    // console.log(this.currentPage);
    // this.changePagesToView();
  }

  changePagesToView() {
    this.pagesToView = this.pages.slice(
      this.currentPage - 1,
      this.currentPage + 2
    );
    // console.log(this.currentPage);
    // console.log(this.pagesToView);
  }
}

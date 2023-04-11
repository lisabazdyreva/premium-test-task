import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { NgForOf, NgIf } from '@angular/common';

import { PageValue } from '../../utils/const';

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

  previous = PageValue.Previous;
  next = PageValue.Next;
  constructor() {}

  ngOnInit() {}

  onButtonPageClickHandler(i: number | string) {
    this.changePage.emit(i);
  }
}

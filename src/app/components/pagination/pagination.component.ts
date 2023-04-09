import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
  imports: [IonicModule],
  standalone: true,
})
export class PaginationComponent implements OnInit {
  @Output() changePage = new EventEmitter();
  @Input() currentPage!: number;
  constructor() {}

  ngOnInit() {
    console.log(this.currentPage);
  }

  protected readonly console = console;
}

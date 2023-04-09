import { Component, Input, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { IBeer } from '../../pages/home/home.page';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  standalone: true,
  imports: [IonicModule],
})
export class CardComponent implements OnInit {
  @Input() beer!: IBeer;
  constructor() {}

  ngOnInit() {}
}

import { Component, Input, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { IBeer } from '../../pages/home/home.page';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  standalone: true,
  imports: [IonicModule, RouterLink],
})
export class CardComponent implements OnInit {
  @Input() beer!: IBeer;
  constructor() {}

  ngOnInit() {}
}

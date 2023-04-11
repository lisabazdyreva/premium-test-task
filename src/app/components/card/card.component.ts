import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { IBeer } from '../../types/beer';
import { Route } from '../../utils/const';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  standalone: true,
  imports: [IonicModule, RouterLink],
})
export class CardComponent {
  @Input() beer!: IBeer;
  Route = Route;
  constructor() {}
}

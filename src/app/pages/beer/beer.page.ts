import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { BeerService } from '../../services/beer.service';
import { ActivatedRoute } from '@angular/router';
import { IBeer } from '../home/home.page';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-beer',
  templateUrl: './beer.page.html',
  styleUrls: ['./beer.page.scss'],
  standalone: true,
  imports: [IonicModule, NgIf],
})
export class BeerPage implements OnInit {
  id!: number;
  beer!: IBeer;
  constructor(
    private beerService: BeerService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
    });

    this.beerService.fetchBeer(this.id).subscribe((data) => {
      const [beer] = data;
      this.beer = beer;
      console.log(beer.name);
    });
  }
}

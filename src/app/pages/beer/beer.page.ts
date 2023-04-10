import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { BeerService } from '../../services/beer.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { IBeer } from '../../types/beer';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-beer',
  templateUrl: './beer.page.html',
  styleUrls: ['./beer.page.scss'],
  standalone: true,
  imports: [IonicModule, NgIf, RouterLink],
})
export class BeerPage implements OnInit {
  id!: number;
  beer!: IBeer;
  isFavorite = false;

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
      this.checkIsFavorite();
    });
  }

  addFavoriteBeer() {
    this.beerService.addFavoriteBeer(this.beer);
    this.checkIsFavorite();
  }

  removeFavoriteBeer() {
    this.beerService.removeFavoriteBeer(this.beer);
    this.checkIsFavorite();
  }

  checkIsFavorite() {
    this.isFavorite = this.beerService.getIndex(this.beer) !== -1;
  }
}

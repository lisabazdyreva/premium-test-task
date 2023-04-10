import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { NgForOf, NgIf } from '@angular/common';
import { BeerService } from '../../services/beer.service';
import { CardComponent } from '../../components/card/card.component';
import { PaginationComponent } from '../../components/pagination/pagination.component';

export interface IBeer {
  name: string;
  image_url: string;
  abv: number;
  id: number;
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule, NgForOf, CardComponent, PaginationComponent, NgIf],
})
export class HomePage implements OnInit {
  beers: IBeer[] = [];
  currentPage = 1;
  totalCount = 0;
  beerPerPage = 5;
  pages: number[] = [];
  constructor(private beerService: BeerService) {}

  ngOnInit(): void {
    this.beerService.fetchAllBeers().subscribe((data) => {
      this.totalCount = data.length;
      const totalPages = this.totalCount / this.beerPerPage;

      for (let i = 1; i <= totalPages; i++) {
        this.pages.push(i);
      }
    });

    this.getBeers();
  }

  getBeers() {
    this.beerService.fetchBeers().subscribe((data) => {
      this.beers = data;
    });
  }
  onPageChange(evt: Event) {
    const target = evt.target as HTMLInputElement;
    const pageNum = target.dataset['page'];

    this.currentPage = Number(pageNum);
    this.beerService.setPage(Number(pageNum));

    this.getBeers();
  }
}

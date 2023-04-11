import { Component, OnInit } from '@angular/core';
import { IonicModule, LoadingController } from '@ionic/angular';
import { NgForOf, NgIf } from '@angular/common';
import { BeerService } from '../../services/beer.service';
import { CardComponent } from '../../components/card/card.component';
import { PaginationComponent } from '../../components/pagination/pagination.component';
import { IBeer } from '../../types/beer';
import { FavoritesModalComponent } from '../../components/favorites-modal/favorites-modal.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    NgForOf,
    CardComponent,
    PaginationComponent,
    NgIf,
    FavoritesModalComponent,
  ],
})
export class HomePage implements OnInit {
  beers: IBeer[] = [];
  currentPage = 1;
  totalCount = 0;
  beerPerPage = 5;
  pages: number[] = [];
  pagesToView: number[] = [];
  constructor(
    private beerService: BeerService,
    private loadingController: LoadingController
  ) {}

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
      this.setPagesToView();
    });
  }

  setPageNumValue(num: number | string) {
    if (typeof num === 'number') {
      this.currentPage = num;
    }

    if (typeof num === 'string') {
      if (num === 'previous') {
        this.currentPage = this.currentPage - 1;
      }

      if (num === 'next') {
        this.currentPage = this.currentPage + 1;
      }
    }
    this.beerService.setPage(this.currentPage);
    this.getBeers();
  }

  setPagesToView() {
    switch (this.currentPage) {
      case 1: {
        this.pagesToView = this.pages.slice(
          this.currentPage - 1,
          this.currentPage + 2
        );
        break;
      }
      case this.pages[this.pages.length - 1]: {
        this.pagesToView = this.pages.slice(
          this.currentPage - 3,
          this.currentPage
        );
        break;
      }
      default: {
        this.pagesToView = this.pages.slice(
          this.currentPage - 2,
          this.currentPage + 1
        );
        break;
      }
    }
  }

  async showLoading() {
    const loading = await this.loadingController.create({
      message: 'Dismissing after 3 seconds...',
      duration: 3000,
    });

    loading.present();
  }
}

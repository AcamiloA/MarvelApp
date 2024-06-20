import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faStar as fasStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons';
import { FormsModule } from '@angular/forms';
import { MarvelService } from '../service/Marvel.service'

@Component({
  selector: 'app-comics',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, FormsModule],
  templateUrl: './comics.component.html',
  styleUrls: ['./comics.component.css']
})

export class ComicsComponent implements OnInit {
  fasStar = fasStar;
  farStar = farStar;
  comicList: any = [];
  superhero: string = "";

  constructor(private marvelService: MarvelService) {}

  ngOnInit() {
    this.comicsGet();
  }

  comicsGet() {
    this.marvelService.getCommics(this.superhero).subscribe(
      response => {
        this.comicList = response.data.results.map((comic: any) => ({
          ...comic,
          isFavorite: false 
        }));
        console.log(this.comicList);
      },
      error => console.error(error)
    );      
  }

  toggleFavorite(comic: any) {
    comic.isFavorite = !comic.isFavorite;
  }

  trackByComicId(index: number, comic: any): number {
    return comic.id;
  }
}

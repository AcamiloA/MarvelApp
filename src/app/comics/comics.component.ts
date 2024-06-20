import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faStar as fasStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons';
import { FormsModule } from '@angular/forms';
import { MarvelService } from '../service/marvel.service'
import { ComicService } from '../service/comic.service'
import { FavoriteComic } from '../Interfaces/FavoriteComic';

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
  favorite!: FavoriteComic;

  constructor(private marvelService: MarvelService, private comicService: ComicService) 
  {}

  ngOnInit() {
    this.comicsGet();
  }

  comicsGet() {
    this.marvelService.getComics(this.superhero).subscribe(
      response => {
        this.comicList = response.data.results.map((comic: any) => ({
          ...comic,
          isFavorite: false 
        }));
      },
      error => console.error(error)
    );      
  }

  toggleFavorite(comic: any) {
    
    comic.isFavorite = !comic.isFavorite;

    if(comic.isFavorite)
      this.comicService.AddFavorite(comic);
    else
      this.comicService.RemoveFavorite(comic);
  }

  trackByComicId(index: number, comic: any): number {
    return comic.id;
  }
}

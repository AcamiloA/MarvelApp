import { Router } from '@angular/router';
import { Component, OnInit, inject } from '@angular/core';
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
  private router = inject(Router);
  
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
    
    this.favorite = {
      user: localStorage.getItem('user')!,
      comicId: comic.id,
      title: comic.title,
      description: comic.description,
      imgUrl: `${comic.thumbnail.path}.${comic.thumbnail.extension}`,
      isFavorite: comic.isFavorite
    };


    if(comic.isFavorite)
      this.comicService.AddFavorite(this.favorite).subscribe();
    else
      this.comicService.RemoveFavorite(this.favorite).subscribe();
    

  }

  verFavoritos(){
    this.router.navigate(['favoritos']);
  }

  trackByComicId(index: number, comic: any): number {
    return comic.id;
  }
  
  closeSession(){
    this.router.navigate(['']);
  }

  
}

import { Router } from '@angular/router';
import { Component, OnInit, inject } from '@angular/core';
import { ComicService } from '../../service/comic.service';
import { FavoriteComic } from '../../Interfaces/FavoriteComic';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faStar as fasStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-favoritos',
  standalone: true,
  imports: [FontAwesomeModule, FormsModule],
  templateUrl: './favoritos.component.html',
  styleUrl: './favoritos.component.css'
})
export class FavoritosComponent implements OnInit{
  fasStar = fasStar;
  farStar = farStar;
  favorite!: FavoriteComic;
  private router = inject(Router);
  comicList : any;
  constructor(private comicService: ComicService){}

  ngOnInit() {
    this.getFavoriteComics();
  }

  getFavoriteComics(){
    this.comicService.GetFavorites(localStorage.getItem('user')!).subscribe({
      next:(data) =>{
        console.log(data);
            if(data.length > 0){
                this.comicList = data;
            }
      },
      error:(error) =>{
            
      }
    })
     
  }

  closeSession(){
    this.router.navigate(['']);
  }

  comeBack(){
    this.router.navigate(['comics']);
  }

  toggleFavorite(comic: any) {
    comic.isFavorite = !comic.isFavorite;
    
    this.favorite = {
      user: localStorage.getItem('user')!,
      comicId: comic.comicId,
      title: comic.title,
      description: comic.description,
      imgUrl: comic.imgUrl,
      isFavorite: comic.isFavorite
    };
      
    this.comicService.RemoveFavorite(this.favorite).subscribe();
    location.reload();
  }
}

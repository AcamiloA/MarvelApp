import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { appsettings } from '../setttings/appsettings';
import { FavoriteComic } from '../Interfaces/FavoriteComic';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComicService {

  private http = inject(HttpClient);
  private BaseUrl : string = appsettings.apiUrl;
  constructor() { }

  AddFavorite(model:FavoriteComic) : Observable<any>
  {
    return this.http.post<any>(`${this.BaseUrl}Comics/FavoriteComic?user=${model.user}&comicId=${model.comicId}`,model)
  }

  RemoveFavorite(model:FavoriteComic) : Observable<any>
  {
    return this.http.post<any>(`${this.BaseUrl}Comics/FavoriteComic?user=${model.user}&comicId=${model.comicId}`,model)
  }

  GetFavorites(model:FavoriteComic) : Observable<any>
  {
    return this.http.get<any>(`${this.BaseUrl}Comics/FavoriteComic/${model.user}`)
  }

}

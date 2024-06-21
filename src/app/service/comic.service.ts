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
    return this.http.post<any>(`${this.BaseUrl}Comics/FavoriteComic`, model);
  }

  RemoveFavorite(model:FavoriteComic) : Observable<any>
  {
    return this.http.delete<any>(`${this.BaseUrl}Comics/UnfavoriteComic/${model.user}/${model.comicId}`)
  }

  GetFavorites(model:FavoriteComic) : Observable<any>
  {
    return this.http.get<any>(`${this.BaseUrl}Comics/UnfavoriteComic/${model.user}`)
  }

}

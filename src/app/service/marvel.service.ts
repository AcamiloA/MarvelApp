import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MarvelService {

  constructor(private http : HttpClient) { }

  ts = '1';
  APIKEY = '7e4d4daccdddd04efad62dc78bb7c321';
  HASH = '708105f466d8e79f58b1cea85391f5be';
  API_URI = 'https://gateway.marvel.com/v1/public/comics';
  LIMIT = 100;
  path = "";

  getComics(superhero : string):Observable<any>
  {
     
    if(superhero === "")
    {
      this.path = `${this.API_URI}?ts=${this.ts}&apikey=${this.APIKEY}&hash=${this.HASH}&limit=${this.LIMIT}`
    }
    else
    {
      this.path = `${this.API_URI}?ts=${this.ts}&apikey=${this.APIKEY}&hash=${this.HASH}&limit=${this.LIMIT}&title=${superhero}`
    }

    return this.http.get<any>(this.path);
  }
    
}


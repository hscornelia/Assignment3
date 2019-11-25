import { Injectable } from '@angular/core';
import {Hero} from './hero';
import {Observable, of} from 'rxjs';
import {MessageServiceService} from './message-service.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, map, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor(
    private messageService: MessageServiceService,
    private http :HttpClient
  ) { }

  getHeroes(): Observable<any>{
    
    return this.http.get<any>(this.heroesURL)
      .pipe(
        tap(_ => this.log('fetched heroes!!')),
        tap((users) => console.log(users)),
        catchError(this.handleError<any>('getHeroes', []))
        )
  }
  private heroesURL = 'http://localhost:3000/users';

  getHero(id: number): Observable<Hero>{
    this.messageService.add('Hero fetched~~');
    const url = `${this.heroesURL}/${id}`;
    return this.http.get<Hero>(url)
      .pipe(
        tap(_=>{
          this.log(`fetched hero id: ${id}`);
          console.log(id)
        }),
        catchError(this.handleError<any>(`getHero@!!! id=${id}`))
      );
  }

  updateHero(hero: Hero): Observable<any>{
    const url = `${this.heroesURL}/${hero.id}`;
    return this.http.put(url, hero, this.httpOptions)
      .pipe(
        tap(_=>this.log(`updated hero: ${hero.name}`),
        catchError(this.handleError<any>('updateHero')))
      )
  };

  addHero(hero: Hero):Observable<any>{
    const url = `${this.heroesURL}/${hero.id}`;
    return this.http.post(url, hero)
      .pipe(
        tap((newHero: any) => {
          this.log(`Created a new hero of name: ${hero.name} and random id: ${hero.id}`);
          console.log(hero.name);
        }),
        catchError(this.handleError<any>(`addHero HH=${hero.name}`))
      )
  }

  deleteHero (hero: Hero | number): Observable<Hero> {
    const id = typeof hero === 'number' ? hero : hero.id;
    const url = `${this.heroesURL}/${id}`;
  
    return this.http.delete<Hero>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted hero id=${id}`)),
      catchError(this.handleError<Hero>('deleteHero'))
    );
  }

  httpOptions = {
    headers:new HttpHeaders({ 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      })
  }

  httpPOST = {
    headers: new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Access-Control-Allow-Origin': '*',
    })
  }

  private log(message: string){
    this.messageService.add(message);
  }

  handleError<T>(operation='operation', result?: T){
    return (error: any):Observable <T>=>{
      console.error('error');
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}

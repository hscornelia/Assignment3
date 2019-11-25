import { Component, OnInit } from '@angular/core';
import {Hero} from '../hero';
import {HeroService} from '../hero.service';
import { hasLifecycleHook } from '@angular/compiler/src/lifecycle_reflector';
import { disableDebugTools } from '@angular/platform-browser';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css'],
  //providers: ['HeroService']
})
export class HeroesComponent implements OnInit {

  constructor(private heroService: HeroService) { }

  ngOnInit() {
    this.getHeroes();
  }

  list : Hero[];

  getHeroes(){
    this.heroService.getHeroes().subscribe(heroes => this.list = heroes);
  }
  add(name: string, id: number, major:string): void{
    //name = name.trim();
    if(!name){return};
    this.heroService.addHero({name, id, major} as Hero).subscribe(hero => this.list.push(hero))
  }
  delete(hero: Hero): void {
    this.list = this.list.filter(h => h !== hero);
    this.heroService.deleteHero(hero).subscribe();
  }
}

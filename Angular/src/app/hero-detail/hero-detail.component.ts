import { Component, OnInit, Input } from '@angular/core';
import {Hero} from '../hero';
import {ActivatedRoute} from '@angular/router';
import {HeroService} from '../hero.service';
import { Location } from '@angular/common';


@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {

  constructor(private route: ActivatedRoute, private heroService: HeroService, private history: Location) { }

  ngOnInit() {
    this.getHero();
  }

  @Input() hero:Hero;

  getHero():void{
    const id = +this.route.snapshot.paramMap.get('num');
    this.heroService.getHero(id).subscribe(temp => this.hero = temp)
  }

  goBack():void{
    this.history.back();
  }

  save():void{
    this.heroService.updateHero(this.hero).subscribe(() => this.goBack())
  }
  
  
}

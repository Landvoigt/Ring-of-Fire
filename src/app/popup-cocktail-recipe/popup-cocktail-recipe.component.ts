import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-popup-cocktail-recipe',
  templateUrl: './popup-cocktail-recipe.component.html',
  styleUrls: ['./popup-cocktail-recipe.component.scss'],
  animations: [
    trigger('fadeOut', [
      state('visible', style({ opacity: 1 })),
      state('hidden', style({ opacity: 0 })),
      transition('visible => hidden', animate('1000ms ease-in-out'))
    ])
  ]
})
export class PopupCocktailRecipeComponent implements OnInit {
  recipePopup: boolean = false;
  bigRecipe: boolean = false;
  imgSrc: string;
  popSound = new Audio('assets/sounds/beer_open.mp3');
  volumeLevel: number = 0.05;

  cocktails: string[] = [
    'assets/img/cocktails/bahama_mama.jpg',
    'assets/img/cocktails/bloody_mary.jpg',
    'assets/img/cocktails/blue_hawaii.jpg',
    'assets/img/cocktails/blue_lagoon.jpg',
    'assets/img/cocktails/blue_tahoe.jpg',
    'assets/img/cocktails/caipirinha.jpg',
    'assets/img/cocktails/cosmopolitan.jpg',
    'assets/img/cocktails/cuba_libre.jpg',
    'assets/img/cocktails/dirty_martini.jpg',
    'assets/img/cocktails/hiroshima.jpg',
    'assets/img/cocktails/kamikaze.jpg',
    'assets/img/cocktails/long_island_iced_tea.jpg',
    'assets/img/cocktails/mai_tai.jpg',
    'assets/img/cocktails/margarita.jpg',
    'assets/img/cocktails/mint_julep.jpg',
    'assets/img/cocktails/mojito.jpg',
    'assets/img/cocktails/pina_colada.jpg',
    'assets/img/cocktails/pisco_sour.jpg',
    'assets/img/cocktails/salty_dog.jpg',
    'assets/img/cocktails/screwdriver.jpg',
    'assets/img/cocktails/strawberry_daiquiri.jpg',
    'assets/img/cocktails/strawberry_mojito.jpg',
    'assets/img/cocktails/tequila_sunrise.jpg',
    'assets/img/cocktails/whiskey_sour.jpg'
  ];

  ngOnInit() {
    this.delayRecipePopup();
  }
  
  delayRecipePopup() {
    setTimeout(() => this.showRecipePopup(), 3 * 60 * 1000);
  }

  showRecipePopup() {
    this.recipePopup = true;
    this.popSound.volume = this.volumeLevel;
    this.popSound.play();
    let randomCocktail = Math.floor(Math.random() * this.cocktails.length);
    this.imgSrc = this.cocktails[randomCocktail];
    setTimeout(() => this.deleteRecipePopup(), 1 * 25 * 1000);
  }

  deleteRecipePopup() {
    this.recipePopup = false;
    setTimeout(() => this.delayRecipePopup(), 3 * 60 * 1000);
  }

  showBigRecipe() {
    this.bigRecipe = true;
    setTimeout(() => {
      this.bigRecipe = false;
    }, 4000);
  }
}
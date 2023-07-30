import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupCocktailRecipeComponent } from './popup-cocktail-recipe.component';

describe('PopupCocktailRecipeComponent', () => {
  let component: PopupCocktailRecipeComponent;
  let fixture: ComponentFixture<PopupCocktailRecipeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PopupCocktailRecipeComponent]
    });
    fixture = TestBed.createComponent(PopupCocktailRecipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

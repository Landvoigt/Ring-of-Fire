import { Component, Input, OnChanges, OnInit } from '@angular/core';

@Component({
  selector: 'app-game-instruction',
  templateUrl: './game-instruction.component.html',
  styleUrls: ['./game-instruction.component.scss']
})
export class GameInstructionComponent implements OnInit, OnChanges {
  cardAction = [
    { title: 'Waterfall', description: 'Everyone starts drinking at the same time. As soon as Player 1 stops drinking, Player 2 may stop drinking. Player 3 may stop as soon as Player 2 stops drinking, and so on.' },
    { title: 'You', description: 'You decide who has to drink.' },
    { title: 'Me', description: 'Congrats! Drink a shot!' },
    { title: 'Category', description: 'Come up with a category. Each player has to enumerate one item from this category.' },
    { title: 'Thumb Master', description: 'You can put your thumb on the table at every time. If you do it everyone else has to do the same as fast as possible, whoever is last has to drink. You are the thumb master until someone else draws a 5.' },
    { title: 'Chicks', description: 'All girls drink.' },
    { title: 'Heaven', description: 'Put your hands up! The last player drinks!' },
    { title: 'Mate', description: 'Pick a mate. Your mate always has to drink when you drink and the other way round.' },
    { title: 'Bust a Jive', description: 'Player 1 does a dance move. Player 2 repeats the move and adds another one.' },
    { title: 'Men', description: 'All men drink.' },
    { title: 'Quiz Master', description: 'You start asking the next player a question. Then he asks the next player one. Continue until someone messes up and gives an answer instead. This player has to drink.' },
    { title: 'Never have I ever...', description: 'Say something you never did. Everyone who already did it has to drink.' },
    { title: 'Rule', description: 'Make a rule. Everyone needs to drink when he breaks this rule.' },
  ];

  title: string = '';
  instruction: string = '';
  @Input() card: any;
  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    if (this.card) {
      let cardNumber = +this.card.split('_')[1];
      this.title = this.cardAction[cardNumber - 1].title;
      this.instruction = this.cardAction[cardNumber - 1].description;
    }
  }
}

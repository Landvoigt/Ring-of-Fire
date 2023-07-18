import { Component, Input, OnChanges, OnInit } from '@angular/core';

@Component({
  selector: 'app-game-instruction',
  templateUrl: './game-instruction.component.html',
  styleUrls: ['./game-instruction.component.scss']
})
export class GameInstructionComponent implements OnInit, OnChanges {
  cardAction = [
    { title: 'Waterfall', description: 'Everyone has to start drinking at the same time. As soon as player 1 stops drinking, player 2 may stop drinking. Player 3 may stop as soon as player 2 stops drinking, and so on.' },
    { title: 'You', description: 'You decide who drinks.' },
    { title: 'Me', description: 'Congrats! Drink a shot!' },
    { title: 'Category', description: 'Come up with a category (e.g. colors). Each player must enumerate one item from the category.' },
    { title: 'Thumb Master', description: 'When you put your thumb on the table everyone must follow and whomever is last must drink. You are the thumb master until someone else takes a 5.' },
    { title: 'Chicks', description: 'All girls drink.' },
    { title: 'Heaven', description: 'Put your hands up! The last player drinks!' },
    { title: 'Mate', description: 'Pick a mate. Your mate must always drink when you drink and the other way around.' },
    { title: 'Bust a jive', description: 'Player 1 makes a dance move. Player 2 repeats the dance move and adds a second one. ' },
    { title: 'Men', description: 'All men drink.' },
    { title: 'Quiz Master', description: 'Go around in a circle and you have to keep asking questions to each other. Does not matter what the question is, as long as its a question. Whoever messes up and does not say a question, drinks.' },
    { title: 'Never have I ever...', description: 'Say something you never did. Everyone who did it has to drink.' },
    { title: 'Rule', description: 'Make a rule. Everyone needs to drink when he breaks the rule.' },
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

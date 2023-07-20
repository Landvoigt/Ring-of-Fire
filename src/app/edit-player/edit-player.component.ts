import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-player',
  templateUrl: './edit-player.component.html',
  styleUrls: ['./edit-player.component.scss']
})
export class EditPlayerComponent implements OnInit {
  allProfilePictures = ['boy.png', 'girl.png', 'man.png', 'woman.png', 'frog_man.png', 'ape_man.png', 'pig_man.png'];

  constructor(public dialogRef: MatDialogRef<EditPlayerComponent>) { }

  ngOnInit(): void {

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}

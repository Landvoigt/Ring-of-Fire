// In your component class
import { AfterViewInit, Component, ElementRef, QueryList, ViewChildren } from '@angular/core';

@Component({
  selector: 'app-music-box',
  templateUrl: './music-box.component.html',
  styleUrls: ['./music-box.component.scss'],
})
export class MusicBoxComponent implements AfterViewInit {
  musicBox: string[] = [
    'assets/sounds/_Background Music_ After Midnight - Elegant Jazz Piano 🍷 _ Cinematic No Copyright Music.mp3',
    'assets/sounds/_No Copyright Music_ Hereafter - Ambient Guitar - 4 (Deep & Reflexive Background Music).mp3',
    'assets/sounds/_No Copyright Music_ Indigo - Western Folk Guitar Music (Perfect for vlogs!).mp3',
    'assets/sounds/_No Copyright Music_ Unwound - Vintage 90’s Indie Rock _ Perfect for Vlogging!.mp3',
    'assets/sounds/_No Copyright Music_ Woods - Acoustic Folk _ Background Music.mp3'
  ];

  currentIndex: number = -1;
  volumeLevel: number = 0.01;

  @ViewChildren('audioElement') audioElements!: QueryList<ElementRef<HTMLAudioElement>>;

  ngAfterViewInit() {
    debugger
    this.playRandomTrack();
  }

  playRandomTrack() {
    const previousIndex = this.currentIndex;
    while (this.currentIndex === previousIndex) {
      this.currentIndex = Math.floor(Math.random() * this.musicBox.length);
    }

    this.audioElements.forEach((audioElement, index) => {
      const audio = audioElement.nativeElement;
      if (index === this.currentIndex) {
        audio.volume = this.volumeLevel;
        audio.play();
      } else {
        audio.pause();
      }
    });
  }

  onTrackEnded() {
    this.playRandomTrack();
  }
}

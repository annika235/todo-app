import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MatIcon} from '@angular/material/icon';
import {MatCheckbox} from '@angular/material/checkbox';
import {MatListItem} from '@angular/material/list';
import {Aufgabe} from '../app';

@Component({
  imports: [
    MatIcon,
    MatCheckbox,
    MatListItem
  ],
  selector: 'app-liste',
  styleUrl: './liste.css',
  templateUrl: './liste.html',
})
export class Liste {
  @Output() toggleIsDone = new EventEmitter<void>();
  @Output() aufgabeLoeschen = new EventEmitter<void>();
  @Input() aufgabe!: Aufgabe;

  loescheInApp(aufgabe: Aufgabe){
    this.aufgabeLoeschen.emit();
  }
  toggleInApp(aufgabe: Aufgabe){
    this.toggleIsDone.emit();
  }
}

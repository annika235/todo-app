import {Component, inject, signal, WritableSignal} from '@angular/core';
import {MatListModule} from '@angular/material/list';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatIcon} from '@angular/material/icon';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {MatToolbar} from '@angular/material/toolbar';
import {MatButton, MatMiniFabButton} from '@angular/material/button';
import {MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {taskService} from '../service/taskService';

@Component({
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
  imports: [MatListModule, MatCheckboxModule, MatIcon, MatProgressSpinner, MatToolbar, MatButton, MatFormField, MatLabel, MatInput, MatMiniFabButton],
})
export class App {

  aufgaben: WritableSignal<Aufgabe[]> = signal([]);
  taskService: taskService = new taskService();

  constructor() {
    this.getAllTasks();
  }

  getAllTasks() {
    this.taskService.getAllTasks().subscribe({
      next: (response: any) => {
        this.aufgaben.set([...response].sort((a, b) => a.id - b.id));
      }
    })
  }

  aufgabeEinfuegen(aufgabenName: string) {
    const bereinigterName = aufgabenName.trim();
    if (bereinigterName.trim() === '') {
      return;
    }
    const neueAufgabe: Aufgabe = {
      name: aufgabenName,
      done: false,
    };
    this.taskService.aufgabeEinfuegen(neueAufgabe).subscribe({
      next: (result: any) => {
        if (result.name === neueAufgabe.name) {
          this.getAllTasks();
        }
      }
    });
  }

  aufgabeLoeschen(aufgabe: Aufgabe) {
    if (aufgabe.id === undefined) {
      return;
    }
    this.taskService.aufgabeLoeschen(aufgabe.id).subscribe({
      next: (result: any) => {
        this.getAllTasks();
      }
    });
  }

  toggleIsDone(aufgabe: Aufgabe) {
    if (aufgabe.id === undefined) {
      return;
    }
    this.taskService.toggleIsDone(aufgabe.id, null).subscribe({
        next: (result: any) => {
          this.getAllTasks();
        }
      }
    )
  }

}

export interface Aufgabe {
  id?: number;
  name: string;
  done: boolean;
}

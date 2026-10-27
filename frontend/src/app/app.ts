import {Component, inject, signal, WritableSignal} from '@angular/core';
import {MatListModule} from '@angular/material/list';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatIcon} from '@angular/material/icon';
import {HttpClient} from '@angular/common/http';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {MatToolbar} from '@angular/material/toolbar';

@Component({
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
  imports: [MatListModule, MatCheckboxModule, MatIcon, MatProgressSpinner, MatToolbar],
})
export class App {
  http = inject(HttpClient);
  aufgaben: WritableSignal<Aufgabe[]> = signal([]);

  constructor() {
    this.getAllTasks();
  }

  getAllTasks() {
    this.http.get("http://localhost:8080/tasks").subscribe({
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
    this.http.post("http://localhost:8080/tasks", neueAufgabe).subscribe({
      next: (result: any) => {
        if (result.name === neueAufgabe.name) {
          this.getAllTasks();
        }
      }
    });
  }

  aufgabeLoeschen(aufgabe: Aufgabe) {
    this.http.delete("http://localhost:8080/tasks/" + aufgabe.id).subscribe({
      next: (result: any) => {
        this.getAllTasks();
      }
    });
  }

  toggleIsDone(aufgabe: Aufgabe) {
    this.http.put("http://localhost:8080/tasks/" + aufgabe.id, null).subscribe({
        next: (result: any) => {
          console.log("********************komm ich hier rein");
          this.getAllTasks();
        }
      }
    )
    console.log("***********************tasks", this.aufgaben());
  }

}

export interface Aufgabe {
  id?: number;
  name: string;
  done: boolean;
}

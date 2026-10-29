import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Aufgabe} from '../app/app';


@Injectable({
  providedIn: 'root'
})
export class TaskService {
  http: HttpClient = inject(HttpClient);

  getAllTasks() {
    return this.http.get("http://localhost:8080/tasks");
  }

  aufgabeEinfuegen(neueAufgabe: Aufgabe) {
    return this.http.post("http://localhost:8080/tasks", neueAufgabe);
  }

  aufgabeLoeschen(aufgabenId: number) {
    return this.http.delete("http://localhost:8080/tasks/" + aufgabenId);
  }

  toggleIsDone(aufgabenId: number) {
    return this.http.put("http://localhost:8080/tasks/" + aufgabenId, null);
  }


}

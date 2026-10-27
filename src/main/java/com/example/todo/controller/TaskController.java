package com.example.todo.controller;

import com.example.todo.model.Task;
import com.example.todo.service.TaskService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;
import java.util.Optional;

@RestController
//alle Methoden sind unter dem Endpoint erreichbar
@RequestMapping("/tasks")
//Spring Boot darf Anfragen von Port 4200 akzeptieren
@CrossOrigin(origins = "http://localhost:4200")
public class TaskController {

    private final TaskService taskService;

    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    @GetMapping
    public List<Task> showTasks() {
        return taskService.getAllTasks();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Task> showTaskById(@PathVariable Long id) {
        Optional<Task> task = taskService.getTaskById(id);

        if (task.isPresent()) {
            return ResponseEntity.ok(task.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ResponseEntity<Task> createTask(@RequestBody Task task) {
        Task newTask = taskService.createTask(task.getName());
        URI location = URI.create("/tasks/" + newTask.getId());
        return ResponseEntity.created(location).body(newTask);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> markTaskAsDone(@PathVariable Long id) {
        Optional<Task> task = taskService.getTaskById(id);
        if (task.isPresent()) {
            taskService.toggleIsDone(id);
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }

    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTask(@PathVariable Long id) {
        Optional<Task> task = taskService.getTaskById(id);
        if (task.isPresent()) {
            taskService.deleteTask(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}

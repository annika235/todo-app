package com.example.todo.repository;

import com.example.todo.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;

//Spring erstellt das Repo automatisch (@Repository also nicht benötigt)
//es werden Standardmethoden wie save(), findAll() und deleteById() bereitgestellt
//Methoden anschauen unter JpaRepository (Strg + B) + übergeordnete Interfaces

public interface TaskRepository extends JpaRepository<Task, Long> {

}

package com.example.todo.model;

import jakarta.persistence.*;

@Entity
@Table(name = "tasks")
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private boolean done;

    //Parameterloser Konstruktor, damit Hibernate erstmal das Objekt erzeugen kann und anschließend
    //die Werte aus der DB einsetzt
    public Task(){}

    public Task(String name) {
        this.name = name;
        this.done = false;
    }

    public Long getId() {
        return id;
    }

    public boolean isDone() {
        return done;
    }

    public void setDone(boolean done) {
        this.done = done;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}

package com.ilanmk.challenge_BE.model;

public class CategoriaMedioPago {
    private Long id;
    private String nombre;

    public CategoriaMedioPago(Long id, String nombre) {
        this.id = id;
        this.nombre = nombre;
    }

    public CategoriaMedioPago() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }
}

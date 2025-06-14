package com.ilanmk.challenge_BE.model;

public class SubcategoriaProducto {
    private Long id;
    private String nombre;
    private Long categoriaId;

    public SubcategoriaProducto() {
    }

    public SubcategoriaProducto(Long id, String nombre, Long categoriaId) {
        this.id = id;
        this.nombre = nombre;
        this.categoriaId = categoriaId;
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

    public Long getCategoriaId() {
        return categoriaId;
    }

    public void setCategoriaId(Long categoriaId) {
        this.categoriaId = categoriaId;
    }
}

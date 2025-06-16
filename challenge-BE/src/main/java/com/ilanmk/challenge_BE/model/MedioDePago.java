package com.ilanmk.challenge_BE.model;

public class MedioDePago {
    private Long id;
    private String nombre;
    private String logo;
    private Long categoriaId;

    public MedioDePago() {
    }

    public MedioDePago(Long id, String nombre, String logo, Long categoriaId) {
        this.id = id;
        this.nombre = nombre;
        this.logo = logo;
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

    public String getLogo() {
        return logo;
    }

    public void setLogo(String logo) {
        this.logo = logo;
    }

    public Long getCategoriaId() {
        return categoriaId;
    }

    public void setCategoriaId(Long categoriaId) {
        this.categoriaId = categoriaId;
    }
}

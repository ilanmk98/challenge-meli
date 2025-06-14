package com.ilanmk.challenge_BE.model.DTO;

public class SubcategoriaProductoDTO {
    private Long id;
    private String nombre;
    private CategoriaProductoDTO categoria;

    public SubcategoriaProductoDTO() {
    }

    public SubcategoriaProductoDTO(Long id, String nombre, CategoriaProductoDTO categoria) {
        this.id = id;
        this.nombre = nombre;
        this.categoria = categoria;
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

    public CategoriaProductoDTO getCategoria() {
        return categoria;
    }

    public void setCategoria(CategoriaProductoDTO categoria) {
        this.categoria = categoria;
    }
}

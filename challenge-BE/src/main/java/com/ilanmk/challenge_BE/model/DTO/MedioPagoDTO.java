package com.ilanmk.challenge_BE.model.DTO;

public class MedioPagoDTO
{
    private String nombre;
    private String logo;
    private String categoriaNombre;

    public MedioPagoDTO(String nombre, String logo) {
        this.nombre = nombre;
        this.logo = logo;
    }

    public MedioPagoDTO() {
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

    public String getCategoriaNombre() {
        return categoriaNombre;
    }

    public void setCategoriaNombre(String categoriaNombre) {
        this.categoriaNombre = categoriaNombre;
    }
}

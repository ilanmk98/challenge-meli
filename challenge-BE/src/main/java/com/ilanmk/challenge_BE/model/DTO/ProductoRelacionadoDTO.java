package com.ilanmk.challenge_BE.model.DTO;

public class ProductoRelacionadoDTO {
    private String titulo;
    private double precioOriginal;
    private double precioActual;
    private int cuotasSinInteres;
    private MediaDTO imagen;

    public ProductoRelacionadoDTO(String titulo, double precioOriginal, double precioActual, int cuotasSinInteres) {
        this.titulo = titulo;
        this.precioOriginal = precioOriginal;
        this.precioActual = precioActual;
        this.cuotasSinInteres = cuotasSinInteres;
    }

    public ProductoRelacionadoDTO() {
    }

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public double getPrecioOriginal() {
        return precioOriginal;
    }

    public void setPrecioOriginal(double precioOriginal) {
        this.precioOriginal = precioOriginal;
    }

    public double getPrecioActual() {
        return precioActual;
    }

    public void setPrecioActual(double precioActual) {
        this.precioActual = precioActual;
    }

    public int getCuotasSinInteres() {
        return cuotasSinInteres;
    }

    public void setCuotasSinInteres(int cuotasSinInteres) {
        this.cuotasSinInteres = cuotasSinInteres;
    }

    public MediaDTO getImagen() {
        return imagen;
    }

    public void setImagen(MediaDTO imagen) {
        this.imagen = imagen;
    }
}

package com.ilanmk.challenge_BE.model.DTO;

import com.ilanmk.challenge_BE.model.Caracteristica;
import com.ilanmk.challenge_BE.model.Highlight;
import com.ilanmk.challenge_BE.model.Media;

import java.util.List;

public class ProductoDTO {
    private String titulo;

    private double precioOriginal;

    private double precioActual;

    private int stockActual;

    private List<Highlight> highlights;

    private List<Media> media;

    private List<Caracteristica> caracteristicas;

    private String descripcion;

    private Long vendedorId;

    private Integer cuotasSinInteres;


    public ProductoDTO() {
    }

    public ProductoDTO(String titulo, double precioOriginal, double precioActual, int stockActual, List<Highlight> highlights, List<Media> media, List<Caracteristica> caracteristicas, String descripcion, Long vendedorId, Integer cuotasSinInteres) {
        this.titulo = titulo;
        this.precioOriginal = precioOriginal;
        this.precioActual = precioActual;
        this.stockActual = stockActual;
        this.highlights = highlights;
        this.media = media;
        this.caracteristicas = caracteristicas;
        this.descripcion = descripcion;
        this.vendedorId = vendedorId;
        this.cuotasSinInteres = cuotasSinInteres;
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

    public int getStockActual() {
        return stockActual;
    }

    public void setStockActual(int stockActual) {
        this.stockActual = stockActual;
    }

    public List<Highlight> getHighlights() {
        return highlights;
    }

    public void setHighlights(List<Highlight> highlights) {
        this.highlights = highlights;
    }

    public List<Media> getMedia() {
        return media;
    }

    public void setMedia(List<Media> media) {
        this.media = media;
    }

    public List<Caracteristica> getCaracteristicas() {
        return caracteristicas;
    }

    public void setCaracteristicas(List<Caracteristica> caracteristicas) {
        this.caracteristicas = caracteristicas;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public Long getVendedorId() {
        return vendedorId;
    }

    public void setVendedorId(Long vendedorId) {
        this.vendedorId = vendedorId;
    }

    public Integer getCuotasSinInteres() {
        return cuotasSinInteres;
    }

    public void setCuotasSinInteres(Integer cuotasSinInteres) {
        this.cuotasSinInteres = cuotasSinInteres;
    }
}

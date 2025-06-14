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

    private List<HighlightDTO> highlights;

    private List<MediaDTO> media;

    private List<CaracteristicaDTO> caracteristicas;

    private String descripcion;

    private Long vendedorId;

    private Integer cuotasSinInteres;

    private double calificacion;


    public ProductoDTO() {
    }

    public ProductoDTO(String titulo, double precioOriginal, double precioActual, int stockActual, List<HighlightDTO> highlights, List<MediaDTO> media, List<CaracteristicaDTO> caracteristicas, String descripcion, Long vendedorId, Integer cuotasSinInteres,double calificacion) {
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
        this.calificacion = calificacion;
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

    public List<HighlightDTO> getHighlights() {
        return highlights;
    }

    public void setHighlights(List<HighlightDTO> highlights) {
        this.highlights = highlights;
    }

    public List<MediaDTO> getMedia() {
        return media;
    }

    public void setMedia(List<MediaDTO> media) {
        this.media = media;
    }

    public List<CaracteristicaDTO> getCaracteristicas() {
        return caracteristicas;
    }

    public void setCaracteristicas(List<CaracteristicaDTO> caracteristicas) {
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

    public double getCalificacion(){
        return calificacion;
    }
    public void setCalificacion(double calificacion){
        this.calificacion = calificacion;
    }
}

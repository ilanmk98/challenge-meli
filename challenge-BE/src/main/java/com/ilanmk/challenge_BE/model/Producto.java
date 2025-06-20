package com.ilanmk.challenge_BE.model;

import java.util.List;

public class Producto {

    private Long id;

    private String titulo;

    private double precioOriginal;

    private double precioActual;

    private int stockActual;

    private String marca;

    private double calificacion;
    private Long idCategoria;
    private Long idSubCategoria;

    private List<Highlight> highlights;

    private List<Media> media;

    private List<Caracteristica> caracteristicas;

    private String descripcion;

    private Long vendedorId;

    private Integer cuotasSinInteres;

    private Integer cantidadVendidos;
    private int cantidadCalificaciones;
    private int rankingSubcategoria;

    public Long getIdCategoria() {
        return idCategoria;
    }

    public void setIdCategoria(Long idCategoria) {
        this.idCategoria = idCategoria;
    }

    public Long getIdSubCategoria() {
        return idSubCategoria;
    }

    public void setIdSubCategoria(Long idSubCategoria) {
        this.idSubCategoria = idSubCategoria;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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
    public void setCalificacion(double calificacion){
        this.calificacion = calificacion;
    }
    public double getCalificacion(){
        return this.calificacion;
    }

    public String getMarca() {
        return marca;
    }

    public void setMarca(String marca) {
        this.marca = marca;
    }

    public Integer getCantidadVendidos() {
        return cantidadVendidos;
    }

    public void setCantidadVendidos(Integer cantidadVendidos) {
        this.cantidadVendidos = cantidadVendidos;
    }

    public int getCantidadCalificaciones() {
        return cantidadCalificaciones;
    }

    public void setCantidadCalificaciones(int cantidadCalificaciones) {
        this.cantidadCalificaciones = cantidadCalificaciones;
    }

    public int getRankingSubcategoria() {
        return rankingSubcategoria;
    }

    public void setRankingSubcategoria(int rankingSubcategoria) {
        this.rankingSubcategoria = rankingSubcategoria;
    }
}


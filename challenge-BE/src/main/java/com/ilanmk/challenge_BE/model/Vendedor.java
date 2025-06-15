package com.ilanmk.challenge_BE.model;


public class Vendedor {

    private Long id;

    private String nombre;

    private boolean esVerificado;

    private long cantidadDeVentas;

    private boolean brindaBuenaAtencion;

    private boolean entregaATiempo;

    private String foto;

    private String banner;
    private String calificacion;
    private int cantidadProductos;

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

    public boolean isEsVerificado() {
        return esVerificado;
    }

    public void setEsVerificado(boolean esVerificado) {
        this.esVerificado = esVerificado;
    }

    public long getCantidadDeVentas() {
        return cantidadDeVentas;
    }

    public void setCantidadDeVentas(long cantidadDeVentas) {
        this.cantidadDeVentas = cantidadDeVentas;
    }

    public boolean isBrindaBuenaAtencion() {
        return brindaBuenaAtencion;
    }

    public void setBrindaBuenaAtencion(boolean brindaBuenaAtencion) {
        this.brindaBuenaAtencion = brindaBuenaAtencion;
    }

    public boolean isEntregaATiempo() {
        return entregaATiempo;
    }

    public void setEntregaATiempo(boolean entregaATiempo) {
        this.entregaATiempo = entregaATiempo;
    }

    public String getFoto() {
        return foto;
    }

    public void setFoto(String foto) {
        this.foto = foto;
    }

    public String getBanner() {
        return banner;
    }

    public void setBanner(String banner) {
        this.banner = banner;
    }

    public String getCalificacion() {
        return calificacion;
    }

    public void setCalificacion(String calificacion) {
        this.calificacion = calificacion;
    }

    public int getCantidadProductos() {
        return cantidadProductos;
    }

    public void setCantidadProductos(int cantidadProductos) {
        this.cantidadProductos = cantidadProductos;
    }
}

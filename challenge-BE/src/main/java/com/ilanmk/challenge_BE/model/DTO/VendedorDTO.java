package com.ilanmk.challenge_BE.model.DTO;

public class VendedorDTO {
    private String nombre;
    private boolean esVerificado;
    private long cantidadDeVentas;
    private boolean brindaBuenaAtencion;
    private boolean entregaATiempo;
    private String foto;
    private String banner;

    public VendedorDTO(){}
    public VendedorDTO(String nombre, boolean esVerificado, long cantidadDeVentas, boolean brindaBuenaAtencion, boolean entregaATiempo, String foto, String banner) {
        this.nombre = nombre;
        this.esVerificado = esVerificado;
        this.cantidadDeVentas = cantidadDeVentas;
        this.brindaBuenaAtencion = brindaBuenaAtencion;
        this.entregaATiempo = entregaATiempo;
        this.foto = foto;
        this.banner = banner;
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
}

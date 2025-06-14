package com.ilanmk.challenge_BE.model.DTO;

public class CaracteristicaDTO {
    private String texto;

    public CaracteristicaDTO(String texto) {
        this.texto = texto;
    }

    public CaracteristicaDTO() {
    }

    public String getTexto() {
        return texto;
    }

    public void setTexto(String texto) {
        this.texto = texto;
    }
}

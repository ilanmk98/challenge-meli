package com.ilanmk.challenge_BE.model.DTO;

public class HighlightDTO {
    private String texto;

    public HighlightDTO(String texto) {
        this.texto = texto;
    }

    public HighlightDTO() {
    }

    public String getTexto() {
        return texto;
    }

    public void setTexto(String texto) {
        this.texto = texto;
    }
}

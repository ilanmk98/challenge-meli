package com.ilanmk.challenge_BE.model.DTO;

import com.ilanmk.challenge_BE.model.Enum.TipoMedia;

public class MediaDTO {
    private String url;
    private TipoMedia tipo;

    public MediaDTO(String url, TipoMedia tipo) {
        this.url = url;
        this.tipo = tipo;
    }

    public MediaDTO() {
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public TipoMedia getTipo() {
        return tipo;
    }

    public void setTipo(TipoMedia tipo) {
        this.tipo = tipo;
    }
}

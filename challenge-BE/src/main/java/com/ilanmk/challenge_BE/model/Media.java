package com.ilanmk.challenge_BE.model;

import com.ilanmk.challenge_BE.model.Enum.TipoMedia;

public class Media {
    private Long id;
    private String url;
    private TipoMedia tipo;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

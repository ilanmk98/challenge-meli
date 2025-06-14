package com.ilanmk.challenge_BE.repository;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ilanmk.challenge_BE.model.MedioDePago;
import jakarta.annotation.PostConstruct;

import java.io.InputStream;
import java.util.List;
import java.util.Map;

public class MedioDePagoRepository {
    private List<MedioDePago> mediosDePago;

    @PostConstruct
    public void cargarDatos() {
        try (InputStream input = getClass().getResourceAsStream("/medioDePago.json")) {
            ObjectMapper objectMapper = new ObjectMapper();
            Map<String, Object> datos = objectMapper.readValue(input, new TypeReference<>() {});
            mediosDePago = objectMapper.convertValue(datos.get("mediosDePago"), new TypeReference<List<MedioDePago>>() {});
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}

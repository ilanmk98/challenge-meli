package com.ilanmk.challenge_BE.repository;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ilanmk.challenge_BE.model.CategoriaMedioPago;
import com.ilanmk.challenge_BE.model.MedioDePago;
import com.ilanmk.challenge_BE.model.Producto;
import com.ilanmk.challenge_BE.model.Vendedor;
import jakarta.annotation.PostConstruct;

import java.io.InputStream;
import java.util.List;
import java.util.Map;

public class categoriaMedioPagoRepository {
    private List<CategoriaMedioPago> categoriasMedioDePago;

    @PostConstruct
    public void cargarDatos() {
        try (InputStream input = getClass().getResourceAsStream("/categoriasMedioDePago.json")) {
            ObjectMapper objectMapper = new ObjectMapper();
            Map<String, Object> datos = objectMapper.readValue(input, new TypeReference<>() {});
            categoriasMedioDePago = objectMapper.convertValue(datos.get("categoriasMedioDePago"), new TypeReference<List<CategoriaMedioPago>>() {});

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}

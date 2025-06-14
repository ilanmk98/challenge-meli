package com.ilanmk.challenge_BE.repository;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ilanmk.challenge_BE.model.CategoriaMedioPago;
import com.ilanmk.challenge_BE.model.MedioDePago;
import com.ilanmk.challenge_BE.model.Producto;
import com.ilanmk.challenge_BE.model.Vendedor;
import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Component;

import java.io.InputStream;
import java.util.List;
import java.util.Map;

@Component
public class vendedorRepository {
    private List<Vendedor> vendedores;
    @PostConstruct

    public void cargarDatos() {
        try (InputStream input = getClass().getResourceAsStream("/vendedores.json")) {
            ObjectMapper objectMapper = new ObjectMapper();
            Map<String, Object> datos = objectMapper.readValue(input, new TypeReference<>() {});
            vendedores = objectMapper.convertValue(datos.get("vendedores"), new TypeReference<List<Vendedor>>() {});
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}

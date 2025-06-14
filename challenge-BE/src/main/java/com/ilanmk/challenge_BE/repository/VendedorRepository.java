package com.ilanmk.challenge_BE.repository;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ilanmk.challenge_BE.model.Vendedor;
import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Component;

import java.io.InputStream;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Component
public class VendedorRepository {
    private List<Vendedor> vendedores;

    @PostConstruct
    private void cargarDatos() {
        try (InputStream input = getClass().getResourceAsStream("/vendedores.json")) {
            ObjectMapper objectMapper = new ObjectMapper();
            Map<String, Object> datos = objectMapper.readValue(input, new TypeReference<>() {
            });
            vendedores = objectMapper.convertValue(datos.get("vendedores"), new TypeReference<List<Vendedor>>() {
            });
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public Optional<Vendedor> obtenerPorId(Long id) {
        return vendedores.stream()
                .filter(vendedor -> vendedor.getId().equals(id))
                .findFirst();
    }
}

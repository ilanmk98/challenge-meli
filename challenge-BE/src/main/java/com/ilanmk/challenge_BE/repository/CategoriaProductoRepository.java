package com.ilanmk.challenge_BE.repository;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ilanmk.challenge_BE.model.CategoriaProducto;
import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Component;

import java.io.InputStream;
import java.util.List;
import java.util.Map;
import java.util.Optional;
@Component
public class CategoriaProductoRepository {

    private List<CategoriaProducto> categorias;

    @PostConstruct
    private void cargarDatos() {
        try (InputStream input = getClass().getResourceAsStream("/categorias.json")) {
            ObjectMapper objectMapper = new ObjectMapper();
            Map<String, Object> datos = objectMapper.readValue(input, new TypeReference<>() {});

            categorias = objectMapper.convertValue(datos.get("categorias"), new TypeReference<List<CategoriaProducto>>() {});

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public Optional<CategoriaProducto> obtenerPorId(Long id){
        return categorias.stream()
                .filter(categoria->categoria.getId().equals(id))
                .findFirst();
    }
}

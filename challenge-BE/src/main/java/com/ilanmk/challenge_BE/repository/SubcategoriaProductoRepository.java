package com.ilanmk.challenge_BE.repository;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ilanmk.challenge_BE.model.CategoriaProducto;
import com.ilanmk.challenge_BE.model.SubcategoriaProducto;
import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Component;

import java.io.InputStream;
import java.util.List;
import java.util.Map;
import java.util.Optional;
@Component
public class SubcategoriaProductoRepository {
    private List<SubcategoriaProducto> subCategorias;

    @PostConstruct
    public void cargarDatos() {
        try (InputStream input = getClass().getResourceAsStream("/subcategorias.json")) {
            ObjectMapper objectMapper = new ObjectMapper();
            Map<String, Object> datos = objectMapper.readValue(input, new TypeReference<>() {});

            subCategorias = objectMapper.convertValue(datos.get("subcategorias"), new TypeReference<List<SubcategoriaProducto>>() {});

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public Optional<SubcategoriaProducto> obtenerPorId(Long id){
        return subCategorias.stream()
                .filter(subcategoria->subcategoria.getId().equals(id))
                .findFirst();
    }

}

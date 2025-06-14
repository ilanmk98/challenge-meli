package com.ilanmk.challenge_BE.repository;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ilanmk.challenge_BE.model.Producto;
import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Component;

import java.io.InputStream;
import java.util.List;
import java.util.Map;
import java.util.Optional;
@Component
public class ProductoRepository {
    private List<Producto> productos;

    @PostConstruct
    private void cargarDatos() {
        try (InputStream input = getClass().getResourceAsStream("/productos.json")) {
            ObjectMapper objectMapper = new ObjectMapper();
            Map<String, Object> datos = objectMapper.readValue(input, new TypeReference<>() {});

            productos = objectMapper.convertValue(datos.get("productos"), new TypeReference<List<Producto>>() {});

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public Optional<Producto> obtenerPorId(Long id){
        return productos.stream()
                .filter(producto -> producto.getId().equals(id))
                .findFirst();
    }
    public Optional<Long> obtenerSubcategoria(Long id){
        return productos.stream().filter(producto->producto.getId().equals(id))
                .map(producto->producto.getIdSubCategoria()).findFirst();
    }

    public List<Producto> obtenerMismaSubcategoria(Long idProducto,Long idSubcategoria,int limiteProductos){
        return productos.stream()
                .filter(producto-> producto.getIdSubCategoria().equals(idSubcategoria) && !producto.getId().equals(idProducto))
                .limit(limiteProductos)
                .toList();
    }
}

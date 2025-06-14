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
public class RepositorioEnMemoria {

    private List<Producto> productos;
    private List<Vendedor> vendedores;
    private List<MedioDePago> mediosDePago;
    private List<CategoriaMedioPago> categoriasMedioDePago;

    @PostConstruct
    public void cargarDatos() {
        try (InputStream input = getClass().getResourceAsStream("/datos-prueba-mercado.json")) {
            ObjectMapper objectMapper = new ObjectMapper();
            Map<String, Object> datos = objectMapper.readValue(input, new TypeReference<>() {});

            productos = objectMapper.convertValue(datos.get("productos"), new TypeReference<List<Producto>>() {});
            vendedores = objectMapper.convertValue(datos.get("vendedores"), new TypeReference<List<Vendedor>>() {});
            mediosDePago = objectMapper.convertValue(datos.get("mediosDePago"), new TypeReference<List<MedioDePago>>() {});
            categoriasMedioDePago = objectMapper.convertValue(datos.get("categoriasMedioDePago"), new TypeReference<List<CategoriaMedioPago>>() {});

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    // Getters para que otros servicios puedan acceder a los datos
    public List<Producto> obtenerProductos() {
        return productos;
    }

    public List<Vendedor> obtenerVendedores() {
        return vendedores;
    }

    public List<MedioDePago> obtenerMediosDePago() {
        return mediosDePago;
    }

    public List<CategoriaMedioPago> obtenerCategoriasMedioDePago() {
        return categoriasMedioDePago;
    }
}

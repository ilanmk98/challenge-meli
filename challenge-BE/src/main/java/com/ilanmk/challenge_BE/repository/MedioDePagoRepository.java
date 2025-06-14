package com.ilanmk.challenge_BE.repository;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ilanmk.challenge_BE.model.MedioDePago;
import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Component;

import java.io.InputStream;
import java.util.List;
import java.util.Map;
@Component
public class MedioDePagoRepository {
    private List<MedioDePago> mediosDePago;

    @PostConstruct
    private void cargarDatos() {
        try (InputStream input = getClass().getResourceAsStream("/medioDePago.json")) {
            ObjectMapper objectMapper = new ObjectMapper();
            Map<String, Object> datos = objectMapper.readValue(input, new TypeReference<>() {});
            mediosDePago = objectMapper.convertValue(datos.get("mediosDePago"), new TypeReference<List<MedioDePago>>() {});
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public List<MedioDePago> obtenerTodos(){
        return mediosDePago;
    }
}

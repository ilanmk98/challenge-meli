package com.ilanmk.challenge_BE.repository;

import com.ilanmk.challenge_BE.model.CategoriaMedioPago;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.lang.reflect.Field;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

class CategoriaMedioPagoRepositoryTest {

    private CategoriaMedioPagoRepository repository;

    @BeforeEach
    void setUp() throws Exception {
        repository = new CategoriaMedioPagoRepository();

        // Crea una lista mock de categorias
        CategoriaMedioPago cat1 = new CategoriaMedioPago(1L, "Tarjetas");
        CategoriaMedioPago cat2 = new CategoriaMedioPago(2L, "Efectivo");

        List<CategoriaMedioPago> mockLista = List.of(cat1, cat2);

        // Usamos reflexión para setear el campo privado
        Field field = CategoriaMedioPagoRepository.class.getDeclaredField("categoriasMedioDePago");
        field.setAccessible(true);
        field.set(repository, mockLista);
    }

    @Test
    void obtenerNombrePorId_deberiaRetornarNombreCorrecto() {
        Optional<String> nombre = repository.obtenerNombrePorId(2L);
        assertTrue(nombre.isPresent());
        assertEquals("Efectivo", nombre.get());
    }

    @Test
    void obtenerNombrePorId_deberiaRetornarVacioSiNoExiste() {
        Optional<String> nombre = repository.obtenerNombrePorId(99L);
        assertTrue(nombre.isEmpty());
    }

}
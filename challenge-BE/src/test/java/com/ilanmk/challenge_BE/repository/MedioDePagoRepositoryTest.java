package com.ilanmk.challenge_BE.repository;

import com.ilanmk.challenge_BE.model.CategoriaProducto;
import com.ilanmk.challenge_BE.model.MedioDePago;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.lang.reflect.Field;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

class MedioDePagoRepositoryTest {
    private MedioDePagoRepository repository;

    @BeforeEach
    void setUp() throws Exception {
        repository = new MedioDePagoRepository();

        MedioDePago mp1 = new MedioDePago(1L, "Visa","imagen.jpg",1l);
        MedioDePago mp2 = new MedioDePago(2L, "Mastercard","imagen.jpg",1l);

        List<MedioDePago> mockMedios = List.of(mp1, mp2);

        Field field = MedioDePagoRepository.class.getDeclaredField("mediosDePago");
        field.setAccessible(true);
        field.set(repository, mockMedios);
    }

    @Test
    void obtenerTodos_deberiaRetornarTodosLosMediosDePago() {
        List<MedioDePago> resultado = repository.obtenerTodos();

        assertEquals(2, resultado.size());
        assertEquals("Visa", resultado.get(0).getNombre());
        assertEquals("Mastercard", resultado.get(1).getNombre());
    }
}
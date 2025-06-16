package com.ilanmk.challenge_BE.repository;

import com.ilanmk.challenge_BE.model.Vendedor;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.lang.reflect.Field;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

class VendedorRepositoryTest {
    private VendedorRepository repository;

    @BeforeEach
    void setUp() throws Exception {
        repository = new VendedorRepository();

        Vendedor vendedor1 = new Vendedor();
        vendedor1.setId(1L);

        List<Vendedor> mockVendedores = List.of(vendedor1);

        // Inyectar lista simulada usando reflexión
        Field field = VendedorRepository.class.getDeclaredField("vendedores");
        field.setAccessible(true);
        field.set(repository, mockVendedores);
    }

    @Test
    void obtenerPorId_deberiaRetornarVendedorExistente() {
        Optional<Vendedor> result = repository.obtenerPorId(1L);

        assertTrue(result.isPresent());
        assertEquals(1L, result.get().getId());
    }

    @Test
    void obtenerPorId_deberiaRetornarVacioSiNoExiste() {
        Optional<Vendedor> result = repository.obtenerPorId(999L);

        assertTrue(result.isEmpty());
    }
}
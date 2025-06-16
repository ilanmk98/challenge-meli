package com.ilanmk.challenge_BE.repository;

import com.ilanmk.challenge_BE.model.CategoriaProducto;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.lang.reflect.Field;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

class CategoriaProductoRepositoryTest {
    private CategoriaProductoRepository repository;

    @BeforeEach
    void setUp() throws Exception {
        repository = new CategoriaProductoRepository();

        CategoriaProducto cat1 = new CategoriaProducto(1L, "Tecnología");
        CategoriaProducto cat2 = new CategoriaProducto(2L, "Hogar");
        CategoriaProducto cat3 = new CategoriaProducto(3L, "Deportes");

        List<CategoriaProducto> mockCategorias = List.of(cat1, cat2, cat3);

        Field field = CategoriaProductoRepository.class.getDeclaredField("categorias");
        field.setAccessible(true);
        field.set(repository, mockCategorias);
    }

    @Test
    void obtenerPorId_deberiaRetornarCategoriaSiExiste() {
        Optional<CategoriaProducto> result = repository.obtenerPorId(2L);
        assertTrue(result.isPresent());
        assertEquals("Hogar", result.get().getNombre());
    }

    @Test
    void obtenerPorId_deberiaRetornarVacioSiNoExiste() {
        Optional<CategoriaProducto> result = repository.obtenerPorId(99L);
        assertTrue(result.isEmpty());
    }

}
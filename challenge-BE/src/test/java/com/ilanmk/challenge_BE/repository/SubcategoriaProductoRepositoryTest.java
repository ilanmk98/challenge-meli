package com.ilanmk.challenge_BE.repository;

import com.ilanmk.challenge_BE.model.SubcategoriaProducto;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.lang.reflect.Field;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

class SubcategoriaProductoRepositoryTest {
    private SubcategoriaProductoRepository repository;

    @BeforeEach
    void setUp() throws Exception {
        repository = new SubcategoriaProductoRepository();

        SubcategoriaProducto sub1 = new SubcategoriaProducto(1L, "Smartphones",1L);
        SubcategoriaProducto sub2 = new SubcategoriaProducto(2L, "Laptops",1L);

        List<SubcategoriaProducto> mockSubcategorias = List.of(sub1, sub2);

        Field field = SubcategoriaProductoRepository.class.getDeclaredField("subCategorias");
        field.setAccessible(true);
        field.set(repository, mockSubcategorias);
    }

    @Test
    void obtenerPorId_deberiaRetornarSubcategoriaSiExiste() {
        Optional<SubcategoriaProducto> resultado = repository.obtenerPorId(1L);

        assertTrue(resultado.isPresent());
        assertEquals("Smartphones", resultado.get().getNombre());
    }

    @Test
    void obtenerPorId_deberiaRetornarVacioSiNoExiste() {
        Optional<SubcategoriaProducto> resultado = repository.obtenerPorId(999L);

        assertTrue(resultado.isEmpty());
    }

}
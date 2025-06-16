package com.ilanmk.challenge_BE.repository;

import com.ilanmk.challenge_BE.model.Producto;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.lang.reflect.Field;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

class ProductoRepositoryTest {
    private ProductoRepository repository;

    @BeforeEach
    void setUp() throws Exception {
        repository = new ProductoRepository();

        Producto prod1 = new Producto();
        Producto prod2 = new Producto();
        Producto prod3 = new Producto();
        prod1.setId(1L);
        prod2.setId(2L);
        prod3.setId(3L);
        prod1.setTitulo("prod 1");
        prod2.setTitulo("prod 2");
        prod3.setTitulo("prod 3");
        prod1.setIdSubCategoria(1L);
        prod2.setIdSubCategoria(1L);
        prod3.setIdSubCategoria(1L);

        List<Producto> mockProductos = List.of(prod1, prod2, prod3);

        Field field = ProductoRepository.class.getDeclaredField("productos");
        field.setAccessible(true);
        field.set(repository, mockProductos);
    }

    @Test
    void obtenerPorId_deberiaRetornarProductoSiExiste() {
        Optional<Producto> result = repository.obtenerPorId(1L);
        assertTrue(result.isPresent());
        assertEquals("prod 1", result.get().getTitulo());
    }

    @Test
    void obtenerPorId_deberiaRetornarVacioSiNoExiste() {
        Optional<Producto> result = repository.obtenerPorId(99L);
        assertTrue(result.isEmpty());
    }

    @Test
    void obtenerSubcategoria_deberiaRetornarSubcategoriaCorrecta() {
        Optional<Long> result = repository.obtenerSubcategoria(2L);
        assertTrue(result.isPresent());
        assertEquals(1L, result.get());
    }

    @Test
    void obtenerMismaSubcategoria_deberiaRetornarProductosSimilaresSinElOriginal() {
        List<Producto> relacionados = repository.obtenerMismaSubcategoria(1L, 1L, 5);
        assertEquals(2, relacionados.size());
        assertEquals(2L, relacionados.get(0).getId());
    }

    @Test
    void obtenerMismaSubcategoria_deberiaRetornarVacioSiNoHayCoincidencias() {
        List<Producto> relacionados = repository.obtenerMismaSubcategoria(3L, 999L, 5);
        assertTrue(relacionados.isEmpty());
    }
}
package com.ilanmk.challenge_BE.service.impl;

import com.ilanmk.challenge_BE.repository.CategoriaMedioPagoRepository;
import jakarta.persistence.EntityNotFoundException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;


class CategoriaMedioPagoServiceImplTest {
    private CategoriaMedioPagoRepository repositorioMock;
    private CategoriaMedioPagoServiceImpl servicio;

    @BeforeEach
    void setUp() {
        repositorioMock = mock(CategoriaMedioPagoRepository.class);
        servicio = new CategoriaMedioPagoServiceImpl(repositorioMock);
    }
    @Test
    void obtenerNombrePorId_deberiaRetornarNombreSiExiste() {
        Long id = 1L;
        String nombreEsperado = "Crédito";

        when(repositorioMock.obtenerNombrePorId(id)).thenReturn(Optional.of(nombreEsperado));
        String nombreObtenido = servicio.obtenerNombrePorId(id);

        assertNotNull(nombreObtenido);
        assertEquals(nombreEsperado, nombreObtenido);
        verify(repositorioMock, times(1)).obtenerNombrePorId(id);
    }

    @Test
    void obtenerNombrePorId_deberiaLanzarExcepcionSiNoExiste() {
        Long id = 99L;
        when(repositorioMock.obtenerNombrePorId(id)).thenReturn(Optional.empty());

        EntityNotFoundException ex = assertThrows(EntityNotFoundException.class,
                () -> servicio.obtenerNombrePorId(id));

        assertEquals("Categoria de medio de pago no encontrada", ex.getMessage());
        verify(repositorioMock, times(1)).obtenerNombrePorId(id);
    }
}
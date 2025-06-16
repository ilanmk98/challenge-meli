package com.ilanmk.challenge_BE.service.impl;

import com.ilanmk.challenge_BE.model.DTO.MedioPagoDTO;
import com.ilanmk.challenge_BE.model.MedioDePago;
import com.ilanmk.challenge_BE.repository.MedioDePagoRepository;
import com.ilanmk.challenge_BE.service.CategoriaMedioPagoService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.modelmapper.ModelMapper;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class MedioDePagoServiceImplTest {
    private MedioDePagoRepository repositorioMock;
    private ModelMapper modelMapperMock;
    private CategoriaMedioPagoService categoriaMedioPagoServiceMock;
    private MedioDePagoServiceImpl servicio;

    @BeforeEach
    void setUp() {
        repositorioMock = mock(MedioDePagoRepository.class);
        modelMapperMock = mock(ModelMapper.class);
        categoriaMedioPagoServiceMock = mock(CategoriaMedioPagoService.class);
        servicio = new MedioDePagoServiceImpl(repositorioMock, modelMapperMock, categoriaMedioPagoServiceMock);
    }

    @Test
    void listarTodos_deberiaRetornarListaDTO_correctamenteMapeada() {
        MedioDePago medio = new MedioDePago();
        medio.setId(1L);
        medio.setNombre("Visa");
        medio.setLogo("visa.png");
        medio.setCategoriaId(10L);
        MedioPagoDTO dtoEsperado = new MedioPagoDTO();
        dtoEsperado.setNombre("Visa");
        dtoEsperado.setLogo("visa.png");
        dtoEsperado.setCategoriaNombre("Tarjetas de crédito");
        when(repositorioMock.obtenerTodos()).thenReturn(List.of(medio));
        when(modelMapperMock.map(medio, MedioPagoDTO.class)).thenReturn(dtoEsperado);
        when(categoriaMedioPagoServiceMock.obtenerNombrePorId(10L)).thenReturn("Tarjetas de crédito");


        List<MedioPagoDTO> resultado = servicio.listarTodos();

        assertNotNull(resultado);
        assertEquals(1, resultado.size());
        assertEquals("Visa", resultado.get(0).getNombre());
        assertEquals("visa.png", resultado.get(0).getLogo());
        assertEquals("Tarjetas de crédito", resultado.get(0).getCategoriaNombre());

        verify(repositorioMock).obtenerTodos();
        verify(modelMapperMock).map(medio, MedioPagoDTO.class);
        verify(categoriaMedioPagoServiceMock).obtenerNombrePorId(10L);
    }

    @Test
    void listarTodos_deberiaRetornarListaVacia_siNoHayMedios() {
        when(repositorioMock.obtenerTodos()).thenReturn(List.of());

        List<MedioPagoDTO> resultado = servicio.listarTodos();

        assertNotNull(resultado);
        assertTrue(resultado.isEmpty());

        verify(repositorioMock).obtenerTodos();
        verifyNoInteractions(modelMapperMock, categoriaMedioPagoServiceMock);
    }
}
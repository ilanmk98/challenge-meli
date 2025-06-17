package com.ilanmk.challenge_BE.service.impl;

import com.ilanmk.challenge_BE.exception.EntityNotFoundException;
import com.ilanmk.challenge_BE.model.CategoriaProducto;
import com.ilanmk.challenge_BE.model.DTO.CategoriaProductoDTO;
import com.ilanmk.challenge_BE.repository.CategoriaProductoRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.modelmapper.ModelMapper;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class CategoriaProductoServiceImplTest {
    private CategoriaProductoRepository repositorioMock;
    private ModelMapper modelMapperMock;
    private CategoriaProductoServiceImpl servicio;

    @BeforeEach
    void setUp() {
        repositorioMock = mock(CategoriaProductoRepository.class);
        modelMapperMock = mock(ModelMapper.class);
        servicio = new CategoriaProductoServiceImpl(repositorioMock, modelMapperMock);
    }

    @Test
    void obtenerPorId_deberiaRetornarDTO_siExiste() {
        Long id = 1L;
        CategoriaProducto categoria = new CategoriaProducto();
        categoria.setId(id);
        categoria.setNombre("Electrónica");
        CategoriaProductoDTO dtoEsperado = new CategoriaProductoDTO();
        dtoEsperado.setNombre("Electrónica");
        when(repositorioMock.obtenerPorId(id)).thenReturn(Optional.of(categoria));
        when(modelMapperMock.map(categoria, CategoriaProductoDTO.class)).thenReturn(dtoEsperado);

        CategoriaProductoDTO resultado = servicio.obtenerPorId(id);

        assertNotNull(resultado);
        assertEquals("Electrónica", resultado.getNombre());
        verify(repositorioMock, times(1)).obtenerPorId(id);
        verify(modelMapperMock, times(1)).map(categoria, CategoriaProductoDTO.class);
    }

    @Test
    void obtenerPorId_deberiaLanzarExcepcion_siNoExiste() {
        Long id = 99L;
        when(repositorioMock.obtenerPorId(id)).thenReturn(Optional.empty());

        EntityNotFoundException ex = assertThrows(EntityNotFoundException.class,
                () -> servicio.obtenerPorId(id));
        assertEquals("Categoria no encontrada", ex.getMessage());
        verify(repositorioMock, times(1)).obtenerPorId(id);
        verify(modelMapperMock, never()).map(any(), eq(CategoriaProductoDTO.class));
    }
}
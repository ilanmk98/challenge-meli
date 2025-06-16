package com.ilanmk.challenge_BE.service.impl;

import com.ilanmk.challenge_BE.model.DTO.CategoriaProductoDTO;
import com.ilanmk.challenge_BE.model.DTO.SubcategoriaProductoDTO;
import com.ilanmk.challenge_BE.model.SubcategoriaProducto;
import com.ilanmk.challenge_BE.repository.SubcategoriaProductoRepository;
import com.ilanmk.challenge_BE.service.CategoriaProductoService;
import jakarta.persistence.EntityNotFoundException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.modelmapper.ModelMapper;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

class SubcategoriaProductoServiceImplTest {
    private SubcategoriaProductoRepository repositorio;
    private ModelMapper modelMapper;
    private CategoriaProductoService categoriaProductoService;
    private SubcategoriaProductoServiceImpl service;

    @BeforeEach
    void setUp() {
        repositorio = mock(SubcategoriaProductoRepository.class);
        modelMapper = new ModelMapper();
        categoriaProductoService = mock(CategoriaProductoService.class);
        service = new SubcategoriaProductoServiceImpl(repositorio, modelMapper, categoriaProductoService);
    }

    @Test
    void obtenerPorId_ExisteSubcategoria_RetornaDTO() {
        Long id = 1L;
        SubcategoriaProducto subcategoria = new SubcategoriaProducto(id, "Subcat 1", 10L);
        CategoriaProductoDTO categoriaDTO = new CategoriaProductoDTO();
        categoriaDTO.setId(10L);
        categoriaDTO.setNombre("Categoria 10");
        when(repositorio.obtenerPorId(id)).thenReturn(Optional.of(subcategoria));
        when(categoriaProductoService.obtenerPorId(10L)).thenReturn(categoriaDTO);

        SubcategoriaProductoDTO resultado = service.obtenerPorId(id);

        assertNotNull(resultado);
        assertEquals("Subcat 1", resultado.getNombre());
        assertNotNull(resultado.getCategoria());
        assertEquals(10L, resultado.getCategoria().getId());
        assertEquals("Categoria 10", resultado.getCategoria().getNombre());
    }

    @Test
    void obtenerPorId_NoExisteSubcategoria_LanzaEntityNotFoundException() {
        Long id = 99L;
        when(repositorio.obtenerPorId(id)).thenReturn(Optional.empty());

        EntityNotFoundException ex = assertThrows(EntityNotFoundException.class, () -> service.obtenerPorId(id));
        assertEquals("Subcategoria no encontrada", ex.getMessage());
    }

}
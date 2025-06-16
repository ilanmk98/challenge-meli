package com.ilanmk.challenge_BE.service.impl;

import com.ilanmk.challenge_BE.model.DTO.VendedorDTO;
import com.ilanmk.challenge_BE.model.Vendedor;
import com.ilanmk.challenge_BE.repository.VendedorRepository;
import jakarta.persistence.EntityNotFoundException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.modelmapper.ModelMapper;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

class VendedorServiceImplTest {
    private VendedorRepository repositorio;
    private ModelMapper modelMapper;
    private VendedorServiceImpl service;

    @BeforeEach
    void setup() {
        repositorio = mock(VendedorRepository.class);
        modelMapper = new ModelMapper();
        service = new VendedorServiceImpl(repositorio, modelMapper);
    }

    @Test
    void obtenerPorId_DeberiaRetornarVendedorDTO_CuandoExiste() {
        Vendedor vendedor = new Vendedor();
        vendedor.setId(1L);
        vendedor.setNombre("Juan Perez");
        vendedor.setEsVerificado(true);
        vendedor.setCantidadDeVentas(100);
        vendedor.setBrindaBuenaAtencion(true);
        vendedor.setEntregaATiempo(true);
        vendedor.setFoto("foto.jpg");
        vendedor.setBanner("banner.jpg");
        vendedor.setCalificacion("5 estrellas");
        vendedor.setCantidadProductos(10);

        when(repositorio.obtenerPorId(1L)).thenReturn(Optional.of(vendedor));

        VendedorDTO dto = service.obtenerPorId(1L);

        assertNotNull(dto);
        assertEquals(vendedor.getNombre(), dto.getNombre());
        assertEquals(vendedor.isEsVerificado(), dto.isEsVerificado());
        assertEquals(vendedor.getCantidadDeVentas(), dto.getCantidadDeVentas());
        assertEquals(vendedor.isBrindaBuenaAtencion(), dto.isBrindaBuenaAtencion());
        assertEquals(vendedor.isEntregaATiempo(), dto.isEntregaATiempo());
        assertEquals(vendedor.getFoto(), dto.getFoto());
        assertEquals(vendedor.getBanner(), dto.getBanner());
        assertEquals(vendedor.getCalificacion(), dto.getCalificacion());
        assertEquals(vendedor.getCantidadProductos(), dto.getCantidadProductos());
    }

    @Test
    void obtenerPorId_DeberiaLanzarExcepcion_CuandoNoExiste() {
        when(repositorio.obtenerPorId(999L)).thenReturn(Optional.empty());

        EntityNotFoundException exception = assertThrows(EntityNotFoundException.class,
                () -> service.obtenerPorId(999L));
        assertEquals("Vendedor no encontrado", exception.getMessage());
    }

}
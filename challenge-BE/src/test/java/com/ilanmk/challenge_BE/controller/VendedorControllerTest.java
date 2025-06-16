package com.ilanmk.challenge_BE.controller;

import com.ilanmk.challenge_BE.model.DTO.VendedorDTO;
import com.ilanmk.challenge_BE.service.VendedorService;
import jakarta.persistence.EntityNotFoundException;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;
import com.ilanmk.challenge_BE.model.DTO.MedioPagoDTO;
import com.ilanmk.challenge_BE.service.MedioDePagoService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

@WebMvcTest(VendedorController.class)
class VendedorControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private VendedorService vendedorService;

    @Test
    void obtenerPorId_deberiaRetornarVendedorDTO() throws Exception {
        // Arrange
        VendedorDTO vendedor = new VendedorDTO();
        vendedor.setNombre("Juan Pérez");
        vendedor.setEsVerificado(true);
        vendedor.setCantidadDeVentas(50L);
        vendedor.setBrindaBuenaAtencion(true);
        vendedor.setEntregaATiempo(true);
        vendedor.setFoto("foto.jpg");
        vendedor.setBanner("banner.jpg");
        vendedor.setCalificacion("4.5");
        vendedor.setCantidadProductos(10);

        when(vendedorService.obtenerPorId(1L)).thenReturn(vendedor);

        // Act & Assert
        mockMvc.perform(get("/vendedor/1"))
                .andExpect(status().isOk());
    }

    @Test
    void obtenerPorId_deberiaRetornar404SiNoExiste() throws Exception {
        when(vendedorService.obtenerPorId(99L)).thenThrow(new EntityNotFoundException("Vendedor no encontrado"));
        mockMvc.perform(get("/vendedor/99"))
                .andExpect(status().isNotFound());
    }
}
package com.ilanmk.challenge_BE.controller;

import com.ilanmk.challenge_BE.model.DTO.VendedorDTO;
import com.ilanmk.challenge_BE.service.VendedorService;
import jakarta.persistence.EntityNotFoundException;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(VendedorController.class)
class VendedorControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private VendedorService vendedorService;

    @Test
    void obtenerPorId_deberiaRetornarVendedorDTO() throws Exception {
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
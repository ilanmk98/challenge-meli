package com.ilanmk.challenge_BE.controller;

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

@WebMvcTest(MedioDePagoController.class)
class MedioDePagoControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private MedioDePagoService medioDePagoService;

    @Test
    void listarTodos_deberiaRetornarListaDeMediosDePago() throws Exception {
        MedioPagoDTO medio1 = new MedioPagoDTO();
        medio1.setNombre("Tarjeta de Crédito");
        List<MedioPagoDTO> medios = List.of(medio1);

        when(medioDePagoService.listarTodos()).thenReturn(medios);

        mockMvc.perform(get("/medio-pago/listar"))
                .andExpect(status().isOk());

        verify(medioDePagoService,times(1)).listarTodos();
    }
}
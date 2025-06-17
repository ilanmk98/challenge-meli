package com.ilanmk.challenge_BE.integration;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
class VendedorIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    void obtenerVendedorPorId_deberiaRetornar200() throws Exception {
        mockMvc.perform(get("/vendedores/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.nombre").exists());
    }

    @Test
    void obtenerVendedorPorIdInexistente_deberiaRetornar404() throws Exception {
        mockMvc.perform(get("/vendedores/999"))
                .andExpect(status().isNotFound());
    }
}

package com.ilanmk.challenge_BE.integration;


import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
public class ProductoIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    void obtenerProductoPorId_deberiaRetornar200() throws Exception{
        mockMvc.perform(get("/productos/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.titulo").exists());
    }

    @Test
    void obtenerProductoPorIdInexistente_deberiaRetornar404() throws Exception{
        mockMvc.perform(get("/productos/999"))
                .andExpect(status().isNotFound());
    }

    @Test
    void obtenerProductosRelacionados_deberiaRetornar200() throws Exception{
        mockMvc.perform(get("/productos/1/relacionados"))
                .andExpect(status().isOk());
    }


}

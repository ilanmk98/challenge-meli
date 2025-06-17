package com.ilanmk.challenge_BE.integration;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
public class MedioPagoIntegrationTest {
    @Autowired
    private MockMvc mockMvc;

    @Test
    void obtenerMediosPago_deberiaRetornar200() throws Exception{
        mockMvc.perform(get("/medios-pago"))
                .andExpect(status().isOk());
    }
}

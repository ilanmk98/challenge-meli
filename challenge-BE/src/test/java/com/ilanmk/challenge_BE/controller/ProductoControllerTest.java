package com.ilanmk.challenge_BE.controller;

import com.ilanmk.challenge_BE.exception.EntityNotFoundException;
import com.ilanmk.challenge_BE.model.DTO.MediaDTO;
import com.ilanmk.challenge_BE.model.DTO.ProductoDTO;
import com.ilanmk.challenge_BE.model.DTO.ProductoRelacionadoDTO;
import com.ilanmk.challenge_BE.model.Enum.TipoMedia;
import com.ilanmk.challenge_BE.service.ProductoService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


@WebMvcTest(ProductoController.class)
public class ProductoControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private ProductoService productoService;

    @Test
    void obtenerPorId_deberiaRetornarProductoDTO() throws Exception {
        ProductoDTO productoDTO = new ProductoDTO();
        productoDTO.setTitulo("Producto Test");
        when(productoService.obtenerPorId(1L)).thenReturn(productoDTO);

        mockMvc.perform(get("/productos/1"))
                .andExpect(status().isOk());

        verify(productoService,times(1)).obtenerPorId(1L);
    }

    @Test
    void obtenerPorId_deberiaRetornar404() throws Exception {
        when(productoService.obtenerPorId(1L)).thenThrow(new EntityNotFoundException("error"));
        mockMvc.perform(get("/productos/1"))
                .andExpect(status().isNotFound());

        verify(productoService).obtenerPorId(1L);
    }

    @Test
    void obtenerRelacionados_deberiaRetornarListaDeProductoRelacionadoDTO() throws Exception {
        MediaDTO media = new MediaDTO();
        media.setUrl("https://example.com/imagen.jpg");
        media.setTipo(TipoMedia.IMAGEN);
        ProductoRelacionadoDTO producto1 = new ProductoRelacionadoDTO("Producto 1", 1000.0, 900.0, 3);
        producto1.setImagen(media);
        when(productoService.obtenerSimilares(1L)).thenReturn(List.of(producto1));

        mockMvc.perform(get("/productos/1/relacionados"))
                .andExpect(status().isOk());

        verify(productoService).obtenerSimilares(1L);
    }
}


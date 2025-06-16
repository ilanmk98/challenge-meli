package com.ilanmk.challenge_BE.service.impl;

import com.ilanmk.challenge_BE.model.DTO.MediaDTO;
import com.ilanmk.challenge_BE.model.DTO.ProductoDTO;
import com.ilanmk.challenge_BE.model.DTO.ProductoRelacionadoDTO;
import com.ilanmk.challenge_BE.model.DTO.SubcategoriaProductoDTO;
import com.ilanmk.challenge_BE.model.Producto;
import com.ilanmk.challenge_BE.repository.ProductoRepository;
import com.ilanmk.challenge_BE.service.SubcategoriaProductoService;
import jakarta.persistence.EntityNotFoundException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.modelmapper.ModelMapper;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class ProductoServiceImplTest {
    private ProductoRepository repositorioMock;
    private ModelMapper modelMapperMock;
    private SubcategoriaProductoService subcategoriaProductoServiceMock;
    private ProductoServiceImpl servicio;

    @BeforeEach
    void setUp() {
        repositorioMock = mock(ProductoRepository.class);
        modelMapperMock = mock(ModelMapper.class);
        subcategoriaProductoServiceMock = mock(SubcategoriaProductoService.class);
        servicio = new ProductoServiceImpl(repositorioMock, modelMapperMock, subcategoriaProductoServiceMock);
    }

    @Test
    void obtenerPorId_deberiaRetornarDTO_siExiste() {
        Long id = 1L;
        Producto producto = new Producto();
        producto.setId(id);
        producto.setPrecioOriginal(100.0);
        producto.setPrecioActual(80.0);
        producto.setIdSubCategoria(10L);
        ProductoDTO productoDTO = new ProductoDTO();
        SubcategoriaProductoDTO subcategoriaDTO = new SubcategoriaProductoDTO();
        when(repositorioMock.obtenerPorId(id)).thenReturn(Optional.of(producto));
        when(subcategoriaProductoServiceMock.obtenerPorId(10L)).thenReturn(subcategoriaDTO);
        when(modelMapperMock.map(producto, ProductoDTO.class)).thenReturn(productoDTO);

        ProductoDTO resultado = servicio.obtenerPorId(id);

        assertNotNull(resultado);
        verify(repositorioMock).obtenerPorId(id);
        verify(subcategoriaProductoServiceMock).obtenerPorId(10L);
        verify(modelMapperMock).map(producto, ProductoDTO.class);
    }

    @Test
    void obtenerPorId_deberiaRetornarDTO_siExiste_PrecioActual0() {
        Long id = 1L;
        Producto producto = new Producto();
        producto.setId(id);
        producto.setPrecioOriginal(100.0);
        producto.setPrecioActual(0);
        producto.setIdSubCategoria(10L);
        ProductoDTO productoDTO = new ProductoDTO();
        SubcategoriaProductoDTO subcategoriaDTO = new SubcategoriaProductoDTO();
        when(repositorioMock.obtenerPorId(id)).thenReturn(Optional.of(producto));
        when(subcategoriaProductoServiceMock.obtenerPorId(10L)).thenReturn(subcategoriaDTO);
        when(modelMapperMock.map(producto, ProductoDTO.class)).thenReturn(productoDTO);

        ProductoDTO resultado = servicio.obtenerPorId(id);

        assertNotNull(resultado);
        verify(repositorioMock).obtenerPorId(id);
        verify(subcategoriaProductoServiceMock).obtenerPorId(10L);
        verify(modelMapperMock).map(producto, ProductoDTO.class);
    }
    @Test
    void obtenerPorId_deberiaRetornarDTO_siExiste_PrecioOriginal0() {
        Long id = 1L;
        Producto producto = new Producto();
        producto.setId(id);
        producto.setPrecioOriginal(0);
        producto.setPrecioActual(100);
        producto.setIdSubCategoria(10L);
        ProductoDTO productoDTO = new ProductoDTO();
        SubcategoriaProductoDTO subcategoriaDTO = new SubcategoriaProductoDTO();
        when(repositorioMock.obtenerPorId(id)).thenReturn(Optional.of(producto));
        when(subcategoriaProductoServiceMock.obtenerPorId(10L)).thenReturn(subcategoriaDTO);
        when(modelMapperMock.map(producto, ProductoDTO.class)).thenReturn(productoDTO);

        ProductoDTO resultado = servicio.obtenerPorId(id);

        assertNotNull(resultado);
        verify(repositorioMock).obtenerPorId(id);
        verify(subcategoriaProductoServiceMock).obtenerPorId(10L);
        verify(modelMapperMock).map(producto, ProductoDTO.class);
    }
    @Test
    void obtenerPorId_deberiaRetornarDTO_siExiste_PrecioActualMayorAOriginal() {
        Long id = 1L;
        Producto producto = new Producto();
        producto.setId(id);
        producto.setPrecioOriginal(100.0);
        producto.setPrecioActual(150);
        producto.setIdSubCategoria(10L);
        ProductoDTO productoDTO = new ProductoDTO();
        SubcategoriaProductoDTO subcategoriaDTO = new SubcategoriaProductoDTO();
        when(repositorioMock.obtenerPorId(id)).thenReturn(Optional.of(producto));
        when(subcategoriaProductoServiceMock.obtenerPorId(10L)).thenReturn(subcategoriaDTO);
        when(modelMapperMock.map(producto, ProductoDTO.class)).thenReturn(productoDTO);

        ProductoDTO resultado = servicio.obtenerPorId(id);

        assertNotNull(resultado);
        verify(repositorioMock).obtenerPorId(id);
        verify(subcategoriaProductoServiceMock).obtenerPorId(10L);
        verify(modelMapperMock).map(producto, ProductoDTO.class);
    }

    @Test
    void obtenerPorId_deberiaLanzarExcepcion_siNoExiste() {
        Long id = 99L;
        when(repositorioMock.obtenerPorId(id)).thenReturn(Optional.empty());

        EntityNotFoundException ex = assertThrows(EntityNotFoundException.class,
                () -> servicio.obtenerPorId(id));
        assertEquals("Producto no encontrado", ex.getMessage());

        verify(repositorioMock).obtenerPorId(id);
        verifyNoInteractions(subcategoriaProductoServiceMock);
        verifyNoInteractions(modelMapperMock);
    }

    @Test
    void obtenerSimilares_deberiaRetornarListaDTO() {
        Long idProducto = 1L;
        Long idSubcategoria = 10L;

        Producto producto1 = new Producto();
        producto1.setId(2L);
        producto1.setTitulo("Producto 2");
        producto1.setPrecioOriginal(100);
        producto1.setPrecioActual(90);
        producto1.setCuotasSinInteres(3);
        producto1.setIdSubCategoria(idSubcategoria);

        Producto producto2 = new Producto();
        producto2.setId(3L);
        producto2.setTitulo("Producto 3");
        producto2.setPrecioOriginal(200);
        producto2.setPrecioActual(180);
        producto2.setCuotasSinInteres(6);
        producto2.setIdSubCategoria(idSubcategoria);

        when(repositorioMock.obtenerSubcategoria(idProducto)).thenReturn(Optional.of(idSubcategoria));
        when(repositorioMock.obtenerMismaSubcategoria(idProducto, idSubcategoria, 5))
                .thenReturn(List.of(producto1, producto2));

        ProductoRelacionadoDTO dto1 = new ProductoRelacionadoDTO();
        dto1.setTitulo("Producto 2");
        ProductoRelacionadoDTO dto2 = new ProductoRelacionadoDTO();
        dto2.setTitulo("Producto 3");

        when(modelMapperMock.map(producto1, ProductoRelacionadoDTO.class)).thenReturn(dto1);
        when(modelMapperMock.map(producto2, ProductoRelacionadoDTO.class)).thenReturn(dto2);

        MediaDTO mediaDTO = new MediaDTO();
        when(modelMapperMock.map(any(), eq(MediaDTO.class))).thenReturn(mediaDTO);

        producto1.setMedia(List.of(new com.ilanmk.challenge_BE.model.Media()));
        producto2.setMedia(List.of(new com.ilanmk.challenge_BE.model.Media()));

        List<ProductoRelacionadoDTO> resultados = servicio.obtenerSimilares(idProducto);

        assertEquals(2, resultados.size());
        verify(repositorioMock).obtenerSubcategoria(idProducto);
        verify(repositorioMock).obtenerMismaSubcategoria(idProducto, idSubcategoria, 5);
        verify(modelMapperMock, times(2)).map(any(Producto.class), eq(ProductoRelacionadoDTO.class));
        verify(modelMapperMock, times(2)).map(any(com.ilanmk.challenge_BE.model.Media.class), eq(MediaDTO.class));
    }


}
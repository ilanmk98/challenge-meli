package com.ilanmk.challenge_BE.service.impl;

import com.ilanmk.challenge_BE.model.DTO.ProductoDTO;
import com.ilanmk.challenge_BE.model.DTO.ProductoRelacionadoDTO;
import com.ilanmk.challenge_BE.model.Producto;
import com.ilanmk.challenge_BE.repository.ProductoRepository;
import com.ilanmk.challenge_BE.service.ProductoService;
import com.ilanmk.challenge_BE.service.SubcategoriaProductoService;
import jakarta.persistence.EntityNotFoundException;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductoServiceImpl implements ProductoService {
    private final ProductoRepository repositorio;
    private final ModelMapper modelMapper;
    private final SubcategoriaProductoService subcategoriaProductoService;
    private static final int CANTIDAD_PRODUCTOS_SIMILARES_MAXIMA = 5;

    public ProductoServiceImpl(ProductoRepository repositorio, ModelMapper modelMapper, SubcategoriaProductoService subcategoriaProductoService) {
        this.repositorio = repositorio;
        this.modelMapper = modelMapper;
        this.subcategoriaProductoService = subcategoriaProductoService;
    }

    @Override
    public ProductoDTO obtenerPorId(Long id) {
        return repositorio.obtenerPorId(id)
                .map(producto -> getProductoDTO(producto))
                .stream()
                .findFirst()
                .orElseThrow(() -> new EntityNotFoundException("Producto no encontrado"));
    }

    private ProductoDTO getProductoDTO(Producto producto) {
        ProductoDTO dto = modelMapper.map(producto, ProductoDTO.class);
        dto.setSubcategoria(subcategoriaProductoService.obtenerPorId(producto.getIdSubCategoria()));
        dto.setPorcentajeDescuento(calcularDescuento(producto.getPrecioOriginal(), producto.getPrecioActual()));
        return dto;
    }

    @Override
    public List<ProductoRelacionadoDTO> obtenerSimilares(Long id) {
        Long idSubcategoria = repositorio.obtenerSubcategoria(id).get();
        return repositorio.obtenerMismaSubcategoria(id,idSubcategoria,CANTIDAD_PRODUCTOS_SIMILARES_MAXIMA)
                .stream().map(producto->modelMapper.map(producto, ProductoRelacionadoDTO.class))
                .toList();
    }

    private int calcularDescuento(double precioOriginal, double precioActual){
        if (precioOriginal <= 0 || precioActual<=0) {
            return 0;
        }
        double descuento = ((precioOriginal - precioActual) / precioOriginal) * 100;
        return descuento<0 ? 0 : (int) Math.round(descuento);
    }
}

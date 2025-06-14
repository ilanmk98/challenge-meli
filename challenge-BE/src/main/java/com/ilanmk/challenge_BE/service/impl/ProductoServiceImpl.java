package com.ilanmk.challenge_BE.service.impl;

import com.ilanmk.challenge_BE.model.DTO.ProductoDTO;
import com.ilanmk.challenge_BE.repository.ProductoRepository;
import com.ilanmk.challenge_BE.service.ProductoService;
import com.ilanmk.challenge_BE.service.SubcategoriaProductoService;
import jakarta.persistence.EntityNotFoundException;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
@Service
public class ProductoServiceImpl implements ProductoService {
    private final ProductoRepository repositorio;
    private final ModelMapper modelMapper;
    private final SubcategoriaProductoService subcategoriaProductoService;

    public ProductoServiceImpl(ProductoRepository repositorio, ModelMapper modelMapper, SubcategoriaProductoService subcategoriaProductoService) {
        this.repositorio = repositorio;
        this.modelMapper = modelMapper;
        this.subcategoriaProductoService = subcategoriaProductoService;
    }

    @Override
    public ProductoDTO obtenerPorId(Long id) {
        return repositorio.obtenerPorId(id)
                .map(producto ->
                        {
                            ProductoDTO dto = modelMapper.map(producto, ProductoDTO.class);
                            dto.setSubcategoria(subcategoriaProductoService.obtenerPorId(producto.getIdSubCategoria()));
                            return dto;
                        }
                ).stream().findFirst()
                .orElseThrow(() -> new EntityNotFoundException("Producto no encontrado"));
    }
}

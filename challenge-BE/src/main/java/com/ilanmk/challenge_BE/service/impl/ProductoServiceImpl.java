package com.ilanmk.challenge_BE.service.impl;

import com.ilanmk.challenge_BE.model.DTO.ProductoDTO;
import com.ilanmk.challenge_BE.repository.productoRepository;
import com.ilanmk.challenge_BE.service.productoService;
import jakarta.persistence.EntityNotFoundException;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
@Service
public class ProductoServiceImpl implements productoService {
    private final productoRepository repositorio;
    private final ModelMapper modelMapper;

    public ProductoServiceImpl(productoRepository repositorio, ModelMapper modelMapper) {
        this.repositorio = repositorio;
        this.modelMapper = modelMapper;
    }

    @Override
    public ProductoDTO obtenerPorId(Long id) {
        return repositorio.obtenerPorId(id)
                .map(producto -> modelMapper.map(producto, ProductoDTO.class))
                .orElseThrow(() -> new EntityNotFoundException("Producto no encontrado"));
    }
}

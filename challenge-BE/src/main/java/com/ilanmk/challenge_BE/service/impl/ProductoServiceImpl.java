package com.ilanmk.challenge_BE.service.impl;

import com.ilanmk.challenge_BE.model.DTO.ProductoDTO;
import com.ilanmk.challenge_BE.repository.ProductoRepository;
import com.ilanmk.challenge_BE.service.ProductoService;
import jakarta.persistence.EntityNotFoundException;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
@Service
public class ProductoServiceImpl implements ProductoService {
    private final ProductoRepository repositorio;
    private final ModelMapper modelMapper;

    public ProductoServiceImpl(ProductoRepository repositorio, ModelMapper modelMapper) {
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

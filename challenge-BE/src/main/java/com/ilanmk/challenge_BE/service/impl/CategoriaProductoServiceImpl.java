package com.ilanmk.challenge_BE.service.impl;

import com.ilanmk.challenge_BE.exception.EntityNotFoundException;
import com.ilanmk.challenge_BE.model.DTO.CategoriaProductoDTO;
import com.ilanmk.challenge_BE.repository.CategoriaProductoRepository;
import com.ilanmk.challenge_BE.service.CategoriaProductoService;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

@Service
public class CategoriaProductoServiceImpl implements CategoriaProductoService {
    private final CategoriaProductoRepository repositorio;
    private final ModelMapper modelMapper;

    public CategoriaProductoServiceImpl(CategoriaProductoRepository repositorio,ModelMapper modelMapper){
        this.repositorio = repositorio;
        this.modelMapper = modelMapper;
    }
    @Override
    public CategoriaProductoDTO obtenerPorId(Long id){
        return repositorio.obtenerPorId(id)
                .map(categoria->modelMapper.map(categoria,CategoriaProductoDTO.class))
                .orElseThrow(()->new EntityNotFoundException("Categoria no encontrada"));
    }
}

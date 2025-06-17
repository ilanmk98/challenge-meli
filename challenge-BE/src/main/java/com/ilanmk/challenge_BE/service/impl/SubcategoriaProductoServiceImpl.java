package com.ilanmk.challenge_BE.service.impl;

import com.ilanmk.challenge_BE.exception.EntityNotFoundException;
import com.ilanmk.challenge_BE.model.DTO.SubcategoriaProductoDTO;
import com.ilanmk.challenge_BE.repository.SubcategoriaProductoRepository;
import com.ilanmk.challenge_BE.service.CategoriaProductoService;
import com.ilanmk.challenge_BE.service.SubcategoriaProductoService;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

@Service
public class SubcategoriaProductoServiceImpl implements SubcategoriaProductoService {
    private final SubcategoriaProductoRepository repositorio;
    private final ModelMapper modelMapper;
    private final CategoriaProductoService categoriaProductoService;

    public SubcategoriaProductoServiceImpl(SubcategoriaProductoRepository repositorio, ModelMapper modelMapper,CategoriaProductoService categoriaProductoService){
        this.repositorio = repositorio;
        this.modelMapper = modelMapper;
        this.categoriaProductoService = categoriaProductoService;
    }
    @Override
    public SubcategoriaProductoDTO obtenerPorId(Long id){
        return repositorio.obtenerPorId(id)
                .map(subcategoria->{
                   SubcategoriaProductoDTO dto = modelMapper.map(subcategoria,SubcategoriaProductoDTO.class);
                    dto.setCategoria(categoriaProductoService.obtenerPorId(subcategoria.getCategoriaId()));
                    return dto;
                })
                .orElseThrow(()->new EntityNotFoundException("Subcategoria no encontrada"));
    }
}

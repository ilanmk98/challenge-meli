package com.ilanmk.challenge_BE.service.impl;

import com.ilanmk.challenge_BE.model.DTO.VendedorDTO;
import com.ilanmk.challenge_BE.repository.VendedorRepository;
import com.ilanmk.challenge_BE.service.VendedorService;
import jakarta.persistence.EntityNotFoundException;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

@Service
public class VendedorServiceImpl implements VendedorService {
    private final VendedorRepository repositorio;
    private final ModelMapper modelMapper;

    public VendedorServiceImpl(VendedorRepository repositorio, ModelMapper modelMapper){
        this.repositorio = repositorio;
        this.modelMapper = modelMapper;
    }
    @Override
    public VendedorDTO obtenerPorId(Long id) {
        return repositorio.obtenerPorId(id)
                .map(vendedor->modelMapper.map(vendedor,VendedorDTO.class))
                .orElseThrow(() -> new EntityNotFoundException("Vendedor no encontrado"));
    }
}

package com.ilanmk.challenge_BE.service.impl;

import com.ilanmk.challenge_BE.model.DTO.MedioPagoDTO;
import com.ilanmk.challenge_BE.model.MedioDePago;
import com.ilanmk.challenge_BE.repository.MedioDePagoRepository;
import com.ilanmk.challenge_BE.service.CategoriaMedioPagoService;
import com.ilanmk.challenge_BE.service.MedioDePagoService;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class MedioDePagoServiceImpl implements MedioDePagoService {
    private final MedioDePagoRepository repositorio;
    private final ModelMapper modelMapper;
    private final CategoriaMedioPagoService categoriaMedioPagoService;

    public MedioDePagoServiceImpl(MedioDePagoRepository repositorio, ModelMapper modelMapper,CategoriaMedioPagoService categoriaMedioPagoService){
        this.repositorio = repositorio;
        this.modelMapper = modelMapper;
        this.categoriaMedioPagoService = categoriaMedioPagoService;
    }
    @Override
    public List<MedioPagoDTO> listarTodos() {
        List<MedioDePago> mediosDePago = repositorio.obtenerTodos();
        return mediosDePago.stream().map(medioDePago->obtenerMedioPagoDTO(medioDePago)).toList();
    }

    private MedioPagoDTO obtenerMedioPagoDTO(MedioDePago medioDePago) {
        MedioPagoDTO dto = modelMapper.map(medioDePago,MedioPagoDTO.class);
        String categoriaNombre = categoriaMedioPagoService.obtenerNombrePorId(medioDePago.getCategoriaId());
        dto.setCategoriaNombre(categoriaNombre);
        return dto;
    }
}

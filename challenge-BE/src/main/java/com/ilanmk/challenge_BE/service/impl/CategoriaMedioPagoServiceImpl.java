package com.ilanmk.challenge_BE.service.impl;

import com.ilanmk.challenge_BE.exception.EntityNotFoundException;
import com.ilanmk.challenge_BE.repository.CategoriaMedioPagoRepository;
import com.ilanmk.challenge_BE.service.CategoriaMedioPagoService;
import org.springframework.stereotype.Service;

@Service
public class CategoriaMedioPagoServiceImpl implements CategoriaMedioPagoService {
    private final CategoriaMedioPagoRepository repositorio;

    public CategoriaMedioPagoServiceImpl(CategoriaMedioPagoRepository repositorio){
        this.repositorio = repositorio;
    }
    @Override
    public String obtenerNombrePorId(Long id) {
        return repositorio.obtenerNombrePorId(id)
                .orElseThrow(()-> new EntityNotFoundException("Categoria de medio de pago no encontrada"));
    }
}

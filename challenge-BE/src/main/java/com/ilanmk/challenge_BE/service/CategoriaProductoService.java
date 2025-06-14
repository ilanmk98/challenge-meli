package com.ilanmk.challenge_BE.service;

import com.ilanmk.challenge_BE.model.DTO.CategoriaProductoDTO;

public interface CategoriaProductoService {
    CategoriaProductoDTO obtenerPorId(Long id);
}

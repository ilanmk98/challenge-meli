package com.ilanmk.challenge_BE.service;

import com.ilanmk.challenge_BE.model.DTO.ProductoDTO;


public interface productoService {
        ProductoDTO obtenerPorId(Long id);
}

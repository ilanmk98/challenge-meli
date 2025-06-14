package com.ilanmk.challenge_BE.service;

import com.ilanmk.challenge_BE.model.DTO.ProductoDTO;

import java.util.List;


public interface ProductoService {
    ProductoDTO obtenerPorId(Long id);
    List<ProductoDTO> obtenerSimilares(Long id);

}

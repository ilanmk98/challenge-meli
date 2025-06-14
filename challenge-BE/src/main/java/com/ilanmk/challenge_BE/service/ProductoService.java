package com.ilanmk.challenge_BE.service;

import com.ilanmk.challenge_BE.model.DTO.ProductoDTO;
import com.ilanmk.challenge_BE.model.DTO.ProductoRelacionadoDTO;

import java.util.List;


public interface ProductoService {
    ProductoDTO obtenerPorId(Long id);
    List<ProductoRelacionadoDTO> obtenerSimilares(Long id);

}

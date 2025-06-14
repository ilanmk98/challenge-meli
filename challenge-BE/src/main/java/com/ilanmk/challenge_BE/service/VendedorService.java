package com.ilanmk.challenge_BE.service;

import com.ilanmk.challenge_BE.model.DTO.VendedorDTO;

public interface VendedorService {
    VendedorDTO obtenerPorId(Long id);
}

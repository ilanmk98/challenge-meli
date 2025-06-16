package com.ilanmk.challenge_BE.controller;

import com.ilanmk.challenge_BE.model.DTO.VendedorDTO;
import com.ilanmk.challenge_BE.service.VendedorService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/vendedores")
public class VendedorController {
    private final VendedorService vendedorService;
    public VendedorController(VendedorService vendedorService){
        this.vendedorService = vendedorService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<VendedorDTO> obtenerPorId(@PathVariable Long id){
        return ResponseEntity.ok(vendedorService.obtenerPorId(id));
    }
}

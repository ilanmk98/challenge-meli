package com.ilanmk.challenge_BE.controller;

import com.ilanmk.challenge_BE.model.DTO.ProductoDTO;
import com.ilanmk.challenge_BE.service.productoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/producto")
public class productoController {

    private final productoService productoService;

    public productoController(productoService productoService) {
        this.productoService = productoService;
    }
    @GetMapping("/{id}")
    public ResponseEntity<ProductoDTO> obtenerPorId(@PathVariable Long id){
        return ResponseEntity.ok(productoService.obtenerPorId(id));
    }
}

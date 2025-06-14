package com.ilanmk.challenge_BE.controller;

import com.ilanmk.challenge_BE.model.DTO.ProductoDTO;
import com.ilanmk.challenge_BE.model.DTO.ProductoRelacionadoDTO;
import com.ilanmk.challenge_BE.service.ProductoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/producto")
public class ProductoController {

    private final ProductoService productoService;

    public ProductoController(ProductoService productoService) {
        this.productoService = productoService;
    }
    @GetMapping("/{id}")
    public ResponseEntity<ProductoDTO> obtenerPorId(@PathVariable Long id){
        return ResponseEntity.ok(productoService.obtenerPorId(id));
    }
    @GetMapping("/relacionados/{id}")
    public ResponseEntity<List<ProductoRelacionadoDTO>> obtenerRelacionados(@PathVariable Long id){
        return ResponseEntity.ok(productoService.obtenerSimilares(id));
    }
}

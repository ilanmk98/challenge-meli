package com.ilanmk.challenge_BE.controller;

import com.ilanmk.challenge_BE.model.DTO.VendedorDTO;
import com.ilanmk.challenge_BE.service.VendedorService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
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

    @Operation(
            summary = "Obtiene un VendedorDTO por ID",
            description = "Devuelve un VendedorDTO en caso de que exista un vendedor con el ID ingresado.",
            responses = {@ApiResponse(responseCode = "200", description = "Vendedor encontrado"),
                    @ApiResponse(responseCode = "404", description = "Vendedor no encontrado")}
    )
    @GetMapping("/{id}")
    public ResponseEntity<VendedorDTO> obtenerPorId(@PathVariable Long id){
        return ResponseEntity.ok(vendedorService.obtenerPorId(id));
    }
}

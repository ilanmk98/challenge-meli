package com.ilanmk.challenge_BE.controller;

import com.ilanmk.challenge_BE.model.DTO.ProductoDTO;
import com.ilanmk.challenge_BE.model.DTO.ProductoRelacionadoDTO;
import com.ilanmk.challenge_BE.service.ProductoService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/productos")
public class ProductoController {

    private final ProductoService productoService;

    public ProductoController(ProductoService productoService) {
        this.productoService = productoService;
    }

    @Operation(
            summary = "Obtener un productoDTO por ID",
            description = "Devuelve un productoDTO si existe un producto para el ID proporcionado",
            responses = {@ApiResponse(responseCode = "200", description = "Producto encontrado"),
                        @ApiResponse(responseCode = "404", description = "Producto no encontrado")}
    )
    @GetMapping("/{id}")
    public ResponseEntity<ProductoDTO> obtenerPorId(@PathVariable Long id){
        return ResponseEntity.ok(productoService.obtenerPorId(id));
    }

    @Operation(
            summary = "Obteniene todos los productos relacionados segun el ID del producto proporcionado",
            description = "Devuelve una lista de ProductoRelacionadoDTO",
            responses = {@ApiResponse(responseCode = "200", description = "Producto encontrado"),
                    @ApiResponse(responseCode = "404", description = "Producto no encontrado")}
    )
    @GetMapping("/{id}/relacionados")
    public ResponseEntity<List<ProductoRelacionadoDTO>> obtenerRelacionados(@PathVariable Long id){
        return ResponseEntity.ok(productoService.obtenerSimilares(id));
    }
}

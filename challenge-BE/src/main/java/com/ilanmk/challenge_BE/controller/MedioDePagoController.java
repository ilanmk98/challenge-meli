package com.ilanmk.challenge_BE.controller;

import com.ilanmk.challenge_BE.model.DTO.MedioPagoDTO;
import com.ilanmk.challenge_BE.service.MedioDePagoService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/medios-pago")
public class MedioDePagoController {
    private final MedioDePagoService medioDePagoService;

    public MedioDePagoController (MedioDePagoService medioDePagoService){
        this.medioDePagoService = medioDePagoService;
    }
    @Operation(
            summary = "Obteniene todos los medios de pago disponibles",
            description = "Devuelve una lista de MedioPagoDTO",
            responses = @ApiResponse(responseCode = "200")
    )
    @GetMapping
    public ResponseEntity<List<MedioPagoDTO>> listarTodos(){
        return ResponseEntity.ok(medioDePagoService.listarTodos());
    }


}

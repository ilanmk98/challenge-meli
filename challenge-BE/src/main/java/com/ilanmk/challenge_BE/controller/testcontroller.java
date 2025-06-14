package com.ilanmk.challenge_BE.controller;

import com.ilanmk.challenge_BE.model.Producto;
import com.ilanmk.challenge_BE.repository.RepositorioEnMemoria;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class testcontroller {

    @Autowired
    RepositorioEnMemoria repositorio;

    @GetMapping("/get")
    public List<Producto> get(){
        return repositorio.obtenerProductos();
    }
}

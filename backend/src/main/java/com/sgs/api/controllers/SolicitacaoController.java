package com.sgs.api.controllers;

import com.sgs.api.projections.SolicitacaoProjection;
import com.sgs.api.services.SolicitacaoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/solicitacoes")
public class SolicitacaoController {

    @Autowired
    private SolicitacaoService service;

    @GetMapping
    public ResponseEntity<List<SolicitacaoProjection>> listar(
            @RequestParam(required = false) String status,
            @RequestParam(required = false) Long   categoriaId,
            @RequestParam(required = false) String dataInicio,
            @RequestParam(required = false) String dataFim) {

        return ResponseEntity.ok(service.listar(status, categoriaId, dataInicio, dataFim));
    }
}

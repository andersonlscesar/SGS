package com.sgs.api.controllers;

import com.sgs.api.dto.SolicitacaoDTO;
import com.sgs.api.dto.SolicitacaoReqDTO;
import com.sgs.api.dto.SolicitacaoUpdateDTO;
import com.sgs.api.projections.SolicitacaoProjection;
import com.sgs.api.services.SolicitacaoService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    @GetMapping("/{id}")
    public ResponseEntity<SolicitacaoDTO> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(service.buscarPorId(id));
    }

    @PostMapping
    public ResponseEntity<SolicitacaoDTO> cadastrar(@RequestBody @Valid SolicitacaoReqDTO dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.salvar(dto));
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<SolicitacaoDTO> atualizarStatus(
            @PathVariable Long id,
            @RequestParam String novoStatus) {

        return ResponseEntity.ok(service.atualizarStatus(id, novoStatus));
    }

    @PutMapping("/{id}")
    public ResponseEntity<SolicitacaoDTO> atualizar(
            @PathVariable Long id,
            @RequestBody @Valid SolicitacaoUpdateDTO dto) {

        return ResponseEntity.ok(service.atualizar(id, dto));
    }
}

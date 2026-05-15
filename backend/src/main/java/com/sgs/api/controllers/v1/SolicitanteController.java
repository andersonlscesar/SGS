package com.sgs.api.controllers.v1;

import com.sgs.api.dto.SolicitanteDTO;
import com.sgs.api.services.SolicitanteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("v1/solicitantes")
public class SolicitanteController {

  @Autowired
  private SolicitanteService solicitanteService;

  @GetMapping
  public ResponseEntity<List<SolicitanteDTO>> listar(@RequestParam(required = false) String nome, @RequestParam(required = false) String cpfCnpj) {
    return ResponseEntity.ok(solicitanteService.buscar(nome, cpfCnpj));
  }

  @GetMapping("/{id}")
  public ResponseEntity<SolicitanteDTO> buscarPorId(@PathVariable Long id) {
    return ResponseEntity.ok(solicitanteService.buscarPorId(id));
  }



}

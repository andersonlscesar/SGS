package com.sgs.api.services;

import com.sgs.api.dto.SolicitanteDTO;
import com.sgs.api.entities.Solicitante;
import com.sgs.api.exceptions.ResourceNotFoundException;
import com.sgs.api.repositories.SolicitanteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class SolicitanteService {

  @Autowired
  private SolicitanteRepository solicitanteRepo;

//  public List<SolicitanteDTO> listar() {
//    return solicitanteRepo.findAll().stream().map(SolicitanteDTO::new).collect(Collectors.toList());
//  }

  public SolicitanteDTO buscarPorId(Long id) {
    Solicitante solicitante = solicitanteRepo.findById(id).orElseThrow(() -> new ResourceNotFoundException("Solicitante não encontrado"));
    return new SolicitanteDTO(solicitante);
  }

  public List<SolicitanteDTO> buscar(String nome, String cpfCnpj) {

    // ambos
    if (nome != null && cpfCnpj != null) {
      return solicitanteRepo.findByNomeContainingIgnoreCaseAndCpfCnpjContaining(nome, cpfCnpj)
        .stream()
        .map(SolicitanteDTO::new)
        .collect(Collectors.toList());
    }

    // Somente nome
    if (nome != null) {
      return solicitanteRepo.findByNomeContainingIgnoreCase(nome)
        .stream()
        .map(SolicitanteDTO::new)
        .collect(Collectors.toList());
    }

    // Somente CPF / CNPJ

    if (cpfCnpj != null) {
      return solicitanteRepo.findByCpfCnpj(cpfCnpj)
        .map(s -> List.of(new SolicitanteDTO(s)))
        .orElseThrow(() -> new ResourceNotFoundException("Solicitante não encontrado"));
    }
    return solicitanteRepo.findAll()
      .stream()
      .map(SolicitanteDTO::new)
      .collect(Collectors.toList());
  }



}

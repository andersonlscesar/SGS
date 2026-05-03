package com.sgs.api.dto;

import com.sgs.api.entities.Solicitante;

public class SolicitanteDTO {

  private Long id;
  private String nome;
  private String cpfCnpj;

  public SolicitanteDTO(Solicitante solicitante) {
    this.id       = solicitante.getId();
    this.nome     = solicitante.getNome();
    this.cpfCnpj  = solicitante.getCpfCnpj();
  }

  public Long getId() {
    return id;
  }

  public String getNome() {
    return nome;
  }

  public String getCpfCnpj() {
    return cpfCnpj;
  }
}

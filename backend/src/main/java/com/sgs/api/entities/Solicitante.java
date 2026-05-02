package com.sgs.api.entities;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "solicitantes")
public class Solicitante {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(nullable = false, length = 100)
  private String nome;

  @Column(unique = true, nullable = false, length = 18)
  private String cpfCnpj;

  @OneToMany(mappedBy = "solicitante")
  private List<Solicitacao> solicitacoes = new ArrayList<>();

  public Solicitante(Long id, String nome, String cpfCnpj) {
    this.id       = id;
    this.nome     = nome;
    this.cpfCnpj  = cpfCnpj;
  }

  public Long getId() {
    return id;
  }

  public void setNome(String nome) {
    this.nome = nome;
  }

  public String getNome() {
    return nome;
  }

  public String getCpfCnpj() {
    return cpfCnpj;
  }

  public void SetCpfCnpj(String cpfCnpj) {
    this.cpfCnpj = cpfCnpj;
  }

  public List<Solicitacao> getSolicitacoes() {
    return solicitacoes;
  }

  public void setSolicitacoes(List<Solicitacao> solicitacoes) {
    this.solicitacoes = solicitacoes;
  }
}

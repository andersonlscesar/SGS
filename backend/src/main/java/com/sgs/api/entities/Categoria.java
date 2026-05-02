package com.sgs.api.entities;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "categorias")
public class Categoria {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(nullable = false, length = 100)
  private String nome;

  @OneToMany(mappedBy = "categoria")
  private List<Solicitacao> solicitacoes = new ArrayList<>();


  public Categoria(Long id, String nome) {
    this.id   = id;
    this.nome = nome;
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

  public List<Solicitacao> getSolicitacoes() {
    return solicitacoes;
  }

  public void setSolicitacoes(List<Solicitacao> solicitacoes) {
    this.solicitacoes = solicitacoes;
  }
}

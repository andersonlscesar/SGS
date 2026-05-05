package com.sgs.api.entities;


import com.sgs.api.enums.Status;
import jakarta.persistence.*;


import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "solicitacoes")
public class Solicitacao {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(nullable = false, length = 255)
  private String descricao;

  @Column(nullable = false)
  private BigDecimal valor;

  @Column(nullable = false)
  private LocalDate dataSolicitacao;

  @Enumerated(EnumType.STRING)
  @Column(nullable = false, columnDefinition = "solic_types")
  private Status status;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "solicitante_id", nullable = false)
  private Solicitante solicitante;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "categoria_id", nullable = false)
  private Categoria categoria;

  public Solicitacao() {}

  public Solicitacao(Long id, String descricao, BigDecimal valor, LocalDate dataSolicitacao, Status status, Solicitante solicitante, Categoria categoria) {
    this.id               = id;
    this.descricao        = descricao;
    this.valor            = valor;
    this.dataSolicitacao  = dataSolicitacao;
    this.status           = status;
    this.solicitante      = solicitante;
    this.categoria        = categoria;
  }

  public Long getId() {
    return id;
  }

  public String getDescricao() {
    return descricao;
  }

  public void setDescricao(String descricao) {
    this.descricao = descricao;
  }

  public BigDecimal getValor() {
    return valor;
  }

  public void setValor(BigDecimal valor) {
    this.valor = valor;
  }

  public Status getStatus() {
    return status;
  }

  public void setStatus(Status status) {
    this.status = status;
  }

  public LocalDate getDataSolicitacao() {
    return dataSolicitacao;
  }

  public void setDataSolicitacao(LocalDate dataSolicitacao) {
    this.dataSolicitacao = dataSolicitacao;
  }

  public Categoria getCategoria() {
    return categoria;
  }

  public void setCategoria(Categoria categoria) {
    this.categoria = categoria;
  }

  public Solicitante getSolicitante() {
    return solicitante;
  }

  public void setSolicitante(Solicitante solicitante) {
    this.solicitante = solicitante;
  }

}

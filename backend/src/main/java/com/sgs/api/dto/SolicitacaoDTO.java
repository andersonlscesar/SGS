package com.sgs.api.dto;

import com.sgs.api.entities.Solicitacao;

import java.math.BigDecimal;
import java.time.LocalDate;

public class SolicitacaoDTO {

    private Long id;
    private String descricao;
    private BigDecimal valor;
    private LocalDate dataSolicitacao;
    private String status;
    private String nomeSolicitante;
    private String documentoSolicitante;
    private String nomeCategoria;
    private Long categoriaId;
    private Long solicitanteId;

    public SolicitacaoDTO(Solicitacao s) {
        this.id                   = s.getId();
        this.descricao            = s.getDescricao();
        this.valor                = s.getValor();
        this.dataSolicitacao      = s.getDataSolicitacao();
        this.status               = s.getStatus().name();
        this.nomeSolicitante      = s.getSolicitante().getNome();
        this.documentoSolicitante = s.getSolicitante().getCpfCnpj();
        this.nomeCategoria        = s.getCategoria().getNome();
        this.categoriaId          = s.getCategoria().getId();
        this.solicitanteId        = s.getSolicitante().getId();

    }

    public Long getId() { return id; }
    public String getDescricao() { return descricao; }
    public BigDecimal getValor() { return valor; }
    public LocalDate getDataSolicitacao() { return dataSolicitacao; }
    public String getStatus() { return status; }
    public String getNomeSolicitante() { return nomeSolicitante; }
    public String getDocumentoSolicitante() { return documentoSolicitante; }
    public String getNomeCategoria() { return nomeCategoria; }
    public Long getCategoriaId() { return categoriaId; }
    public Long getSolicitanteId() { return solicitanteId; }
}





package com.sgs.api.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

import java.math.BigDecimal;

public class SolicitacaoReqDTO {

    @NotBlank(message = "Descrição é obrigatória")
    private String descricao;

    @NotNull(message = "O valor é obrigatório")
    @Positive(message = "O valor deve ser maior que zero")
    private BigDecimal valor;

    @NotNull(message = "Solicitante é obrigatório")
    @Positive(message = "Selecione um solicitante")
    private Long solicitanteId;

    @NotNull(message = "Categoria é obrigatória")
    @Positive(message = "Selecione uma categoria")
    private Long categoriaId;

    public SolicitacaoReqDTO() {}

    public String getDescricao() { return descricao; }
    public BigDecimal getValor() { return valor; }
    public Long getSolicitanteId() { return solicitanteId; }
    public Long getCategoriaId() { return categoriaId; }
}

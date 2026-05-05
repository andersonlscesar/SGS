package com.sgs.api.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

import java.math.BigDecimal;

public class SolicitacaoReqDTO {

    @NotBlank(message = "Descrição é obrigatória")
    private String descricao;

    @NotNull(message = "O valor é obrigatório")
    @Positive(message = "O valor deve ser positivo")
    private BigDecimal valor;

    @NotNull(message = "Solicitante é obrigatório")
    private Long solicitanteId;

    @NotNull(message = "Categoria é obrigatória")
    private Long categoriaId;

    public SolicitacaoReqDTO() {}

    public String getDescricao() { return descricao; }
    public BigDecimal getValor() { return valor; }
    public Long getSolicitanteId() { return solicitanteId; }
    public Long getCategoriaId() { return categoriaId; }
}

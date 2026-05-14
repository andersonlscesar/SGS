package com.sgs.api.projections;

import java.math.BigDecimal;
import java.time.LocalDate;

public interface SolicitacaoProjection {

    Long getId();
    String getDescricao();
    BigDecimal getValor();
    LocalDate getDataSolicitacao();
    String getStatus();
    String getNomeSolicitante();
    String getDocumentoSolicitante();
    String getNomeCategoria();
    Long getCategoriaId();
    Long getSolicitanteId();

}

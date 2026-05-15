package com.sgs.api.repositories;

import com.sgs.api.entities.Solicitacao;
import com.sgs.api.projections.SolicitacaoProjection;
import com.sgs.api.queries.SolicitacaoQueries;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@Repository
public interface SolicitacaoRepository extends JpaRepository<Solicitacao, Long> {

    @Query(value = SolicitacaoQueries.LISTAR_COM_FILTROS, nativeQuery = true)
    List<SolicitacaoProjection> listarComFiltros(
            @Param("status")      String status,
            @Param("categoriaId") Long categoriaId,
            @Param("dataInicio")  String dataInicio,
            @Param("dataFim")     String dataFim
    );

    @Query(value = SolicitacaoQueries.BUSCAR_POR_ID, nativeQuery = true)
    Optional<SolicitacaoProjection> buscarPorId(@Param("id") Long id);

    @Modifying
    @Transactional
    @Query(value = SolicitacaoQueries.ATUALIZAR_STATUS, nativeQuery = true)
    void atualizarStatus(@Param("id") Long id, @Param("status") String status);

    @Modifying
    @Transactional
    @Query(value = SolicitacaoQueries.ATUALIZAR, nativeQuery = true)
    void atualizar(
            @Param("id")          Long id,
            @Param("descricao")   String descricao,
            @Param("valor")       BigDecimal valor,
            @Param("categoriaId") Long categoriaId
    );

}

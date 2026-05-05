package com.sgs.api.repositories;

import com.sgs.api.entities.Solicitacao;
import com.sgs.api.projections.SolicitacaoProjection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SolicitacaoRepository extends JpaRepository<Solicitacao, Long> {

    @Query(value = """
            SELECT
                s.id,
                s.descricao,
                s.valor,
                s.data_solicitacao,
                s.status,
                sol.nome        AS nome_solicitante,
                sol.cpf_cnpj    AS documento_solicitante,
                cat.nome        AS nome_categoria
            FROM solicitacoes s
            JOIN solicitantes sol ON sol.id = s.solicitante_id
            JOIN categorias cat ON cat.id = s.categoria_id
            WHERE (:status IS NULL OR s.status = :status)
                AND (:categoriaId IS NULL OR s.categoria_id = :categoriaId)
                AND (:dataInicio IS NULL OR s.data_solicitacao >= CAST(:dataInicio AS DATE))
                AND (:dataFim IS NULL OR s.data_solicitacao <=  CAST(:dataFim AS DATE))
                ORDER BY s.data_solicitacao DESC
            """, nativeQuery = true)
    List<SolicitacaoProjection> listarComFiltros(
            @Param("status")        String status,
            @Param("categoriaId")   Long categoriaId,
            @Param("dataInicio")    String dataInicio,
            @Param("dataFim")       String dataFim
    );

}

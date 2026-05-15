package com.sgs.api.queries;

// repositories/SolicitacaoQueries.java
public class SolicitacaoQueries {

    public static final String LISTAR_COM_FILTROS =
            "SELECT " +
                    "    s.id, " +
                    "    s.descricao, " +
                    "    s.valor, " +
                    "    s.data_solicitacao, " +
                    "    s.status, " +
                    "    sol.nome        AS nome_solicitante, " +
                    "    sol.cpf_cnpj    AS documento_solicitante, " +
                    "    cat.nome        AS nome_categoria, " +
                    "    cat.id          AS categoria_id, " +
                    "    sol.id          AS solicitante_id " +
                    "FROM solicitacoes s " +
                    "JOIN solicitantes sol ON sol.id = s.solicitante_id " +
                    "JOIN categorias cat ON cat.id = s.categoria_id " +
                    "WHERE (:status IS NULL OR s.status = :status) " +
                    "    AND (:categoriaId IS NULL OR s.categoria_id = :categoriaId) " +
                    "    AND (:dataInicio IS NULL OR s.data_solicitacao >= CAST(:dataInicio AS DATE)) " +
                    "    AND (:dataFim IS NULL OR s.data_solicitacao <= CAST(:dataFim AS DATE)) " +
                    "ORDER BY s.id DESC";

    public static final String BUSCAR_POR_ID =
            "SELECT " +
                    "    s.id, " +
                    "    s.descricao, " +
                    "    s.valor, " +
                    "    s.data_solicitacao, " +
                    "    s.status, " +
                    "    sol.nome        AS nome_solicitante, " +
                    "    sol.cpf_cnpj    AS documento_solicitante, " +
                    "    cat.nome        AS nome_categoria, " +
                    "    cat.id          AS categoria_id, " +
                    "    sol.id          AS solicitante_id " +
                    "FROM solicitacoes s " +
                    "JOIN solicitantes sol ON sol.id = s.solicitante_id " +
                    "JOIN categorias cat ON cat.id = s.categoria_id " +
                    "WHERE s.id = :id";

    public static final String ATUALIZAR_STATUS =
            "UPDATE solicitacoes " +
                    "SET status = :status " +
                    "WHERE id = :id";

    public static final String ATUALIZAR =
            "UPDATE solicitacoes " +
                    "SET descricao    = :descricao, " +
                    "    valor        = :valor, " +
                    "    categoria_id = :categoriaId " +
                    "WHERE id = :id";
}
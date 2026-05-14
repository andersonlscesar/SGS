package com.sgs.api.services;

import com.sgs.api.dto.SolicitacaoDTO;
import com.sgs.api.dto.SolicitacaoReqDTO;
import com.sgs.api.dto.SolicitacaoUpdateDTO;
import com.sgs.api.entities.Categoria;
import com.sgs.api.entities.Solicitacao;
import com.sgs.api.entities.Solicitante;
import com.sgs.api.enums.Status;
import com.sgs.api.exceptions.ResourceNotFoundException;
import com.sgs.api.projections.SolicitacaoProjection;
import com.sgs.api.repositories.CategoriaRepository;
import com.sgs.api.repositories.SolicitacaoRepository;
import com.sgs.api.repositories.SolicitanteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class SolicitacaoService {
    @Autowired
    private SolicitacaoRepository solicitacaoRepo;

    @Autowired
    private SolicitanteRepository solicitanteRepo;

    @Autowired
    private CategoriaRepository categoriaRepo;

    public List<SolicitacaoProjection> listar(
            String status, Long categoriaId,
            String dataInicio, String dataFim
    ) {
        return solicitacaoRepo.listarComFiltros(status, categoriaId, dataInicio, dataFim);
    }


    public SolicitacaoProjection buscarPorId(Long id) {
        return solicitacaoRepo.buscarPorId(id)
                .orElseThrow(() -> new ResourceNotFoundException("Solicitação não encontrada"));
    }

    // Cadastro

    public SolicitacaoDTO salvar(SolicitacaoReqDTO dto) {

        Solicitante solicitante = solicitanteRepo.findById(dto.getSolicitanteId())
                .orElseThrow(() -> new ResourceNotFoundException("Solicitante não encontrado"));

        Categoria categoria = categoriaRepo.findById(dto.getCategoriaId())
                .orElseThrow(() -> new ResourceNotFoundException(("Categoria não encontrada")));

        Solicitacao solicitacao = new Solicitacao();
        solicitacao.setDescricao(dto.getDescricao());
        solicitacao.setValor(dto.getValor());
        solicitacao.setDataSolicitacao(LocalDate.now());
        solicitacao.setStatus(Status.SOLICITADO);
        solicitacao.setSolicitante(solicitante);
        solicitacao.setCategoria(categoria);

        return new SolicitacaoDTO(solicitacaoRepo.save(solicitacao));
    }



    public SolicitacaoProjection atualizarStatus(Long id, String novoStatus) {
        SolicitacaoProjection solicitacao = solicitacaoRepo.buscarPorId(id)
                .orElseThrow(() -> new ResourceNotFoundException("Solicitação não encontrada"));

        // Converte String para enum
        Status statusAtual = Status.valueOf(solicitacao.getStatus());
        Status statusNovo;

        try {
            statusNovo = Status.valueOf(novoStatus.toUpperCase());
        } catch (IllegalArgumentException e) {
            throw new IllegalArgumentException("Status inválido: " + novoStatus);
        }

        validarTransicao(statusAtual, statusNovo);

        solicitacaoRepo.atualizarStatus(id, statusNovo.name());
        return solicitacaoRepo.buscarPorId(id).orElseThrow();
    }


    private void validarTransicao(Status atual, Status novo) {
        boolean valida = switch (atual) {
            case SOLICITADO -> novo == Status.LIBERADO   || novo == Status.REJEITADO;
            case LIBERADO   -> novo == Status.APROVADO   || novo == Status.REJEITADO;
            case APROVADO   -> novo == Status.CANCELADO;
            case REJEITADO, CANCELADO -> false;
        };

        if (!valida) {
            throw new IllegalArgumentException(
                    "Transição de " + atual + " para " + novo + " não permitida"
            );
        }
    }



    public SolicitacaoProjection atualizar(Long id, SolicitacaoUpdateDTO dto) {
        SolicitacaoProjection solicitacao = solicitacaoRepo.buscarPorId(id)
                .orElseThrow(() -> new ResourceNotFoundException("Solicitação não encontrada"));

        // Converte String para enum antes de comparar
        Status statusAtual = Status.valueOf(solicitacao.getStatus());

        if (statusAtual == Status.APROVADO  ||
                statusAtual == Status.REJEITADO ||
                statusAtual == Status.CANCELADO) {
            throw new IllegalArgumentException(
                    "Não é possível editar uma solicitação com status: " + statusAtual
            );
        }

        categoriaRepo.findById(dto.getCategoriaId())
                .orElseThrow(() -> new ResourceNotFoundException("Categoria não encontrada"));

        solicitacaoRepo.atualizar(id, dto.getDescricao(), dto.getValor(), dto.getCategoriaId());
        return solicitacaoRepo.buscarPorId(id).orElseThrow();
    }

}

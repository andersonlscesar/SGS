package com.sgs.api.services;

import com.sgs.api.dto.SolicitacaoDTO;
import com.sgs.api.dto.SolicitacaoReqDTO;
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

    public SolicitacaoDTO buscarPorId(Long id) {
        Solicitacao solicitacao = solicitacaoRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Solicitação não encontrada"));
        return new SolicitacaoDTO(solicitacao);
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

}

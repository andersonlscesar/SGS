package com.sgs.api.services;

import com.sgs.api.dto.CategoriaDTO;
import com.sgs.api.dto.SolicitacaoDTO;
import com.sgs.api.entities.Categoria;
import com.sgs.api.entities.Solicitacao;
import com.sgs.api.exceptions.ResourceNotFoundException;
import com.sgs.api.projections.SolicitacaoProjection;
import com.sgs.api.repositories.CategoriaRepository;
import com.sgs.api.repositories.SolicitacaoRepository;
import com.sgs.api.repositories.SolicitanteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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

}

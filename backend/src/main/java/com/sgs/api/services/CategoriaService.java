package com.sgs.api.services;

import com.sgs.api.dto.CategoriaDTO;
import com.sgs.api.entities.Categoria;
import com.sgs.api.exceptions.ResourceNotFoundException;
import com.sgs.api.repositories.CategoriaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CategoriaService {

    @Autowired
    private CategoriaRepository categoriaRepo;

    public CategoriaDTO buscarPorId(Long id) {
        Categoria categoria = categoriaRepo.findById(id).orElseThrow(() -> new ResourceNotFoundException("Categoria não encontrada"));
        return new CategoriaDTO(categoria);
    }

    public List<CategoriaDTO> listar() {
        return categoriaRepo.findAll().stream().map(CategoriaDTO::new).collect(Collectors.toList());
    }
}

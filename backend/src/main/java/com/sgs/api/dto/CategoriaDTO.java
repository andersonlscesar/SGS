package com.sgs.api.dto;

import com.sgs.api.entities.Categoria;

public class CategoriaDTO {

    private Long id;
    private String nome;

    public CategoriaDTO(Categoria categoria) {
        this.id     = categoria.getId();;
        this.nome   = categoria.getNome();
    }

    public Long getId() {
        return id;
    }

    public String getNome() {
        return nome;
    }


}

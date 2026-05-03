package com.sgs.api.repositories;

import com.sgs.api.entities.Solicitante;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


@Repository
public interface SolicitanteRepository extends JpaRepository<Solicitante, Long> {
  // Busca por nome parcial e ignora maiúsculas/minúsculas
  List<Solicitante> findByNomeContainingIgnoreCase(String nome);

  // Busca exata por CPF/CNPJ
  Optional<Solicitante> findByCpfCnpj(String cpfCnpj);

  // Busca por nome E cpfCnpj ao mesmo tempo
  List<Solicitante> findByNomeContainingIgnoreCaseAndCpfCnpjContaining(String nome, String cpfCnpj);
}

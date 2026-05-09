const BASE_URL = 'http://localhost:8080';

export async function getSolicitantes(filtros = {}) {
    const params = new URLSearchParams();
    if (filtros.nome)     params.append('nome', filtros.nome);
    if (filtros.cpfCnpj)  params.append('cpfCnpj', filtros.cpfCnpj);

    const response = await fetch(`${BASE_URL}/solicitantes?${params}`);
    if (!response.ok) throw new Error('Erro ao buscar solicitantes');
    return response.json();
}


export async function getCategorias() {
    const response = await fetch(`${BASE_URL}/categorias`);
    if (!response.ok) throw new Error('Erro ao buscar categorias');
    return response.json();
}


export async function getSolicitacoes(filtros = {}) {
    const params = new URLSearchParams();
    if (filtros.status)      params.append('status', filtros.status);
    if (filtros.categoriaId) params.append('categoriaId', filtros.categoriaId);
    if (filtros.dataInicio)  params.append('dataInicio', filtros.dataInicio);
    if (filtros.dataFim)     params.append('dataFim', filtros.dataFim);
    const response = await fetch(`${BASE_URL}/solicitacoes?${params}`);
    if (!response.ok) throw new Error('Erro ao buscar solicitações');
    return response.json();
}


export async function getSolicitacaoPorId(id) {
    const response = await fetch(`${BASE_URL}/solicitacoes/${id}`);
    if (!response.ok) throw new Error('Erro ao buscar solicitação');
    return response.json();
}



export async function cadastrarSolicitacao(dados) {
      const response = await fetch(`${BASE_URL}/solicitacoes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dados)
      });


      const body = await response.json().catch(() => null);

      // erro HTTP
      if (!response.ok) {

        throw {
          status: response.status,
          mensagem: body?.mensagem || 'Erro ao cadastrar solicitação.',
          body
        };
      }

      return body;
}


export async function atualizarStatus(id, novoStatus) {
    const response = await fetch(`${BASE_URL}/solicitacoes/${id}/status?novoStatus=${novoStatus}`, {
        method: 'PATCH'
    });
    if (!response.ok) throw new Error('Erro ao atualizar status');
    return response.json();
}

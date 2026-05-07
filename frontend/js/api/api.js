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
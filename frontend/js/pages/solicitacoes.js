
import { getSolicitacoes, getSolicitacaoPorId, getCategorias, getSolicitantes, cadastrarSolicitacao, atualizarStatus,editarSolicitacao } from '../api/api.js';
import { abrirModal, abrirModalConfirmacao, fecharModal } from '../components/modal.js';

// Cores por status
const statusConfig = {
    SOLICITADO: 'bg-yellow-100 text-yellow-600',
    LIBERADO:   'bg-blue-100 text-blue-600',
    APROVADO:   'bg-green-100 text-green-600',
    REJEITADO:  'bg-red-100 text-red-600',
    CANCELADO:  'bg-gray-100 text-gray-500'
};

// Transições permitidas por status
const transicoesPermitidas = {
    SOLICITADO: ['LIBERADO', 'REJEITADO'],
    LIBERADO:   ['APROVADO', 'REJEITADO'],
    APROVADO:   ['CANCELADO'],
    REJEITADO:  [],
    CANCELADO:  []
};

export async function renderSolicitacoes() {

    document.getElementById('app').innerHTML = `
        <div class="space-y-6">

            <!-- HEADER -->
            <div class="flex justify-between items-center">
                <div>
                    <h2 class="text-xl font-semibold">Solicitações</h2>
                    <p class="text-sm text-gray-500">Gerencie as solicitações cadastradas</p>
                </div>
                <button id="btnNovaSolicitacao"
                    class="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition shadow-sm">
                    + Nova Solicitação
                </button>
            </div>

            <!-- FILTROS -->
            <div class="bg-white rounded-2xl shadow-sm p-4 flex flex-wrap gap-4">

                <select id="filtroStatus" class="border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400">
                    <option value="">Todos os status</option>
                    <option value="SOLICITADO">Solicitado</option>
                    <option value="LIBERADO">Liberado</option>
                    <option value="APROVADO">Aprovado</option>
                    <option value="REJEITADO">Rejeitado</option>
                    <option value="CANCELADO">Cancelado</option>
                </select>

                <select id="filtroCategoria" class="border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400">
                    <option value="">Todas as categorias</option>
                </select>

                <input id="filtroDataInicio" type="date"
                    class="border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400" />

                <input id="filtroDataFim" type="date"
                    class="border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400" />

                <button id="btnFiltrar"
                    class="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg text-sm transition">
                    Filtrar
                </button>

            </div>

            <!-- TABELA -->
            <div class="bg-white rounded-2xl shadow-sm overflow-hidden">
                <table class="w-full">
                    <thead class="bg-gray-50 border-b">
                        <tr class="text-left text-sm text-gray-600">
                            <th class="px-6 py-4 font-medium">Solicitante</th>
                            <th class="px-6 py-4 font-medium">CPF / CNPJ</th>
                            <th class="px-6 py-4 font-medium">Descrição</th>
                            <th class="px-6 py-4 font-medium">Categoria</th>
                            <th class="px-6 py-4 font-medium">Status</th>
                            <th class="px-6 py-4 font-medium">Valor</th>
                            <th class="px-6 py-4 font-medium">Data</th>
                            <th class="px-6 py-4 font-medium">Ações</th>
                        </tr>
                    </thead>
                    <tbody id="tabelaSolicitacoes">
                        <tr>
                            <td colspan="6" class="px-6 py-4 text-center text-gray-400 text-sm">
                                Carregando...
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

        </div>
    `;

    // Popula select de categorias
    await popularCategorias();

    // Carrega solicitações
    await carregarSolicitacoes();

    // Botão filtrar
    document.getElementById('btnFiltrar').addEventListener('click', async () => {
        await carregarSolicitacoes({
            status:      document.getElementById('filtroStatus').value,
            categoriaId: document.getElementById('filtroCategoria').value,
            dataInicio:  document.getElementById('filtroDataInicio').value,
            dataFim:     document.getElementById('filtroDataFim').value
        });
    });

    // Botão nova solicitação
    document.getElementById('btnNovaSolicitacao').addEventListener('click', () => {
        abrirModalCadastro();
    });
}

// Popula o select de categorias com dados da API
async function popularCategorias() {
    try {
        const categorias = await getCategorias();
        const select = document.getElementById('filtroCategoria');
        categorias.forEach(c => {
            select.innerHTML += `<option value="${c.id}">${c.nome}</option>`;
        });
    } catch (e) {
        console.error('Erro ao carregar categorias', e);
    }
}

// Carrega e renderiza a tabela
async function carregarSolicitacoes(filtros = {}) {
    const tbody = document.getElementById('tabelaSolicitacoes');
    const [solicitantes, categorias] = await Promise.all([
        getSolicitantes(),
        getCategorias()
    ]);

    try {
        const solicitacoes = await getSolicitacoes(filtros);

        if (solicitacoes.length === 0) {
            tbody.innerHTML = `
                <tr>
                    <td colspan="6" class="px-6 py-4 text-center text-gray-400 text-sm">
                        Nenhuma solicitação encontrada
                    </td>
                </tr>`;
            return;
        }

        tbody.innerHTML = solicitacoes.map(s => `
            <tr data-id="${s.id}"
                class="border-b last:border-0 cursor-pointer hover:bg-gray-50 transition linha-solicitacao">
                <td class="px-6 py-4 font-medium text-gray-800">${s.nomeSolicitante}</td>
                <td class="px-6 py-4 font-medium text-gray-800">${s.documentoSolicitante}</td>
                <td class="px-6 py-4 text-sm text-gray-700">${s.descricao}</td>
                <td class="px-6 py-4 text-sm text-gray-700">${s.nomeCategoria}</td>
                <td class="px-6 py-4">
                    <span class="px-3 py-1 rounded-full text-xs font-medium ${statusConfig[s.status] || 'bg-gray-100 text-gray-500'}">
                        ${s.status}
                    </span>
                </td>

                <td class="px-6 py-4 font-medium text-gray-800">
                    R$ ${Number(s.valor).toFixed(2).replace('.', ',')}
                </td>
                <td class="px-6 py-4 text-sm text-gray-700">${formatDate(s.dataSolicitacao)}</td>
                <td class="px-6 py-4 text-sm flex gap-2">
                    ${transicoesPermitidas[s.status]?.length > 0 ? `
                        <select class="border rounded-lg px-2 py-1 text-xs selectNovoStatus" data-id="${s.id}">
                            <option value="">Alterar status</option>
                            ${transicoesPermitidas[s.status].map(st => `
                                <option value="${st}">${st}</option>
                            `).join('')}
                        </select>
                    ` : `<span class="text-gray-400 text-xs">Status final</span>`}
              
                </td>
               
            </tr>
        `).join('');


        document.querySelectorAll('.selectNovoStatus').forEach(select => {
            select.addEventListener('change', async (e) => {
                const id    = e.target.dataset.id;
                const statusAtual   = await getSolicitacaoPorId(id);
                const novoStatus    = e.target.value;
                if (!novoStatus) return;

                // Reseta o select enquanto aguarda confirmação
                e.target.value = '';

                abrirModalConfirmacao(
                    `Deseja alterar o status de <strong>${statusAtual.status}</strong> para <strong>${novoStatus}</strong>?`,
                    async () => {
                        try {
                            await atualizarStatus(id, novoStatus);
                            await carregarSolicitacoes(filtros);
                        } catch (err) {
                            alert('Erro ao atualizar status');
                        }
                    }
                );
            });
        });

        // abre detalhe
        document.querySelectorAll('.linha-solicitacao').forEach(linha => {
            linha.addEventListener('click', async (e) => {

                // Ignora clique no select de status
                if (e.target.closest('select')) return;

                const id = linha.dataset.id;

                try {
                    const solicitacao = await getSolicitacaoPorId(id);
                    abrirDetalheSolicitacao(solicitacao);

                } catch (err) {
                    alert('Erro ao carregar detalhe da solicitação' );
                }
            });
        });

    } catch (error) {
        tbody.innerHTML = `
            <tr>
                <td colspan="6" class="px-6 py-4 text-center text-red-400 text-sm">
                    Erro ao carregar solicitações
                </td>
            </tr>`;
    }
}


async function abrirModalCadastro() {
    const [solicitantes, categorias] = await Promise.all([
        getSolicitantes(),
        getCategorias()
    ]);

    const formulario = `
        <form id="formCadastro" class="space-y-4" novalidate>
            <div>
                <label class="text-sm text-gray-600 font-medium">Solicitante</label>
                <select id="solicitanteId"
                    class="mt-1 w-full border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400">
                    <option value="">Selecione um solicitante</option>
                    ${solicitantes.map(s => `<option value="${s.id}">${s.nome}</option>`).join('')}
                </select>
                <p id="erroSolicitante" class="text-xs text-red-500 mt-1 hidden"></p>
            </div>

            <div>
                <label class="text-sm text-gray-600 font-medium">Categoria</label>
                <select id="categoriaId"
                    class="mt-1 w-full border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400">
                    <option value="">Selecione uma categoria</option>
                    ${categorias.map(c => `<option value="${c.id}">${c.nome}</option>`).join('')}
                </select>
                <p id="erroCategoria" class="text-xs text-red-500 mt-1 hidden"></p>
            </div>

            <div>
                <label class="text-sm text-gray-600 font-medium">Descrição</label>
                <input id="descricao" type="text" placeholder="Descreva a solicitação"
                    class="mt-1 w-full border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400" />
                <p id="erroDescricao" class="text-xs text-red-500 mt-1 hidden"></p>
            </div>

            <div>
                <label class="text-sm text-gray-600 font-medium">Valor (R$)</label>
                <input id="valor" type="number" step="0.01" min="0.01" placeholder="0,00"
                    class="mt-1 w-full border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400" />
                <p id="erroValor" class="text-xs text-red-500 mt-1 hidden"></p>
            </div>

            <p id="erroGeral" class="text-xs text-red-500 hidden"></p>

            <div class="flex justify-end gap-3 pt-2">
                <button type="button" id="btnCancelar"
                    class="px-4 py-2 text-sm text-gray-600 border rounded-lg hover:bg-gray-50 transition">
                    Cancelar
                </button>
                <button type="submit"
                    class="px-4 py-2 text-sm text-white bg-orange-500 hover:bg-orange-600 rounded-lg transition">
                    Cadastrar
                </button>
            </div>

        </form>
    `;

    abrirModal('Nova Solicitação', formulario);

    document.getElementById('btnCancelar').addEventListener('click', fecharModal);

    document.getElementById('formCadastro').addEventListener('submit', async (e) => {
        e.preventDefault();

        // Limpa erros anteriores
        limparErros();

        const dados = {
            solicitanteId: Number(document.getElementById('solicitanteId').value),
            categoriaId:   Number(document.getElementById('categoriaId').value),
            descricao:     document.getElementById('descricao').value,
            valor:         Number(document.getElementById('valor').value)
        };



        try {

          await cadastrarSolicitacao(dados);

          fecharModal();

          await carregarSolicitacoes();

        } catch (err) {

          const erros = err.body?.erros;

          if (!erros) return;

              const mapa = {
                descricao: 'erroDescricao',
                valor: 'erroValor',
                solicitanteId: 'erroSolicitante',
                categoriaId: 'erroCategoria'
          };

          Object.entries(erros).forEach(([campo, mensagem]) => {

            const elemento = mapa[campo];

            if (elemento) {
              mostrarErro(elemento, mensagem);
            }

          });

      }
    });
}


async function abrirDetalheSolicitacao(solicitacao) {

    const statusConfig = {
        SOLICITADO: 'bg-yellow-100 text-yellow-600',
        LIBERADO:   'bg-blue-100 text-blue-600',
        APROVADO:   'bg-green-100 text-green-600',
        REJEITADO:  'bg-red-100 text-red-600',
        CANCELADO:  'bg-gray-100 text-gray-500'
    };

    const conteudo = `

        <div class="space-y-4">

            <div class="grid grid-cols-2 gap-4">

                <div>
                    <p class="text-xs text-gray-400 font-medium uppercase">ID</p>
                    <p class="text-sm text-gray-800 font-semibold">
                        #${solicitacao.id}
                    </p>
                </div>

                <div>
                    <p class="text-xs text-gray-400 font-medium uppercase">Status</p>
                    <span class="px-3 py-1 rounded-full text-xs font-medium ${statusConfig[solicitacao.status]}">
                        ${solicitacao.status}
                    </span>
                </div>

                <div>
                    <p class="text-xs text-gray-400 font-medium uppercase">
                        Solicitante
                    </p>

                    <p class="text-sm text-gray-800">
                        ${solicitacao.nomeSolicitante}
                    </p>
                </div>

                <div>
                    <p class="text-xs text-gray-400 font-medium uppercase">
                        CPF/CNPJ
                    </p>

                    <p class="text-sm text-gray-800">
                        ${solicitacao.documentoSolicitante}
                    </p>
                </div>

                <div>
                    <p class="text-xs text-gray-400 font-medium uppercase">
                        Categoria
                    </p>

                    <p class="text-sm text-gray-800">
                        ${solicitacao.nomeCategoria}
                    </p>
                </div>

                <div>
                    <p class="text-xs text-gray-400 font-medium uppercase">
                        Valor
                    </p>

                    <p class="text-sm text-gray-800 font-semibold">
                        R$ ${Number(solicitacao.valor)
        .toFixed(2)
        .replace('.', ',')}
                    </p>
                </div>

            </div>

            <div>
                <p class="text-xs text-gray-400 font-medium uppercase">
                    Descrição
                </p>

                <p class="text-sm text-gray-800">
                    ${solicitacao.descricao}
                </p>
            </div>

            <div class="flex justify-between pt-4 border-t">              
                   ${renderBtnEdit()}
                <button id="btnFecharDetalhe" class="px-4 py-2 text-sm text-gray-600 border rounded-lg hover:bg-gray-50 transition">
                    Fechar
                </button>
            </div>

        </div>

    `;
// O botão para edição ficará disponível para status não finais
    function renderBtnEdit() {
        if (solicitacao.status !== 'APROVADO' && solicitacao.status !== 'REJEITADO' && solicitacao.status !== 'CANCELADO') {
            return `
                    <button id="btnEditarSolicitacao" class="px-4 py-2 text-sm text-gray-600 border rounded-lg hover:bg-gray-50 transition">
                        Editar
                    </button>
                `;

        }
        return '';
    }

    abrirModal('Detalhe da Solicitação', conteudo);

    document.getElementById('btnFecharDetalhe').addEventListener('click', fecharModal);

    const btnEditar = document.getElementById('btnEditarSolicitacao');

    if (btnEditar) {

        btnEditar.addEventListener('click', async () => {
            await abrirModalAtualizacao(solicitacao);
        });
    }
}

async function abrirModalAtualizacao(solicitacao) {

    const [categorias] = await Promise.all([
        getCategorias()
    ]);

    const conteudo = `
        <form id="formAtualizacao" class="space-y-4">
            <!-- CATEGORIA -->
            <div>
                <label class="text-sm text-gray-600 font-medium">
                    Categoria
                </label>

                <select id="categoriaId" class="mt-1 w-full border rounded-lg px-4 py-2 text-sm">

                    <option value="">
                        Selecione uma categoria
                    </option>

                    ${categorias.map(c => `
                                        <option
                                            value="${c.id}"
                                            ${Number(c.id) === Number(solicitacao.categoriaId) ? 'selected' : ''}>
                                            ${c.nome}
                                        </option>   

                                        `).join('')}
                </select>
                <p id="erroCategoria" class="text-xs text-red-500 mt-1 hidden"></p>
            </div>

            <!-- DESCRIÇÃO -->
            <div>
                <label class="text-sm text-gray-600 font-medium">
                    Descrição
                </label>
                <input id="descricao" type="text" value="${solicitacao.descricao}" class="mt-1 w-full border rounded-lg px-4 py-2 text-sm" />
                <p id="erroDescricao" class="text-xs text-red-500 mt-1 hidden"></p>
            </div>

            <!-- VALOR -->
            <div>

                <label class="text-sm text-gray-600 font-medium">
                    Valor
                </label>

                <input id="valor" type="number" step="0.01" value="${solicitacao.valor}" class="mt-1 w-full border rounded-lg px-4 py-2 text-sm"/>

                <p id="erroValor"
                    class="text-xs text-red-500 mt-1 hidden">
                </p>
            </div>

            <p id="erroGeral" class="text-xs text-red-500 hidden">
            </p>

            <!-- FOOTER -->
            <div class="flex justify-end gap-3 pt-4 border-t">
                <button type="button" id="btnCancelarAtualizacao" class="px-4 py-2 text-sm text-gray-600 border rounded-lg">
                    Cancelar
                </button>

                <button type="submit" class="px-4 py-2 text-sm text-white bg-orange-500 rounded-lg">
                    Atualizar
                </button>

            </div>

        </form>

    `;

    abrirModal(
        'Editar Solicitação',
        conteudo
    );

    document.getElementById('btnCancelarAtualizacao').addEventListener('click', fecharModal);

    document.getElementById('formAtualizacao').addEventListener('submit', async (e) => {
            e.preventDefault();
            limparErros();
            const dados = {
                categoriaId: Number(
                    document.getElementById('categoriaId').value
                ),

                descricao: document.getElementById('descricao').value,

                valor: Number(
                    document.getElementById('valor').value
                )
            };

            try {

                await editarSolicitacao(solicitacao.id, dados);

                fecharModal();

                await carregarSolicitacoes();

            } catch (err) {

                const erros = err.body?.erros;

                if (!erros) {

                    mostrarErro(
                        'erroGeral',
                        'Erro ao atualizar solicitação'
                    );

                    return;
                }

                const mapa = {
                    descricao: 'erroDescricao',
                    valor: 'erroValor',
                    solicitanteId: 'erroSolicitante',
                    categoriaId: 'erroCategoria'
                };

                Object.entries(erros).forEach(([campo, mensagem]) => {

                    const elemento = mapa[campo];

                    if (elemento) {

                        mostrarErro(
                            elemento,
                            mensagem
                        );
                    }
                });
            }
        });

}

function mostrarErro(elementoId, mensagem) {
    const el = document.getElementById(elementoId);
    if (el) {
        el.textContent = mensagem;
        el.classList.remove('hidden');
    }
}

function limparErros() {
    ['erroSolicitante', 'erroCategoria', 'erroDescricao', 'erroValor', 'erroGeral'].forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.textContent = '';
            el.classList.add('hidden');
        }
    });
}
/*
* Função utilizada para formatar a data da solicitação
* */

function formatDate(date) {
    const d = new Date(date + 'T00:00:00');
    return d.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    } );
}

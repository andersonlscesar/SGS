export function abrirModal(conteudo) {
    // Remove modal anterior se existir
    fecharModal();

    const overlay = document.createElement('div');
    overlay.id = 'modalOverlay';
    overlay.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';

    overlay.innerHTML = `
        <div class="bg-white rounded-2xl shadow-xl w-full max-w-lg mx-4">

            <!-- HEADER -->
            <div class="flex justify-between items-center px-6 py-4 border-b">
                <h3 class="text-lg font-semibold text-gray-800">Nova Solicitação</h3>
                <button id="btnFecharModal" class="text-gray-400 hover:text-gray-600 text-xl font-bold">✕</button>
            </div>

            <!-- BODY -->
            <div class="px-6 py-4">
                ${conteudo}
            </div>

        </div>
    `;

    document.body.appendChild(overlay);

    // Fechar ao clicar no X
    document.getElementById('btnFecharModal').addEventListener('click', fecharModal);

    // Fechar ao clicar fora do modal
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) fecharModal();
    });
}

export function abrirModalConfirmacao(mensagem, onConfirmar) {
    fecharModal();

    const overlay = document.createElement('div');
    overlay.id = 'modalOverlay';
    overlay.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';

    overlay.innerHTML = `
        <div class="bg-white rounded-2xl shadow-xl w-full max-w-md mx-4">

            <!-- HEADER -->
            <div class="flex justify-between items-center px-6 py-4 border-b">
                <h3 class="text-lg font-semibold text-gray-800">Confirmar alteração</h3>
                <button id="btnFecharModal" class="text-gray-400 hover:text-gray-600 text-xl font-bold">✕</button>
            </div>

            <!-- BODY -->
            <div class="px-6 py-6">
                <p class="text-sm text-gray-600">${mensagem}</p>
            </div>

            <!-- FOOTER -->
            <div class="flex justify-end gap-3 px-6 py-4 border-t">
                <button id="btnCancelarConfirmacao"
                    class="px-4 py-2 text-sm text-gray-600 border rounded-lg hover:bg-gray-50 transition">
                    Cancelar
                </button>
                <button id="btnConfirmar"
                    class="px-4 py-2 text-sm text-white bg-orange-500 hover:bg-orange-600 rounded-lg transition">
                    Confirmar
                </button>
            </div>

        </div>
    `;

    document.body.appendChild(overlay);

    document.getElementById('btnFecharModal').addEventListener('click', fecharModal);
    document.getElementById('btnCancelarConfirmacao').addEventListener('click', fecharModal);
    overlay.addEventListener('click', (e) => { if (e.target === overlay) fecharModal(); });

    document.getElementById('btnConfirmar').addEventListener('click', () => {
        fecharModal();
        onConfirmar();
    });
}


export function abrirModalDetalhe(solicitacao) {
    fecharModal();

    const statusConfig = {
        SOLICITADO: 'bg-yellow-100 text-yellow-600',
        LIBERADO:   'bg-blue-100 text-blue-600',
        APROVADO:   'bg-green-100 text-green-600',
        REJEITADO:  'bg-red-100 text-red-600',
        CANCELADO:  'bg-gray-100 text-gray-500'
    };

    function formatDate(date) {
        const d = new Date(date + 'T00:00:00');
        return d.toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        } );
    }

    const overlay = document.createElement('div');
    overlay.id = 'modalOverlay';
    overlay.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';

    overlay.innerHTML = `
        <div class="bg-white rounded-2xl shadow-xl w-full max-w-lg mx-4">

            <!-- HEADER -->
            <div class="flex justify-between items-center px-6 py-4 border-b">
                <h3 class="text-lg font-semibold text-gray-800">Detalhe da Solicitação</h3>
                <button id="btnFecharModal" class="text-gray-400 hover:text-gray-600 text-xl font-bold">✕</button>
            </div>

            <!-- BODY -->
            <div class="px-6 py-6 space-y-4">

                <div class="grid grid-cols-2 gap-4">

                    <div>
                        <p class="text-xs text-gray-400 font-medium uppercase">ID</p>
                        <p class="text-sm text-gray-800 font-semibold">#${solicitacao.id}</p>
                    </div>

                    <div>
                        <p class="text-xs text-gray-400 font-medium uppercase">Status</p>
                        <span class="px-3 py-1 rounded-full text-xs font-medium ${statusConfig[solicitacao.status] || 'bg-gray-100 text-gray-500'}">
                            ${solicitacao.status}
                        </span>
                    </div>

                    <div>
                        <p class="text-xs text-gray-400 font-medium uppercase">Solicitante</p>
                        <p class="text-sm text-gray-800">${solicitacao.nomeSolicitante}</p>
                    </div>

                    <div>
                        <p class="text-xs text-gray-400 font-medium uppercase">CPF/CNPJ</p>
                        <p class="text-sm text-gray-800">${solicitacao.documentoSolicitante}</p>
                    </div>

                    <div>
                        <p class="text-xs text-gray-400 font-medium uppercase">Categoria</p>
                        <p class="text-sm text-gray-800">${solicitacao.nomeCategoria}</p>
                    </div>

                    <div>
                        <p class="text-xs text-gray-400 font-medium uppercase">Valor</p>
                        <p class="text-sm text-gray-800 font-semibold">
                            R$ ${Number(solicitacao.valor).toFixed(2).replace('.', ',')}
                        </p>
                    </div>

                    <div>
                        <p class="text-xs text-gray-400 font-medium uppercase">Data</p>
                        <p class="text-sm text-gray-800">${formatDate(solicitacao.dataSolicitacao)}</p>
                    </div>

                </div>

                <div>
                    <p class="text-xs text-gray-400 font-medium uppercase">Descrição</p>
                    <p class="text-sm text-gray-800">${solicitacao.descricao}</p>
                </div>

            </div>

            <!-- FOOTER -->
            <div class="flex justify-end px-6 py-4 border-t">
                <button id="btnFecharModal2"
                    class="px-4 py-2 text-sm text-gray-600 border rounded-lg hover:bg-gray-50 transition">
                    Fechar
                </button>
            </div>

        </div>
    `;

    document.body.appendChild(overlay);

    document.getElementById('btnFecharModal').addEventListener('click', fecharModal);
    document.getElementById('btnFecharModal2').addEventListener('click', fecharModal);
    overlay.addEventListener('click', (e) => { if (e.target === overlay) fecharModal(); });
}

export function fecharModal() {
    const overlay = document.getElementById('modalOverlay');
    if (overlay) overlay.remove();
}
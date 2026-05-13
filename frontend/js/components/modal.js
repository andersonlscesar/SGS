export function abrirModal(title, conteudo) {
    // Remove modal anterior se existir
    fecharModal();

    const overlay = document.createElement('div');
    overlay.id = 'modalOverlay';
    overlay.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';

    overlay.innerHTML = `
        <div class="bg-white rounded-2xl shadow-xl w-full max-w-lg mx-4">

            <!-- HEADER -->
            <div class="flex justify-between items-center px-6 py-4 border-b">
                <h3 class="text-lg font-semibold text-gray-800">${title}</h3>
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

export function fecharModal() {

    const overlay = document.getElementById('modalOverlay');

    if (overlay) {
        overlay.remove();
    }

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



import { getCategorias } from '../api/api.js';

export async function renderCategorias() {

    document.getElementById('app').innerHTML = `
        <div class="space-y-6">

            <!-- HEADER -->
            <div class="flex justify-between items-center">
                <div>
                    <h2 class="text-xl font-semibold">Categorias</h2>
                    <p class="text-sm text-gray-500">Lista de categorias cadastradas</p>
                </div>
            </div>

            <!-- TABELA -->
            <div class="bg-white rounded-2xl shadow-sm overflow-hidden">
                <table class="w-full">
                    <thead class="bg-gray-50 border-b">
                        <tr class="text-left text-sm text-gray-600">
                            <th class="px-6 py-4 font-medium">ID</th>
                            <th class="px-6 py-4 font-medium">Nome</th>
                        </tr>
                    </thead>
                    <tbody id="tabelaCategorias">
                        <tr>
                            <td colspan="2" class="px-6 py-4 text-center text-gray-400 text-sm">
                                Carregando...
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

        </div>
    `;

    await carregarCategorias();
}

async function carregarCategorias() {
    const tbody = document.getElementById('tabelaCategorias');

    try {
        const categorias = await getCategorias();

        if (categorias.length === 0) {
            tbody.innerHTML = `
                <tr>
                    <td colspan="2" class="px-6 py-4 text-center text-gray-400 text-sm">
                        Nenhuma categoria encontrada
                    </td>
                </tr>`;
            return;
        }

        tbody.innerHTML = categorias.map(c => `
            <tr class="border-b last:border-0 hover:bg-gray-50 transition">
                <td class="px-6 py-4 text-sm text-gray-700">${c.id}</td>
                <td class="px-6 py-4 font-medium text-gray-800">${c.nome}</td>
            </tr>
        `).join('');

    } catch (error) {
        tbody.innerHTML = `
            <tr>
                <td colspan="2" class="px-6 py-4 text-center text-red-400 text-sm">
                    Erro ao carregar categorias
                </td>
            </tr>`;
    }
}
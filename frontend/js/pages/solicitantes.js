import { getSolicitantes } from '../api/api.js';

export async function renderSolicitantes() {

    document.getElementById('app').innerHTML = `
        <div class="space-y-6">
            <div class="flex justify-between items-center">
                <div>
                    <h2 class="text-xl font-semibold">Solicitantes</h2>
                    <p class="text-sm text-gray-500">Lista de solicitantes cadastrados</p>
                </div>
            </div>        

            <!-- TABELA -->
            <div class="bg-white rounded-2xl shadow-sm overflow-hidden">
                <table class="w-full">
                    <thead class="bg-gray-50 border-b">
                        <tr class="text-left text-sm text-gray-600">
                            <th class="px-6 py-4 font-medium">ID</th>
                            <th class="px-6 py-4 font-medium">Nome</th>
                            <th class="px-6 py-4 font-medium">CPF/CNPJ</th>
                        </tr>
                    </thead>
                    <tbody id="tabelaSolicitantes">
                        <tr>
                            <td colspan="3" class="px-6 py-4 text-center text-gray-400 text-sm">
                                Carregando...
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    `;

    // Carrega dados ao iniciar
    await carregarSolicitantes();
}

async function carregarSolicitantes(filtros = {}) {
    const tbody = document.getElementById('tabelaSolicitantes');

    try {
        const solicitantes = await getSolicitantes(filtros);

        if (solicitantes.length === 0) {
            tbody.innerHTML = `
                <tr>
                    <td colspan="3" class="px-6 py-4 text-center text-gray-400 text-sm">
                        Nenhum solicitante encontrado
                    </td>
                </tr>`;
            return;
        }

        tbody.innerHTML = solicitantes.map(s => `
            <tr class="border-b last:border-0 hover:bg-gray-50 transition">
                <td class="px-6 py-4 text-sm text-gray-700">${s.id}</td>
                <td class="px-6 py-4 font-medium text-gray-800">${s.nome}</td>
                <td class="px-6 py-4 text-sm text-gray-700">${s.cpfCnpj}</td>
            </tr>
        `).join('');

    } catch (error) {
        tbody.innerHTML = `
            <tr>
                <td colspan="3" class="px-6 py-4 text-center text-red-400 text-sm">
                    Erro ao carregar solicitantes
                </td>
            </tr>`;
    }
}
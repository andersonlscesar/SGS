export async function renderSolicitacoes() {

  const solicitacoes = [
    {
      solicitante: 'João Silva',
      descricao: 'Compra de materiais escritório',
      status: 'SOLICITADO',
      categoria: 'Materiais',
      valor: 'R$ 1.500,00'
    },
    {
      solicitante: 'Maria Oliveira',
      descricao: 'Pagamento de consultoria',
      status: 'LIBERADO',
      categoria: 'Serviços',
      valor: 'R$ 3.200,00'
    },
    {
      solicitante: 'Carlos Souza',
      descricao: 'Reembolso transporte',
      status: 'APROVADO',
      categoria: 'Transporte',
      valor: 'R$ 850,00'
    }
  ];

  const html = `
  
    <div class="space-y-6">

      <!-- HEADER -->
      <div class="flex justify-between items-center">

        <div>
          <h2 class="text-xl font-semibold">
            Solicitações
          </h2>

          <p class="text-sm text-gray-500">
            Gerencie as solicitações cadastradas
          </p>
        </div>

        <button
          id="btnNovaSolicitacao"
          class="
            bg-orange-500
            hover:bg-orange-600
            text-white
            px-4
            py-2
            rounded-lg
            transition
            shadow-sm
          "
        >
          + Nova Solicitação
        </button>

      </div>

      <!-- CARD -->
      <div class="bg-white rounded-2xl shadow-sm overflow-hidden">

        <table class="w-full">

          <!-- TABLE HEADER -->
          <thead class="bg-gray-50 border-b">

            <tr class="text-left text-sm text-gray-600">

              <th class="px-6 py-4 font-medium">
                Solicitante
              </th>

              <th class="px-6 py-4 font-medium">
                Descrição
              </th>

              <th class="px-6 py-4 font-medium">
                Status
              </th>

              <th class="px-6 py-4 font-medium">
                Categoria
              </th>

              <th class="px-6 py-4 font-medium">
                Valor
              </th>

            </tr>

          </thead>

          <!-- TABLE BODY -->
          <tbody>

            ${solicitacoes.map(solicitacao => `
              
              <tr class="border-b last:border-0 hover:bg-gray-50 transition">

                <td class="px-6 py-4 font-medium text-gray-800">
                  ${solicitacao.solicitante}
                </td>

                <td class="px-6 py-4 text-sm text-gray-700">
                  ${solicitacao.descricao}
                </td>

                <td class="px-6 py-4">

                  <span class="
                    px-3
                    py-1
                    rounded-full
                    text-xs
                    font-medium
                    bg-orange-100
                    text-orange-600
                  ">
                    ${solicitacao.status}
                  </span>

                </td>

                <td class="px-6 py-4 text-sm text-gray-700">
                  ${solicitacao.categoria}
                </td>

                <td class="px-6 py-4 font-medium text-gray-800">
                  ${solicitacao.valor}
                </td>

              </tr>

            `).join('')}

          </tbody>

        </table>

      </div>

    </div>

  `;

  document.getElementById('app').innerHTML = html;

}
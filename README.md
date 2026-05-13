# SGS - Sistema de Gestão de Solicitações

"Solução criada para apoiar o
controle de solicitações de pagamento realizadas por diferentes áreas de uma
organização."

## Stack utilizada

- Frontend: HTML | Tailwindcss | JavaScript 
- Backend: Java (Spring Boot)
- Banco de dados: Postgresql

## Transações Permitidas 

- SOLICITADO → LIBERADO
- LIBERADO → APROVADO
- SOLICITADO ou LIBERADO → REJEITADO
- APROVADO → CANCELADO
- REJEITADO e CANCELADO são estados finais (não podem ser alterados)

## Detalhes Técnicos

No backend existe a validação para impedimento de transações não permitidas, como podem ver no teste do Postman:

![Teste para transação não permitida](/images/postman.png)

No front, se tratando da alteração do status a partir da listagem, apenas será possível visualizar as transações permitidas com base no status atual da solicitação.

![Status disponíveis](/images/status.png)

Exemplo: Se a solicitação estiver como SOLICITADO, ficarão disponíveis as opções LIBERADO E REJEITADO. Caso seu status seja alterado para LIBERADO, ficarão disponíveis as opções APROVADO E REJEITADO. 

Dessa forma, o usuário sempre poderá optar por transações permitidas.

Critérios atendidos: 
	- Tela de cadastro
	- Listagem com filtros
	- Atualização de status
	- Detalhamento de uma solicitação

Optei por deixar sem um rota para exclusão, pois uma boa prática seria cancelar a solicitação caso houvesse algo errado, mantendo aquela informação no sistema para uma melhor rasteabilidade. 

Implementei um endpoint para atualização dos dados, respeitando as regras de transação definidas para a solicitação. No entanto, optei por seguir a mesma abordagem utilizada na exclusão lógica: em casos de inconsistência ou necessidade de correção, a solicitação pode ser cancelada e uma nova solicitação deve ser criada com os dados ajustados.

## Native SQL 

Encontra-se no repository "SolicitacaoRepository".

Listagem de todos os detalhes com ou sem filtros.

```java
    @Query(value = """
            SELECT
                s.id,
                s.descricao,
                s.valor,
                s.data_solicitacao,
                s.status,
                sol.nome        AS nome_solicitante,
                sol.cpf_cnpj    AS documento_solicitante,
                cat.nome        AS nome_categoria
            FROM solicitacoes s
            JOIN solicitantes sol ON sol.id = s.solicitante_id
            JOIN categorias cat ON cat.id = s.categoria_id
            WHERE (:status IS NULL OR s.status = :status)
                AND (:categoriaId IS NULL OR s.categoria_id = :categoriaId)
                AND (:dataInicio IS NULL OR s.data_solicitacao >= CAST(:dataInicio AS DATE))
                AND (:dataFim IS NULL OR s.data_solicitacao <=  CAST(:dataFim AS DATE))
                ORDER BY s.id DESC
            """, nativeQuery = true)
    List<SolicitacaoProjection> listarComFiltros(
            @Param("status")        String status,
            @Param("categoriaId")   Long categoriaId,
            @Param("dataInicio")    String dataInicio,
            @Param("dataFim")       String dataFim
    );
```

## URL base - Front

No diretório frontend->js->api.js, há uma constante BASE_URL, atentar-se a ela caso suba o server em algum endereço ou porta diferente.

```js
const BASE_URL = 'http://localhost:8080';
```

#### Script para criação da base de dados, tabelas e indices

```sql
/*
==================================================================
1 - base
==================================================================
*/


CREATE DATABASE sgs;

/*
==================================================================
2 - Criação de tabelas
==================================================================
*/


CREATE TABLE solicitantes (
	id			SERIAL	NOT NULL,
	nome		VARCHAR(100) NOT NULL,
	cpf_cnpj	VARCHAR(18) NOT NULL UNIQUE,
	PRIMARY KEY(id)
);



CREATE TABLE solicitacoes (
	id					SERIAL NOT NULL,
	descricao 			VARCHAR(255) NOT NULL,
	valor 				NUMERIC(10, 2) NOT NULL,
	data_solicitacao 	DATE NOT NULL,
	status				VARCHAR(20) NOT NULL,
	solicitante_id		INTEGER NOT NULL, -- FK
	categoria_id		INTEGER NOT NULL, -- FK
	PRIMARY KEY(id)
);

CREATE TABLE categorias (
	id		SERIAL NOT NULL,
	nome 	VARCHAR(100) NOT NULL,
	PRIMARY KEY(id)
);


/*
==================================================================
3 - Constraints 
==================================================================
*/

-- solicitantes -> solicitacoes (1:N)

ALTER TABLE solicitacoes 
ADD CONSTRAINT fk_solicitante_solicitacao FOREIGN KEY(solicitante_id) REFERENCES solicitantes(id);

-- categorias -> solicitacoes (1:N)

ALTER TABLE solicitacoes 
ADD CONSTRAINT fk_categoria_solicitacao FOREIGN KEY (categoria_id) REFERENCES categorias(id);


/*
==================================================================
4 - Índices
==================================================================
*/

CREATE INDEX idx_solicitacoes_solicitante_id 		ON solicitacoes(solicitante_id);
CREATE INDEX idx_solicitacoes_categoria_id 		    ON solicitacoes(categoria_id);
CREATE INDEX idx_solicitacoes_status 				ON solicitacoes(status);
CREATE INDEX idx_solicitacoes_data_solicitacao 	    ON solicitacoes(data_solicitacao);
CREATE INDEX idx_solicitacoes_filtros				ON solicitacoes(status, categoria_id, data_solicitacao);

```

#### Seed

```


INSERT INTO solicitantes (nome, cpf_cnpj) VALUES
('João Silva', '123.456.789-00'),
('Maria Oliveira', '987.654.321-00'),
('Empresa Alpha Ltda', '12.345.678/0001-90'),
('Carlos Souza', '111.222.333-44'),
('Tech Solutions SA', '98.765.432/0001-10');


INSERT INTO categorias (nome) VALUES
('Serviços'),
('Material'),
('Transporte'),
('Manutenção'),
('Outros');



INSERT INTO solicitacoes (
    descricao,
    valor,
    data_solicitacao,
    status,
    solicitante_id,
    categoria_id
) VALUES
('Pagamento de consultoria', 1500.00, '2026-05-01', 'SOLICITADO', 1, 1),
('Compra de materiais escritório', 350.75, '2026-04-28', 'LIBERADO', 2, 2),
('Reembolso transporte equipe', 800.00, '2026-04-25', 'APROVADO', 3, 3),
('Manutenção de equipamentos', 1200.50, '2026-04-20', 'REJEITADO', 4, 4),
('Serviço de TI terceirizado', 5000.00, '2026-04-15', 'CANCELADO', 5, 1);


```

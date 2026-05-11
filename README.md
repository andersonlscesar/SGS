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

No backend existe a validação para impedimento de transações não permitidas, como podem ver no teste do Postman 

![Teste para transação não permitida](/images/postman.png){width=100px}


#### Script para criação da base de dados, tabelas e indices

```
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
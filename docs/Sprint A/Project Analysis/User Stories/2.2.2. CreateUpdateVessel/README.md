# User Story 2.2.2 - Create and Update Vessel Records

**Autor:** [Nuno Silvano]  
**Data:** Outubro 2025

---

Esta user story permite que um **Port Authority Officer** (Oficial da Autoridade Portuária) registe e atualize informações sobre navios no sistema.

O objetivo é garantir que apenas navios válidos possam ser referenciados nas notificações de visita ao porto.

---

##  Critérios de Aceitação

Para esta user story estar completa, o sistema deve:

1. **Incluir os atributos obrigatórios** de cada navio:
   - IMO Number (número de identificação internacional)
   - Name (nome do navio)
   - Type (tipo de navio)
   - Operator/Owner (operador ou proprietário)

2. **Validar o IMO Number** de acordo com o formato oficial:
   - 7 dígitos + 1 dígito de controlo
   - Se o formato estiver errado, o sistema rejeita o registo

3. **Permitir pesquisas** por:
   - IMO Number
   - Name
   - Operator

---

## Arquitetura do Sistema (Sprint A)

O Port Authority Officer interage diretamente com a **REST API** usando ferramentas como **Postman**.

### Fluxo Simplificado

1. O Officer envia um pedido `POST /api/vessels` com os dados do navio (em JSON).
2. A REST API valida o IMO Number.
3. Se estiver tudo OK, o navio é guardado na Database.
4. A API responde com `201 Created`.

---

##  Diagramas Criados

Criei 3 diagramas de sequência para mostrar como o sistema funciona em diferentes níveis de detalhe:

### Nível 1 - Contexto (Visão Simples)

![Diagrama de Sequência - Nível 1](2.2.2%20-%20Create%20Vessel%20-%20Nível%201.png))

Este diagrama mostra o fluxo de forma muito simples:
- O Officer submete o registo do navio.
- O System valida internamente.
- O System confirma o registo.

---

### Nível 2 - Contentores (Visão Técnica)

![Diagrama de Sequência - Nível 2](2.2.2%20-%20Create%20Vessel%20-%20Nível%202.png)

Este diagrama mostra os componentes técnicos principais:
- **Port Authority Officer** envia os dados para a **REST API**.
- A **REST API** valida o IMO Number.
- A **REST API** guarda o navio na **Database**.
- A **REST API** responde com `201 Created`.

**Nota:** O Officer interage diretamente com a API.

---

### Nível 3 - Componentes (Visão Detalhada)

![Diagrama de Sequência - Nível 3](2.2.2%20-%20Create%20Vessel%20-%20Nível%203.png)
Este diagrama mostra os componentes internos da API:
- **API Controller** recebe o pedido.
- O **Fleet Management Service** valida o IMO Number.
- O **Data Access (Repository)** persiste os dados na Database.
- O sucesso é reportado de volta ao Officer.

---

##  Diagrama de Classes (Domínio)

O diagrama de classes mostra as entidades principais do domínio:

### Classe: Vessel

**Atributos:**
- `id : Guid` - Identificador único
- `imoNumber : ImoNumber` - Número IMO (Value Object)
- `name : string` - Nome do navio
- `type : string` - Tipo de navio
- `operator : string` - Operador/proprietário

**Métodos:**
- `UpdateDetails(name, type, operator)` - Atualiza os detalhes do navio

### Value Object: ImoNumber

**Responsabilidade:**
- Validação do formato **IMO Number** (7 dígitos + check digit).

---

##  Como Testar (Sprint A)

os testes são feitos diretamente na API:

### 1. Abrir o Postman

### 2. Enviar um pedido POST

***https://localhost:5001/api/vessels**

**Endpoint:** `POST /api/vessels`

**Body (JSON):**
```json
{
  "imoNumber": "IMO 9074729",
  "name": "MSC Gülsün",
  "VesselType": "Container Ship",
  "operator": "Mediterranean Shipping Company"
}
```

### 3. Verificar a resposta


**Sucesso:** `201 Created`
**Erro:** ` 400 Bad Request` (se o IMO Number não existir).
---

##  Justificação de Design (UpdateVesselDto)

Durante a implementação da funcionalidade de atualização (método `PUT`), foi necessário criar um novo Data Transfer Object (`UpdateVesselDto`) para substituir o `CreateVesselDto` no corpo do pedido.

**Motivação:**

A utilização do `CreateVesselDto` para a operação `PUT` resultava num erro de validação (HTTP 400 - Bad Request) porque o campo `ImoNumber` estava marcado com o atributo `[Required]` e não era enviado no corpo do pedido (uma vez que já é fornecido no URL).

**Solução:**

Para seguir o princípio de **segregação de responsabilidades** e evitar a sobrecarga de DTOs, foi criado o `UpdateVesselDto`. Este DTO contém apenas os campos que podem ser alterados (`Name`, `VesselType`, `Operator`) e não exige o `ImoNumber`, resolvendo o problema de validação.


| `CreateVesselDto` | `POST /api/vessels` (Registo) 
| `UpdateVesselDto` | `PUT /api/vessels/{imoNumber}` (Atualização) 

---

### 4. Enviar um pedido PUT (Atualização)

**https://localhost:5001/api/vessels/{imoNumber}**

**Endpoint:** `PUT /api/vessels/{imoNumber}`

**Body (JSON):**
```json
{
  "name": "MSC Gülsün (Updated)",
  "VesselType": "Ultra Large Container Ship",
  "operator": "MSC"
}
```

### 5. Verificar a resposta

**Sucesso:** `200 OK`
**Erro:** `404 Not Found` (se o IMO Number não existir).

---

### 6. Enviar um pedido GET

**https://localhost:5001/api/vessels/{imoNumber}**

**Endpoint:** `GET /api/vessels/{imoNumber}`







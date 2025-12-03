# User Story 2.2.9 - Update Vessel Visit Notification

**Autor:** [Nuno Silvano]  
**Data:** Outubro 2025

---

Esta user story permite que o **Shipping Agent Representative** (Representante do Agente de Navegação) **atualize** ou **complete** uma notificação de visita que já foi criada, mas que ainda está no estado **"in progress"**.

O objetivo é corrigir erros nos dados (como a lista de contentores) e, finalmente, mudar o estado para **"submitted"** para que a Autoridade Portuária possa começar a aprovação.

---

## Critérios de Aceitação

Para esta user story estar completa, o sistema deve:

1. **Permitir a atualização** apenas se o estado atual for **"in progress"**.
2. **Permitir a correção** de dados (ex: Cargo Manifest).
3. **Validar novamente** todos os dados submetidos (incluindo **Container Identifiers** pelo padrão **ISO 6346:2022**).
4. **Permitir a transição de estado** de **"in progress"** para **"submitted / approval pending"**.

---

## Fluxo Chave: Update (GET + PUT)

Ao contrário da criação (POST), a atualização é um processo de duas etapas:

1.  **GET:** O Agent primeiro pede os dados da visita existente.
2.  **PUT:** O Agent envia os dados atualizados, incluindo a mudança de estado (se aplicável).

---

## Diagramas Criados

Criei 3 diagramas de sequência para mostrar como o sistema funciona em diferentes níveis de detalhe:

### Nível 1 - Contexto (Visão Simples)

![Diagrama de Sequência - Nível 1](2.2.9%20-%20Update%20Visit%20Notification%20-%20Nível%201.png)

Este diagrama mostra o fluxo de forma muito simples:
- O Agent pede os detalhes da visita.
- O System retorna os detalhes.
- O Agent submete a atualização (com o novo estado).
- O System confirma a atualização.

---

### Nível 2 - Contentores (Visão Técnica)

![Diagrama de Sequência - Nível 2](2.2.9%20-%20Update%20Visit%20Notification%20-%20Nível%202.png)

Este diagrama mostra os componentes técnicos principais (sem Frontend):
- **Agent** envia um pedido **GET** para a **REST API**.
- A **REST API** consulta a **Database** e retorna os dados.
- O **Agent** envia um pedido **PUT** com os dados atualizados.
- A **REST API** valida os dados (ISO 6346) e atualiza a **Database**.
- A **REST API** responde com `200 OK`.

---

### Nível 3 - Componentes (Visão Detalhada)

![Diagrama de Sequência - Nível 3](2.2.9%20-%20Update%20Visit%20Notification%20-%20Nível%203.png)

Este diagrama mostra os componentes internos da API (o fluxo de erro está incluído aqui!):
- **GET:** O **API Controller** usa o **Visit Management Service** e o **Data Access** para buscar a visita.
- **PUT:** O **API Controller** recebe os dados atualizados.
- O **Visit Management Service** usa o **Cargo Management Service** para **revalidar** os contentores.
- **Se a validação falhar:** O erro é propagado de volta ao Agent (`400 Bad Request`).
- **Se a validação for bem-sucedida:** O **Data Access** atualiza a visita na **Database** (incluindo a mudança de estado para "submitted").

---

## Diagrama de Classes (Domínio)

Esta user story usa as mesmas classes principais criadas na 2.2.8:

### Classe: VisitNotification

**Atributos Chave:**
- `status : VisitStatus` (Enum: InProgress, Submitted, Approved, Rejected)
- `cargoManifest : List<Container>`

**Método Chave:**
- `UpdateDetails(newCargo, newStatus)`: Este método deve conter a lógica para verificar se o estado pode ser alterado de "in progress" para "submitted".

---

## Como Testar (Sprint A)

Os testes são feitos diretamente na API:

### 1. Criar a Visita (Usando 2.2.8)

**Endpoint:** `POST /api/visits`
**Body:** Crie uma visita que fique com `Status: In Progress`.

### 2. Atualizar a Visita (Usando 2.2.9)

**Endpoint:** `PUT /api/visits/{id}` (Substitua `{id}` pelo ID da visita criada)

**Body (JSON):**
```json
{
  "visitId": "ID da visita criada",
  "vesselId": "ID do navio",
  "eta": "2025-11-01T10:00:00Z",
  "cargoManifest": [
    // Lista de contentores corrigida e completa
  ],
  "status": "Submitted" // Mudar o estado
}
```

### 3. Verificar a resposta

**Sucesso:** `200 OK (Visit Updated)`
**Erro:** `400 Bad Request` (se a validação ISO 6346 falhar ou tentar mudar o estado de "Submitted" para outro).

# User Story 2.2.8 - Create Vessel Visit Notification

**Autor:** [Nuno Silvano]  
**Data:** Outubro 2025

---

Esta user story permite que o **Shipping Agent Representative** (Representante do Agente de Navegação) **crie e submeta** uma notificação de visita para um navio que está a chegar ao porto.

O objetivo é iniciar o processo de planeamento logístico, garantindo que o navio tem a documentação e os dados de carga corretos.

---

## Critérios de Aceitação

Para esta user story estar completa, o sistema deve:

1. **Incluir os dados do Cargo Manifest** (manifesto de carga) para loading e/ou unloading.
2. **Validar os Container Identifiers** de acordo com o padrão **ISO 6346:2022**.
3. **Permitir o estado "in progress"** se a informação estiver incompleta, para ser atualizada mais tarde (pela User Story 2.2.9).
4. **Permitir a transição de estado** para **"submitted"** quando a notificação estiver completa.

---

## Fluxo Chave: Criação (POST)

A criação é feita através de um único pedido:

1.  O Agent envia os dados da visita (Vessel, ETA, Cargo, etc.).
2.  O sistema valida os dados e cria a visita na Database.

---

## Diagramas Criados

Criei 3 diagramas de sequência para mostrar como o sistema funciona em diferentes níveis de detalhe:

### Nível 1 - Contexto (Visão Simples)

![Diagrama de Sequência - Nível 1](2.2.8%20-%20Create%20Visit%20Notification%20-%20Nível%201.png)

Este diagrama mostra o fluxo de forma muito simples:
- O Agent submete a notificação.
- O System valida os contentores.
- O System confirma a criação (Status: In Progress).

---

### Nível 2 - Contentores (Visão Técnica)

![Diagrama de Sequência - Nível 2](2.2.8%20-%20Create%20Visit%20Notification%20-%20Nível%202.png)

Este diagrama mostra os componentes técnicos principais:
- **Agent** envia um pedido **POST** para a **REST API**.
- A **REST API** valida os Container Identifiers.
- A **REST API** guarda a visita na **Database**.
- A **REST API** responde com `201 Created`.

---

### Nível 3 - Componentes (Visão Detalhada)

![Diagrama de Sequência - Nível 3](2.2.8%20-%20Create%20Visit%20Notification%20-%20Nível%203.png)

Este diagrama mostra os componentes internos da API (o fluxo de erro está incluído aqui!):
- **API Controller** recebe o pedido.
- O **Visit Management Service** usa o **Cargo Management Service** para **validar** os contentores.
- **Se a validação falhar:** O erro é propagado de volta ao Agent (`400 Bad Request`).
- **Se a validação for bem-sucedida:** O **Data Access** insere a nova visita na **Database** (Status: In Progress).

---

## Diagrama de Classes (Domínio)

Esta user story é a principal responsável por criar as seguintes entidades:

### Classe: VisitNotification

**Atributos Chave:**
- `status : VisitStatus` (Enum: InProgress, Submitted, Approved, Rejected)
- `cargoManifest : List<Container>`

**Método Chave:**
- `Create(vesselId, eta, etd, cargo)`: Este método deve garantir que o estado inicial é `InProgress` (a menos que seja explicitamente submetido).

### Value Object: ContainerIdentifier

**Responsabilidade:**
- É responsável por validar o formato **ISO 6346:2022** antes de a visita ser guardada na Database.

---

## 🧪 Como Testar (Sprint A)

Os testes são feitos diretamente na API:

### 1. Enviar um pedido POST

**Endpoint:** `POST /api/visits`

**Body (JSON):**
```json
{
  "vesselId": "ID do navio registado (2.2.2)",
  "eta": "2025-11-01T10:00:00Z",
  "etd": "2025-11-03T10:00:00Z",
  "cargoManifest": [
    { "identifier": "ABCD1234567", "weight": 20000, "type": "20ft" }
  ],
  "status": "InProgress" // Ou "Submitted"
}
```

### 2. Verificar a resposta

**Sucesso:** `201 Created`
**Erro:** `400 Bad Request` (se o Container Identifier for inválido).




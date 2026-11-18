# Modelo de dados Firestore

- `users/{uid}`: email, displayName, timestamps (metadados da conta).
- `users/{uid}/private/profile`: avaliação e preferências individuais.
- `users/{uid}/private/activePlan`: plano vigente.
- `users/{uid}/private/pendingPlan`: proposta de novo ciclo aguardando revisão.
- `users/{uid}/private/appData`: cópia sincronizada das chaves locais `shape*`.

Cada UID tem seu próprio espaço. Não grave dados de um usuário em documentos globais.

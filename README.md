# Shape 94 — Plataforma multiusuário (base v6)

Este pacote preserva o PWA original (treinos guiados, cronômetros, descanso flutuante, GIFs, dieta, cardio, evolução e compras) e adiciona a estrutura inicial para contas e sincronização Firebase.

## O que está pronto neste pacote
- PWA original preservado em `public/`.
- Tela de acesso com e-mail/senha, cadastro e recuperação de senha.
- Formulário inicial de perfil.
- Sincronização dos dados locais `shape*` para o Firestore após autenticação.
- Motor determinístico inicial de treinos por objetivo, experiência, dias e equipamento.
- Ciclo de 120 dias: cria uma proposta pendente para revisão; não troca silenciosamente o plano.
- Firestore Security Rules por usuário.
- GitHub Actions diário para criar propostas vencidas.
- Script para conceder custom claim administrativa.

## O que exige configuração externa
Este ZIP não cria nem publica o projeto Firebase por você. Antes de funcionar em modo multiusuário, configure o Firebase e o GitHub conforme abaixo. Não compartilhe credenciais privadas; `firebase-config.js` contém apenas a configuração pública do app web. A conta de serviço deve ficar somente em GitHub Secrets.

## 1. Firebase
1. Crie projeto em https://console.firebase.google.com/.
2. Ative Authentication → Sign-in method → Email/Password.
3. Crie Firestore Database em modo produção.
4. Em configurações do projeto, adicione um app Web e copie a configuração para `public/firebase-config.js`.
5. Publique regras: `firebase deploy --only firestore:rules` (ou cole `firestore.rules` no console).
6. Em Authentication → Settings → Authorized domains, inclua seu domínio GitHub Pages.
7. Publique `public/` no GitHub Pages (ou use Firebase Hosting).

## 2. GitHub Pages
Envie o conteúdo deste repositório. Em Settings → Pages, publique a branch `main`, pasta `/public`.
A URL do site deverá ser autorizada no Firebase Authentication.

## 3. Atualizador diário de ciclo
1. Gere uma chave JSON de conta de serviço no Firebase/Google Cloud (permissão mínima de leitura e gravação no Firestore).
2. No GitHub, Settings → Secrets and variables → Actions, crie `FIREBASE_SERVICE_ACCOUNT` com o JSON inteiro.
3. O workflow `.github/workflows/plan-cycle.yml` roda diariamente às 08:17 UTC e também pode ser iniciado manualmente.
4. Repositórios públicos podem usar GitHub Actions dentro das regras do GitHub. Agendamentos podem atrasar; a checagem no login funciona como fallback.
5. O job cria `pendingPlan` para revisão; não substitui o plano ativo automaticamente.

## 4. Administrador
Defina `FIREBASE_SERVICE_ACCOUNT` e `ADMIN_UID` no ambiente e rode `npm install && npm run admin`. O UID pode ser obtido em Firebase Authentication. A custom claim `admin` é necessária para futuras telas administrativas. Não conceda essa permissão a usuários comuns.

## 5. Migração do app instalado
- O primeiro login tenta importar os registros locais `shape*` para a conta. Faça login no mesmo navegador/PWA que contém seus dados atuais.
- Dados gravados antes do login não são automaticamente enviados até configurar Firebase e entrar.
- Depois do primeiro login, alterações nos itens `shape*` são sincronizadas com debounce.
- Para trocar de aparelho, entre na mesma conta e mantenha conexão para a primeira sincronização.
- Faça exportação/backup antes de atualizar a publicação. Não apague o app antigo até validar a migração.

## Limitações importantes desta versão
- O plano gerado é uma estrutura inicial de treino; ainda não substitui avaliação profissional nem possui validação clínica individual.
- O perfil coleta limitações, mas o gerador não prescreve exercícios terapêuticos. Pessoas com dor/lesão devem obter avaliação profissional.
- A tela atual de treinos A/B/C/D do PWA legado continua visível; a estrutura do plano personalizado é armazenada no Firestore, mas ainda precisa ser conectada visualmente à tela do executor de treinos.
- Nutrição ainda não calcula automaticamente calorias/macros nem gera cardápio individual completo; isso precisa ser implementado e validado em etapa própria.
- O painel administrativo de métricas detalhadas ainda não está concluído.
- Fotos corporais não são solicitadas nem sincronizadas nesta versão.
- Firestore tem cotas gratuitas limitadas e pode exigir cobrança se o uso crescer. Configure alertas de orçamento e regras de segurança.
- Não armazene informações médicas sensíveis além do estritamente necessário. Planeje consentimento, política de privacidade, exclusão/exportação de conta e adequação à LGPD antes de abrir ao público.

## Arquitetura
- Frontend: PWA estático.
- Auth: Firebase Authentication (e-mail/senha).
- Banco: Cloud Firestore com caminhos isolados por UID.
- Automação: GitHub Actions + Firebase Admin SDK.
- Regras: cada usuário acessa apenas seus próprios documentos; administrador via custom claim.

## Teste antes de divulgar
Crie duas contas de teste e confirme que uma não consegue ler os dados da outra; teste recuperação de senha, sincronização, offline, exportação, logout e ciclo vencido. Não divulgue publicamente até concluir esses testes.

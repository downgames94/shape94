# Projeto Shape 94 — PWA para iPhone (gratuito)

Este pacote transforma o aplicativo em um **Progressive Web App (PWA)**. Ele pode ser publicado gratuitamente no GitHub Pages e adicionado à Tela de Início do iPhone, sem App Store, Xcode ou assinatura Apple Developer.

## O que vem nesta pasta

- `index.html` — aplicativo Shape 94 (treino guiado, cronômetros, dieta, cardio, evolução e compras).
- `manifest.webmanifest` — nome, ícones e configuração de instalação.
- `service-worker.js` — armazena o núcleo do aplicativo para abrir novamente mesmo sem conexão.
- `icons/` — ícones para navegador e iPhone.

## Publicar gratuitamente no GitHub Pages

1. Entre em https://github.com e crie uma conta gratuita, se ainda não tiver.
2. Clique em **New repository**.
3. Dê um nome, por exemplo `projeto-shape-94`. Escolha **Public** e crie o repositório.
4. Descompacte este ZIP no computador. Abra a pasta `projeto-shape-94-pwa`.
5. No repositório do GitHub, clique em **Add file → Upload files**.
6. Envie o conteúdo da pasta (não envie apenas o ZIP): `index.html`, `manifest.webmanifest`, `service-worker.js`, `README.md`, `.nojekyll` e a pasta `icons` inteira.
7. Clique em **Commit changes**.
8. Abra **Settings → Pages**.
9. Em **Build and deployment**, selecione **Deploy from a branch**.
10. Escolha a branch `main` e a pasta `/(root)`, depois clique em **Save**.
11. Aguarde a publicação. O GitHub mostrará um endereço parecido com `https://SEU-USUARIO.github.io/projeto-shape-94/`.

A publicação pode levar alguns minutos. O endereço só passa a existir depois que você publicar no seu próprio GitHub; não há como gerar antecipadamente o seu link pessoal.

## Instalar no iPhone

1. Abra o endereço do GitHub Pages no **Safari** do iPhone (não dentro do navegador do Instagram, Facebook ou outro aplicativo).
2. Toque no botão **Compartilhar** (quadrado com seta para cima).
3. Role as opções e escolha **Adicionar à Tela de Início**.
4. Confirme o nome **Shape 94** e toque em **Adicionar**.
5. Abra o ícone Shape 94 que apareceu na Tela de Início. Ele abre em modo de aplicativo.

## Atualizar o aplicativo depois

Quando houver uma nova versão, substitua o `index.html` (e quaisquer arquivos alterados) no repositório e faça **Commit changes**. Feche o app no iPhone e abra novamente com internet. Se a versão antiga continuar aparecendo, feche o app, abra o endereço no Safari e recarregue a página; o Service Worker atualizará o cache.

## Importante sobre dados e privacidade

- O app salva dados no armazenamento local do navegador/aplicativo (`localStorage`). Não existe sincronização automática entre iPhone, computador ou navegadores.
- Limpar os dados do Safari, remover dados do site ou trocar o endereço/repositório pode apagar ou separar os registros. Exporte/guarde seus dados antes de limpar o navegador.
- Ao migrar do arquivo HTML aberto localmente para o endereço do GitHub Pages, os dados locais antigos não são transferidos automaticamente.
- O núcleo do app pode abrir offline depois de carregado e instalado. GIFs dos exercícios e recursos que dependem de serviços externos precisam de internet.
- Não inclua informações sensíveis. O repositório deve conter somente os arquivos do aplicativo, nunca dados pessoais exportados.

## Gratuito: o que isso significa

GitHub Pages está disponível gratuitamente para repositórios públicos em contas GitHub Free. O PWA é um site instalável, não um aplicativo nativo publicado na App Store. A instalação no iPhone é feita pelo Safari.

## Solução de problemas

- **Não aparece “Adicionar à Tela de Início”:** confirme que abriu no Safari e use o menu Compartilhar.
- **Abre como site, não como app:** confira se publicou `manifest.webmanifest`, ícones e `service-worker.js` na raiz e se está usando HTTPS do GitHub Pages.
- **Não atualizou:** abra o site no Safari com internet, recarregue e abra novamente o ícone.
- **GIF não aparece:** confira a conexão. As demonstrações são carregadas de um serviço externo e não fazem parte do cache offline.

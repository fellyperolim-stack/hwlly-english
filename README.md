# HWLLY | ENGLISH

Plano de listening em inglês de 6 meses, que fica mais difícil a cada mês (o Mês 1 tem 3 tarefas por dia e cada mês seguinte soma mais um desafio extra, chegando a 8 no Mês 6), com trilha de lições, 51 histórias com perguntas, cards de palavras (inglês e português) e frases com revisão espaçada, quiz, fala, modo áudio, ditado com voz sintetizada (sotaques americano, britânico e australiano), missões diárias e uma página de fontes de notícias, tecnologia, cultura e esportes em inglês.

## Idioma

O site abre em português (Brasil). Use as bandeiras 🇧🇷 PT e 🇺🇸 EN para trocar a página inteira para inglês; a escolha fica salva no aparelho. As traduções ficam em `data/i18n.js`: um dicionário de textos em português e seus equivalentes em inglês. Conteúdo que já é em inglês (histórias, frases e nomes de sites) não é alterado.

## Como usar

Abra o `index.html` no navegador ou acesse a versão publicada no GitHub Pages. Sem configuração, o progresso fica só no navegador (localStorage).

## Progresso em todos os aparelhos (Firebase)

1. Crie um projeto em https://console.firebase.google.com.
2. Em **Authentication → Sign-in method**, ative **Google**.
3. Em **Firestore Database**, crie o banco e, em **Rules**, use:
   ```
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /users/{uid}/{document=**} {
         allow read, write: if request.auth != null && request.auth.uid == uid;
       }
     }
   }
   ```
4. Em **Project settings → Your apps**, registre um app Web e copie o objeto `firebaseConfig`.
5. Em `index.html`, troque `const FIREBASE_CONFIG = null;` pelo objeto copiado.
6. Em **Settings → Pages** do repositório, publique a partir da branch `main`, pasta raiz.

Depois disso, clique em **Entrar com Google** em qualquer aparelho para ver o mesmo progresso.

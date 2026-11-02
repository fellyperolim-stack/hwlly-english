# HWLLY | ENGLISH

Plano de listening em inglês de 30 dias (30 minutos por dia), com calendário de tarefas, links de vídeos e leituras, e um treino de ditado com voz sintetizada (sotaques americano, britânico e australiano).

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

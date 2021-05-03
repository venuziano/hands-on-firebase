# teste-bycoders_

## Deploy da app realizada no link: https://dirty-plants.surge.sh/

Algumas observações:

* O PWA funciona tanto no Android como IOS, seja no chrome ou safari. O funcionamento do PWA no IOS é um pouco diferente. Para instalar o app, já que não é exibido a mensagem, é preciso clicar no ícone de "Compartilhar" do Safari, na sequência em "Adicionar a Tela de Início" e depois em "Adicionar". __OBS:__ A linha que ativa a função PWA está comentada, pois, O PWA está armazenando em cache aproximadamente 200mb a cada login com sucesso e aumenta conforme o mapa é renderizado, caso queira testar com ele, descomente a linha 23 (registerServiceWorker();) do index.js. É possível apagar o cache após o uso.
* Utilizei o Sentry no lugar do Crashylitcs. Não achei pra integrar em app web.
* Não defini as variáveis de ambiente do projeto do Firebase para que no seu teste não seja preciso configurar o seu ambiente do Firebase.

### Tela de Login:
![](github/singUp.png)

### Tela do Home:
![](github/home.png)

### Firebase Auth:
![](github/authentication.png)

### Firestore:
![](github/firestore.png)

### Analytics:
![](github/analytics.png)

![](github/analytics-2.png)

### Sentry para captura de erros:
![](github/sentry-errors.png)

### App PWA:
![](github/pwa.jpeg)

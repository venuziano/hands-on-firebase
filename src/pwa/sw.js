export const registerServiceWorker = () => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js').then(function (registration) {
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    })
      .then(registration => navigator.serviceWorker.ready)
      .catch(function (err) {
        console.log('ServiceWorker registration failed: ', err);
        alert('Navegador sem suporte ao sw!')
      })
  }
}
// Define um nome e versão para o nosso cache
const CACHE_NAME = 'mapeador-switch-cache-v1';

// Lista de arquivos que queremos salvar em cache para uso offline
const urlsToCache = [
  '.', // Representa o diretório raiz (nossa index.html)
  'index.html',
  'style.css',
  'script.js',
  'icon-192.png',
  'manifest.json'
];

// Evento 'install': é disparado quando o Service Worker é instalado pela primeira vez.
self.addEventListener('install', event => {
  // Espera até que o cache seja aberto e todos os nossos arquivos sejam adicionados a ele.
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache aberto');
        return cache.addAll(urlsToCache);
      })
  );
});

// Evento 'fetch': é disparado toda vez que o app tenta buscar um arquivo (uma página, um css, uma imagem).
self.addEventListener('fetch', event => {
  event.respondWith(
    // Tenta encontrar o arquivo no cache primeiro.
    caches.match(event.request)
      .then(response => {
        // Se o arquivo for encontrado no cache, retorna ele.
        if (response) {
          return response;
        }
        // Se não for encontrado no cache, busca na rede.
        return fetch(event.request);
      }
    )
  );
});

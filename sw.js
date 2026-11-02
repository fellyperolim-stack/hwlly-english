// Service worker do HWLLY | ENGLISH: deixa o app abrir sem internet depois da primeira visita.
// Com internet, sempre busca a versão mais nova (sem usar cópia velha do navegador); sem internet, usa a cópia guardada.
const CACHE = "hwlly-v11";
const SHELL = ["./", "./index.html", "./novidades.html", "./manifest.json",
  "./recursos.html", "./fontes.html", "./data/i18n.js", "./data/deck.js", "./data/stories.js", "./data/frases_pt.js", "./data/features.json",
  "./icons/icon-192.png", "./icons/icon-512.png", "./icons/apple-touch-icon.png"];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => Promise.all(SHELL.map((u) => c.add(new Request(u, { cache: "reload" }))))));
  self.skipWaiting();
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return; // fontes e Firebase seguem direto pela rede
  e.respondWith(
    fetch(new Request(req.url, { cache: "no-cache", credentials: "same-origin" }))
      .then((res) => {
        if (res && res.ok) { const copy = res.clone(); caches.open(CACHE).then((c) => c.put(req, copy)); }
        return res;
      })
      .catch(() => caches.match(req).then((r) => r || (req.mode === "navigate" ? caches.match("./index.html") : undefined)))
  );
});

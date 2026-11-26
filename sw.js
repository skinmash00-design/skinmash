/* SKIN MASH - service worker للعملاء (إشعارات خارجية). حطه في نفس فولدر index.html */
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", e => e.waitUntil(self.clients.claim()));

self.addEventListener("push", e => {
  let d = {}; try { d = e.data.json(); } catch (x) {}
  e.waitUntil(self.registration.showNotification(d.title || "SKIN MASH", {
    body: d.body || "", icon: "favicon-512.png", badge: "favicon.png",
    tag: d.tag, renotify: !!d.tag, dir: "auto", lang: d.lang || "ar",
    data: { url: d.url || "./" }
  }));
});

self.addEventListener("notificationclick", e => {
  e.notification.close();
  const base = self.registration.scope;
  const u = new URL((e.notification.data && e.notification.data.url) || "./", base).href;
  e.waitUntil(clients.matchAll({ type: "window", includeUncontrolled: true }).then(list => {
    for (const c of list) {
      if (c.url.startsWith(base) && !c.url.startsWith(base + "admin") && "focus" in c) {
        c.postMessage({ type: "open-messages" });   // الموقع بيفتح صفحة الرسائل
        return c.focus();
      }
    }
    return clients.openWindow(u);
  }));
});

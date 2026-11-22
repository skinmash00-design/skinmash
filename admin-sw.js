self.addEventListener("push", e => { let d = {}; try { d = e.data.json(); } catch (x) {}
  e.waitUntil(self.registration.showNotification(d.title || "SKIN MASH", { body: d.body || "", icon: "favicon-512.png", badge: "favicon.png", tag: d.tag, data: { url: d.url || "admin.html" } })); });
self.addEventListener("notificationclick", e => { e.notification.close();
  const base = self.registration.scope.replace(/admin-push\/$/, ""), u = new URL(e.notification.data.url, base).href;
  e.waitUntil(clients.matchAll({ type: "window", includeUncontrolled: true }).then(l => { for (const c of l) if (c.url.startsWith(base + "admin.html") && "focus" in c) return c.focus(); return clients.openWindow(u); })); });

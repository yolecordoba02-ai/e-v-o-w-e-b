export function getOrCreateDeviceId(): string {
  if (typeof window === 'undefined') {
    return 'server-device';
  }

  const storageKey = 'evoweb_device_id';
  let existing = window.localStorage.getItem(storageKey);
  if (existing) {
    return existing;
  }

  const newId = crypto.randomUUID?.() ?? Math.random().toString(36).slice(2) + Date.now().toString(36);
  window.localStorage.setItem(storageKey, newId);
  return newId;
}

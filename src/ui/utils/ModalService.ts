type ModalCallbacks = {
  [action: string]: (...args: any[]) => any;
};

const registry: Record<string, ModalCallbacks> = {};

export function registerModalCallbacks(name: string, callbacks: ModalCallbacks) {
  registry[name] = { ...(registry[name] || {}), ...callbacks };
}

export function unregisterModalCallbacks(name: string) {
  delete registry[name];
}

export function getModalCallback(name: string, action: string) {
  return registry[name]?.[action];
}

export function callModalCallback(name: string, action: string, ...args: any[]) {
  const cb = getModalCallback(name, action);
  if (typeof cb === 'function') return cb(...args);
  return undefined;
}

export default {
  registerModalCallbacks,
  unregisterModalCallbacks,
  getModalCallback,
  callModalCallback,
};

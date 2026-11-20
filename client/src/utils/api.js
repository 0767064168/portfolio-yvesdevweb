export const apiBase = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/$/, '');
export const assetBase = (import.meta.env.VITE_ASSETS_BASE_URL || apiBase || '').replace(/\/$/, '');

export const apiUrl = (path) => {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  if (!apiBase) return normalized;
  return `${apiBase}${normalized.startsWith('/api') ? normalized : `/api${normalized}`}`;
};

export const api = async (url, options = {}) => {
  const response = await fetch(apiUrl(url), {
    credentials: apiBase ? 'include' : 'same-origin',
    ...options,
    headers: { ...(options.body instanceof FormData ? {} : { 'Content-Type': 'application/json' }), ...options.headers }
  });
  const contentType = response.headers.get('content-type') || '';
  if (response.status !== 204 && !contentType.includes('application/json')) {
    throw new Error('Réponse non JSON reçue du serveur.');
  }
  const data = response.status === 204 ? {} : await response.json();
  if (!response.ok) throw new Error(data.error || 'La requête a échoué.');
  return data;
};

export const asset = (url) => {
  if (!url) return '';
  if (/^(https?:|data:|\/)/i.test(url)) return url;
  const normalized = url.replace(/^\/+/u, '');
  return assetBase ? `${assetBase}/${normalized}` : `/${normalized}`;
};

type ApiRequestOptions = Omit<RequestInit, 'body'> & {
  body?: unknown;
  attachments?: Record<string, File | Blob>;
};

export async function apiClient<T>(
  path: string,
  options: ApiRequestOptions = {}
): Promise<T> {
  const { body, attachments, headers, ...rest } = options;

  const finalHeaders: Record<string, string> = {
    ...(headers instanceof Headers ? Object.fromEntries(headers.entries()) : (headers as Record<string, string>) || {}),
  };

  let finalBody: BodyInit | undefined;

  if (attachments) {
    const formData = new FormData();

    Object.entries(attachments).forEach(([key, file]) => {
      formData.append(key, file);
    });

    if (body && typeof body === 'object' && !Array.isArray(body)) {
      Object.entries(body as Record<string, unknown>).forEach(([key, value]) => {
        if (value != null) {
          formData.append(key, String(value));
        }
      });
    }

    finalBody = formData;
    delete finalHeaders['Content-Type'];
  } else if (body !== undefined) {
    finalBody = JSON.stringify(body);
    finalHeaders['Content-Type'] = 'application/json';
  }

  const response = await fetch(`/api/proxy${path}`, {
    ...rest,
    credentials: 'include',
    headers: finalHeaders,
    body: finalBody,
    cache: 'no-store',
  });

  if (!response.ok) {
    let errorMessage = `Request failed: ${response.status}`;

    try {
      const errorData = await response.json();
      errorMessage = errorData?.error || errorData?.message || errorMessage;
    } catch {}

    throw new Error(errorMessage);
  }

  const contentType = response.headers.get('content-type') || '';

  if (contentType.includes('application/json')) {
    return response.json();
  }

  return response.text() as Promise<T>;
}

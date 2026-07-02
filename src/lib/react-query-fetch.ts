export async function rqFetch<T = unknown>(
	url: string,
	signal: AbortSignal,
): Promise<T> {
	const res = await fetch(url, { signal });

	if (!res.ok) {
		const body = await res.json().catch(() => null);
		throw new Error(body?.error ?? `HTTP ${res.status}`);
	}

	return res.json();
}

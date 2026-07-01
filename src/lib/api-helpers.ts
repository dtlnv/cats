import { AVAILABLE_LIMITS, DEFAULT_LIMIT } from "./consts";

export function resolveLimit(userLimit: number): number {
	return AVAILABLE_LIMITS.includes(userLimit) ? userLimit : DEFAULT_LIMIT;
}

export function getStatusCode(error: unknown): number {
	if (error instanceof Error) {
		if (error.message.includes("not found") || error.message.includes("404")) {
			return 404;
		}
	}
	return 502;
}

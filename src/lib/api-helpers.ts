import { AVAILABLE_LIMITS, DEFAULT_LIMIT } from "./consts";

export function resolveLimit(userLimit: number): number {
	return AVAILABLE_LIMITS.includes(userLimit) ? userLimit : DEFAULT_LIMIT;
}

export function getStatusCode(error: unknown): number {
	const statusCode =
		error && typeof error === "object" && "statusCode" in error
			? (error as { statusCode?: unknown }).statusCode
			: undefined;

	if (typeof statusCode === "number" && Number.isFinite(statusCode)) {
		return statusCode;
	}

	if (error instanceof Error) {
		if (error.message.includes("not found") || error.message.includes("404")) {
			return 404;
		}
	}

	return 502;
}

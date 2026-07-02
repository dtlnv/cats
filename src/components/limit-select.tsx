import { AVAILABLE_LIMITS, DEFAULT_LIMIT } from "@/lib/consts";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "./ui/select";

type LimitSelectProps = {
	limit: number;
	onUpdateLimit: (s: string) => void;
	disabled?: boolean;
};

export function LimitSelect({
	limit,
	onUpdateLimit,
	disabled,
}: LimitSelectProps) {
	return (
		<div className="flex gap-2 items-center mb-4">
			<span className="text-xs font-medium text-muted-foreground">Limit:</span>
			<Select
				value={String(limit)}
				onValueChange={(value) => onUpdateLimit(value)}
				disabled={disabled}
			>
				<SelectTrigger className="max-h-7">
					<SelectValue />
				</SelectTrigger>
				<SelectContent>
					<SelectGroup>
						{AVAILABLE_LIMITS.map((number) => (
							<SelectItem key={number} value={String(number)}>
								{number === DEFAULT_LIMIT
									? `${number} (Default)`
									: String(number)}
							</SelectItem>
						))}
					</SelectGroup>
				</SelectContent>
			</Select>
		</div>
	);
}

import { AVAILABLE_LIMITS, DEFAULT_LIMIT } from "@/lib/consts";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { useLimitContext } from "@/providers/limit-provider";

export function LimitSelect() {
    const { limit, onUpdateLimit } = useLimitContext();

    return (
        <div className="flex gap-2 items-center">
            Limit:
            <Select value={String(limit)} onValueChange={(value) => onUpdateLimit(value)}>
                <SelectTrigger>
                    <SelectValue />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        {AVAILABLE_LIMITS.map((number) => <SelectItem key={number} value={String(number)}>{number === DEFAULT_LIMIT ? `${number} (Default)` : String(number)}</SelectItem>)}
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div >
    );
}

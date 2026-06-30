import logo from "@/assets/logo-small.png";
import { SearchForm } from "./search-form";
import { APP_NAME } from "@/lib/consts";

export function Header() {
    return (
        <header className="mb-12 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
                <img src={logo} alt={APP_NAME} className="size-8" />
                <span className="font-mono text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
                    {APP_NAME}
                </span>
            </div>
            <SearchForm />
        </header>
    );
}
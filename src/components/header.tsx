import logo from "@/assets/logo-small.png";
import { APP_NAME } from "@/lib/consts";
import { LimitSelect } from "./limit-select";
import { Loader } from "lucide-react";
import { Link } from "react-router-dom";
import { TopLoader } from "./top-loader";

export function Header({ loading = false }: { loading?: boolean }) {
    return (
        <header className="mb-12 flex items-center justify-between">
            {loading && <TopLoader />}

            <Link to={'/'}>
                <div className="flex items-center gap-2.5">
                    {loading ? <Loader className="animate-spin w-8 h-8" /> : <img src={logo} alt={APP_NAME} className="size-8" />}
                    <span className="font-mono text-xs font-medium tracking-[0.18em] text-muted-foreground">
                        {APP_NAME}
                    </span>
                </div>
            </Link>
            <LimitSelect />
        </header>
    );
}

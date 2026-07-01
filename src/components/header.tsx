import { Heart, Home, Loader, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "@/assets/logo-small.png";
import { APP_NAME } from "@/lib/consts";
import { NavElement } from "./nav-element";
import { TopLoader } from "./top-loader";

type HeaderProps = {
	loading?: boolean;
};

export function Header({ loading = false }: HeaderProps) {
	return (
		<header className="mb-12 flex items-center justify-between">
			{loading && <TopLoader />}

			<Link to={"/"}>
				<div className="flex items-center gap-2.5">
					{loading ? (
						<Loader className="animate-spin w-8 h-8" />
					) : (
						<img src={logo} alt={APP_NAME} className="size-8" />
					)}
					<span className="font-mono text-xs font-medium tracking-[0.18em] text-muted-foreground">
						{APP_NAME}
					</span>
				</div>
			</Link>
			<nav className="flex items-center gap-8">
				<NavElement
					link={"/"}
					icon={<Home className="w-4 h-4" />}
					label={"Home"}
				/>
				<NavElement
					link={"/favs"}
					icon={<Heart className="w-4 h-4" />}
					label={"Favorites"}
				/>
				<NavElement
					link={"/random"}
					icon={<Sparkles className="w-4 h-4" />}
					label={"I'm Feeling Lucky"}
				/>
			</nav>
		</header>
	);
}

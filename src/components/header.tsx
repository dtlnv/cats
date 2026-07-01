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
		<header className="mb-12 flex flex-wrap items-center justify-between gap-4">
			{loading && <TopLoader />}

			<Link to={"/"}>
				<div className="flex items-center gap-2.5">
					{loading ? (
						<Loader className="animate-spin w-12 h-12" />
					) : (
						<img src={logo} alt={APP_NAME} className="size-12" />
					)}
					<span className="font-mono text-lg font-medium tracking-[0.18em] text-muted-foreground">
						{APP_NAME}
					</span>
				</div>
			</Link>
			<nav className="flex items-center gap-4 sm:gap-8">
				<NavElement
					link={"/"}
					icon={<Home className="w-4 h-4" />}
					label={"Home"}
				/>
				<NavElement
					link={"/favs"}
					icon={<Heart className="w-4 h-4" />}
					label={"Favourites"}
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

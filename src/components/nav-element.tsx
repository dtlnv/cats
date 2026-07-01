import { Link } from "react-router-dom";

type NavElementProps = {
	link: string;
	icon: React.ReactNode;
	label: string;
};

export function NavElement({ link, icon, label }: NavElementProps) {
	return (
		<Link to={link}>
			<div className="flex items-center gap-2 text-muted-foreground hover:text-orange-600 transition-colors">
				{icon}
				<span className="hidden font-mono text-xs font-medium sm:inline">
					{label}
				</span>
			</div>
		</Link>
	);
}

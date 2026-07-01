import { Header } from "@/components/header";

type LayoutProps = {
	children?: React.ReactNode;
	loading?: boolean;
};

export function Layout({ children, loading }: LayoutProps) {
	return (
		<div className="min-h-svh bg-background text-foreground">
			<div className="mx-auto w-full max-w-[76rem] px-4 py-8 sm:px-6 sm:py-12 md:px-6 md:py-16">
				<Header loading={loading} />
				{children}
			</div>
		</div>
	);
}

import { Link } from "waku";

export const Header = () => {
	return (
		<header className="fixed top-0 w-full flex items-center gap-4 p-6 lg:fixed lg:left-0 lg:top-0 bg-background/90 text-foreground">
			<div className="flex items-center justify-center">
				<h2 className="text-lg font-bold tracking-tight">
					<Link to="/" className="px-4 py-2">
						Smite 2 Gods
					</Link>
				</h2>
			</div>
			<nav className="flex items-center justify-center gap-4 ml-auto">
				<Link
					to="/gods"
					className="px-4 py-2 border rounded-md bg-background"
				>
					Gods
				</Link>
			</nav>
		</header>
	);
};

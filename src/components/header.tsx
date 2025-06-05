import { Link } from 'waku';

export const Header = () => {
  return (
    <header className="bg-background/90 text-foreground fixed top-0 flex w-full items-center gap-4 p-6 lg:fixed lg:top-0 lg:left-0">
      <div className="flex items-center justify-center">
        <h2 className="text-lg font-bold tracking-tight">
          <Link to="/" className="px-4 py-2">
            Smite 2 Gods
          </Link>
        </h2>
      </div>
      <nav className="ml-auto flex items-center justify-center gap-4">
        <Link to="/gods" className="bg-background rounded-md border px-4 py-2">
          Gods
        </Link>
      </nav>
    </header>
  );
};

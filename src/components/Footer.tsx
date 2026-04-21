interface FooterProps {
  built: string;
  rights: string;
}

export function Footer({ built, rights }: FooterProps) {
  return (
    <footer className="border-t border-border px-6 py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 text-xs text-muted/60 sm:flex-row">
        <p>{built}</p>
        <p>
          &copy; {new Date().getFullYear()} Artur Guerra. {rights}
        </p>
      </div>
    </footer>
  );
}

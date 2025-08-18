interface MainProps {
  children: React.ReactNode;
}

export function Main({ children }: MainProps) {
  return (
    <main className="flex-1 overflow-auto bg-background">
      <div className="h-full flex justify-center">
        <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
          <div className="mx-auto max-w-4xl">{children}</div>
        </div>
      </div>
    </main>
  );
}

export default function Home() {
  return (
    <main className="flex min-h-screen flex-1 flex-col items-center justify-center px-6">
      <div className="flex flex-col items-center gap-3 text-center">
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">
          Design system online
        </p>
        <h1 className="text-5xl font-medium tracking-tight">Jerry Kou</h1>
        <p className="text-lg text-muted-foreground">
          AI-native product designer. I design, code, and ship.
        </p>
      </div>
    </main>
  );
}

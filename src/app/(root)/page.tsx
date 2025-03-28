export default async function HomePage() {
  return (
    <section className="container mx-auto py-12 md:py-24 lg:py-32">
      <div className="mx-auto flex max-w-[980px] flex-col items-center gap-4 text-center">
        <h1 className="text-3xl font-bold leading-tight tracking-tighter md:text-5xl lg:text-6xl">
          Your Landing Page Headline
        </h1>
        <p className="max-w-[700px] text-lg text-muted-foreground md:text-xl">
          A brief description of your product or service. Highlight the key benefits and value
          proposition.
        </p>
      </div>
    </section>
  );
}

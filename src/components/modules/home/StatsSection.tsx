export function StatsSection() {
  return (
    <section className="border-y border-y-primary/40 bg-primary/20">
      <div className="wrapper">
        <ul className="grid grid-cols-2 gap-8 py-12 md:grid-cols-4">
          <li className="flex flex-col items-center text-center">
            <div className="text-3xl font-bold md:text-4xl">10K+</div>
            <p className="text-muted-foreground">Active Users</p>
          </li>
          <li className="flex flex-col items-center text-center">
            <div className="text-3xl font-bold md:text-4xl">50K+</div>
            <p className="text-muted-foreground">Recipes Created</p>
          </li>
          <li className="flex flex-col items-center text-center">
            <div className="text-3xl font-bold md:text-4xl">100K+</div>
            <p className="text-muted-foreground">Meals Planned</p>
          </li>
          <li className="flex flex-col items-center text-center">
            <div className="text-3xl font-bold md:text-4xl">4.8/5</div>
            <p className="text-muted-foreground">User Rating</p>
          </li>
        </ul>
      </div>
    </section>
  );
}

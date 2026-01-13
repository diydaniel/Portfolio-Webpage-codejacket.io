import React from "react";

type PropsWithChildren = { children: React.ReactNode };

const Container = ({ children }: PropsWithChildren) => (
  <div className="mx-auto w-full max-w-5xl px-5 sm:px-8">{children}</div>
);

const Button = ({
  children,
  href = "#get-started",
  variant = "primary",
}: PropsWithChildren & { href?: string; variant?: "primary" | "secondary" }) => {
  const base =
    "inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-slate-400";
  const styles =
    variant === "primary"
      ? "bg-slate-900 text-white hover:bg-slate-800"
      : "bg-white text-slate-900 ring-1 ring-slate-200 hover:bg-slate-50";
  return (
    <a href={href} className={`${base} ${styles}`}>
      {children}
    </a>
  );
};

const Divider = () => <div className="my-12 h-px w-full bg-slate-200" />;

const Feature = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="space-y-2">
    <h3 className="text-sm font-semibold text-slate-900">{title}</h3>
    <p className="text-sm leading-relaxed text-slate-600">{children}</p>
  </div>
);

const Pill = ({ children }: PropsWithChildren) => (
  <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
    {children}
  </span>
);

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      {/* Top nav */}
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/80 backdrop-blur">
        <Container>
          <div className="flex items-center justify-between py-4">
            <a href="#" className="flex items-center gap-3">
              <div className="grid h-9 w-9 place-items-center rounded-xl bg-slate-900 text-white">
                <span className="text-xs font-bold">CJ</span>
              </div>
              <div className="leading-tight">
                <div className="text-sm font-semibold">CodeJacket</div>
                <div className="text-xs text-slate-500">IT Learning Hub</div>
              </div>
            </a>

            <nav className="hidden items-center gap-6 md:flex">
              <a href="#why" className="text-sm text-slate-600 hover:text-slate-900">
                Why LPIC
              </a>
              <a href="#track" className="text-sm text-slate-600 hover:text-slate-900">
                Track
              </a>
              <a href="#get-started" className="text-sm text-slate-600 hover:text-slate-900">
                Get started
              </a>
            </nav>

            <div className="flex items-center gap-3">
              <Button href="#get-started" variant="secondary">
                View roadmap
              </Button>
              <Button href="#get-started" variant="primary">
                Start
              </Button>
            </div>
          </div>
        </Container>
      </header>

      {/* Hero */}
      <main>
        <section className="py-14 sm:py-20">
          <Container>
            <div className="space-y-6">
              <div className="flex flex-wrap gap-2">
                <Pill>Linux-first</Pill>
                <Pill>Lab-driven</Pill>
                <Pill>Built for job skills</Pill>
              </div>

              <h1 className="max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl">
                Learn IT with a clean path: <span className="text-slate-700">Linux + LPIC</span> first.
              </h1>

              <p className="max-w-2xl text-base leading-relaxed text-slate-600">
                CodeJacket is a minimalist learning hub for mastering real IT fundamentals. Start with LPIC-aligned Linux
                skills—command line, systems, troubleshooting—then expand into networking, cloud, security, and automation.
              </p>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <Button href="#get-started" variant="primary">
                  Start the LPIC track
                </Button>
                <Button href="#why" variant="secondary">
                  Why LPIC works
                </Button>
              </div>

              <p className="text-xs text-slate-500">
                Debian-based labs for stability; concepts transfer to Ubuntu and enterprise Linux.
              </p>
            </div>
          </Container>
        </section>

        <Container>
          <Divider />
        </Container>

        {/* Why */}
        <section id="why" className="py-2">
          <Container>
            <div className="grid gap-10 md:grid-cols-2">
              <div className="space-y-3">
                <p className="text-xs font-semibold tracking-widest text-slate-500">WHY LPIC</p>
                <h2 className="text-2xl font-semibold tracking-tight">LPIC gives you structure—and real skills.</h2>
                <p className="text-sm leading-relaxed text-slate-600">
                  LPIC is objective-based and progressive. You’re not guessing what to learn next: you build fundamentals
                  you’ll use in real environments, and the certification becomes the byproduct of competence.
                </p>
              </div>

              <div className="grid gap-6">
                <Feature title="Practical command line fluency">
                  Get fast with the tools admins actually use: navigation, permissions, processes, packages, services.
                </Feature>
                <Feature title="Troubleshooting mindset">
                  Learn how to observe, isolate, test, and fix issues—skills that transfer to every IT domain.
                </Feature>
                <Feature title="Credible milestones">
                  Certifications help you communicate your level clearly while you build a portfolio of labs and notes.
                </Feature>
              </div>
            </div>
          </Container>
        </section>

        <Container>
          <Divider />
        </Container>

        {/* Track */}
        <section id="track" className="py-2">
          <Container>
            <div className="space-y-8">
              <div className="space-y-3">
                <p className="text-xs font-semibold tracking-widest text-slate-500">TRACK</p>
                <h2 className="text-2xl font-semibold tracking-tight">Start where you are. Move up when ready.</h2>
                <p className="text-sm leading-relaxed text-slate-600">
                  A simple ladder from fundamentals to advanced administration.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  {
                    level: "1",
                    title: "Linux Essentials",
                    desc: "Beginner-friendly entry point: core concepts, CLI basics, open source fundamentals.",
                  },
                  {
                    level: "2",
                    title: "LPIC-1",
                    desc: "Junior admin skills: install, maintain, users/groups, permissions, processes, networking basics.",
                  },
                  {
                    level: "3",
                    title: "LPIC-2",
                    desc: "Advanced admin: services, storage, networking, automation across multiple systems.",
                  },
                  {
                    level: "4",
                    title: "LPIC-3",
                    desc: "Enterprise specialties: security, mixed environments, virtualization, availability.",
                  },
                ].map((x) => (
                  <div key={x.level} className="rounded-2xl border border-slate-200 p-5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="grid h-8 w-8 place-items-center rounded-xl bg-slate-900 text-xs font-bold text-white">
                          {x.level}
                        </span>
                        <h3 className="text-sm font-semibold">{x.title}</h3>
                      </div>
                      <span className="text-xs text-slate-500">LPIC</span>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-slate-600">{x.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </section>

        <Container>
          <Divider />
        </Container>

        {/* Get started */}
        <section id="get-started" className="py-2 pb-16">
          <Container>
            <div className="rounded-3xl border border-slate-200 p-7 sm:p-10">
              <div className="grid items-center gap-6 md:grid-cols-2">
                <div className="space-y-3">
                  <p className="text-xs font-semibold tracking-widest text-slate-500">GET STARTED</p>
                  <h2 className="text-2xl font-semibold tracking-tight">Get the free LPIC roadmap</h2>
                  <p className="text-sm leading-relaxed text-slate-600">
                    A clean checklist-style plan you can follow daily: labs, drills, and milestones.
                  </p>
                </div>

                <div className="space-y-3 md:justify-self-end">
                  <div className="flex flex-col gap-3 sm:flex-row">
                    <input
                      type="email"
                      placeholder="Email address"
                      className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-slate-300"
                    />
                    <button
                      type="button"
                      className="rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-400"
                      onClick={() => window.alert("Hook this up to your email provider when ready.")}
                    >
                      Send
                    </button>
                  </div>
                  <p className="text-xs text-slate-500">(UI only for now — connect ConvertKit/Mailchimp later.)</p>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* Footer */}
        <footer className="border-t border-slate-200 py-10">
          <Container>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs text-slate-500">
                © {new Date().getFullYear()} CodeJacket.io — Learn IT. Build skill. Prove it.
              </p>
              <div className="flex gap-4 text-xs text-slate-600">
                <a className="hover:text-slate-900" href="#why">
                  Why LPIC
                </a>
                <a className="hover:text-slate-900" href="#track">
                  Track
                </a>
                <a className="hover:text-slate-900" href="#get-started">
                  Get started
                </a>
              </div>
            </div>
          </Container>
        </footer>
      </main>
    </div>
  );
}

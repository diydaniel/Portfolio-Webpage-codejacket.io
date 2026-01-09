import React from "react";

type PropsWithChildren = { children: React.ReactNode };

const Badge = ({ children }: PropsWithChildren) => (
  <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-white/80 backdrop-blur">
    {children}
  </span>
);

type CTAButtonProps = PropsWithChildren & {
  href?: string;
  variant?: "primary" | "secondary";
};

const CTAButton = ({ href = "#get-started", children, variant = "primary" }: CTAButtonProps) => {
  const base =
    "inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-950";
  const styles =
    variant === "primary"
      ? "bg-white text-slate-950 hover:bg-white/90 focus:ring-white"
      : "border border-white/15 bg-white/5 text-white hover:bg-white/10 focus:ring-white/60";
  return (
    <a href={href} className={`${base} ${styles}`}>
      {children}
    </a>
  );
};

type SectionProps = {
  id: string;
  eyebrow?: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
};

const Section = ({ id, eyebrow, title, subtitle, children }: SectionProps) => (
  <section id={id} className="py-16 sm:py-20">
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl">
        {eyebrow ? (
          <p className="text-xs font-semibold tracking-widest text-white/60">{eyebrow}</p>
        ) : null}
        <h2 className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl">{title}</h2>
        {subtitle ? (
          <p className="mt-4 text-base leading-relaxed text-white/70">{subtitle}</p>
        ) : null}
      </div>
      <div className="mt-10">{children}</div>
    </div>
  </section>
);

type CardProps = PropsWithChildren & {
  title: string;
  icon: string;
};

const Card = ({ title, children, icon }: CardProps) => (
  <div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-sm backdrop-blur">
    <div className="flex items-start gap-4">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5">
        <span className="text-lg">{icon}</span>
      </div>
      <div>
        <h3 className="text-base font-semibold text-white">{title}</h3>
        <div className="mt-2 text-sm leading-relaxed text-white/70">{children}</div>
      </div>
    </div>
  </div>
);

type LadderItemProps = {
  level: string;
  title: string;
  desc: string;
};

const LadderItem = ({ level, title, desc }: LadderItemProps) => (
  <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
    <div className="flex items-center justify-between gap-3">
      <div className="flex items-center gap-3">
        <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-xs font-bold text-white/80">
          {level}
        </span>
        <h3 className="text-base font-semibold text-white">{title}</h3>
      </div>
      <span className="text-xs text-white/50">LPIC Track</span>
    </div>
    <p className="mt-3 text-sm leading-relaxed text-white/70">{desc}</p>
  </div>
);

type FAQItemProps = {
  q: string;
  a: string;
};

const FAQItem = ({ q, a }: FAQItemProps) => (
  <details className="group rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
    <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
      <span className="text-sm font-semibold text-white">{q}</span>
      <span className="text-white/60 transition group-open:rotate-45">+</span>
    </summary>
    <p className="mt-4 text-sm leading-relaxed text-white/70">{a}</p>
  </details>
);

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Background accents */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-24 left-1/2 h-72 w-[40rem] -translate-x-1/2 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute top-48 right-[-10rem] h-72 w-72 rounded-full bg-white/5 blur-3xl" />
        <div className="absolute bottom-[-8rem] left-[-8rem] h-72 w-72 rounded-full bg-white/5 blur-3xl" />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/70 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <a href="#" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5">
              <span className="text-sm font-bold">CJ</span>
            </div>
            <span className="text-sm font-semibold tracking-tight">CodeJacket</span>
            <span className="hidden text-xs text-white/50 sm:inline">• IT Learning Hub</span>
          </a>

          <nav className="hidden items-center gap-6 md:flex">
            <a href="#why-linux" className="text-sm text-white/70 hover:text-white">
              Why Linux
            </a>
            <a href="#benefits" className="text-sm text-white/70 hover:text-white">
              Benefits
            </a>
            <a href="#lpic-track" className="text-sm text-white/70 hover:text-white">
              LPIC Track
            </a>
            <a href="#how-it-works" className="text-sm text-white/70 hover:text-white">
              How it works
            </a>
            <a href="#faq" className="text-sm text-white/70 hover:text-white">
              FAQ
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <CTAButton href="#get-started" variant="secondary">
              View Roadmap
            </CTAButton>
            <CTAButton href="#get-started" variant="primary">
              Start LPIC Track
            </CTAButton>
          </div>
        </div>
      </header>

      {/* Hero */}
      <main>
        <section className="py-16 sm:py-24">
          <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-14 lg:px-8">
            <div>
              <div className="flex flex-wrap gap-2">
                <Badge>Beginner-friendly</Badge>
                <Badge>Lab-driven</Badge>
                <Badge>Built for job skills</Badge>
              </div>

              <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl">
                Learn IT the right way — start with <span className="text-white/90">Linux + LPIC</span>, then build toward
                everything.
              </h1>

              <p className="mt-5 text-base leading-relaxed text-white/70">
                CodeJacket is a practical learning hub for mastering real-world IT skills. Start with the LPIC
                certification path to build command-line confidence, system fundamentals, and hands-on troubleshooting —
                then expand into networking, cloud, security, automation, and beyond.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <CTAButton href="#get-started" variant="primary">
                  Start the LPIC Track
                </CTAButton>
                <CTAButton href="#why-linux" variant="secondary">
                  Why Linux matters
                </CTAButton>
              </div>

              <p className="mt-6 text-xs text-white/50">Start with Debian-based labs. Concepts transfer to Ubuntu/RHEL.</p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-sm backdrop-blur sm:p-8">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-semibold text-white/90">What you’ll build</h2>
                <span className="text-xs text-white/50">LPIC-aligned labs</span>
              </div>

              <div className="mt-6 grid gap-4">
                <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
                  <p className="text-xs font-semibold text-white/70">Week-to-week momentum</p>
                  <p className="mt-1 text-sm text-white/80">Daily checklists + command drills + mini challenges.</p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
                  <p className="text-xs font-semibold text-white/70">Real sysadmin workflows</p>
                  <p className="mt-1 text-sm text-white/80">Permissions, services, storage, networking, scripting.</p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
                  <p className="text-xs font-semibold text-white/70">Proof you can ship</p>
                  <p className="mt-1 text-sm text-white/80">Publishable lab notes + portfolio-ready documentation.</p>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap gap-2">
                <Badge>Linux Essentials</Badge>
                <Badge>LPIC-1</Badge>
                <Badge>LPIC-2+</Badge>
              </div>
            </div>
          </div>
        </section>

        <Section
          id="why-linux"
          eyebrow="FOUNDATION"
          title="Why start with Linux? Because it’s the backbone of modern IT."
          subtitle="Linux powers cloud servers, web infrastructure, containers, cybersecurity tools, and enterprise systems. Learning Linux first gives you a foundation that makes everything else easier."
        >
          <div className="grid gap-6 md:grid-cols-2">
            <Card title="Linux runs the cloud" icon="☁️">
              Cloud platforms, containers, and DevOps pipelines are heavily Linux-based. If you want to work in modern
              infrastructure, Linux is unavoidable.
            </Card>
            <Card title="Command line confidence" icon="⌨️">
              The CLI gives you speed and control. LPIC builds comfort with the tools used daily by admins, engineers,
              and security teams.
            </Card>
            <Card title="Systems thinking" icon="🧠">
              You learn how processes, services, boot, permissions, and filesystems fit together — not just “click
              paths.”
            </Card>
            <Card title="Skills that transfer" icon="🔁">
              The fundamentals you gain carry directly into networking, security, automation, and cloud engineering.
            </Card>
          </div>
        </Section>

        <Section
          id="benefits"
          eyebrow="VALUE"
          title="What you gain by earning LPIC certifications"
          subtitle="LPIC is structured to take you from fundamentals to professional competence. Certification is the milestone — practical skill is the goal."
        >
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card title="Job-ready skills" icon="🧰">
              Learn the commands and workflows used in real environments — not just theory.
            </Card>
            <Card title="Structured learning path" icon="🧭">
              No randomness. Clear objectives, clear progression, clear outcomes.
            </Card>
            <Card title="Proof of competence" icon="✅">
              Certifications help validate your skill level to employers and clients.
            </Card>
            <Card title="Troubleshooting ability" icon="🛠️">
              Develop the ability to diagnose issues and fix them methodically.
            </Card>
            <Card title="Better security instincts" icon="🛡️">
              Permissions, users/groups, and service control build strong security fundamentals.
            </Card>
            <Card title="Launchpad for cloud & DevOps" icon="🚀">
              Linux fluency makes Kubernetes, Docker, CI/CD, and cloud systems far less intimidating.
            </Card>
          </div>
        </Section>

        <Section
          id="lpic-track"
          eyebrow="CERTIFICATION PATH"
          title="The LPIC ladder — start where you are, advance when you’re ready."
          subtitle="A clear path from beginner fundamentals to advanced administration and enterprise specialties."
        >
          <div className="grid gap-6 lg:grid-cols-2">
            <LadderItem
              level="1"
              title="Linux Essentials"
              desc="Beginner-friendly entry point. Core Linux concepts, basic command line, and foundational open source knowledge."
            />
            <LadderItem
              level="2"
              title="LPIC-1 (Junior Linux Admin)"
              desc="Install, configure, maintain, and troubleshoot Linux systems. Filesystems, permissions, processes, scripting, networking basics."
            />
            <LadderItem
              level="3"
              title="LPIC-2 (Advanced Linux Admin)"
              desc="More advanced administration: services, storage, networking, automation, and multi-system environments."
            />
            <LadderItem
              level="4"
              title="LPIC-3 (Enterprise Specialties)"
              desc="Specialized expert-level topics such as security, mixed environments, virtualization, and high availability."
            />
          </div>

          <div className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur sm:p-8">
            <h3 className="text-base font-semibold text-white">By the time you finish LPIC-1, you can:</h3>
            <ul className="mt-4 grid gap-3 text-sm text-white/70 sm:grid-cols-2">
              {[
                "Navigate Linux like a professional (filesystems, permissions, processes)",
                "Install software, manage packages, and maintain system health",
                "Configure networking basics and troubleshoot connectivity",
                "Control boot processes and services (systemd + core concepts)",
                "Write simple shell scripts to automate tasks",
                "Manage users, groups, and security fundamentals",
              ].map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="text-white/60">•</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Section>

        <Section
          id="how-it-works"
          eyebrow="METHOD"
          title="Learn fast with labs, checklists, and repetition — not fluff."
          subtitle="Short lessons. Clear commands. Repeatable routines. Real systems. Everything designed to build skill you can actually use."
        >
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card title="Guided labs" icon="🧪">
              Debian-based labs aligned to LPIC objectives. Learn by doing, not watching.
            </Card>
            <Card title="Printable routines" icon="🗓️">
              Daily checklists that build muscle memory: commands, flags, workflows.
            </Card>
            <Card title="Mini challenges" icon="🏁">
              Short tasks that force recall and troubleshooting — the way real work feels.
            </Card>
            <Card title="Exam-style practice" icon="📝">
              Scenario-driven questions to make the certification feel predictable.
            </Card>
            <Card title="Portfolio-friendly notes" icon="📓">
              Turn your lab notes into clean documentation you can publish.
            </Card>
            <Card title="Expandable paths" icon="🧱">
              After LPIC: networking, cloud, security, automation — same structure, deeper skills.
            </Card>
          </div>
        </Section>

        <section id="get-started" className="py-16 sm:py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur sm:p-12">
              <div className="grid items-center gap-8 lg:grid-cols-2">
                <div>
                  <p className="text-xs font-semibold tracking-widest text-white/60">GET STARTED</p>
                  <h2 className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl">Start your LPIC journey today</h2>
                  <p className="mt-4 text-base leading-relaxed text-white/70">
                    If you want a reliable path into IT — start with Linux. Build skills you can use on day one, and
                    earn certifications that prove it.
                  </p>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
                  <CTAButton href="#faq" variant="secondary">
                    Read FAQ
                  </CTAButton>
                  <CTAButton href="#get-started" variant="primary">
                    Start the LPIC Track
                  </CTAButton>
                </div>
              </div>

              <div className="mt-10 grid gap-3 sm:grid-cols-[1fr_auto]">
                <input
                  type="email"
                  placeholder="Get the free LPIC roadmap (email)"
                  className="w-full rounded-xl border border-white/10 bg-slate-950/40 px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none focus:ring-2 focus:ring-white/40"
                />
                <button
                  type="button"
                  className="rounded-xl bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-white/90 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-slate-950"
                  onClick={() => window.alert("Hook this up to your email provider when ready.")}
                >
                  Get the roadmap
                </button>
              </div>

              <p className="mt-3 text-xs text-white/50">
                (This form is UI-only right now. Connect Mailchimp/ConvertKit/etc. when ready.)
              </p>
            </div>
          </div>
        </section>

        <Section id="faq" eyebrow="QUESTIONS" title="FAQ" subtitle="Quick answers to the most common questions.">
          <div className="grid gap-4 lg:grid-cols-2">
            <FAQItem
              q="Do I need experience to start?"
              a="No. Linux Essentials is beginner-friendly. If you already have basic command-line comfort, you can start at LPIC-1."
            />
            <FAQItem
              q="What Linux distro do you use?"
              a="Debian-based labs for stability and clarity. Concepts transfer directly to Ubuntu and most enterprise Linux environments."
            />
            <FAQItem
              q="Is this only for certification?"
              a="Certification is the milestone. Practical competence is the goal — labs, routines, and troubleshooting are the real focus."
            />
            <FAQItem
              q="What comes after LPIC?"
              a="Networking, cloud, security, and automation tracks — built on the same lab-driven structure once Linux fundamentals are solid."
            />
          </div>
        </Section>

        <footer className="border-t border-white/10 py-10">
          <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
            <p className="text-xs text-white/50">© {new Date().getFullYear()} CodeJacket.io — Learn IT, build skill, prove it.</p>
            <div className="flex flex-wrap gap-4 text-xs text-white/60">
              <a href="#why-linux" className="hover:text-white">
                Why Linux
              </a>
              <a href="#lpic-track" className="hover:text-white">
                LPIC Track
              </a>
              <a href="#get-started" className="hover:text-white">
                Get Started
              </a>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}

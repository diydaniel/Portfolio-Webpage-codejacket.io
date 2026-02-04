import React from "react";
import { useLocation, Navigate } from "react-router-dom";

export default function WhyLinux() {
  const location = useLocation();

  // 🚫 Block direct access
  if (location.state?.from !== "what-linux") {
    return <Navigate to="/resources" replace />;
  }

  return (
    <main style={styles.page}>
      <section style={styles.panel}>
        <h1 style={styles.title}>Why Linux?</h1>
      </section>

<section style={styles.panel}>
        <h2 style={styles.text}>
         Section 1 — Control Over Convenience
        </h2>
        
        <p style={styles.text}>
         Because it doesn’t hide how systems work.

Most operating systems optimize for convenience.
Linux optimizes for transparency.

You can:

See how processes are scheduled

Inspect memory usage in real time

Control networking at every layer

Understand exactly what the system is doing — and why

This is why Linux is the OS of:

System administrators

Cloud engineers

Security professionals

Kernel and platform developers
        </p>
      </section>

       <section style={styles.panel}>

        <h2 style={styles.text}>
         Section 2 — Linux Scales From Laptop to Planet
        </h2>
        
        <p style={styles.text}>
          The same kernel runs on:

A Raspberry Pi

A personal laptop

A Kubernetes cluster

The world’s largest cloud providers

Linux doesn’t change when scale increases — your understanding carries forward.

That’s rare.
        </p>
      </section>
      <section style={styles.panel}>
        <h2 style={styles.text}>
          Section 3 — The Open-Source Advantage
        </h2>
        <p  style={styles.text}>
          Linux is open source — not as a philosophy, but as a strategic advantage.

Open source means:

No vendor lock-in

No black boxes

No artificial limitations

When something breaks, you can:

Read the source

Trace the behavior

Fix or work around it

Improve it for others

That feedback loop is why Linux evolves faster than proprietary systems.
        </p>
      </section>

      <section style={styles.panel}>
        <h2 style={styles.text}>
          Section 4 — Why Companies Trust Linux
        </h2>
        <p  style={styles.text}>
          Linux powers:

Cloud infrastructure (AWS, GCP, Azure)

Financial systems

Telecommunications

Embedded systems

Government and defense systems

Companies choose Linux because:

It is stable

It is secure

It is auditable

It is cost-effective

It scales without redesign

Most importantly: it can be understood and controlled.
        </p>
      </section>

      <section style={styles.panel}>
        <h2 style={styles.text}>
          Section 5 — Linux as a Career Multiplier
        </h2>
        <p  style={styles.text}>
          Learning Linux does more than teach commands.

It teaches:

How operating systems actually work

How software interacts with hardware

How networks behave under load

How security is enforced at the system level

Linux knowledge compounds into:

DevOps

Cloud engineering

Cybersecurity

Platform engineering

Backend development

It’s not a tool.
It’s a foundation.
        </p>
      </section>

      <section style={styles.panel}>
        <h2 style={styles.text}>
          Section 6 — Why Linux Still Matters Today
        </h2>
        <p  style={styles.text}>
          Modern tech trends didn’t replace Linux — they depend on it.

Containers run on Linux

Kubernetes runs on Linux

CI/CD pipelines run on Linux

Servers run Linux

Cloud is Linux

If you want to understand modern infrastructure, Linux is unavoidable.
        </p>
      </section>
<section style={styles.panel}>

        <h2 style={styles.text}>
         Closing Statement (Strong but Honest)
        </h2>
        
        <p style={styles.text}>
          Linux isn’t trendy.
It isn’t flashy.

It is reliable, transparent, and powerful.

That’s why it won.
That’s why it’s still here.
And that’s why learning Linux is one of the highest-leverage skills in technology.
        </p>
      </section>
    </main>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    fontFamily: "Menlo",
    backgroundColor: "#0B0B0B",
    color: "#EAEAEA",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",   // 👈 THIS IS THE KEY
    alignItems: "center",      // center panels horizontally
    padding: "2.5rem 1.25rem",
    gap: "2rem",               // spacing between sections
  },
  panel: {
    maxWidth: "960px",
    width: "100%",
    backgroundColor: "#1E1E1E",
    border: "1px solid #2F2F2F",
    borderRadius: "14px",
    padding: "2rem",
  },
  title: {
    color: "#FFD700",
    marginBottom: "1rem",
    textAlign: "center",
  },
  text: {
    lineHeight: 1.65,
    color: "#D1D5DB",
    marginBottom: "1rem",
  },
};

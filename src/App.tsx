import type { JSX } from "react";
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

const GITHUB_USER = "diydaniel";

type Repo = {
  id: number | string;
  name: string;
  full_name: string;
  description: string | null;
  stars: number;
  forks: number;
  language: string | null;
  topics: string[];
  html_url: string;
  homepage: string | null;
  updated_at: string;
};

export default function App(): JSX.Element {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [query, setQuery] = useState<string>("");
  const [topics, setTopics] = useState<string[]>([]);
  const [activeTopic, setActiveTopic] = useState<string>("All");
  const [languages, setLanguages] = useState<string[]>(["All"]);
  const [language, setLanguage] = useState<string>("All");

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        setLoading(true);
        setError("");
        const res = await fetch(`https://api.github.com/users/${GITHUB_USER}/repos?per_page=100&sort=updated`);
        if (!res.ok) throw new Error(`GitHub API: ${res.status}`);
        const data = await res.json();
        if (cancelled) return;
        const clean: Repo[] = (data as any[])
          .filter((r: any) => !r.fork)
          .map((r: any): Repo => ({
            id: r.id,
            name: r.name,
            full_name: r.full_name,
            description: r.description,
            stars: r.stargazers_count,
            forks: r.forks_count,
            language: r.language,
            topics: r.topics || [],
            html_url: r.html_url,
            homepage: r.homepage,
            updated_at: r.updated_at,
          }));
        const tset = new Set<string>(["All"]);
        clean.forEach((r) => (r.topics || []).forEach((t: string) => tset.add(t)));
        setTopics(Array.from(tset));
        const lset = new Set<string>(["All"]);
        clean.forEach((r) => r.language && lset.add(r.language));
        const langs = Array.from(lset);
        setLanguages(langs);
        setLanguage(langs.includes("Python") ? "Python" : "All");
        setRepos(clean);
      } catch (e) {
        console.error(e);
        setError("Couldn't load GitHub repos.");
      } finally {
        setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const filtered = useMemo<Repo[]>(() => {
    return repos.filter((r: Repo) => {
      const matchesQuery = query
        ? (r.name + " " + (r.description || "") + " " + (r.language || "") + " " + (r.topics || []).join(" "))
            .toLowerCase()
            .includes(query.toLowerCase())
        : true;
      const matchesTopic = activeTopic === "All" ? true : (r.topics || []).includes(activeTopic);
      const matchesLang = language === "All" ? true : r.language === language;
      return matchesQuery && matchesTopic && matchesLang;
    });
  }, [repos, query, activeTopic, language]);

  return (
    <div className="min-h-screen text-gray-900 bg-gradient-to-b from-white to-gray-100 dark:from-gray-950 dark:to-gray-900 dark:text-gray-100">
      <Header />
      <main className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Hero />
        <Skills />
        <Projects
          repos={filtered}
          loading={loading}
          error={error}
          query={query}
          setQuery={setQuery}
          topics={topics}
          activeTopic={activeTopic}
          setActiveTopic={setActiveTopic}
          languages={languages}
          language={language}
          setLanguage={setLanguage}
        />
        <About />
        <Contact />
        <Footer />
      </main>
    </div>
  );
}

function Header(): JSX.Element {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-gray-950/60 border-b border-gray-200 dark:border-gray-800">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <a href="#home" className="font-bold text-lg">{`{codejacket.io}`}</a>
        <nav className="hidden md:flex gap-6 items-center">
          <a href="#projects">Projects</a>
          <a href="#skills">Skills</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
          <ThemeToggle />
        </nav>
        <button className="md:hidden p-2 rounded-lg border border-gray-300 dark:border-gray-700" onClick={() => setOpen(v => !v)}>
          ☰
        </button>
      </div>
      {open && (
        <div className="md:hidden px-4 pb-4 flex flex-col gap-3">
          <a onClick={() => setOpen(false)} href="#projects">Projects</a>
          <a onClick={() => setOpen(false)} href="#skills">Skills</a>
          <a onClick={() => setOpen(false)} href="#about">About</a>
          <a onClick={() => setOpen(false)} href="#contact">Contact</a>
          <ThemeToggle />
        </div>
      )}
    </header>
  );
}

function ThemeToggle(): JSX.Element {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    const prefers = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const stored = localStorage.getItem("theme");
    const isDark = stored ? stored === "dark" : prefers;
    setDark(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);
  function toggle() {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  }
  return (
    <button onClick={toggle} className="px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-700 text-sm">
      {dark ? "☾ Dark" : "☀ Light"}
    </button>
  );
}

function Hero(): JSX.Element {
  return (
    <section id="home" className="py-16 sm:py-24">
      <h1 className="text-4xl font-bold">Python‑first Developer</h1>
      <p className="mt-4 text-gray-700 dark:text-gray-300">
        Building FastAPI backends, React frontends, and data-driven apps.
      </p>
    </section>
  );
}

function Skills(): JSX.Element {
  const skills = ["Python", "FastAPI", "React", "PostgreSQL", "Tailwind CSS"];
  return (
    <section id="skills" className="py-12">
      <h2 className="text-2xl font-bold">Skills</h2>
      <div className="mt-4 flex flex-wrap gap-3">
        {skills.map((s) => (
          <span key={s} className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full border border-gray-200 dark:border-gray-700 text-sm">
            {s}
          </span>
        ))}
      </div>
    </section>
  );
}

function Projects({
  repos,
  loading,
  error,
  query,
  setQuery,
  topics,
  activeTopic,
  setActiveTopic,
  languages,
  language,
  setLanguage,
}: {
  repos: Repo[];
  loading: boolean;
  error: string;
  query: string;
  setQuery: (v: string) => void;
  topics: string[];
  activeTopic: string;
  setActiveTopic: (v: string) => void;
  languages: string[];
  language: string;
  setLanguage: (v: string) => void;
}): JSX.Element {
  return (
    <section id="projects" className="py-12">
      <h2 className="text-2xl font-bold">Projects</h2>
      <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {(repos.length ? repos : HARDCODED_PROJECTS).map((r: Repo) => (
          <ProjectCard key={r.id || r.name} repo={r} />
        ))}
      </div>
    </section>
  );
}

const HARDCODED_PROJECTS: Repo[] = [
  {
    id: "fallback-1",
    name: "solitaire-python",
    full_name: "your-github-username/solitaire-python",
    description: "Pygame Solitaire with animations and sound.",
    language: "Python",
    topics: ["pygame", "game", "oop"],
    html_url: "https://github.com/your-github-username/solitaire-python",
    homepage: "",
    stars: 0,
    forks: 0,
    updated_at: new Date().toISOString(),
  },
];

function ProjectCard({ repo }: { repo: Repo }): JSX.Element {
  return (
    <motion.article className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white/70 dark:bg-gray-900/60 p-5 shadow-sm">
      <a href={repo.html_url} target="_blank" rel="noreferrer" className="font-semibold text-lg hover:underline">
        {repo.name}
      </a>
      {repo.description && <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">{repo.description}</p>}
    </motion.article>
  );
}

function About(): JSX.Element {
  return (
    <section id="about" className="py-16">
      <h2 className="text-2xl font-bold">About</h2>
      <p className="mt-4 text-gray-700 dark:text-gray-300">
        Developer focused on data, design, and clean architecture.
      </p>
    </section>
  );
}

function Contact(): JSX.Element {
  return (
    <section id="contact" className="py-16">
      <h2 className="text-2xl font-bold">Contact</h2>
      <p className="mt-4 text-gray-700 dark:text-gray-300">Reach me at you@example.com</p>
    </section>
  );
}

function Footer(): JSX.Element {
  return (
    <footer className="py-10 text-sm text-gray-600 dark:text-gray-400 border-t border-gray-200 dark:border-gray-800 mt-16">
      <p>© {new Date().getFullYear()} Your Name</p>
    </footer>
  );
}

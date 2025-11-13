import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

/**
 * 🔧 Quick setup
 * 1) Replace GITHUB_USER with your GitHub username.
 * 2) Deploy this page (Vercel/Netlify/GitHub Pages). Point your domain to it.
 * 3) Customize the sections below (Hero, Skills, Projects, About, Contact).
 */
const GITHUB_USER = "diydaniel"; // <- CHANGE ME

export default function App() {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [topics, setTopics] = useState([]); // simple topic filter derived from repo topics
  const [activeTopic, setActiveTopic] = useState("All");
  const [languages, setLanguages] = useState(["All"]);
  const [language, setLanguage] = useState("All");

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
        // Normalize topics; keep only public, not forks by default
        const clean = data
          .filter(r => !r.fork)
          .map(r => ({
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
        // Derive unique topics
        const tset = new Set(["All"]);
        clean.forEach(r => (r.topics || []).forEach(t => tset.add(t)));
        setTopics(Array.from(tset));
        // Derive language list (e.g., Python focus)
        const lset = new Set(["All"]);
        clean.forEach(r => r.language && lset.add(r.language));
        const langs = Array.from(lset);
        setLanguages(langs);
        // Default to Python if present
        setLanguage(langs.includes("Python") ? "Python" : "All");
        setRepos(clean);
      } catch (e) {
        console.error(e);
        setError("Couldn't load GitHub repos. You can hardcode projects below as a fallback.");
      } finally {
        setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const filtered = useMemo(() => {
    return repos.filter(r => {
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

function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-gray-950/60 border-b border-gray-200 dark:border-gray-800">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <a href="#home" className="font-bold text-lg">{`<Daniel />`}</a>
        <nav className="hidden md:flex gap-6 items-center">
          <a className="hover:opacity-80" href="#projects">Projects</a>
          <a className="hover:opacity-80" href="#skills">Skills</a>
          <a className="hover:opacity-80" href="#about">About</a>
          <a className="hover:opacity-80" href="#contact">Contact</a>
          <ThemeToggle />
        </nav>
        <button className="md:hidden p-2 rounded-lg border border-gray-300 dark:border-gray-700" onClick={() => setOpen(v => !v)} aria-label="Toggle Menu">
          <span className="i-[hamburger]">☰</span>
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

function ThemeToggle() {
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

function Hero() {
  return (
    <section id="home" className="py-16 sm:py-24">
      <div className="grid md:grid-cols-[1.2fr,0.8fr] gap-10 items-center">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            Python‑first developer: FastAPI backends, data tooling, and React frontends
          </h1>
          <p className="mt-4 text-lg text-gray-700 dark:text-gray-300">
            I’m a full‑stack developer focused on clean UX, robust APIs, and delightful details. Explore my projects below or browse my GitHub.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <a href="#projects" className="px-5 py-3 rounded-2xl bg-gray-900 text-white dark:bg-white dark:text-gray-900 font-semibold shadow">
              View Projects
            </a>
            <a href={`https://github.com/${GITHUB_USER}`} target="_blank" rel="noreferrer" className="px-5 py-3 rounded-2xl border border-gray-300 dark:border-gray-700 font-semibold">
              GitHub Profile →
            </a>
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.1 }}
          className="justify-self-center">
          <div className="relative w-40 h-40 sm:w-48 sm:h-48 rounded-3xl overflow-hidden shadow-2xl ring-1 ring-gray-200 dark:ring-gray-800">
            {/* Avatar placeholder: replace src with your headshot */}
            <img alt="avatar" src="https://avatars.githubusercontent.com/u/583231?v=4" className="w-full h-full object-cover" />
          </div>
          <p className="mt-3 text-center text-sm text-gray-500 dark:text-gray-400">Replace with your headshot</p>
        </motion.div>
      </div>
    </section>
  );
}

function Skills() {
  const skills = [
    "Python",
    "FastAPI",
    "Pydantic",
    "Pandas",
    "NumPy",
    "scikit-learn",
    "SQLAlchemy",
    "PostgreSQL",
    "React",
    "TypeScript",
    "Tailwind CSS",
    "Docker",
    "Git/GitHub",
    "Unit Testing",
    "CI/CD",
  ];
  return (
    <section id="skills" className="py-12">
      <h2 className="text-2xl sm:text-3xl font-bold">Skills</h2>
      <div className="mt-6 flex flex-wrap gap-3">
        {skills.map((s) => (
          <span key={s} className="px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm">
            {s}
          </span>
        ))}
      </div>
    </section>
  );
}

function Projects({ repos, loading, error, query, setQuery, topics, activeTopic, setActiveTopic, languages, language, setLanguage }) {
  return (
    <section id="projects" className="py-12">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <h2 className="text-2xl sm:text-3xl font-bold">Projects</h2>
        <div className="flex gap-2 items-center">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search projects..."
            className="w-56 px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-white/70 dark:bg-gray-900/50"
          />
          <select
            value={activeTopic}
            onChange={(e) => setActiveTopic(e.target.value)}
            className="px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-white/70 dark:bg-gray-900/50"
            title="Topic filter"
          >
            {topics.map(t => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-white/70 dark:bg-gray-900/50"
            title="Language filter"
          >
            {languages.map(l => (
              <option key={l} value={l}>{l}</option>
            ))}
          </select>
        </div>
      </div>
      <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">Showing {language === 'All' ? 'all languages' : `${language}`} • Tip: try topic “fastapi” or search for “notebook”.</p>

      {loading && (
        <p className="mt-6 text-gray-600 dark:text-gray-400">Loading your repositories…</p>
      )}
      {error && (
        <div className="mt-6 p-4 rounded-xl border border-amber-300 bg-amber-50 dark:bg-amber-900/20 dark:border-amber-600">
          <p className="font-semibold">Heads up</p>
          <p className="text-sm">{error}</p>
          <p className="text-sm mt-1">Fallback: hardcode a curated list in <code>HARDCODED_PROJECTS</code> below.</p>
        </div>
      )}

      <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {(repos.length ? repos : HARDCODED_PROJECTS).map((r) => (
          <ProjectCard key={r.id || r.name} repo={r} />
        ))}
      </div>
    </section>
  );
}

const HARDCODED_PROJECTS = [
  // Use this as a fallback or to Pin projects
  {
    id: "fallback-1",
    name: "solitaire-python",
    description: "A polished Pygame Solitaire with animations and sound.",
    language: "Python",
    topics: ["pygame", "game", "oop"],
    html_url: "https://github.com/your-github-username/solitaire-python",
    homepage: "",
    stars: 0,
    forks: 0,
    updated_at: new Date().toISOString(),
  },
  {
    id: "fallback-2",
    name: "fastapi-react-starter",
    description: "Full‑stack starter with FastAPI, React, Postgres, Docker, and CI.",
    language: "TypeScript",
    topics: ["fastapi", "react", "postgres"],
    html_url: "https://github.com/your-github-username/fastapi-react-starter",
    homepage: "",
    stars: 0,
    forks: 0,
    updated_at: new Date().toISOString(),
  },
];

function ProjectCard({ repo }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3 }}
      className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white/70 dark:bg-gray-900/60 p-5 shadow-sm hover:shadow-md"
    >
      <div className="flex items-start justify-between gap-3">
        <a href={repo.html_url} target="_blank" rel="noreferrer" className="font-semibold text-lg hover:underline">
          {repo.name}
        </a>
        {repo.language && (
          <span className="text-xs px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">{repo.language}</span>
        )}
      </div>
      {repo.description && (
        <p className="mt-2 text-sm text-gray-700 dark:text-gray-300 line-clamp-3">{repo.description}</p>
      )}
      {repo.topics?.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {repo.topics.slice(0, 5).map(t => (
            <span key={t} className="text-xs px-2 py-1 rounded-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">{t}</span>
          ))}
        </div>
      )}
      <div className="mt-4 flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
        <div className="flex items-center gap-3">
          <span>★ {repo.stars}</span>
          <span>⑂ {repo.forks}</span>
          <span title="Last updated">⏱ {new Date(repo.updated_at).toLocaleDateString()}</span>
        </div>
        <div className="flex items-center gap-2">
          {repo.homepage && (
            <a href={prepHomepage(repo.homepage)} target="_blank" rel="noreferrer" className="underline hover:no-underline">
              Live ↗
            </a>
          )}
          <a href={repo.html_url} target="_blank" rel="noreferrer" className="underline hover:no-underline">
            Code ↗
          </a>
        </div>
      </div>
    </motion.article>
  );
}

function prepHomepage(url) {
  if (!url) return "";
  if (url.startsWith("http")) return url;
  return `https://${url}`;
}

function About() {
  return (
    <section id="about" className="py-16">
      <h2 className="text-2xl sm:text-3xl font-bold">About</h2>
      <div className="mt-4 grid md:grid-cols-2 gap-6">
        <p className="text-gray-700 dark:text-gray-300">
          I’m a developer with a passion for building performant web apps and thoughtful developer tooling. 
          My current stack features React, TypeScript, FastAPI, and Postgres, deployed with Docker and CI/CD.
        </p>
        <ul className="space-y-2 text-gray-700 dark:text-gray-300 list-disc list-inside">
          <li>Interested in data‑driven products, dashboards, and UX polish</li>
          <li>Comfortable across the stack: frontend, backend, and DevOps</li>
          <li>Open to freelance and full‑time opportunities</li>
        </ul>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="py-16">
      <h2 className="text-2xl sm:text-3xl font-bold">Contact</h2>
      <div className="mt-6 grid md:grid-cols-2 gap-6">
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 p-6 bg-white/70 dark:bg-gray-900/60">
          <p className="text-gray-700 dark:text-gray-300">
            Want to collaborate or see something specific? Reach out:
          </p>
          <div className="mt-4 space-y-2">
            <a className="block underline hover:no-underline" href="mailto:you@example.com">you@example.com</a>
            <a className="block underline hover:no-underline" target="_blank" rel="noreferrer" href={`https://github.com/${GITHUB_USER}`}>github.com/{GITHUB_USER}</a>
            <a className="block underline hover:no-underline" target="_blank" rel="noreferrer" href="https://www.linkedin.com/in/your-handle/">LinkedIn</a>
          </div>
        </div>
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 p-6 bg-white/70 dark:bg-gray-900/60">
          <h3 className="font-semibold">Highlights</h3>
          <ul className="mt-3 space-y-2 text-gray-700 dark:text-gray-300 list-disc list-inside">
            <li>LPIC‑1 (in progress) • Navy vet • Stats + DA coursework</li>
            <li>Built a Pygame Solitaire with animated UI</li>
            <li>FastAPI + React + Postgres starter template</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="py-10 text-sm text-gray-600 dark:text-gray-400">
      <div className="border-t border-gray-200 dark:border-gray-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
        <span>© {new Date().getFullYear()} Your Name</span>
        <div className="flex items-center gap-4">
          <a className="underline hover:no-underline" href="#home">Back to top</a>
          <a className="underline hover:no-underline" href={`https://github.com/${GITHUB_USER}?tab=repositories`} target="_blank" rel="noreferrer">All Repos</a>
        </div>
      </div>
    </footer>
  );
}

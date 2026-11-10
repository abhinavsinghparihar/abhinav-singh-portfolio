export const person = {
  name: "Abhinav Singh",
  email: "thakurabhinavsinghparihar@gmail.com",
  github: "https://github.com/abhinavsinghparihar",
  linkedin: "https://linkedin.com/in/thakurabhinavsinghparihar",
  location: "Kanpur, Uttar Pradesh, India",
  education: {
    degree: "B.Tech · Computer Science Engineering",
    institution: "Kanpur Institute of Technology, Kanpur",
    years: "2025–2029",
  },
  projects: [
    { name: "Vednix AI", url: "https://vednix.vercel.app", repo: "https://github.com/abhinavsinghparihar/vednix", state: "live" },
    { name: "Second Thought", url: null, repo: "https://github.com/abhinavsinghparihar/second-thought", state: "build" },
  ],
} as const;

export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: person.name,
    email: `mailto:${person.email}`,
    jobTitle: "Computer Science Engineering Student · AI Engineer",
    url: "https://abhinavsingh.dev",
    sameAs: [person.github, person.linkedin],
    address: { "@type": "PostalAddress", addressLocality: "Kanpur", addressRegion: "Uttar Pradesh", addressCountry: "IN" },
    alumniOf: { "@type": "CollegeOrUniversity", name: person.education.institution },
    knowsAbout: ["Artificial Intelligence", "LLM integration", "FastAPI", "Next.js", "TypeScript", "Python"],
  };
}

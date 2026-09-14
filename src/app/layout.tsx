import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Job Hunter Agent",
  description: "Your intelligent personal recruitment agent",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><div className="shell"><aside className="side"><div className="brand"><span className="mark">JH</span>Job Hunter</div><nav className="nav"><a href="/">Overview</a><a href="/jobs">Job pipeline</a><a href="/profile">My profile &amp; CV</a><a href="/settings">Search settings</a></nav></aside>{children}</div></body></html>;
}

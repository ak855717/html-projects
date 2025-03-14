import { Button } from "@/components/ui/button"
import Link from "next/link"
import { TrendingMemes } from "@/components/trending-memes"
import { ArrowRight, Upload } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col gap-12 pb-8">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-muted py-16 md:py-24">
        <div className="container relative z-10 mx-auto px-4 text-center">
          <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-6xl">The Ultimate Meme Platform</h1>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground md:text-xl">
            Discover, create, and share the funniest memes on the internet. Join our community of meme enthusiasts
            today!
          </p>
          <div className="flex flex-col gap-4 sm:flex-row justify-center">
            <Link href="/explore">
              <Button size="lg" className="w-full sm:w-auto">
                Explore Memes
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/upload">
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                Upload Your Own
                <Upload className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
        <div className="absolute inset-0 bg-grid-white/10 bg-[size:20px_20px] opacity-10" />
      </section>

      {/* Trending Memes Section */}
      <section className="container mx-auto px-4">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight md:text-3xl">Trending Memes</h2>
          <Link href="/explore">
            <Button variant="ghost" className="gap-1">
              View All <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
        <TrendingMemes />
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4">
        <h2 className="mb-8 text-center text-2xl font-bold tracking-tight md:text-3xl">Why MemeVerse?</h2>
        <div className="grid gap-8 md:grid-cols-3">
          <div className="rounded-lg border bg-card p-6 shadow-sm">
            <div className="mb-4 rounded-full bg-primary/10 p-3 w-fit">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-primary"
              >
                <path d="M12 2v8" />
                <path d="m4.93 10.93 1.41 1.41" />
                <path d="M2 18h2" />
                <path d="M20 18h2" />
                <path d="m19.07 10.93-1.41 1.41" />
                <path d="M22 22H2" />
                <path d="m8 22 4-10 4 10" />
              </svg>
            </div>
            <h3 className="mb-2 text-xl font-bold">Discover</h3>
            <p className="text-muted-foreground">
              Explore thousands of memes across different categories. Find the perfect meme for any situation.
            </p>
          </div>
          <div className="rounded-lg border bg-card p-6 shadow-sm">
            <div className="mb-4 rounded-full bg-primary/10 p-3 w-fit">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-primary"
              >
                <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                <path d="m7 9 3 3-3 3" />
                <path d="M13 15h4" />
              </svg>
            </div>
            <h3 className="mb-2 text-xl font-bold">Create</h3>
            <p className="text-muted-foreground">
              Upload your own memes or use our AI-powered caption generator to create hilarious content.
            </p>
          </div>
          <div className="rounded-lg border bg-card p-6 shadow-sm">
            <div className="mb-4 rounded-full bg-primary/10 p-3 w-fit">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-primary"
              >
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                <path d="M13.73 21a2 2 0 0 1-3.46 0" />
              </svg>
            </div>
            <h3 className="mb-2 text-xl font-bold">Share</h3>
            <p className="text-muted-foreground">
              Share your favorite memes with friends and the community. Engage with others through likes and comments.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-muted py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-4 text-2xl font-bold tracking-tight md:text-3xl">Ready to join the fun?</h2>
          <p className="mx-auto mb-8 max-w-2xl text-muted-foreground">
            Start exploring and sharing memes today. Upload your first meme and become part of our growing community!
          </p>
          <Link href="/upload">
            <Button size="lg">
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}


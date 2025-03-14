import Link from "next/link"
import { Github, Twitter, Instagram } from "lucide-react"

export default function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="space-y-3">
            <h3 className="text-lg font-medium">MemeVerse</h3>
            <p className="text-sm text-muted-foreground">
              Your ultimate platform for discovering, creating, and sharing the funniest memes on the internet.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-2">
            <div className="space-y-3">
              <h4 className="text-sm font-medium">Platform</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/explore" className="text-sm text-muted-foreground hover:text-foreground">
                    Explore
                  </Link>
                </li>
                <li>
                  <Link href="/upload" className="text-sm text-muted-foreground hover:text-foreground">
                    Upload
                  </Link>
                </li>
                <li>
                  <Link href="/leaderboard" className="text-sm text-muted-foreground hover:text-foreground">
                    Leaderboard
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="text-sm font-medium">Company</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                    Terms
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="space-y-3">
            <h4 className="text-sm font-medium">Stay Connected</h4>
            <div className="flex space-x-4">
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <Twitter size={20} />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <Instagram size={20} />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <Github size={20} />
                <span className="sr-only">GitHub</span>
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t pt-8 text-center">
          <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} MemeVerse. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}


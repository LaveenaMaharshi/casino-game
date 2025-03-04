import Link from "next/link"
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-background border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="relative h-8 w-8 overflow-hidden rounded-full bg-primary">
                <div className="absolute inset-0 flex items-center justify-center text-white font-bold">LC</div>
              </div>
              <span className="text-xl font-bold">LuxCasino</span>
            </Link>
            <p className="text-muted-foreground mb-4">
              Experience the thrill of premium casino gaming with immersive 3D games, live dealers, and exclusive
              rewards.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Facebook size={20} />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Twitter size={20} />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Instagram size={20} />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Youtube size={20} />
                <span className="sr-only">YouTube</span>
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/games" className="text-muted-foreground hover:text-primary">
                  Games
                </Link>
              </li>
              <li>
                <Link href="/live-casino" className="text-muted-foreground hover:text-primary">
                  Live Casino
                </Link>
              </li>
              <li>
                <Link href="/promotions" className="text-muted-foreground hover:text-primary">
                  Promotions
                </Link>
              </li>
              <li>
                <Link href="/leaderboard" className="text-muted-foreground hover:text-primary">
                  Leaderboard
                </Link>
              </li>
              <li>
                <Link href="/vip" className="text-muted-foreground hover:text-primary">
                  VIP Program
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/faq" className="text-muted-foreground hover:text-primary">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-primary">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-muted-foreground hover:text-primary">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-muted-foreground hover:text-primary">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/responsible-gaming" className="text-muted-foreground hover:text-primary">
                  Responsible Gaming
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-center gap-2">
                <Mail size={16} className="text-primary" />
                <span className="text-muted-foreground">support@luxcasino.com</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} className="text-primary" />
                <span className="text-muted-foreground">+1 (888) 123-4567</span>
              </li>
            </ul>
            <div className="mt-4">
              <h4 className="font-medium mb-2">Payment Methods</h4>
              <div className="flex flex-wrap gap-2">
                <div className="bg-muted w-12 h-8 rounded flex items-center justify-center text-xs">Visa</div>
                <div className="bg-muted w-12 h-8 rounded flex items-center justify-center text-xs">MC</div>
                <div className="bg-muted w-12 h-8 rounded flex items-center justify-center text-xs">PayPal</div>
                <div className="bg-muted w-12 h-8 rounded flex items-center justify-center text-xs">BTC</div>
                <div className="bg-muted w-12 h-8 rounded flex items-center justify-center text-xs">ETH</div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t mt-12 pt-6 text-center text-muted-foreground text-sm">
          <p>© {new Date().getFullYear()} LuxCasino. All rights reserved.</p>
          <p className="mt-2">
            LuxCasino promotes responsible gaming. Gambling should be entertaining and not a way to make money. Remember
            that gambling can be addictive. Play responsibly.
          </p>
          <p className="mt-2">18+ | Gambling Problem? Call 1-800-GAMBLER</p>
        </div>
      </div>
    </footer>
  )
}


import Link from "next/link"
import { Trophy, FileText, MessageSquare, Upload } from "lucide-react"

export default function Home() {
  return (
    <div className="space-y-12">
      <section className="text-center space-y-4">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Welcome to Award Assistant
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Your AI-powered companion for submitting entries to major advertising awards.
          Save time, get smart recommendations, and complete forms with confidence.
        </p>
      </section>

      <section className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <FeatureCard
          icon={<Trophy className="w-8 h-8" />}
          title="Multi-Award Support"
          description="Support for 9 major international and French advertising awards"
        />
        <FeatureCard
          icon={<Upload className="w-8 h-8" />}
          title="Entry Kit Management"
          description="Upload and manage entry kits for different awards and years"
        />
        <FeatureCard
          icon={<FileText className="w-8 h-8" />}
          title="Project Analysis"
          description="Upload your project one-pager and get AI-powered insights"
        />
        <FeatureCard
          icon={<MessageSquare className="w-8 h-8" />}
          title="AI Chat Assistant"
          description="Get category recommendations and form completion help"
        />
      </section>

      <section className="bg-secondary rounded-lg p-8 space-y-6">
        <h2 className="text-3xl font-bold text-center">Supported Awards</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {AWARDS.map((award) => (
            <div key={award.name} className="bg-white p-4 rounded-lg shadow-sm">
              <h3 className="font-semibold">{award.name}</h3>
              <p className="text-sm text-muted-foreground">{award.location}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="text-center space-y-6">
        <h2 className="text-3xl font-bold">Get Started</h2>
        <div className="flex gap-4 justify-center">
          <Link
            href="/awards"
            className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
          >
            Manage Awards
          </Link>
          <Link
            href="/projects"
            className="px-6 py-3 border border-primary text-primary rounded-lg hover:bg-primary/10 transition-colors"
          >
            Create Project
          </Link>
        </div>
      </section>
    </div>
  )
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow">
      <div className="text-primary mb-4">{icon}</div>
      <h3 className="font-semibold mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  )
}

const AWARDS = [
  { name: "Cannes Lions", location: "International - France" },
  { name: "One Show", location: "International - USA" },
  { name: "Clios Awards", location: "International - USA" },
  { name: "The ANDYS", location: "International - USA" },
  { name: "LIA", location: "London International Awards - UK" },
  { name: "D&AD", location: "International - UK" },
  { name: "Eurobest", location: "European" },
  { name: "Club des DA", location: "French" },
  { name: "Grand Prix Stratégies", location: "French" },
]

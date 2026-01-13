import { prisma } from "@/lib/db/prisma"
import { Award } from "@prisma/client"
import { Upload, Calendar, Globe } from "lucide-react"
import Link from "next/link"
import UploadEntryKitButton from "@/components/UploadEntryKitButton"

export default async function AwardsPage() {
  const awards = await prisma.award.findMany({
    orderBy: { updatedAt: 'desc' }
  })

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold">Awards Management</h1>
          <p className="text-muted-foreground mt-2">
            Upload and manage entry kits for different advertising awards
          </p>
        </div>
        <UploadEntryKitButton />
      </div>

      {awards.length === 0 ? (
        <div className="text-center py-12 bg-secondary rounded-lg">
          <Upload className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
          <h2 className="text-2xl font-semibold mb-2">No Awards Yet</h2>
          <p className="text-muted-foreground mb-4">
            Start by uploading an entry kit for your first award
          </p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {awards.map((award) => (
            <AwardCard key={award.id} award={award} />
          ))}
        </div>
      )}

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="font-semibold text-blue-900 mb-2">Supported Awards</h3>
        <ul className="grid md:grid-cols-3 gap-2 text-sm text-blue-800">
          {SUPPORTED_AWARDS.map((name) => (
            <li key={name}>• {name}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

function AwardCard({ award }: { award: Award }) {
  return (
    <div className="bg-white border rounded-lg p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-semibold">{award.name}</h3>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
            <Globe className="w-4 h-4" />
            <span>{award.country}</span>
          </div>
        </div>
        <span className={`px-2 py-1 text-xs rounded-full ${
          award.isActive
            ? 'bg-green-100 text-green-800'
            : 'bg-gray-100 text-gray-800'
        }`}>
          {award.isActive ? 'Active' : 'Inactive'}
        </span>
      </div>

      {award.description && (
        <p className="text-sm text-muted-foreground mb-4">{award.description}</p>
      )}

      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
        <Calendar className="w-4 h-4" />
        <span>
          {award.uploadDate
            ? `Updated ${new Date(award.uploadDate).toLocaleDateString()}`
            : 'No entry kit uploaded'
          }
        </span>
      </div>

      <div className="flex gap-2">
        <Link
          href={`/awards/${award.id}`}
          className="flex-1 px-4 py-2 bg-primary text-white text-center rounded hover:bg-primary/90 transition-colors"
        >
          View Details
        </Link>
        {award.entryKitPath && (
          <a
            href={award.entryKitPath}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 border border-primary text-primary rounded hover:bg-primary/10 transition-colors"
          >
            View PDF
          </a>
        )}
      </div>
    </div>
  )
}

const SUPPORTED_AWARDS = [
  "Cannes Lions",
  "One Show",
  "Clios Awards",
  "The ANDYS",
  "LIA",
  "D&AD",
  "Eurobest",
  "Club des DA",
  "Grand Prix Stratégies",
]

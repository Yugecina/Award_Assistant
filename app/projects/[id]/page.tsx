import { prisma } from "@/lib/db/prisma"
import { notFound } from "next/navigation"
import { FileText, Award as AwardIcon, MessageSquare } from "lucide-react"
import Link from "next/link"
import StartSubmissionButton from "@/components/StartSubmissionButton"

export default async function ProjectDetailPage({ params }: { params: { id: string } }) {
  const project = await prisma.project.findUnique({
    where: { id: params.id },
    include: {
      submissions: {
        include: {
          award: true
        }
      }
    }
  })

  if (!project) {
    notFound()
  }

  const awards = await prisma.award.findMany({
    where: { isActive: true },
    orderBy: { name: 'asc' }
  })

  const availableAwards = awards.filter(
    award => !project.submissions.some(sub => sub.awardId === award.id)
  )

  return (
    <div className="space-y-8">
      <div>
        <Link href="/projects" className="text-primary hover:underline mb-4 inline-block">
          ← Back to Projects
        </Link>
        <h1 className="text-4xl font-bold">{project.name}</h1>
        {project.description && (
          <p className="text-muted-foreground mt-2">{project.description}</p>
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white border rounded-lg p-6">
          <div className="flex items-center gap-2 mb-4">
            <FileText className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-semibold">Project Board</h2>
          </div>
          {project.boardPath ? (
            <a
              href={project.boardPath}
              target="_blank"
              rel="noopener noreferrer"
              className="block px-4 py-2 bg-primary text-white text-center rounded hover:bg-primary/90 transition-colors"
            >
              View PDF
            </a>
          ) : (
            <p className="text-muted-foreground">No board uploaded</p>
          )}
        </div>

        <div className="bg-white border rounded-lg p-6">
          <div className="flex items-center gap-2 mb-4">
            <AwardIcon className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-semibold">Statistics</h2>
          </div>
          <div className="space-y-2">
            <p className="text-sm">
              <span className="font-medium">Total Submissions:</span> {project.submissions.length}
            </p>
            <p className="text-sm">
              <span className="font-medium">Available Awards:</span> {availableAwards.length}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white border rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">Active Submissions</h2>
        {project.submissions.length === 0 ? (
          <p className="text-muted-foreground">No submissions yet. Start by selecting an award below.</p>
        ) : (
          <div className="space-y-4">
            {project.submissions.map((submission) => (
              <div key={submission.id} className="border rounded-lg p-4 flex justify-between items-center">
                <div>
                  <h3 className="font-semibold">{submission.award.name}</h3>
                  <p className="text-sm text-muted-foreground capitalize">Status: {submission.status}</p>
                </div>
                <Link
                  href={`/submissions/${submission.id}`}
                  className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/90 transition-colors flex items-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  Open Chat
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="bg-white border rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">Start New Submission</h2>
        {availableAwards.length === 0 ? (
          <p className="text-muted-foreground">
            You've started submissions for all available awards. Upload more entry kits to continue.
          </p>
        ) : (
          <div className="space-y-4">
            <p className="text-muted-foreground">
              Select an award to analyze your project and get AI-powered category recommendations:
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {availableAwards.map((award) => (
                <div key={award.id} className="border rounded-lg p-4">
                  <h3 className="font-semibold mb-1">{award.name}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{award.country}</p>
                  <StartSubmissionButton projectId={project.id} awardId={award.id} awardName={award.name} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

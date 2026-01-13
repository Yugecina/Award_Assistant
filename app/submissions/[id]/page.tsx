import { prisma } from "@/lib/db/prisma"
import { notFound } from "next/navigation"
import Link from "next/link"
import ChatInterface from "@/components/ChatInterface"

export default async function SubmissionPage({ params }: { params: { id: string } }) {
  const submission = await prisma.submission.findUnique({
    where: { id: params.id },
    include: {
      project: true,
      award: true,
      chatSessions: {
        orderBy: { createdAt: 'desc' },
        take: 1
      }
    }
  })

  if (!submission) {
    notFound()
  }

  const chatSession = submission.chatSessions[0]

  return (
    <div className="space-y-6">
      <div>
        <Link
          href={`/projects/${submission.project.id}`}
          className="text-primary hover:underline mb-4 inline-block"
        >
          ← Back to Project
        </Link>
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-4xl font-bold">{submission.project.name}</h1>
            <p className="text-xl text-muted-foreground mt-2">
              {submission.award.name} Submission
            </p>
          </div>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
            submission.status === 'completed'
              ? 'bg-green-100 text-green-800'
              : submission.status === 'in_progress'
              ? 'bg-blue-100 text-blue-800'
              : 'bg-gray-100 text-gray-800'
          }`}>
            {submission.status}
          </span>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-white border rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Project Details</h2>
            <div className="space-y-3">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Project</p>
                <p className="font-medium">{submission.project.name}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Award</p>
                <p className="font-medium">{submission.award.name}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Language</p>
                <p className="font-medium capitalize">{submission.award.language}</p>
              </div>
              {submission.project.boardPath && (
                <a
                  href={submission.project.boardPath}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block px-4 py-2 border border-primary text-primary text-center rounded hover:bg-primary/10 transition-colors"
                >
                  View Project Board
                </a>
              )}
              {submission.award.entryKitPath && (
                <a
                  href={submission.award.entryKitPath}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block px-4 py-2 border border-primary text-primary text-center rounded hover:bg-primary/10 transition-colors"
                >
                  View Entry Kit
                </a>
              )}
            </div>
          </div>

          {submission.selectedCategories !== '[]' && (
            <div className="bg-white border rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Selected Categories</h2>
              <div className="space-y-2">
                {JSON.parse(submission.selectedCategories).map((categoryId: string) => (
                  <div key={categoryId} className="px-3 py-2 bg-blue-50 rounded text-sm">
                    Category: {categoryId}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="lg:col-span-2">
          <ChatInterface
            submissionId={submission.id}
            chatSessionId={chatSession.id}
            initialMessages={JSON.parse(chatSession.messages)}
            projectName={submission.project.name}
            awardName={submission.award.name}
          />
        </div>
      </div>
    </div>
  )
}

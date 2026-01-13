import { prisma } from "@/lib/db/prisma"
import { FileText, Plus } from "lucide-react"
import Link from "next/link"
import CreateProjectButton from "@/components/CreateProjectButton"

export default async function ProjectsPage() {
  const projects = await prisma.project.findMany({
    orderBy: { updatedAt: 'desc' },
    include: {
      submissions: {
        include: {
          award: true
        }
      }
    }
  })

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold">Projects</h1>
          <p className="text-muted-foreground mt-2">
            Manage your campaign projects and award submissions
          </p>
        </div>
        <CreateProjectButton />
      </div>

      {projects.length === 0 ? (
        <div className="text-center py-12 bg-secondary rounded-lg">
          <FileText className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
          <h2 className="text-2xl font-semibold mb-2">No Projects Yet</h2>
          <p className="text-muted-foreground mb-4">
            Create your first project by uploading a campaign one-pager
          </p>
          <CreateProjectButton />
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div key={project.id} className="bg-white border rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold mb-2">{project.name}</h3>
              {project.description && (
                <p className="text-sm text-muted-foreground mb-4">{project.description}</p>
              )}

              <div className="mb-4">
                <p className="text-sm font-medium text-muted-foreground">
                  Submissions: {project.submissions.length}
                </p>
                {project.submissions.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-1">
                    {project.submissions.map((submission) => (
                      <span
                        key={submission.id}
                        className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded"
                      >
                        {submission.award.name}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex gap-2">
                <Link
                  href={`/projects/${project.id}`}
                  className="flex-1 px-4 py-2 bg-primary text-white text-center rounded hover:bg-primary/90 transition-colors"
                >
                  View Details
                </Link>
                {project.boardPath && (
                  <a
                    href={project.boardPath}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 border border-primary text-primary rounded hover:bg-primary/10 transition-colors"
                  >
                    View Board
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

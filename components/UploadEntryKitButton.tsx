"use client"

import { useState } from "react"
import { Upload } from "lucide-react"

export default function UploadEntryKitButton() {
  const [isOpen, setIsOpen] = useState(false)

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2"
      >
        <Upload className="w-5 h-5" />
        Upload Entry Kit
      </button>
    )
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
        <h2 className="text-2xl font-bold mb-4">Upload Entry Kit</h2>
        <form action="/api/awards/upload" method="POST" encType="multipart/form-data">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Award Name</label>
              <select
                name="awardName"
                required
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary"
              >
                <option value="">Select an award...</option>
                <option value="Cannes Lions">Cannes Lions</option>
                <option value="One Show">One Show</option>
                <option value="Clios Awards">Clios Awards</option>
                <option value="The ANDYS">The ANDYS</option>
                <option value="LIA">LIA</option>
                <option value="D&AD">D&AD</option>
                <option value="Eurobest">Eurobest</option>
                <option value="Club des DA">Club des DA</option>
                <option value="Grand Prix Stratégies">Grand Prix Stratégies</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Country</label>
              <input
                type="text"
                name="country"
                required
                placeholder="e.g., International - France"
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Language</label>
              <select
                name="language"
                required
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary"
              >
                <option value="en">English</option>
                <option value="fr">French</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Description (Optional)</label>
              <textarea
                name="description"
                rows={3}
                placeholder="Brief description of the award..."
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Entry Kit PDF</label>
              <input
                type="file"
                name="entryKit"
                accept=".pdf"
                required
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          <div className="flex gap-3 mt-6">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="flex-1 px-4 py-2 border rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
            >
              Upload
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

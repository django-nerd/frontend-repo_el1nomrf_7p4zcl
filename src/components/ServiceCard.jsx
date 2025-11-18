import { ExternalLink } from 'lucide-react'

export default function ServiceCard({ service, onOpenDocs, onOpenSite }) {
  return (
    <div className="bg-slate-800/60 border border-slate-700/60 rounded-xl p-5 hover:border-blue-500/40 transition-colors">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-white font-semibold text-lg">{service.name}</h3>
          <p className="text-blue-200/80 text-sm mt-1 max-w-prose">{service.summary}</p>
        </div>
        <div className="flex gap-2">
          <button onClick={onOpenDocs} className="text-blue-300 hover:text-white inline-flex items-center gap-1 text-sm">
            Docs <ExternalLink size={14} />
          </button>
          <button onClick={onOpenSite} className="text-blue-300 hover:text-white inline-flex items-center gap-1 text-sm">
            Site <ExternalLink size={14} />
          </button>
        </div>
      </div>
    </div>
  )
}

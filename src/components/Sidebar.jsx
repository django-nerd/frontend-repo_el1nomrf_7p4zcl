import { useState } from 'react'
import { Menu, Home, Server, ExternalLink, Info } from 'lucide-react'

export default function Sidebar({ services, current, onSelect }) {
  const [open, setOpen] = useState(true)

  return (
    <aside className={`h-screen sticky top-0 bg-slate-900/70 border-r border-slate-800/60 backdrop-blur ${open ? 'w-72' : 'w-16'} transition-all duration-300`}> 
      <div className="flex items-center justify-between px-3 h-14 border-b border-slate-800/60">
        <button className="p-2 rounded hover:bg-slate-800/60" onClick={() => setOpen(v => !v)} aria-label="Toggle sidebar">
          <Menu size={20} className="text-blue-300" />
        </button>
        {open && <div className="text-blue-200 font-semibold">Data Infra Suite</div>}
      </div>

      <nav className="p-2">
        <button onClick={() => onSelect('home')} className={`w-full flex items-center gap-3 px-3 py-2 rounded hover:bg-slate-800/60 mb-1 ${current==='home' ? 'bg-slate-800/80 text-white' : 'text-blue-200/80'}`}>
          <Home size={18} />
          {open && <span>Overview</span>}
        </button>

        <div className="mt-3 px-3 text-xs uppercase tracking-wider text-blue-300/50">Services</div>
        <div className="mt-1">
          {services.map(svc => (
            <button key={svc.id} onClick={() => onSelect(svc.id)} className={`w-full flex items-center gap-3 px-3 py-2 rounded hover:bg-slate-800/60 mb-1 ${current===svc.id ? 'bg-slate-800/80 text-white' : 'text-blue-200/80'}`}>
              <Server size={18} />
              {open && <span>{svc.name}</span>}
            </button>
          ))}
        </div>
      </nav>

      <div className="absolute bottom-0 left-0 right-0 p-3 border-t border-slate-800/60">
        <a href="/test" className="flex items-center gap-2 text-xs text-blue-300/70 hover:text-white">
          <Info size={14} /> Diagnostic
        </a>
        <div className="mt-2 text-[10px] text-blue-300/50">External docs open in new tab</div>
      </div>
    </aside>
  )
}

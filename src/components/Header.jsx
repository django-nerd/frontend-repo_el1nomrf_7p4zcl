export default function Header({ title, subtitle }) {
  return (
    <header className="h-14 flex items-center justify-between px-6 border-b border-slate-800/60 bg-slate-900/60 backdrop-blur sticky top-0 z-10">
      <div>
        <h1 className="text-white font-semibold">{title}</h1>
        {subtitle && <p className="text-xs text-blue-300/70">{subtitle}</p>}
      </div>
      <div className="text-xs text-blue-300/70">SaaS Suite</div>
    </header>
  )
}

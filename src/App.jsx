import { useEffect, useState, useMemo } from 'react'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import ServiceCard from './components/ServiceCard'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

function Overview({ services }) {
  return (
    <div className="p-6 space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        {services.map((svc) => (
          <ServiceCard
            key={svc.id}
            service={svc}
            onOpenDocs={() => window.open(svc.docs, '_blank')}
            onOpenSite={() => window.open(svc.homepage, '_blank')}
          />
        ))}
      </div>
    </div>
  )
}

function ServiceDetail({ service }) {
  if (!service) return null
  return (
    <div className="p-6 space-y-6">
      <div className="bg-slate-800/60 border border-slate-700/60 rounded-xl p-6">
        <h2 className="text-2xl font-semibold text-white">{service.name}</h2>
        <p className="text-blue-200/80 mt-2 max-w-3xl">{service.summary}</p>
        <div className="mt-4 flex gap-3">
          <a className="px-3 py-2 bg-blue-600/80 hover:bg-blue-600 text-white rounded" href={service.docs} target="_blank" rel="noreferrer">Open Docs</a>
          <a className="px-3 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded" href={service.homepage} target="_blank" rel="noreferrer">Open Site</a>
        </div>
      </div>

      <div className="bg-slate-800/60 border border-slate-700/60 rounded-xl p-6">
        <h3 className="text-white font-semibold mb-2">Status</h3>
        <div className="text-blue-200/80">{service.status || 'available'}</div>
      </div>

      <div className="bg-slate-800/60 border border-slate-700/60 rounded-xl p-6">
        <h3 className="text-white font-semibold mb-2">Instructions</h3>
        <ul className="list-disc list-inside text-blue-200/80 space-y-1 text-sm">
          <li>Use this hub to navigate across data infrastructure services.</li>
          <li>Click Docs to learn capabilities and set up clusters.</li>
          <li>Use your organization's endpoints to connect runtime clusters.</li>
        </ul>
      </div>
    </div>
  )
}

function App() {
  const [services, setServices] = useState([])
  const [current, setCurrent] = useState('home')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await fetch(`${BACKEND_URL}/api/services`)
        if (!res.ok) throw new Error('Failed to load services')
        const data = await res.json()
        setServices(data)
      } catch (e) {
        setError(e.message)
      } finally {
        setLoading(false)
      }
    }
    fetchServices()
  }, [])

  const activeService = useMemo(() => services.find(s => s.id === current), [services, current])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-blue-100">
      <div className="flex">
        <Sidebar services={services} current={current} onSelect={setCurrent} />
        <main className="flex-1 min-h-screen">
          <Header title={current === 'home' ? 'Overview' : (activeService?.name || 'Service')} subtitle={current === 'home' ? 'Navigate and manage your data services' : activeService?.summary} />
          {loading && (
            <div className="p-6">Loading services...</div>
          )}
          {error && (
            <div className="p-6 text-red-300">{error}</div>
          )}
          {!loading && !error && (
            current === 'home' ?
              <Overview services={services} /> :
              <ServiceDetail service={activeService} />
          )}
        </main>
      </div>
    </div>
  )
}

export default App

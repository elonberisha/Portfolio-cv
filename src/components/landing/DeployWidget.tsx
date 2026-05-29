'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

type DeployWidgetProps = {
  id?: string
  initial?: string
  loggedIn?: boolean
}

export default function DeployWidget({
  id = 'deploy-input',
  initial = 'your-name',
  loggedIn = false,
}: DeployWidgetProps) {
  const router = useRouter()
  const [val, setVal] = useState(initial)
  const [typing, setTyping] = useState(false)

  useEffect(() => {
    if (val !== initial) return

    let index = 0
    setVal('')
    setTyping(true)

    const timer = window.setInterval(() => {
      index += 1
      setVal(initial.slice(0, index))
      if (index >= initial.length) {
        window.clearInterval(timer)
        setTyping(false)
      }
    }, 90)

    return () => window.clearInterval(timer)
    // Run once on mount for the small type-in hint.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function cleanSubdomain(value: string) {
    return value.toLowerCase().replace(/[^a-z0-9-]/g, '').slice(0, 24)
  }

  function handleContinue() {
    const subdomain = cleanSubdomain(val || initial)
    const query = subdomain ? `?subdomain=${encodeURIComponent(subdomain)}` : ''
    router.push(loggedIn ? `/dashboard${query}` : `/signup${query}`)
  }

  const subdomain = cleanSubdomain(val || initial) || 'your-name'

  return (
    <div className="deploy-widget">
      <div className="row">
        <div className="input-wrap">
          <input
            id={id}
            value={val}
            onChange={(event) => setVal(cleanSubdomain(event.target.value))}
            placeholder="your-name"
            spellCheck={false}
            autoComplete="off"
          />
          <span>.portfolio-cv.online</span>
        </div>
        <button className="deploy-btn" onClick={handleContinue} type="button">
          {loggedIn ? <>Go dashboard <span>{'->'}</span></> : <>Start free <span>{'->'}</span></>}
        </button>
      </div>
      <div className="status">
        <i className="dot"></i>
        {typing ? (
          <>Checking name...</>
        ) : loggedIn ? (
          <>Continue in your dashboard to publish {subdomain}.portfolio-cv.online.</>
        ) : (
          <>Create a free account to reserve {subdomain}.portfolio-cv.online.</>
        )}
      </div>
      <div className="why">
        <span>Free forever</span>
        <span>SSL included</span>
        <span>PDF export</span>
        <span>Custom domain included</span>
      </div>
    </div>
  )
}

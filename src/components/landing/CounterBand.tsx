'use client'

import { useState, useEffect } from 'react'

type RecentDeploy = {
  subdomain: string
  url: string
  ago: string
}

type Props = {
  studentCount?: number
  schoolCount?: number
  countryCount?: number
  recentDeploys?: RecentDeploy[]
}

export default function CounterBand({
  studentCount = 0,
  schoolCount = 0,
  countryCount = 0,
  recentDeploys = [],
}: Props) {
  const [n, setN] = useState(studentCount)

  useEffect(() => {
    setN(studentCount)
  }, [studentCount])

  // Build the deploy ticker from real data; duplicate for a seamless marquee
  // loop. When there are no deploys yet, the stream simply stays empty.
  const stream = recentDeploys.length > 0 ? [...recentDeploys, ...recentDeploys] : []

  return (
    <div className="counter-band">
      <span className="lbl"><i></i>LIVE · DEPLOYED RECENTLY</span>
      <span className="stream">
        <span className="stream-track">
          {stream.map((d, i) => (
            <span key={i}>↗ <i>{d.url}</i> · {d.ago}</span>
          ))}
        </span>
      </span>
      <span className="num">{n.toLocaleString()}</span>
      <span className="stat"><b>{schoolCount}</b>schools</span>
      <span className="stat"><b>{countryCount}</b>countries</span>
    </div>
  )
}

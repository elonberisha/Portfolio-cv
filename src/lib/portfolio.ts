import config from '@payload-config'
import { getPayload } from 'payload'

/**
 * Load the current user's portfolio (server-side), with the related template
 * resolved one level deep so we can show its name. Returns null if the student
 * has not picked a template yet.
 */
export async function getMyPortfolio(userId: string | number) {
  const payload = await getPayload({ config })
  const res = await payload.find({
    collection: 'portfolios',
    where: { owner: { equals: userId } },
    depth: 1,
    limit: 1,
    overrideAccess: true,
  })
  return res.docs[0] ?? null
}

/**
 * Load the current user's CV (built or uploaded). Returns null if none yet.
 */
export async function getMyCV(userId: string | number) {
  const payload = await getPayload({ config })
  const res = await payload.find({
    collection: 'cvs',
    where: { owner: { equals: userId } },
    depth: 1,
    limit: 1,
    overrideAccess: true,
  })
  return res.docs[0] ?? null
}

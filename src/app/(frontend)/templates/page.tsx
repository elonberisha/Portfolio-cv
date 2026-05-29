import { getLandingData } from '@/lib/stats'

import styles from './page.module.css'
import TemplateChooser from './TemplateChooser'

export default async function TemplatesPage() {
  const { activeSlugs } = await getLandingData()

  return (
    <main className={styles.main}>
      <div className={styles.header}>
        <p className={styles.eyebrow}>Choose your starting point</p>
        <h1 className={styles.title}>
          Templates for every faculty group.
        </h1>
        <p className={styles.subtitle}>
          Pick a structure that fits your field. The design can change later,
          but this choice helps the builder show the right sections first.
        </p>
      </div>

      <TemplateChooser activeSlugs={activeSlugs} />
    </main>
  )
}

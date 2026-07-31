import { useState, useEffect } from 'react'
import Header from './components/Header'
import Navigation from './components/Navigation'
import BasicExplorerDemo from './components/demos/BasicExplorerDemo'
import LazyLoadingDemo from './components/demos/LazyLoadingDemo'
import FileWatcherDemo from './components/demos/FileWatcherDemo'
import AdvancedFeaturesDemo from './components/demos/AdvancedFeaturesDemo'
import PerformanceDemo from './components/demos/PerformanceDemo'
import styles from './App.module.css'

export type DemoType = 'basic' | 'lazy' | 'watcher' | 'advanced' | 'performance'

function App() {
  const [activeDemo, setActiveDemo] = useState<DemoType>('basic')
  const [navOpen, setNavOpen] = useState(false)

  const handleDemoChange = (demo: DemoType) => {
    setActiveDemo(demo)
    setNavOpen(false)
  }

  useEffect(() => {
    document.body.style.overflow = navOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [navOpen])

  const renderDemo = () => {
    switch (activeDemo) {
      case 'basic':
        return <BasicExplorerDemo />
      case 'lazy':
        return <LazyLoadingDemo />
      case 'watcher':
        return <FileWatcherDemo />
      case 'advanced':
        return <AdvancedFeaturesDemo />
      case 'performance':
        return <PerformanceDemo />
      default:
        return <BasicExplorerDemo />
    }
  }

  return (
    <div className={styles.app}>
      <div className={styles.mobileTopBar}>
        <span className={styles.mobileTopBarTitle}>MD File Explorer</span>
        <button
          className={`${styles.navToggle} ${navOpen ? styles.navToggleOpen : ''}`}
          onClick={() => setNavOpen(!navOpen)}
          aria-label="Toggle navigation menu"
          aria-expanded={navOpen}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
      <Header />
      <div
        className={`${styles.overlay} ${navOpen ? styles.overlayVisible : ''}`}
        onClick={() => setNavOpen(false)}
        aria-hidden="true"
      />
      <div className={styles.body}>
        <Navigation
          activeDemo={activeDemo}
          onDemoChange={handleDemoChange}
          dataNavOpen={navOpen}
        />
        <main className={styles.main}>
          {renderDemo()}
        </main>
      </div>
    </div>
  )
}

export default App

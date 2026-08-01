import React, { useState } from 'react'
import CodeExample from '../ui/CodeExample'
import styles from './GettingStartedDemo.module.css'
import type { DemoType } from '../../App'

interface GettingStartedDemoProps {
  onNavigate?: (demo: DemoType) => void
}

interface TocItem {
  id: string
  label: string
}

interface TocGroup {
  label: string
  items: TocItem[]
}

const toc: TocGroup[] = [
  {
    label: 'Setup',
    items: [
      { id: 'installation', label: 'Installation' },
      { id: 'quick-start', label: 'Quick Start' },
    ],
  },
  {
    label: 'Configuration',
    items: [
      { id: 'options', label: 'Options Reference' },
      { id: 'api-methods', label: 'API Methods' },
    ],
  },
  {
    label: 'Scenarios',
    items: [
      { id: 'scan', label: 'Full Directory Scan' },
      { id: 'lazy-loading', label: 'Lazy Loading' },
      { id: 'watching', label: 'File Watching' },
      { id: 'searching', label: 'Searching Files' },
      { id: 'filtering-sorting', label: 'Filtering & Sorting' },
      { id: 'metadata', label: 'Metadata Parsing' },
      { id: 'read-content', label: 'Reading File Content' },
      { id: 'exists', label: 'Checking Existence' },
    ],
  },
  {
    label: 'Integrations',
    items: [
      { id: 'react-integration', label: 'React Component' },
      { id: 'express-integration', label: 'Express API Server' },
    ],
  },
  {
    label: 'Reference',
    items: [
      { id: 'utilities', label: 'Helper Utilities' },
      { id: 'structure', label: 'Project Structure' },
      { id: 'performance-tips', label: 'Performance Tips' },
    ],
  },
]

const badges = [
  { icon: '🚀', label: 'Lazy Loading' },
  { icon: '📁', label: 'Recursive Scanning' },
  { icon: '🔍', label: 'Smart Filtering' },
  { icon: '📝', label: 'Metadata Parsing' },
  { icon: '👀', label: 'File Watching' },
  { icon: '🔎', label: 'Full-Text Search' },
  { icon: '🎯', label: 'Fully Typed' },
  { icon: '⚡', label: 'High Performance' },
]

const optionsReference = [
  { name: 'rootPath', type: 'string', defaultValue: '—', description: 'Root directory to explore' },
  { name: 'includeExtensions', type: "string[]", defaultValue: 'all files', description: "e.g. ['.md', '.mdx']" },
  { name: 'excludePatterns', type: "string[]", defaultValue: '[]', description: "e.g. ['node_modules', '.git']" },
  { name: 'maxDepth', type: 'number', defaultValue: 'unlimited', description: 'Maximum scan depth' },
  { name: 'sortBy', type: "'name' | 'date' | 'size'", defaultValue: "'name'", description: 'Sort criteria' },
  { name: 'sortOrder', type: "'asc' | 'desc'", defaultValue: "'asc'", description: 'Sort direction' },
  { name: 'includeDotFiles', type: 'boolean', defaultValue: 'false', description: 'Include hidden files' },
  { name: 'parseMarkdownMetadata', type: 'boolean', defaultValue: 'false', description: 'Parse YAML frontmatter' },
]

const apiMethods = [
  { signature: 'scanDirectory(path?, options?)', returns: 'Promise<ScanResult>', description: 'Scan a directory and return the complete tree' },
  { signature: 'getFileTree(path?, depth?)', returns: 'Promise<FileNode[]>', description: 'Get the file tree with an optional depth limit' },
  { signature: 'getFileContent(filePath)', returns: 'Promise<FileContent>', description: 'Get the content of a specific file' },
  { signature: 'watchDirectory(callback)', returns: 'void', description: 'Watch for file system changes in real-time' },
  { signature: 'stopWatching()', returns: 'void', description: 'Stop watching for file changes' },
  { signature: 'searchFiles(query, searchInContent?)', returns: 'Promise<FileNode[]>', description: 'Search for files by name or content' },
  { signature: 'fileExists(filePath)', returns: 'Promise<boolean>', description: 'Check if a file exists in the tree' },
]

const utilities = [
  { name: 'normalizePath(filePath)', description: 'Normalizes slashes and casing across platforms' },
  { name: 'isValidMarkdownFile(filePath)', description: 'Checks whether a path points to a markdown file' },
  { name: 'shouldExcludePath(filePath, patterns)', description: 'Tests a path against your exclude patterns' },
  { name: 'getFileStats(filePath)', description: 'Reads size and modification date for a file' },
  { name: 'parseMarkdownMetadata(filePath)', description: 'Extracts YAML frontmatter from a markdown file' },
  { name: 'sortFileNodes(nodes, by, order)', description: 'Sorts a FileNode array by name, date, or size' },
  { name: 'createFileNode(path, relativePath)', description: 'Builds a single FileNode without a full scan' },
  { name: 'getRelativePath(fullPath, rootPath)', description: 'Converts an absolute path to a root-relative path' },
]

const performanceTips = [
  { icon: '⚡', title: 'Use Specific Extensions', description: 'Filter by specific file extensions to reduce processing time' },
  { icon: '🚫', title: 'Exclude Large Directories', description: 'Skip node_modules, .git, and other large directories' },
  { icon: '📊', title: 'Limit Initial Depth', description: 'Use lazy loading for better initial performance' },
  { icon: '📝', title: 'Conditional Metadata', description: 'Only parse metadata when it is actually needed' },
  { icon: '💾', title: 'Cache File Content', description: 'Cache results of getFileContent() for frequently accessed files' },
  { icon: '👀', title: 'Watch Sparingly', description: 'Only enable file watching in development or preview environments' },
]

const packageManagers: { id: 'npm' | 'yarn' | 'pnpm'; label: string; command: string }[] = [
  { id: 'npm', label: 'npm', command: 'npm install @asafarim/md-file-explorer' },
  { id: 'yarn', label: 'yarn', command: 'yarn add @asafarim/md-file-explorer' },
  { id: 'pnpm', label: 'pnpm', command: 'pnpm add @asafarim/md-file-explorer' },
]

const quickStartCode = `import { MdFileExplorer } from '@asafarim/md-file-explorer'

// Create an explorer instance
const explorer = new MdFileExplorer('/path/to/docs', {
  includeExtensions: ['.md', '.mdx'],
  excludePatterns: ['node_modules', '.git'],
  parseMarkdownMetadata: true,
})

// Get the file tree (lazy-loaded by default)
const fileTree = await explorer.getFileTree()

// Read a specific file's content
const content = await explorer.getFileContent('guides/getting-started.md')

// Scan an entire directory at once
const scanResult = await explorer.scanDirectory()`

const scanCode = `import { MdFileExplorer } from '@asafarim/md-file-explorer'

const explorer = new MdFileExplorer('./docs', {
  includeExtensions: ['.md', '.txt', '.json'],
  maxDepth: 3,
  sortBy: 'name',
})

const result = await explorer.scanDirectory()

console.log(\`\${result.totalFiles} files, \${result.totalFolders} folders\`)
console.log(result.nodes) // the full FileNode tree`

const lazyLoadingCode = `const explorer = new MdFileExplorer('/docs')

// Get only top-level folders and files
const topLevel = await explorer.getFileTree('/', 1)

// Load contents of a specific folder (2 levels deep)
const packageDocs = await explorer.getFileTree('/packages', 2)

// Expand a folder on demand, e.g. when a user clicks it
async function expandFolder(folderPath: string) {
  return await explorer.getFileTree(folderPath, 1)
}`

const watchingCode = `explorer.watchDirectory((event, path) => {
  console.log(\`File \${event}: \${path}\`)
  // Events: 'add' | 'change' | 'unlink' | 'addDir' | 'unlinkDir'

  switch (event) {
    case 'add':
      console.log('New file added')
      break
    case 'change':
      console.log('File modified')
      break
    case 'unlink':
      console.log('File deleted')
      break
  }
})

// Stop watching when the component unmounts
explorer.stopWatching()`

const searchingCode = `// Search by filename only
const byName = await explorer.searchFiles('react')

// Search inside file contents too (slower, but thorough)
const byContent = await explorer.searchFiles('useState', true)

byContent.forEach(file => console.log(file.path))`

const filteringSortingCode = `const explorer = new MdFileExplorer('/docs', {
  includeExtensions: ['.md', '.mdx', '.txt'],
  excludePatterns: ['draft-*', 'temp/**', 'private/'],
  maxDepth: 5,
  sortBy: 'date',
  sortOrder: 'desc',
  includeDotFiles: false,
})

const { nodes } = await explorer.scanDirectory()
// nodes are already filtered and sorted for you`

const metadataCode = `const explorer = new MdFileExplorer('/docs', {
  parseMarkdownMetadata: true,
})

const { nodes } = await explorer.scanDirectory()

for (const node of nodes) {
  if (node.type === 'file' && node.metadata) {
    console.log(node.metadata.title)       // from frontmatter
    console.log(node.metadata.tags)        // e.g. ['guide', 'tutorial']
    console.log(node.metadata.description)
  }
}

/* Given a file like:
---
title: Getting Started
tags: [guide, tutorial]
---
# Getting Started
...
*/`

const readContentCode = `const file = await explorer.getFileContent('guides/getting-started.md')

console.log(file.content)       // raw markdown, frontmatter stripped
console.log(file.metadata)      // parsed frontmatter, if enabled
console.log(file.lastModified)  // Date`

const existsCode = `const exists = await explorer.fileExists('guides/getting-started.md')

if (!exists) {
  throw new Error('Documentation page not found')
}`

const reactCode = `import { useState, useEffect } from 'react'
import { MdFileExplorer, FileNode } from '@asafarim/md-file-explorer'

function DocumentationExplorer() {
  const [explorer] = useState(() => new MdFileExplorer('./docs'))
  const [fileTree, setFileTree] = useState<FileNode[]>([])

  useEffect(() => {
    const loadTree = async () => {
      const tree = await explorer.getFileTree()
      setFileTree(tree)
    }

    loadTree()

    // Auto-refresh whenever files change
    explorer.watchDirectory(() => loadTree())

    return () => explorer.stopWatching()
  }, [explorer])

  return (
    <ul>
      {fileTree.map(node => (
        <li key={node.path}>{node.name}</li>
      ))}
    </ul>
  )
}`

const expressCode = `import express from 'express'
import { MdFileExplorer } from '@asafarim/md-file-explorer'

const app = express()
const explorer = new MdFileExplorer('./docs')

// Serve the file tree
app.get('/api/docs/tree', async (req, res) => {
  const { path, depth } = req.query
  const tree = await explorer.getFileTree(path as string, Number(depth) || 1)
  res.json(tree)
})

// Serve file content
app.get('/api/docs/file', async (req, res) => {
  try {
    const content = await explorer.getFileContent(req.query.path as string)
    res.json(content)
  } catch {
    res.status(404).json({ error: 'File not found' })
  }
})

// Search files
app.get('/api/docs/search', async (req, res) => {
  const { q, content } = req.query
  const results = await explorer.searchFiles(q as string, content === 'true')
  res.json(results)
})

app.listen(3000)`

const structureCode = `docs/
├── README.md
├── guides/
│   ├── getting-started.md
│   └── advanced-usage.md
├── api/
│   ├── overview.md
│   └── reference/
│       ├── classes.md
│       └── interfaces.md
└── examples/
    └── basic-usage.md`

interface SectionProps {
  id: string
  kicker: string
  kickerTone: 'setup' | 'config' | 'scenario' | 'integration' | 'reference'
  title: string
  description?: string
  children: React.ReactNode
  cta?: { label: string; demo: DemoType }
}

const Section: React.FC<SectionProps & { onNavigate?: (demo: DemoType) => void }> = ({
  id,
  kicker,
  kickerTone,
  title,
  description,
  children,
  cta,
  onNavigate,
}) => (
  <section id={id} className={styles.section}>
    <span className={`${styles.kicker} ${styles[`kicker_${kickerTone}`]}`}>{kicker}</span>
    <h2 className={styles.sectionTitle}>{title}</h2>
    {description && <p className={styles.sectionDescription}>{description}</p>}
    <div className={styles.sectionBody}>{children}</div>
    {cta && onNavigate && (
      <button className={styles.ctaButton} onClick={() => onNavigate(cta.demo)}>
        {cta.label} →
      </button>
    )}
  </section>
)

const GettingStartedDemo: React.FC<GettingStartedDemoProps> = ({ onNavigate }) => {
  const [pm, setPm] = useState<'npm' | 'yarn' | 'pnpm'>('npm')
  const activePm = packageManagers.find(p => p.id === pm)!

  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <span className={styles.heroEyebrow}>📖 Get Started</span>
        <h1 className={styles.heroTitle}>Everything you can do with MD File Explorer</h1>
        <p className={styles.heroDescription}>
          A complete walkthrough of every scenario the package supports — installation,
          configuration, real-time file watching, search, metadata parsing, and
          framework integrations — with copy-paste-ready code for each one.
        </p>
        <div className={styles.badges}>
          {badges.map(b => (
            <span key={b.label} className={styles.badge}>
              <span aria-hidden="true">{b.icon}</span> {b.label}
            </span>
          ))}
        </div>
      </div>

      <div className={styles.layout}>
        <nav className={styles.toc} aria-label="On this page">
          <div className={styles.tocSticky}>
            <span className={styles.tocHeading}>On this page</span>
            {toc.map(group => (
              <div key={group.label} className={styles.tocGroup}>
                <span className={styles.tocGroupLabel}>{group.label}</span>
                <ul className={styles.tocList}>
                  {group.items.map(item => (
                    <li key={item.id}>
                      <a href={`#${item.id}`} className={styles.tocLink}>
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </nav>

        <div className={styles.content}>
          <div className={styles.mobileToc}>
            {toc.flatMap(g => g.items).map(item => (
              <a key={item.id} href={`#${item.id}`} className={styles.mobileTocChip}>
                {item.label}
              </a>
            ))}
          </div>

          <Section id="installation" kicker="Setup" kickerTone="setup" title="Installation" onNavigate={onNavigate}>
            <div className={styles.tabs} role="tablist" aria-label="Package manager">
              {packageManagers.map(p => (
                <button
                  key={p.id}
                  role="tab"
                  aria-selected={pm === p.id}
                  className={`${styles.tab} ${pm === p.id ? styles.tabActive : ''}`}
                  onClick={() => setPm(p.id)}
                >
                  {p.label}
                </button>
              ))}
            </div>
            <CodeExample code={activePm.command} language="bash" />
          </Section>

          <Section
            id="quick-start"
            kicker="Setup"
            kickerTone="setup"
            title="Quick Start"
            description="The fastest path from zero to a browsable file tree."
            onNavigate={onNavigate}
          >
            <CodeExample code={quickStartCode} language="typescript" />
          </Section>

          <Section
            id="options"
            kicker="Configuration"
            kickerTone="config"
            title="Options Reference"
            description="Every option accepted by the MdFileExplorer constructor."
            onNavigate={onNavigate}
          >
            <div className={styles.tableWrapper}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Option</th>
                    <th>Type</th>
                    <th>Default</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  {optionsReference.map(opt => (
                    <tr key={opt.name}>
                      <td><code>{opt.name}</code></td>
                      <td className={styles.tableType}>{opt.type}</td>
                      <td className={styles.tableDefault}>{opt.defaultValue}</td>
                      <td>{opt.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Section>

          <Section
            id="api-methods"
            kicker="Configuration"
            kickerTone="config"
            title="API Methods"
            description="The full instance API exposed by MdFileExplorer."
            onNavigate={onNavigate}
          >
            <div className={styles.tableWrapper}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Method</th>
                    <th>Returns</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  {apiMethods.map(m => (
                    <tr key={m.signature}>
                      <td><code>{m.signature}</code></td>
                      <td className={styles.tableType}>{m.returns}</td>
                      <td>{m.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Section>

          <Section
            id="scan"
            kicker="Scenario"
            kickerTone="scenario"
            title="Full Directory Scan"
            description="Scan an entire directory tree in one call — best for smaller doc sets where you want everything upfront."
            cta={{ label: 'Try it in the Basic Explorer demo', demo: 'basic' }}
            onNavigate={onNavigate}
          >
            <CodeExample code={scanCode} language="typescript" />
          </Section>

          <Section
            id="lazy-loading"
            kicker="Scenario"
            kickerTone="scenario"
            title="Lazy Loading with Depth Control"
            description="Only load what's visible — ideal for large documentation trees where an upfront scan would be wasteful."
            cta={{ label: 'Try it in the Lazy Loading demo', demo: 'lazy' }}
            onNavigate={onNavigate}
          >
            <CodeExample code={lazyLoadingCode} language="typescript" />
          </Section>

          <Section
            id="watching"
            kicker="Scenario"
            kickerTone="scenario"
            title="Real-Time File Watching"
            description="React to files being added, changed, or removed — perfect for a live-reloading docs preview."
            cta={{ label: 'Try it in the File Watcher demo', demo: 'watcher' }}
            onNavigate={onNavigate}
          >
            <CodeExample code={watchingCode} language="typescript" />
          </Section>

          <Section
            id="searching"
            kicker="Scenario"
            kickerTone="scenario"
            title="Searching Files"
            description="Find files by name, or search inside their content for a phrase."
            cta={{ label: 'Try it in Advanced Features', demo: 'advanced' }}
            onNavigate={onNavigate}
          >
            <CodeExample code={searchingCode} language="typescript" />
          </Section>

          <Section
            id="filtering-sorting"
            kicker="Scenario"
            kickerTone="scenario"
            title="Filtering & Sorting"
            description="Fine-tune exactly which files are included and how the results are ordered."
            cta={{ label: 'Try it in Advanced Features', demo: 'advanced' }}
            onNavigate={onNavigate}
          >
            <CodeExample code={filteringSortingCode} language="typescript" />
          </Section>

          <Section
            id="metadata"
            kicker="Scenario"
            kickerTone="scenario"
            title="Metadata Parsing (Frontmatter)"
            description="Automatically extract YAML frontmatter — title, tags, description, and any custom fields."
            cta={{ label: 'Try it in the Basic Explorer demo', demo: 'basic' }}
            onNavigate={onNavigate}
          >
            <CodeExample code={metadataCode} language="typescript" />
          </Section>

          <Section
            id="read-content"
            kicker="Scenario"
            kickerTone="scenario"
            title="Reading File Content"
            description="Fetch the raw content of a single file without rescanning the whole tree."
            onNavigate={onNavigate}
          >
            <CodeExample code={readContentCode} language="typescript" />
          </Section>

          <Section
            id="exists"
            kicker="Scenario"
            kickerTone="scenario"
            title="Checking File Existence"
            description="Guard against broken links or missing pages before rendering them."
            onNavigate={onNavigate}
          >
            <CodeExample code={existsCode} language="typescript" />
          </Section>

          <Section
            id="react-integration"
            kicker="Integration"
            kickerTone="integration"
            title="React Component"
            description="A minimal component that loads the tree once and refreshes it whenever files change."
            onNavigate={onNavigate}
          >
            <CodeExample code={reactCode} language="tsx" />
          </Section>

          <Section
            id="express-integration"
            kicker="Integration"
            kickerTone="integration"
            title="Express API Server"
            description="Expose your docs tree, file content, and search over a small REST API."
            onNavigate={onNavigate}
          >
            <CodeExample code={expressCode} language="typescript" />
          </Section>

          <Section
            id="utilities"
            kicker="Reference"
            kickerTone="reference"
            title="Helper Utilities"
            description="Standalone functions exported alongside MdFileExplorer, useful for building your own tooling."
            onNavigate={onNavigate}
          >
            <div className={styles.utilityGrid}>
              {utilities.map(u => (
                <div key={u.name} className={styles.utilityCard}>
                  <code className={styles.utilityName}>{u.name}</code>
                  <p className={styles.utilityDescription}>{u.description}</p>
                </div>
              ))}
            </div>
          </Section>

          <Section
            id="structure"
            kicker="Reference"
            kickerTone="reference"
            title="Recommended Project Structure"
            description="The package works with any layout, but organized documentation gets the most out of metadata and sorting."
            onNavigate={onNavigate}
          >
            <CodeExample code={structureCode} language="text" />
          </Section>

          <Section
            id="performance-tips"
            kicker="Reference"
            kickerTone="reference"
            title="Performance Tips"
            cta={{ label: 'See live benchmarks', demo: 'performance' }}
            onNavigate={onNavigate}
          >
            <div className={styles.tipsGrid}>
              {performanceTips.map(tip => (
                <div key={tip.title} className={styles.tipCard}>
                  <div className={styles.tipIcon}>{tip.icon}</div>
                  <div>
                    <h4>{tip.title}</h4>
                    <p>{tip.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </Section>
        </div>
      </div>
    </div>
  )
}

export default GettingStartedDemo

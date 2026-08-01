import React, { useState, useCallback } from 'react'
import { MdFileExplorer } from '@asafarim/md-file-explorer'
import type { SearchResult } from '@asafarim/md-file-explorer'
import CodeExample from '../ui/CodeExample'
import LoadingSpinner from '../ui/LoadingSpinner'
import styles from './SearchDemo.module.css'

const searchCode = `// Search by filename only — fast
const byName = await explorer.searchFiles('react')

// Search inside file contents too — thorough
const byContent = await explorer.searchFiles('useState', true)

// Get detailed results with match type and snippets
const detailed = await explorer.searchFilesDetailed('hooks', true)
detailed.forEach(result => {
  console.log(result.matchType)  // 'name' | 'metadata' | 'content'
  console.log(result.node.path)  // file path
  console.log(result.snippet)    // excerpt around the match (content only)
})`

const matchTypeConfig = {
  name: { label: 'Name', icon: '📄', color: '#3b82f6' },
  metadata: { label: 'Metadata', icon: '🏷️', color: '#8b5cf6' },
  content: { label: 'Content', icon: '📝', color: '#10b981' },
}

const SearchDemo: React.FC = () => {
  const [query, setQuery] = useState('')
  const [searchInContent, setSearchInContent] = useState(true)
  const [results, setResults] = useState<SearchResult[]>([])
  const [loading, setLoading] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)
  const [searchTime, setSearchTime] = useState(0)

  const runSearch = useCallback(async (searchQuery: string, content: boolean) => {
    if (!searchQuery.trim()) {
      setResults([])
      setHasSearched(false)
      return
    }

    setLoading(true)
    setHasSearched(true)

    try {
      const explorer = new MdFileExplorer('../../test-docs', {
        includeExtensions: ['.md', '.txt', '.json'],
        parseMarkdownMetadata: true,
      })

      const start = performance.now()
      const searchResults = await explorer.searchFilesDetailed(searchQuery, content)
      const elapsed = performance.now() - start

      setResults(searchResults)
      setSearchTime(elapsed)
    } catch (error) {
      console.error('Search failed:', error)
    } finally {
      setLoading(false)
    }
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    runSearch(query, searchInContent)
  }

  const handleQuickSearch = (term: string) => {
    setQuery(term)
    runSearch(term, searchInContent)
  }

  const nameCount = results.filter(r => r.matchType === 'name').length
  const metadataCount = results.filter(r => r.matchType === 'metadata').length
  const contentCount = results.filter(r => r.matchType === 'content').length

  return (
    <div className={styles.demo}>
      <div className={styles.header}>
        <h1>Full-Text Search</h1>
        <p>
          Search across file names, metadata, and file contents. The new{' '}
          <code>searchFilesDetailed()</code> method returns match type and content snippets
          so you can show users exactly where the query was found.
        </p>
      </div>

      <form className={styles.searchBar} onSubmit={handleSearch}>
        <div className={styles.searchInputRow}>
          <span className={styles.searchIcon}>🔎</span>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for a word, phrase, or filename..."
            className={styles.searchInput}
            autoFocus
          />
          <button type="submit" className={styles.searchButton} disabled={loading || !query.trim()}>
            {loading ? 'Searching...' : 'Search'}
          </button>
        </div>
        <label className={styles.contentToggle}>
          <input
            type="checkbox"
            checked={searchInContent}
            onChange={(e) => {
              setSearchInContent(e.target.checked)
              if (query.trim()) runSearch(query, e.target.checked)
            }}
          />
          <span>Search inside file content</span>
        </label>
      </form>

      <div className={styles.quickSearch}>
        <span className={styles.quickLabel}>Try:</span>
        {['getting', 'config', 'markdown', 'explorer', 'lazy'].map(term => (
          <button
            key={term}
            className={styles.quickChip}
            onClick={() => handleQuickSearch(term)}
          >
            {term}
          </button>
        ))}
      </div>

      {hasSearched && !loading && (
        <div className={styles.resultsMeta}>
          <span className={styles.resultCount}>
            {results.length} {results.length === 1 ? 'match' : 'matches'}
          </span>
          {searchInContent && (
            <span className={styles.matchBreakdown}>
              {nameCount > 0 && <span style={{ color: matchTypeConfig.name.color }}>📄 {nameCount} name</span>}
              {metadataCount > 0 && <span style={{ color: matchTypeConfig.metadata.color }}>🏷️ {metadataCount} metadata</span>}
              {contentCount > 0 && <span style={{ color: matchTypeConfig.content.color }}>📝 {contentCount} content</span>}
            </span>
          )}
          <span className={styles.searchTime}>{searchTime.toFixed(1)}ms</span>
        </div>
      )}

      {loading ? (
        <LoadingSpinner message="Searching files..." />
      ) : hasSearched ? (
        results.length > 0 ? (
          <div className={styles.resultsList}>
            {results.map((result, i) => {
              const config = matchTypeConfig[result.matchType as keyof typeof matchTypeConfig]
              return (
                <div key={`${result.node.path}-${i}`} className={styles.resultCard}>
                  <div className={styles.resultHeader}>
                    <span className={styles.matchBadge} style={{ backgroundColor: config.color + '20', color: config.color }}>
                      {config.icon} {config.label}
                    </span>
                    <span className={styles.resultPath}>{result.node.path}</span>
                    {result.node.size && (
                      <span className={styles.resultSize}>{(result.node.size / 1024).toFixed(1)} KB</span>
                    )}
                  </div>
                  {result.node.metadata?.title && (
                    <div className={styles.resultTitle}>{result.node.metadata.title}</div>
                  )}
                  {result.snippet && (
                    <div className={styles.snippet}>{result.snippet}</div>
                  )}
                  {result.node.metadata?.tags && (
                    <div className={styles.tags}>
                      {result.node.metadata.tags.map((tag: string) => (
                        <span key={tag} className={styles.tag}>{tag}</span>
                      ))}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        ) : (
          <div className={styles.noResults}>
            <span className={styles.noResultsIcon}>🔍</span>
            <p>No matches found for "{query}"</p>
            <p className={styles.noResultsHint}>
              {searchInContent
                ? 'Try a different search term or uncheck "Search inside file content" to search names only.'
                : 'Try enabling "Search inside file content" for more thorough results.'}
            </p>
          </div>
        )
      ) : null}

      <div className={styles.codeSection}>
        <h3>Code Example</h3>
        <CodeExample code={searchCode} language="typescript" />
      </div>
    </div>
  )
}

export default SearchDemo

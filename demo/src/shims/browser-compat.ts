// Browser-compatible shim for @asafarim/md-file-explorer
// Exports the same API surface without Node.js dependencies

// === Types (matching src/types/index.ts) ===
export interface FileNode {
  name: string;
  path: string;
  type: 'folder' | 'file';
  children?: FileNode[];
  lastModified?: Date;
  size?: number;
  metadata?: MarkdownMetadata;
}

export interface MarkdownMetadata {
  title?: string;
  description?: string;
  author?: string;
  tags?: string[];
  date?: string;
  [key: string]: any;
}

export interface FileContent {
  content: string;
  metadata?: MarkdownMetadata;
  path: string;
  lastModified?: Date;
}

export interface ExplorerOptions {
  rootPath: string;
  includeExtensions?: string[];
  excludePatterns?: string[];
  maxDepth?: number;
  sortBy?: 'name' | 'date' | 'size';
  sortOrder?: 'asc' | 'desc';
  includeDotFiles?: boolean;
  parseMarkdownMetadata?: boolean;
}

export interface ScanResult {
  nodes: FileNode[];
  totalFiles: number;
  totalFolders: number;
  lastScanned: Date;
}

export interface FileWatcherCallback {
  (event: 'add' | 'change' | 'unlink' | 'addDir' | 'unlinkDir', path: string): void;
}

export interface SearchResult {
  node: FileNode;
  matchType: 'name' | 'metadata' | 'content';
  snippet?: string;
}

export interface ExplorerAPI {
  scanDirectory(path?: string, options?: Partial<ExplorerOptions>): Promise<ScanResult>;
  getFileContent(filePath: string): Promise<FileContent>;
  getFileTree(path?: string, depth?: number): Promise<FileNode[]>;
  watchDirectory(callback: FileWatcherCallback): void;
  stopWatching(): void;
  isValidMarkdownFile(filePath: string): boolean;
  normalizePath(filePath: string): string;
}

// === Mock data ===
const mockFileTree: FileNode[] = [
  {
    name: 'docs',
    path: 'docs',
    type: 'folder',
    children: [
      {
        name: 'getting-started.md',
        path: 'docs/getting-started.md',
        type: 'file',
        size: 2048,
        lastModified: new Date('2025-01-15'),
        metadata: {
          title: 'Getting Started Guide',
          author: 'ASafariM Team',
          tags: ['guide', 'tutorial']
        }
      },
      {
        name: 'api-reference.md',
        path: 'docs/api-reference.md',
        type: 'file',
        size: 5120,
        lastModified: new Date('2025-02-10'),
        metadata: {
          title: 'API Reference',
          author: 'ASafariM Team',
          tags: ['api', 'reference']
        }
      },
      {
        name: 'examples',
        path: 'docs/examples',
        type: 'folder',
        children: [
          {
            name: 'basic-usage.md',
            path: 'docs/examples/basic-usage.md',
            type: 'file',
            size: 1536,
            lastModified: new Date('2025-01-20'),
            metadata: {
              title: 'Basic Usage',
              tags: ['example', 'basic']
            }
          },
          {
            name: 'advanced-config.md',
            path: 'docs/examples/advanced-config.md',
            type: 'file',
            size: 3072,
            lastModified: new Date('2025-02-05'),
            metadata: {
              title: 'Advanced Configuration',
              tags: ['example', 'advanced']
            }
          }
        ]
      },
      {
        name: 'changelogs',
        path: 'docs/changelogs',
        type: 'folder',
        children: [
          {
            name: 'CHANGELOG.md',
            path: 'docs/changelogs/CHANGELOG.md',
            type: 'file',
            size: 4096,
            lastModified: new Date('2025-03-01'),
            metadata: {
              title: 'Changelog',
              tags: ['changelog']
            }
          },
          {
            name: 'project-init.md',
            path: 'docs/changelogs/project-init.md',
            type: 'file',
            size: 1024,
            lastModified: new Date('2025-01-01'),
            metadata: {
              title: 'Project Initialization',
              tags: ['changelog', 'init']
            }
          }
        ]
      }
    ]
  },
  {
    name: 'README.md',
    path: 'README.md',
    type: 'file',
    size: 3584,
    lastModified: new Date('2025-01-01'),
    metadata: {
      title: 'MD File Explorer',
      description: 'A library for exploring markdown files in a directory structure',
      version: '1.0.0'
    }
  }
];

const mockFileContents: Record<string, FileContent> = {
  'docs/getting-started.md': {
    content: `# Getting Started Guide

Welcome to the MD File Explorer library! This guide will help you get started.

## Installation

\`\`\`bash
npm install @asafarim/md-file-explorer
\`\`\`

## Quick Start

\`\`\`typescript
import { MdFileExplorer } from '@asafarim/md-file-explorer';

const explorer = new MdFileExplorer('./docs');
const result = await explorer.scanDirectory();
console.log(result);
\`\`\`

## Features

- Recursive directory scanning
- Lazy loading support
- File watching with chokidar
- Markdown metadata parsing
- Configurable file filtering`,
    metadata: { title: 'Getting Started Guide', author: 'ASafariM Team', tags: ['guide', 'tutorial'] },
    path: 'docs/getting-started.md',
    lastModified: new Date('2025-01-15')
  },
  'docs/api-reference.md': {
    content: `# API Reference

Complete documentation for the Markdown File Explorer API.

## MdFileExplorer

The main class for exploring markdown files.

### Constructor

\`\`\`typescript
new MdFileExplorer(rootPath: string, options?: Partial<ExplorerOptions>)
\`\`\`

### Methods

- \`scanDirectory(path?: string): Promise<ScanResult>\`
- \`getFileContent(filePath: string): Promise<FileContent>\`
- \`getFileTree(path?: string, depth?: number): Promise<FileNode[]>\`
- \`watchDirectory(callback: FileWatcherCallback): void\`
- \`stopWatching(): void\``,
    metadata: { title: 'API Reference', author: 'ASafariM Team', tags: ['api', 'reference'] },
    path: 'docs/api-reference.md',
    lastModified: new Date('2025-02-10')
  },
  'docs/examples/basic-usage.md': {
    content: `# Basic Usage

Simple examples to get you started with the file explorer.

## Scanning a Directory

\`\`\`typescript
const explorer = new MdFileExplorer('./docs');
const result = await explorer.scanDirectory();
\`\`\``,
    metadata: { title: 'Basic Usage', tags: ['example', 'basic'] },
    path: 'docs/examples/basic-usage.md',
    lastModified: new Date('2025-01-20')
  },
  'docs/examples/advanced-config.md': {
    content: `# Advanced Configuration

Learn how to configure the explorer for advanced use cases.

## Custom Extensions

\`\`\`typescript
const explorer = new MdFileExplorer('./docs', {
  includeExtensions: ['.md', '.mdx'],
  excludePatterns: ['draft/*'],
  maxDepth: 5
});
\`\`\``,
    metadata: { title: 'Advanced Configuration', tags: ['example', 'advanced'] },
    path: 'docs/examples/advanced-config.md',
    lastModified: new Date('2025-02-05')
  },
  'README.md': {
    content: `# MD File Explorer

A TypeScript library for recursively exploring markdown files and folders with lazy loading capabilities.

## Features

- Recursive directory scanning
- Lazy loading support
- File watching
- Markdown metadata parsing
- Configurable filtering`,
    metadata: { title: 'MD File Explorer', description: 'A library for exploring markdown files', version: '1.0.0' },
    path: 'README.md',
    lastModified: new Date('2025-01-01')
  }
};

// === Utility functions (browser-safe versions) ===
export function normalizePath(filePath: string): string {
  return filePath
    .replace(/\\/g, '/')
    .replace(/^\/+|\/+$/g, '')
    .replace(/\/+/g, '/');
}

export function isValidMarkdownFile(filePath: string): boolean {
  const ext = filePath.split('.').pop()?.toLowerCase() || '';
  return ['.md', '.markdown', '.mdx'].includes('.' + ext);
}

export function shouldExcludePath(filePath: string, excludePatterns: string[] = []): boolean {
  const normalizedPath = normalizePath(filePath);
  const defaultExclusions = ['node_modules', '.git', '.next', '.nuxt', 'dist', 'build', '.DS_Store', 'Thumbs.db'];
  const allExclusions = [...defaultExclusions, ...excludePatterns];
  return allExclusions.some(pattern => {
    if (pattern.includes('*') || pattern.includes('?')) {
      const regex = new RegExp(pattern.replace(/\*/g, '.*').replace(/\?/g, '.'));
      return regex.test(normalizedPath);
    }
    return normalizedPath.includes(pattern);
  });
}

export function sortFileNodes(
  nodes: FileNode[],
  sortBy: 'name' | 'date' | 'size' = 'name',
  sortOrder: 'asc' | 'desc' = 'asc'
): FileNode[] {
  return nodes.sort((a, b) => {
    if (a.type !== b.type) return a.type === 'folder' ? -1 : 1;
    let comparison = 0;
    switch (sortBy) {
      case 'name':
        comparison = a.name.localeCompare(b.name, undefined, { numeric: true });
        break;
      case 'date':
        comparison = (a.lastModified?.getTime() || 0) - (b.lastModified?.getTime() || 0);
        break;
      case 'size':
        comparison = (a.size || 0) - (b.size || 0);
        break;
    }
    return sortOrder === 'asc' ? comparison : -comparison;
  });
}

export async function getFileStats(_filePath: string) {
  return null;
}

export async function parseMarkdownMetadata(_filePath: string): Promise<MarkdownMetadata | undefined> {
  return undefined;
}

export async function createFileNode(
  _filePath: string,
  _relativePath: string,
  _parseMetadata: boolean = false
): Promise<FileNode | null> {
  return null;
}

export function getRelativePath(fullPath: string, rootPath: string): string {
  const normalized = normalizePath(fullPath.replace(rootPath, ''));
  return normalized || '/';
}

// === Browser-compatible mock classes ===
export class FileSystemExplorer {
  private _rootPath: string;
  private _options: ExplorerOptions;

  constructor(rootPath: string, options: Partial<ExplorerOptions> = {}) {
    this._rootPath = rootPath;
    this._options = {
      rootPath,
      includeExtensions: ['.md', '.markdown', '.mdx'],
      excludePatterns: [],
      maxDepth: 10,
      sortBy: 'name',
      sortOrder: 'asc',
      includeDotFiles: false,
      parseMarkdownMetadata: true,
      ...options
    };
  }

  get rootPath(): string { return this._rootPath; }
  get options(): ExplorerOptions { return this._options; }

  async scanDirectory(_targetPath?: string, _currentDepth: number = 0): Promise<ScanResult> {
    await new Promise(resolve => setTimeout(resolve, 100));
    return {
      nodes: mockFileTree,
      totalFiles: 6,
      totalFolders: 3,
      lastScanned: new Date()
    };
  }

  async getFileTree(path?: string, _depth: number = 1): Promise<FileNode[]> {
    await new Promise(resolve => setTimeout(resolve, 50));
    if (path) {
      const findNode = (nodes: FileNode[]): FileNode | undefined => {
        for (const node of nodes) {
          if (node.path === path) return node;
          if (node.children) {
            const found = findNode(node.children);
            if (found) return found;
          }
        }
      };
      const node = findNode(mockFileTree);
      return node?.children || [];
    }
    return mockFileTree;
  }

  async getFileContent(filePath: string): Promise<FileContent> {
    await new Promise(resolve => setTimeout(resolve, 30));
    const content = mockFileContents[filePath];
    if (content) return content;
    return {
      content: `# ${filePath}\n\nFile content not found.`,
      path: filePath,
      lastModified: new Date()
    };
  }

  async fileExists(_filePath: string): Promise<boolean> {
    return false;
  }

  async getNodeInfo(_targetPath: string): Promise<FileNode | null> {
    return null;
  }

  async searchFiles(query: string, searchInContent: boolean = false): Promise<FileNode[]> {
    const detailed = await this.searchFilesDetailed(query, searchInContent);
    return detailed.map(r => r.node);
  }

  async searchFilesDetailed(query: string, searchInContent: boolean = false): Promise<SearchResult[]> {
    const lowerQuery = query.toLowerCase();
    const results: SearchResult[] = [];
    const seen = new Set<string>();

    const collectFiles = (nodes: FileNode[]): FileNode[] => {
      const files: FileNode[] = [];
      for (const node of nodes) {
        if (node.type === 'file') files.push(node);
        if (node.children) files.push(...collectFiles(node.children));
      }
      return files;
    };

    const allFiles = collectFiles(mockFileTree);

    for (const node of allFiles) {
      // Search in file name
      if (node.name.toLowerCase().includes(lowerQuery)) {
        if (!seen.has(node.path)) {
          seen.add(node.path);
          results.push({ node, matchType: 'name' });
        }
        continue;
      }

      // Search in metadata
      if (node.metadata) {
        const metaStr = JSON.stringify(node.metadata).toLowerCase();
        if (metaStr.includes(lowerQuery)) {
          if (!seen.has(node.path)) {
            seen.add(node.path);
            results.push({ node, matchType: 'metadata' });
          }
          continue;
        }
      }

      // Search in file content
      if (searchInContent) {
        const mockContent = mockFileContents[node.path];
        if (mockContent) {
          const lowerContent = mockContent.content.toLowerCase();
          const matchIndex = lowerContent.indexOf(lowerQuery);
          if (matchIndex !== -1) {
            const snippetStart = Math.max(0, matchIndex - 80);
            const snippetEnd = Math.min(mockContent.content.length, matchIndex + query.length + 80);
            let snippet = mockContent.content.substring(snippetStart, snippetEnd).trim();
            snippet = snippet.replace(/\n+/g, ' ');
            if (snippetStart > 0) snippet = '...' + snippet;
            if (snippetEnd < mockContent.content.length) snippet = snippet + '...';
            if (!seen.has(node.path)) {
              seen.add(node.path);
              results.push({ node, matchType: 'content', snippet });
            }
          }
        }
      }
    }

    return results;
  }
}

export class FileWatcher {
  private intervalId: ReturnType<typeof setInterval> | null = null;
  constructor(_rootPath: string, _options: Partial<ExplorerOptions> = {}) {}

  watch(callback: FileWatcherCallback): void {
    if (this.intervalId) this.stopWatching();
    const events: Array<'add' | 'change' | 'unlink' | 'addDir' | 'unlinkDir'> = ['add', 'change', 'unlink', 'addDir', 'unlinkDir'];
    const paths = ['docs/new-file.md', 'docs/getting-started.md', 'docs/examples', 'src/new-folder'];
    this.intervalId = setInterval(() => {
      const event = events[Math.floor(Math.random() * events.length)];
      const path = paths[Math.floor(Math.random() * paths.length)];
      callback(event, path);
    }, 3000);
  }

  stopWatching(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  get watching(): boolean {
    return this.intervalId !== null;
  }
}

export class MdFileExplorer implements ExplorerAPI {
  private explorer: FileSystemExplorer;
  private watcher?: FileWatcher;

  constructor(rootPath: string, options: Partial<ExplorerOptions> = {}) {
    this.explorer = new FileSystemExplorer(rootPath, options);
  }

  async scanDirectory(path?: string, options?: Partial<ExplorerOptions>): Promise<ScanResult> {
    if (options) {
      const updatedOptions = { ...this.explorer.options, ...options };
      const tempExplorer = new FileSystemExplorer(this.explorer.rootPath, updatedOptions);
      return tempExplorer.scanDirectory(path);
    }
    return this.explorer.scanDirectory(path);
  }

  async getFileContent(filePath: string): Promise<FileContent> {
    return this.explorer.getFileContent(filePath);
  }

  async getFileTree(path?: string, depth?: number): Promise<FileNode[]> {
    return this.explorer.getFileTree(path, depth);
  }

  watchDirectory(callback: FileWatcherCallback): void {
    if (!this.watcher) {
      this.watcher = new FileWatcher(this.explorer.rootPath, this.explorer.options);
    }
    this.watcher.watch(callback);
  }

  stopWatching(): void {
    this.watcher?.stopWatching();
  }

  isValidMarkdownFile(filePath: string): boolean {
    return isValidMarkdownFile(filePath);
  }

  normalizePath(filePath: string): string {
    return normalizePath(filePath);
  }

  async fileExists(filePath: string): Promise<boolean> {
    return this.explorer.fileExists(filePath);
  }

  async getNodeInfo(path: string): Promise<FileNode | null> {
    return this.explorer.getNodeInfo(path);
  }

  async searchFiles(query: string, searchInContent: boolean = false): Promise<FileNode[]> {
    return this.explorer.searchFiles(query, searchInContent);
  }

  async searchFilesDetailed(query: string, searchInContent: boolean = false): Promise<SearchResult[]> {
    return this.explorer.searchFilesDetailed(query, searchInContent);
  }

  get options(): ExplorerOptions { return this.explorer.options; }
  get rootPath(): string { return this.explorer.rootPath; }
}

export default MdFileExplorer;

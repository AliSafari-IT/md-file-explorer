<div align="center">

<img src="demo/public/logo.svg" alt="MD File Explorer" width="120" height="120" />

# @asafarim/md-file-explorer

**A TypeScript library for recursively exploring markdown files and folders with lazy loading, file watching, and metadata parsing.**

[![npm version](https://img.shields.io/npm/v/@asafarim/md-file-explorer.svg)](https://www.npmjs.com/package/@asafarim/md-file-explorer)
[![npm downloads](https://img.shields.io/npm/dm/@asafarim/md-file-explorer.svg)](https://www.npmjs.com/package/@asafarim/md-file-explorer)
[![license](https://img.shields.io/npm/l/@asafarim/md-file-explorer.svg)](https://github.com/AliSafari-IT/md-file-explorer/blob/main/LICENSE)
[![Live Demo](https://img.shields.io/badge/demo-live-brightgreen)](https://alisafari-it.github.io/md-file-explorer)

[Live Demo](https://alisafari-it.github.io/md-file-explorer) · [Documentation](https://github.com/AliSafari-IT/md-file-explorer) · [Report Bug](https://github.com/AliSafari-IT/md-file-explorer/issues) · [Request Feature](https://github.com/AliSafari-IT/md-file-explorer/issues)

</div>

---

## ✨ Features

- **🚀 Lazy Loading** — Scan directories on-demand instead of loading everything upfront
- **📁 Recursive Scanning** — Automatically discovers nested folders and markdown files
- **🔍 Smart Filtering** — Include or exclude files based on extensions and glob patterns
- **📝 Metadata Parsing** — Extracts YAML frontmatter from markdown files automatically
- **👀 File Watching** — Get real-time notifications when files are added, changed, or removed
- **🔎 Full-Text Search** — Search by filename or file content across your entire tree
- **🎯 Fully Typed** — Written in TypeScript with comprehensive type definitions
- **⚡ High Performance** — Only loads content when needed, with configurable depth limits

## 📦 Installation

```bash
# npm
npm install @asafarim/md-file-explorer

# yarn
yarn add @asafarim/md-file-explorer

# pnpm
pnpm add @asafarim/md-file-explorer
```

## 🚀 Quick Start

```typescript
import { MdFileExplorer } from '@asafarim/md-file-explorer';

// Create an explorer instance
const explorer = new MdFileExplorer('/path/to/docs', {
  includeExtensions: ['.md', '.mdx'],
  excludePatterns: ['node_modules', '.git'],
  parseMarkdownMetadata: true,
});

// Get the file tree (lazy-loaded by default)
const fileTree = await explorer.getFileTree();

// Read a specific file's content
const content = await explorer.getFileContent('guides/getting-started.md');

// Scan an entire directory at once
const scanResult = await explorer.scanDirectory();
```

## 📖 API Reference

### `MdFileExplorer`

The main class for exploring markdown files.

#### Constructor

```typescript
new MdFileExplorer(rootPath: string, options?: ExplorerOptions)
```

| Parameter   | Type              | Description                          |
| ----------- | ----------------- | ------------------------------------ |
| `rootPath`  | `string`          | Root directory to explore            |
| `options`   | `ExplorerOptions` | Optional configuration (see below)   |

#### Methods

| Method                              | Returns                  | Description                                  |
| ----------------------------------- | ------------------------ | -------------------------------------------- |
| `scanDirectory(path?, options?)`    | `Promise<ScanResult>`    | Scan a directory and return the complete tree |
| `getFileTree(path?, depth?)`        | `Promise<FileNode[]>`    | Get the file tree with an optional depth limit |
| `getFileContent(filePath)`          | `Promise<FileContent>`   | Get the content of a specific file           |
| `watchDirectory(callback)`          | `void`                   | Watch for file system changes in real-time   |
| `stopWatching()`                    | `void`                   | Stop watching for file changes               |
| `searchFiles(query, searchInContent?)` | `Promise<FileNode[]>` | Search for files by name or content          |
| `fileExists(filePath)`              | `Promise<boolean>`       | Check if a file exists in the tree           |

### Types

#### `FileNode`

```typescript
interface FileNode {
  name: string;                        // File or folder name
  path: string;                        // Relative path from root
  type: 'folder' | 'file';             // Node type
  children?: FileNode[];               // Child nodes (folders only)
  lastModified?: Date;                 // Last modification date
  size?: number;                       // File size in bytes
  metadata?: MarkdownMetadata;         // Parsed frontmatter (if enabled)
}
```

#### `ExplorerOptions`

```typescript
interface ExplorerOptions {
  rootPath: string;                    // Root directory path
  includeExtensions?: string[];        // e.g. ['.md', '.mdx']
  excludePatterns?: string[];          // e.g. ['node_modules', '.git']
  maxDepth?: number;                   // Maximum scan depth (default: unlimited)
  sortBy?: 'name' | 'date' | 'size';   // Sort criteria (default: 'name')
  sortOrder?: 'asc' | 'desc';          // Sort direction (default: 'asc')
  includeDotFiles?: boolean;           // Include hidden files (default: false)
  parseMarkdownMetadata?: boolean;     // Parse YAML frontmatter (default: false)
}
```

#### `MarkdownMetadata`

```typescript
interface MarkdownMetadata {
  title?: string;
  description?: string;
  tags?: string[];
  [key: string]: unknown;              // Any additional frontmatter fields
}
```

#### `ScanResult`

```typescript
interface ScanResult {
  rootPath: string;
  nodes: FileNode[];
  totalFiles: number;
  totalFolders: number;
  totalSize: number;
}
```

### Utilities

The package also exports these helper functions:

```typescript
import {
  normalizePath,
  isValidMarkdownFile,
  shouldExcludePath,
  getFileStats,
  parseMarkdownMetadata,
  sortFileNodes,
  createFileNode,
  getRelativePath,
} from '@asafarim/md-file-explorer';
```

## 💡 Examples

### Lazy Loading with Depth Control

Only load what you need — great for large documentation trees:

```typescript
const explorer = new MdFileExplorer('/docs');

// Get only top-level folders and files
const topLevel = await explorer.getFileTree('/', 1);

// Load contents of a specific folder (2 levels deep)
const packageDocs = await explorer.getFileTree('/packages', 2);
```

### Real-Time File Watching

React to file changes as they happen:

```typescript
explorer.watchDirectory((event, path) => {
  console.log(`File ${event}: ${path}`);
  // Events: 'add' | 'change' | 'unlink' | 'addDir' | 'unlinkDir'
});

// Stop watching when done
explorer.stopWatching();
```

### Searching Files

Find files by name or search their content:

```typescript
// Search by filename
const byName = await explorer.searchFiles('react');

// Search inside file contents too
const byContent = await explorer.searchFiles('useState', true);
```

### Custom Configuration

Fine-tune the explorer for your project:

```typescript
const explorer = new MdFileExplorer('/docs', {
  includeExtensions: ['.md', '.mdx', '.txt'],
  excludePatterns: ['draft-*', 'temp/**', 'private/'],
  maxDepth: 5,
  sortBy: 'date',
  sortOrder: 'desc',
  includeDotFiles: false,
  parseMarkdownMetadata: true,
});
```

## 🔗 Integration Examples

### Express API Server

```typescript
import express from 'express';
import { MdFileExplorer } from '@asafarim/md-file-explorer';

const app = express();
const explorer = new MdFileExplorer('./docs');

// Serve the file tree
app.get('/api/docs/tree', async (req, res) => {
  const { path, depth } = req.query;
  const tree = await explorer.getFileTree(path as string, Number(depth) || 1);
  res.json(tree);
});

// Serve file content
app.get('/api/docs/file', async (req, res) => {
  const { path } = req.query;
  try {
    const content = await explorer.getFileContent(path as string);
    res.json(content);
  } catch {
    res.status(404).json({ error: 'File not found' });
  }
});

// Search files
app.get('/api/docs/search', async (req, res) => {
  const { q, content } = req.query;
  const results = await explorer.searchFiles(q as string, content === 'true');
  res.json(results);
});

app.listen(3000);
```

### React Component

```tsx
import React, { useState, useEffect } from 'react';
import { MdFileExplorer, FileNode } from '@asafarim/md-file-explorer';

function DocumentationExplorer() {
  const [explorer] = useState(() => new MdFileExplorer('./docs'));
  const [fileTree, setFileTree] = useState<FileNode[]>([]);

  useEffect(() => {
    const loadTree = async () => {
      const tree = await explorer.getFileTree();
      setFileTree(tree);
    };

    loadTree();

    // Auto-refresh on file changes
    explorer.watchDirectory(() => loadTree());

    return () => explorer.stopWatching();
  }, [explorer]);

  return (
    <ul>
      {fileTree.map(node => (
        <li key={node.path}>{node.name}</li>
      ))}
    </ul>
  );
}
```

## 📂 Recommended Project Structure

The package works best with organized documentation:

```
docs/
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
    └── basic-usage.md
```

## ⚡ Performance Tips

- **Use depth limits** — Pass a `depth` argument to `getFileTree()` to avoid scanning huge trees
- **Exclude wisely** — Always exclude `node_modules`, `.git`, and build output directories
- **Watch sparingly** — Only enable file watching in development or preview environments
- **Cache content** — Cache results of `getFileContent()` for frequently accessed files
- **Sort strategically** — Sorting by `date` is useful for blogs; `name` is best for docs

## 🛠️ Development

```bash
# Install dependencies
pnpm install

# Build the library
pnpm build

# Run the demo locally
pnpm dev

# Run tests
pnpm test
```

## 🤝 Contributing

Contributions are welcome! Here's how to get started:

1. **Fork** the repository
2. **Clone** your fork: `git clone https://github.com/AliSafari-IT/md-file-explorer.git`
3. **Install** dependencies: `pnpm install`
4. **Build** the package: `pnpm build`
5. **Make** your changes and test with the demo: `pnpm dev`
6. **Submit** a pull request

## 📄 License

MIT License — see [LICENSE](https://github.com/AliSafari-IT/md-file-explorer/blob/main/LICENSE) for details.

## 🔗 Links

- **npm**: [npmjs.com/package/@asafarim/md-file-explorer](https://www.npmjs.com/package/@asafarim/md-file-explorer)
- **GitHub**: [github.com/AliSafari-IT/md-file-explorer](https://github.com/AliSafari-IT/md-file-explorer)
- **Live Demo**: [alisafari-it.github.io/md-file-explorer](https://alisafari-it.github.io/md-file-explorer)
- **Issues**: [github.com/AliSafari-IT/md-file-explorer/issues](https://github.com/AliSafari-IT/md-file-explorer/issues)

---

<div align="center">

Made with ❤️ by [Ali Safari](https://github.com/AliSafari-IT)

</div>

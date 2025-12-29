# Changelog

All notable changes to the JSON Formatter extension will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.1] - 2024-12-16

### Added
- Copy to clipboard button in the search toolbar
- Visual feedback when JSON is copied (green checkmark)
- Fallback clipboard method for older browsers
- clipboardWrite permission for clipboard API access

### Changed
- Updated extension version to 1.0.1

## [1.0.0] - 2024-12-16

### Added
- Initial release of Firefox extension
- Context menu integration with "View Formatted JSON" option
- JSON validation with error handling and clear error messages
- Syntax highlighting for JSON elements:
  - Keys (blue)
  - Strings (orange)
  - Numbers (light green)
  - Booleans (dark blue)
  - Null values (dark blue)
- Sidebar display with formatted JSON
- Search functionality within formatted JSON
- Match highlighting with distinct colors for current match
- Navigation between search matches:
  - Previous/Next buttons
  - Keyboard shortcuts (Enter, Shift+Enter)
  - Match counter (e.g., "3/10")
- Auto-scroll to current search match
- Dark theme UI inspired by VS Code
- Extension icons in multiple sizes (16, 32, 48, 96 pixels)
- Comprehensive documentation:
  - README.md with user instructions
  - DEVELOPER_GUIDE.md with technical details
  - test-page.html for testing
  - Icon generation scripts (Python and Bash)

### Technical Details
- Uses WebExtensions API (Firefox 57.0+)
- Manifest Version 2
- Permissions: contextMenus, activeTab, storage
- Browser storage for temporary JSON data
- Real-time storage change detection

### Documentation
- Requirements specification
- User guide
- Developer guide with architecture overview
- Test page with 10+ test cases
- Code comments and inline documentation

## [Unreleased]

### Planned Features
- Collapse/expand JSON objects and arrays
- Export JSON to file
- JSON tree view option
- Line numbers
- Theme customization (light/dark toggle)
- Minify/beautify controls
- Configuration options
- Keyboard shortcuts for common actions
- Recently viewed JSON history
- Pin/save favorite JSONs

### Planned Improvements
- Performance optimization for large JSON files
- Lazy rendering for better performance
- Search result debouncing
- Better error messages with suggestions
- Accessibility improvements (ARIA labels, keyboard navigation)
- Internationalization (i18n) support
- Chrome/Edge compatibility version

## Future Versions

### [2.0.0] - Planned
- Major UI overhaul
- Tree view mode
- Advanced search (regex support)
- JSON path display
- Comparison mode (diff two JSONs)

### [1.1.0] - Planned
- Custom color themes
- Font size controls
- Wrap/unwrap text toggle

// Sidebar script to handle JSON formatting and display

let currentMatches = [];
let currentMatchIndex = -1;
let currentJsonString = ''; // Store current JSON for synchronous access

// Initialize when the sidebar loads
document.addEventListener('DOMContentLoaded', () => {
  loadAndDisplayJSON();
  setupSearchHandlers();
  
  // Listen for storage changes (when new JSON is selected)
  browser.storage.onChanged.addListener((changes, area) => {
    if (area === 'local' && changes.selectedJson) {
      loadAndDisplayJSON();
    }
  });
});

// Load JSON from storage and display it
async function loadAndDisplayJSON() {
  try {
    const result = await browser.storage.local.get('selectedJson');
    const jsonString = result.selectedJson;
    
    console.log("Loading JSON from storage:", jsonString ? `${jsonString.substring(0, 100)}...` : 'empty');
    
    if (!jsonString) {
      showPlaceholder();
      return;
    }
    
    displayJSON(jsonString);
  } catch (error) {
    console.error('Error loading JSON:', error);
  }
}

// Display the JSON with formatting and syntax highlighting
function displayJSON(jsonString) {
  const jsonDisplay = document.getElementById('jsonDisplay');
  const errorDisplay = document.getElementById('errorDisplay');
  const searchContainer = document.getElementById('searchContainer');
  
  try {
    // Parse the JSON to validate it
    const jsonObject = JSON.parse(jsonString);
    
    // Store the formatted JSON for later use
    currentJsonString = JSON.stringify(jsonObject, null, 2);
    
    // Format and highlight the JSON
    const formattedHTML = syntaxHighlight(currentJsonString);
    
    console.log("Displaying formatted JSON");
    
    // Display the formatted JSON
    jsonDisplay.innerHTML = `<pre>${formattedHTML}</pre>`;
    jsonDisplay.style.display = 'block';
    errorDisplay.style.display = 'none';
    searchContainer.style.display = 'flex';
    
    // Reset search
    resetSearch();
    
  } catch (error) {
    // Invalid JSON - show error
    console.error("JSON parsing error:", error);
    jsonDisplay.style.display = 'none';
    errorDisplay.style.display = 'block';
    searchContainer.style.display = 'none';
    
    const errorMessage = document.getElementById('errorMessage');
    errorMessage.textContent = `Error: ${error.message}`;
  }
}

// Show placeholder when no JSON is selected
function showPlaceholder() {
  const jsonDisplay = document.getElementById('jsonDisplay');
  const errorDisplay = document.getElementById('errorDisplay');
  const searchContainer = document.getElementById('searchContainer');
  
  currentJsonString = '';
  jsonDisplay.innerHTML = '<p class="placeholder">Select JSON text on a webpage and choose "View Formatted JSON" from the context menu.</p>';
  jsonDisplay.style.display = 'block';
  errorDisplay.style.display = 'none';
  searchContainer.style.display = 'none';
}

// Syntax highlighting for JSON
function syntaxHighlight(json) {
  json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  
  return json.replace(
    /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
    (match) => {
      let cls = 'json-number';
      
      if (/^"/.test(match)) {
        if (/:$/.test(match)) {
          cls = 'json-key';
        } else {
          cls = 'json-string';
        }
      } else if (/true|false/.test(match)) {
        cls = 'json-boolean';
      } else if (/null/.test(match)) {
        cls = 'json-null';
      }
      
      return '<span class="' + cls + '">' + match + '</span>';
    }
  );
}

// Setup search functionality
function setupSearchHandlers() {
  const searchInput = document.getElementById('searchInput');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  
  searchInput.addEventListener('input', handleSearch);
  prevBtn.addEventListener('click', goToPreviousMatch);
  nextBtn.addEventListener('click', goToNextMatch);
  
  // Keyboard shortcuts for search navigation
  searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      if (e.shiftKey) {
        goToPreviousMatch();
      } else {
        goToNextMatch();
      }
      e.preventDefault();
    }
  });
}

// Handle search input
function handleSearch() {
  const searchInput = document.getElementById('searchInput');
  const searchTerm = searchInput.value.trim();
  
  if (!searchTerm) {
    clearSearch();
    return;
  }
  
  const jsonDisplay = document.getElementById('jsonDisplay');
  const pre = jsonDisplay.querySelector('pre');
  
  if (!pre) return;
  
  // Get the original HTML without previous highlights
  const originalHTML = syntaxHighlight(getOriginalJSON());
  
  // Find all matches
  const regex = new RegExp(escapeRegex(searchTerm), 'gi');
  let match;
  currentMatches = [];
  
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = originalHTML;
  const textContent = tempDiv.textContent;
  
  while ((match = regex.exec(textContent)) !== null) {
    currentMatches.push(match.index);
  }
  
  if (currentMatches.length > 0) {
    currentMatchIndex = 0;
    highlightMatches(originalHTML, searchTerm);
    scrollToCurrentMatch();
  } else {
    currentMatchIndex = -1;
    pre.innerHTML = originalHTML;
  }
  
  updateMatchCounter();
}

// Highlight all search matches
function highlightMatches(html, searchTerm) {
  const jsonDisplay = document.getElementById('jsonDisplay');
  const pre = jsonDisplay.querySelector('pre');
  
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = html;
  const text = tempDiv.textContent;
  
  const parts = [];
  let lastIndex = 0;
  const regex = new RegExp(escapeRegex(searchTerm), 'gi');
  let match;
  let matchCount = 0;
  
  // Build highlighted HTML
  let resultHTML = html;
  const matches = [];
  
  while ((match = regex.exec(text)) !== null) {
    matches.push({ index: match.index, length: searchTerm.length, matchNum: matchCount });
    matchCount++;
  }
  
  // Apply highlights by wrapping matches
  if (matches.length > 0) {
    // Simple approach: wrap the search term in the text content
    let offset = 0;
    matches.forEach((m, idx) => {
      const className = idx === currentMatchIndex ? 'search-highlight current' : 'search-highlight';
      const before = text.substring(lastIndex, m.index);
      const matchText = text.substring(m.index, m.index + m.length);
      
      // This is a simplified approach - in production, you'd want to preserve HTML structure
      lastIndex = m.index + m.length;
    });
    
    // For simplicity, we'll use a different approach:
    // Replace in the text content while preserving some structure
    resultHTML = highlightInHTML(html, searchTerm, currentMatchIndex);
  }
  
  pre.innerHTML = resultHTML;
}

// Helper to highlight search terms in HTML while preserving structure
function highlightInHTML(html, searchTerm, currentIndex) {
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = html;
  
  const walker = document.createTreeWalker(
    tempDiv,
    NodeFilter.SHOW_TEXT,
    null,
    false
  );
  
  const nodesToReplace = [];
  let node;
  let matchCount = 0;
  
  while ((node = walker.nextNode())) {
    const text = node.textContent;
    const regex = new RegExp(escapeRegex(searchTerm), 'gi');
    let match;
    
    if (regex.test(text)) {
      nodesToReplace.push(node);
    }
  }
  
  matchCount = 0;
  nodesToReplace.forEach(node => {
    const text = node.textContent;
    const regex = new RegExp(escapeRegex(searchTerm), 'gi');
    
    let lastIndex = 0;
    let result = '';
    let match;
    
    while ((match = regex.exec(text)) !== null) {
      result += text.substring(lastIndex, match.index);
      const className = matchCount === currentIndex ? 'search-highlight current' : 'search-highlight';
      result += `<mark class="${className}">${text.substring(match.index, match.index + searchTerm.length)}</mark>`;
      lastIndex = match.index + searchTerm.length;
      matchCount++;
    }
    result += text.substring(lastIndex);
    
    const span = document.createElement('span');
    span.innerHTML = result;
    node.parentNode.replaceChild(span, node);
  });
  
  return tempDiv.innerHTML;
}

// Get original JSON string
function getOriginalJSON() {
  return currentJsonString;
}

// Navigate to previous match
function goToPreviousMatch() {
  if (currentMatches.length === 0) return;
  
  currentMatchIndex--;
  if (currentMatchIndex < 0) {
    currentMatchIndex = currentMatches.length - 1;
  }
  
  updateHighlight();
  scrollToCurrentMatch();
  updateMatchCounter();
}

// Navigate to next match
function goToNextMatch() {
  if (currentMatches.length === 0) return;
  
  currentMatchIndex++;
  if (currentMatchIndex >= currentMatches.length) {
    currentMatchIndex = 0;
  }
  
  updateHighlight();
  scrollToCurrentMatch();
  updateMatchCounter();
}

// Update which match is currently highlighted
function updateHighlight() {
  const searchInput = document.getElementById('searchInput');
  const searchTerm = searchInput.value.trim();
  
  if (!searchTerm) return;
  
  const originalHTML = syntaxHighlight(getOriginalJSON());
  highlightMatches(originalHTML, searchTerm);
}

// Scroll to the current match
function scrollToCurrentMatch() {
  const currentHighlight = document.querySelector('.search-highlight.current');
  if (currentHighlight) {
    currentHighlight.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
}

// Update the match counter display
function updateMatchCounter() {
  const matchCounter = document.getElementById('matchCounter');
  
  if (currentMatches.length === 0) {
    matchCounter.textContent = '0/0';
  } else {
    matchCounter.textContent = `${currentMatchIndex + 1}/${currentMatches.length}`;
  }
}

// Clear search highlights
function clearSearch() {
  currentMatches = [];
  currentMatchIndex = -1;
  
  const jsonDisplay = document.getElementById('jsonDisplay');
  const pre = jsonDisplay.querySelector('pre');
  
  if (pre) {
    const originalHTML = syntaxHighlight(getOriginalJSON());
    pre.innerHTML = originalHTML;
  }
  
  updateMatchCounter();
}

// Reset search state
function resetSearch() {
  const searchInput = document.getElementById('searchInput');
  searchInput.value = '';
  clearSearch();
}

// Escape special regex characters
function escapeRegex(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

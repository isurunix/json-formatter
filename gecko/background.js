// Create context menu item when extension is installed
browser.runtime.onInstalled.addListener(() => {
  browser.contextMenus.create({
    id: "format-json",
    title: "View Formatted JSON",
    contexts: ["selection"]
  });
});

// Handle context menu clicks
browser.contextMenus.onClicked.addListener(async (info, tab) => {
  if (info.menuItemId === "format-json") {
    // Get the selected text
    const selectedText = info.selectionText;
    
    console.log("Selected text:", selectedText);
    
    // Open the sidebar first
    await browser.sidebarAction.open();
    
    // Small delay to ensure sidebar is loaded
    await new Promise(resolve => setTimeout(resolve, 100));
    
    // Store the selected text
    await browser.storage.local.set({ selectedJson: selectedText });
    
    console.log("JSON stored in storage");
  }
});

// Listen for messages from content script (alternative method)
browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "GET_SELECTED_JSON") {
    browser.storage.local.get("selectedJson").then((result) => {
      sendResponse({ json: result.selectedJson || "" });
    });
    return true; // Indicates we will send a response asynchronously
  }
});

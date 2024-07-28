// src/content.ts

console.log("Content script running");

// Send a message to the background script
chrome.runtime.sendMessage({ type: "HELLO" }, (response) => {
  console.log("Received response:", response);
});

// Example: Modify the page content
function modifyPage() {
  const app = document.createElement('div');
  app.id = 'my-extension-root';
  app.textContent = 'Hello from Next.js Chrome Extension!';
  document.body.appendChild(app);
}

// Run the modification after the page is fully loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', modifyPage);
} else {
  modifyPage();
}
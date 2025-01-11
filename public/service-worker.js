// Allows users to open the side panel by clicking on the action toolbar icon
chrome.sidePanel
  .setPanelBehavior({ openPanelOnActionClick: true })
  .catch((error) => console.error(error));

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'THREAD') {
      chrome.tabs.create({ url: 'https://google.com' });
      chrome.storage.local.set({ key: "thread_R2hGv6NXESlxzM5IUsQtB8p7" }).then(() => {
        console.log("Thread is set");
      });
      
      chrome.storage.local.get(["key"]).then((result) => {
        console.log("Thread is retrieved: " + result.key);
      });
    }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'LOGIN') {
    chrome.tabs.create({ url: 'https://google.com' });
  }
});

// let pageContent = '';

// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//     if (message.type === 'PAGE_CONTENT_FETCHED') {
//         pageContent = message.content;
//     }
// });

// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//     if (message.type === 'GET_PAGE_CONTENT') {
//         sendResponse({ content: pageContent });
//     }
// });

// function fetchContentFromActiveTab() {
//     let [tab] = chrome.tabs.query({ active: true, currentWindow: true });
//     chrome.scripting.executeScript({
//         target: { tabId: tab.id },
//         files: ['content.js']
//     });
// }

// chrome.tabs.onActivated.addListener(fetchContentFromActiveTab);
// chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
//     if (changeInfo.status === 'complete' && tab.active) {
//         chrome.scripting.executeScript({
//             target: { tabId: tabId },
//             files: ['content.js']
//         });
//     }
// });
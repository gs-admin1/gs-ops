const pageContent = document.body.innerText;

chrome.runtime.sendMessage({ type: 'PAGE_CONTENT_FETCHED', content: pageContent });
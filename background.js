chrome.runtime.onInstalled.addListener(() => {
	console.log("Extension Installed")
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete' ) {
        console.log(tab);
      if (tab?.url?.includes('https://opensea.io/assets/0x') || tab?.url?.includes('https://opensea.io/assets/matic/0x')) {
        chrome.scripting.insertCSS({
          target: { tabId: tabId },
          files: ["theme/styles.css"]
      });
        chrome.scripting.executeScript(
          {
            target: {tabId: tabId},
            files: ['scripts/verify-item.js'],
          },
          () => { console.log("RAN") });
      }}
  });
  


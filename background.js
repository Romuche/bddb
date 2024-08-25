chrome.action.onClicked.addListener(function () {
    chrome.tabs.create({ url: "view/index.html" });
});

// Refresh the page on extension update
chrome.runtime.onInstalled.addListener((details) => {
    if (details.reason === "update") {
        chrome.tabs.query({ url: ["https://tinder.com/app/*"] }, (tabs) => {
            for (let tab of tabs) {
                chrome.tabs.reload(tab.id);
            }
        });
    }
});

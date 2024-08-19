init();

async function init() {
    try {
        const profiles = await getProfiles();

        buildTabs(profiles);
        buildProfiles(profiles);
    } catch (error) {
        console.error("Error loading profiles:", error);
    }
}

async function getProfiles() {
    return new Promise((resolve, reject) => {
        chrome.storage.local.get(null, (items) => {
            if (chrome.runtime.lastError) {
                reject(chrome.runtime.lastError);
            } else {
                const profiles = [];

                for (const key in items) {
                    if (items.hasOwnProperty(key) && key.startsWith("bddb_")) {
                        profiles.push(items[key]);
                    }
                }

                resolve(profiles);
            }
        });
    });
}

function deleteProfile(id) {
    chrome.storage.local.remove(["bddb_" + id], function () {
        removeTab(id);
    });
}

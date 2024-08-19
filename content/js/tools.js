function waitForElement(querySelector, timeout = 10000) {
    return new Promise((resolve, reject) => {
        var timer = false;
        if (document.querySelectorAll(querySelector).length) return resolve();
        const observer = new MutationObserver(() => {
            if (document.querySelectorAll(querySelector).length) {
                observer.disconnect();
                if (timer !== false) clearTimeout(timer);
                return resolve();
            }
        });
        observer.observe(document.body, {
            childList: true,
            subtree: true,
        });
        if (timeout)
            timer = setTimeout(() => {
                observer.disconnect();
                reject();
            }, timeout);
    });
}

function isProfilePage(url) {
    const regex = /^https:\/\/tinder\.com\/app\/messages\/[^/]+\/profile$/;

    return regex.test(url) ? true : false;
}

function isChatPage(url) {
    const regex = /^https:\/\/tinder\.com\/app\/messages\/[^/]+$/;

    return regex.test(url) ? true : false;
}

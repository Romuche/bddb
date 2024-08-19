function showTab(tabId) {
    for (const tab of document.querySelectorAll("[data-tab-id]")) {
        if (tab.getAttribute("data-tab-id") == tabId) {
            tab.classList.add("is-active");
        } else {
            tab.classList.remove("is-active");
        }
    }

    for (const profile of document.querySelectorAll("[data-profile-id]")) {
        if (profile.getAttribute("data-profile-id") == tabId) {
            profile.classList.add("is-active");
        } else {
            profile.classList.remove("is-active");
        }
    }
}

function removeTab(id) {
    // Remove elements from popin
    document.querySelector("[data-profile-id='" + id + "']").remove();
    document.querySelector("[data-tab-id='" + id + "']").remove();

    // Reset tabs
    const tabs = document.querySelectorAll("[data-tab-id]");

    if (tabs[0]) {
        tabs[0].classList.add("is-active");
        showTab(tabs[0].getAttribute("data-tab-id"));
    }
}

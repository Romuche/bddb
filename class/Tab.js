class Tab {
    id;
    name;

    constructor(data = null) {
        // Build from local storage
        if (data && data.id) {
            this.id = data.id;
            this.name = data.name;
        }
    }

    draw() {
        const container = document.querySelector("[data-tabs]");

        const link = document.createElement("a");
        link.innerHTML = this.name;

        const tab = document.createElement("li");
        tab.setAttribute("data-tab-id", this.id);
        tab.append(link);
        container.append(tab);

        // Attach click event
        tab.addEventListener("click", () => this.click());

        // Make sure first child is selected if there is no active tab
        console.log(container.querySelector("[data-profile-id].is-active"));
        if (!container.querySelector("[data-tab-id].is-active")) {
            container.querySelector("[data-tab-id]:first-child").classList.add("is-active");
        }
    }

    click() {
        // Make tab active
        for (const tab of document.querySelectorAll("[data-tab-id]")) {
            if (tab.getAttribute("data-tab-id") == this.id) {
                tab.classList.add("is-active");
            } else {
                tab.classList.remove("is-active");
            }
        }

        // Display tab content
        for (const profile of document.querySelectorAll("[data-profile-id]")) {
            if (profile.getAttribute("data-profile-id") == this.id) {
                profile.classList.add("is-active");
            } else {
                profile.classList.remove("is-active");
            }
        }
    }

    delete() {
        // Remove elements from popin
        document.querySelector("[data-profile-id='" + this.id + "']").remove();
        document.querySelector("[data-tab-id='" + this.id + "']").remove();

        // Reset tab active status to first
        const tabs = document.querySelectorAll("[data-tab-id]");
        if (tabs[0]) {
            tabs[0].classList.add("is-active");
        }

        // Reset profile active status to first
        const profile = document.querySelectorAll("[data-profile-id]");
        if (profile[0]) {
            profile[0].classList.add("is-active");
        }
    }
}

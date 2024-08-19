function buildTabs(profiles) {
    const container = document.querySelector("[data-tabs]");
    let first = true;

    for (const profile of profiles) {
        const link = document.createElement("a");
        link.innerHTML = profile.name;

        const tab = document.createElement("li");
        tab.setAttribute("data-tab-id", profile.id);
        tab.append(link);

        // Attach event
        tab.addEventListener("click", (e) => showTab(e.target.closest("[data-tab-id]").getAttribute("data-tab-id")));

        container.append(tab);

        if (first) {
            tab.classList.add("is-active");
            first = false;
        }
    }
}

function buildProfiles(profiles) {
    const container = document.querySelector("[data-profiles]");
    let first = true;

    for (const profile of profiles) {
        const profileContainer = document.createElement("div");
        profileContainer.classList.add("profile");
        profileContainer.setAttribute("data-profile-id", profile.id);

        // Sub builders
        buildDeleteButton(profileContainer, profile);
        buildPhotos(profileContainer, profile);
        buildChat(profileContainer, profile);

        container.append(profileContainer);

        if (first) {
            profileContainer.classList.add("is-active");
            first = false;
        }
    }
}

function buildDeleteButton(profileContainer, profile) {
    const deleteWrapper = document.createElement("div");
    deleteWrapper.classList.add("is-clearfix", "pb-2");

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("button", "is-danger", "is-outlined", "is-pulled-right");
    deleteButton.innerHTML = "❌";
    deleteButton.setAttribute("data-delete-id", profile.id);

    // Attach event
    deleteButton.addEventListener("click", (e) => deleteProfile(e.target.closest("[data-delete-id]").getAttribute("data-delete-id")));

    deleteWrapper.append(deleteButton);
    profileContainer.append(deleteWrapper);
}

function buildPhotos(profileContainer, profile) {
    const photosContainer = document.createElement("div");
    photosContainer.classList.add("photos", "is-flex");

    for (const photo of profile.photos) {
        const photoElement = document.createElement("div");
        photoElement.style.backgroundImage = "url(" + photo.src + ")";
        photoElement.classList.add("photo");
        photosContainer.append(photoElement);
    }

    profileContainer.append(photosContainer);
}

function buildChat(profileContainer, profile) {
    const chatContainer = document.createElement("div");
    chatContainer.classList.add("chat", "mt-3");

    for (const message of profile.chat) {
        const messageWrapper = document.createElement("div");
        messageWrapper.classList.add("is-clearfix");

        const messageContainer = document.createElement("div");
        messageContainer.innerHTML = message.content;
        messageContainer.classList.add("message", "p-2", "mb-1");

        // Style messages depending on author
        if (message.author == "me") {
            messageWrapper.classList.add("author-me");
            messageContainer.classList.add("has-background-info", "is-pulled-right");
        } else {
            messageWrapper.classList.add("author-person");
            messageContainer.classList.add("has-background-light", "is-pulled-left");
        }

        messageWrapper.append(messageContainer);
        chatContainer.append(messageWrapper);
    }

    profileContainer.append(chatContainer);
}

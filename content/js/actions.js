function navigate(e) {
    const newURL = new URL(e.destination.url);

    removeButtons();
    buildButtons(newURL);
}

function click(e) {
    const button = e.target.closest(".bddb-button");

    if (!button) {
        return;
    }

    // Button clicked is photo
    if (button.classList.contains("photo-button")) {
        (async () => {
            const profile = new Profile();
            await profile.initialize();
            profile.extractPhoto();
            profile.save();
        })();
    }

    // Button clicked is chat
    if (button.classList.contains("chat-button")) {
        (async () => {
            const profile = new Profile();
            await profile.initialize();
            profile.extractChat();
            profile.save();
        })();
    }
}

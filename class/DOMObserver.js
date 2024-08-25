class DOMObserver {
    profile;

    constructor() {
        // Build note button
        new DOMManipulator().buildNoteButton();

        // Attach click event
        document.addEventListener("click", (e) => this.#click(e));

        // Attach text selection event
        document.addEventListener("mouseup", () => this.#select());
    }

    startLoop() {
        setInterval(() => {
            // Rebuild profile
            this.#loadProfile();

            // Display photo buttons
            if (this.#hasPhotoGallery()) {
                new DOMManipulator().buildPhotoButton();
            }

            // Display chat buttons
            if (this.#hasChatWindow()) {
                new DOMManipulator().buildMessageButton();
            }
        }, 300);
    }

    async #loadProfile() {
        if (this.#isMatchedProfile()) {
            const id = window.location.href.match(/\/messages\/([^/]+)/)[1];
            const profileRepository = new ProfileRepository("bddb_");

            this.profile = new Profile(await profileRepository.getById(id), profileRepository);
        }
    }

    #isMatchedProfile() {
        return /^https:\/\/tinder\.com\/app\/messages\/*/.test(window.location.href) ? true : false;
    }

    #hasChatWindow() {
        // Check for chat container
        return document.querySelector(".App__body .chat") ? true : false;
    }

    #hasPhotoGallery() {
        // Check for matching URL and image slider
        return this.#isMatchedProfile() && document.querySelector(".App__body .profileCard__slider") ? true : false;
    }

    #click(e) {
        const button = e.target.closest(".bddb-button");

        if (!button) {
            return;
        }

        if (button.classList.contains("photo-button")) {
            // Button clicked is photo button
            this.profile.parsePhoto();
        } else if (button.classList.contains("message-button")) {
            // Button clicked is messages button
            this.profile.parseMessages();
        } else if (button.classList.contains("note-button")) {
            // Button clicked is selection button
            this.profile.parseSelection();
        }

        this.profile.save(new ProfileRepository("bddb_"));
    }

    #select() {
        if (!this.#isMatchedProfile()) {
            return;
        }

        const button = document.querySelector(".bddb-button.note-button");

        if (window.getSelection().toString().length > 0) {
            const selection = window.getSelection().getRangeAt(0).getBoundingClientRect();
            button.style.left = `${selection.right + window.scrollX + 5}px`;
            button.style.top = `${selection.top + window.scrollY - 5}px`;
            button.style.display = "block";
        } else {
            button.style.display = "none";
        }
    }
}

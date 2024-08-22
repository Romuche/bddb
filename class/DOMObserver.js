class DOMObserver {
    profile;

    constructor() {
        // Build notepad button
        new DOMManipulator().buildNotepadButton();

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
            if (this.#hasChat()) {
                new DOMManipulator().buildChatButton();
            }
        }, 300);
    }

    #loadProfile() {
        if (this.#isMatchedProfile()) {
            (async () => {
                const id = window.location.href.match(/\/messages\/([^/]+)/)[1];
                const profileRepository = new ProfileRepository("bddb_");

                this.profile = new Profile(await profileRepository.getById(id), profileRepository);
            })();
        }
    }

    #isMatchedProfile() {
        return /^https:\/\/tinder\.com\/app\/messages\/*/.test(window.location.href) ? true : false;
    }

    #hasChat() {
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
        } else if (button.classList.contains("chat-button")) {
            // Button clicked is chat button
            this.profile.parseChat();
        } else if (button.classList.contains("notepad-button")) {
            // Button clicked is selection button
            this.profile.parseSelection();
        }

        this.profile.save(new ProfileRepository("bddb_"));
    }

    #select() {
        if (!this.#isMatchedProfile()) {
            return;
        }

        const button = document.querySelector(".bddb-button.notepad-button");

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

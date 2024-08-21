class Interface {
    profile;

    constructor() {
        // Start loop
        setInterval(() => {
            this.#loadProfile();
            this.#displayButtons();
        }, 300);

        // Handle button clicks
        document.addEventListener("click", (e) => this.#click(e));
    }

    #loadProfile() {
        if (this.#isMatchedProfile()) {
            (async () => {
                const id = window.location.href.match(/\/messages\/([^/]+)/)[1];
                const profileRepository = new ProfileRepository("bddb_");

                this.profile = new Profile(await profileRepository.getById(id));
            })();
        }
    }

    #displayButtons() {
        // Display photo buttons
        if (this.#hasPhotoGallery()) {
            this.#buildPhotoButton();
        }

        // Display chat buttons
        if (this.#hasChat()) {
            this.#buildChatButton();
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

    #buildPhotoButton() {
        if (!document.querySelector(".bddb-button.photo-button")) {
            document.querySelector(".react-aspect-ratio-placeholder").appendChild(this.#buildButton("photo-button"));
        }
    }

    #buildChatButton() {
        if (!document.querySelector(".bddb-button.chat-button")) {
            document.querySelector(".chat").appendChild(this.#buildButton("chat-button"));
        }
    }

    #buildButton(...classNames) {
        const button = document.createElement("button");
        button.innerHTML =
            '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 5.75C3 4.23122 4.23122 3 5.75 3H15.7145C16.5764 3 17.4031 3.34241 18.0126 3.9519L20.0481 5.98744C20.6576 6.59693 21 7.42358 21 8.28553V18.25C21 19.7688 19.7688 21 18.25 21H5.75C4.23122 21 3 19.7688 3 18.25V5.75ZM5.75 4.5C5.05964 4.5 4.5 5.05964 4.5 5.75V18.25C4.5 18.9404 5.05964 19.5 5.75 19.5H6V14.25C6 13.0074 7.00736 12 8.25 12H15.75C16.9926 12 18 13.0074 18 14.25V19.5H18.25C18.9404 19.5 19.5 18.9404 19.5 18.25V8.28553C19.5 7.8214 19.3156 7.37629 18.9874 7.0481L16.9519 5.01256C16.6918 4.75246 16.3582 4.58269 16 4.52344V7.25C16 8.49264 14.9926 9.5 13.75 9.5H9.25C8.00736 9.5 7 8.49264 7 7.25V4.5H5.75ZM16.5 19.5V14.25C16.5 13.8358 16.1642 13.5 15.75 13.5H8.25C7.83579 13.5 7.5 13.8358 7.5 14.25V19.5H16.5ZM8.5 4.5V7.25C8.5 7.66421 8.83579 8 9.25 8H13.75C14.1642 8 14.5 7.66421 14.5 7.25V4.5H8.5Z" fill="#eff8ff"/></svg>';

        button.classList.add("bddb-button");
        classNames.forEach((className) => button.classList.add(className));

        return button;
    }

    #click(e) {
        const button = e.target.closest(".bddb-button");

        if (!button) {
            return;
        }

        if (button.classList.contains("photo-button")) {
            // Button clicked is photo
            this.profile.parsePhoto();
        } else if (button.classList.contains("chat-button")) {
            // Button clicked is chat
            this.profile.parseChat();
        }

        this.profile.save(new ProfileRepository("bddb_"));
    }
}

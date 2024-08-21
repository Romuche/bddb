class Profile {
    id;
    name;
    chat;
    gallery;
    #tab;

    constructor(data = null) {
        if (data && data.id) {
            // Build from local storage
            this.id = data.id;
            this.name = data.name;
            this.chat = new Chat(data.chat);
            this.gallery = new Gallery(data.gallery);
            this.#tab = new Tab(data);
        } else {
            // Build empty
            this.id = window.location.href.match(/\/messages\/([^/]+)/)[1];
            this.name = this.#parseName();
            this.chat = new Chat();
            this.gallery = new Gallery();
            this.#tab = new Tab();
        }
    }

    async save(profileRepository) {
        await profileRepository.addOrUpdate(this.id, {
            id: this.id,
            name: this.name,
            chat: this.chat.serialize(),
            gallery: this.gallery.serialize(),
        });
    }

    parseChat() {
        const chat = document.querySelector(".chat > div[id^='SC.chat']");

        this.chat = new Chat(chat);
    }

    parsePhoto() {
        const activeImage = document.querySelector('.keen-slider__slide[aria-hidden="false"] .profileCard__slider__img');

        this.gallery.add(new Photo(activeImage));
    }

    draw() {
        const container = document.querySelector("[data-profiles]");

        const profileContainer = document.createElement("div");
        profileContainer.classList.add("profile");
        profileContainer.setAttribute("data-profile-id", this.id);
        container.append(profileContainer);

        // Sub builders
        this.#buildDeleteButton(profileContainer);
        this.gallery.draw(profileContainer);
        this.chat.draw(profileContainer);

        // Make sure first child is selected
        container.querySelector("[data-profile-id]:first-child").classList.add("is-active");

        // Also draw tab
        this.#tab.draw();
    }

    delete() {
        (async () => {
            await new ProfileRepository("bddb_").deleteById(this.id);
            this.#tab.delete();
        })();
    }

    // Try to extract name from a list of DOM elements
    #parseName() {
        let element;

        // Return current profile name from sidebar
        if ((element = document.querySelector('.messageList a[aria-current="page"] .messageListItem__name'))) {
            return element.textContent;
        }

        // Return current profile name from card
        if ((element = document.querySelector(".profileCard__card h1 > span:first-child"))) {
            return element.textContent;
        }

        // Return current profile name from empty chat
        if ((element = document.querySelector(".chat > div[id^='SC.chat'] h3 span"))) {
            return element.textContent;
        }
    }

    #buildDeleteButton(profileContainer) {
        const deleteWrapper = document.createElement("div");
        deleteWrapper.classList.add("is-clearfix", "pb-2");

        const deleteButton = document.createElement("button");
        deleteButton.classList.add("button", "is-danger", "is-outlined", "is-pulled-right");
        deleteButton.innerHTML = "❌";
        deleteButton.setAttribute("data-delete-id", this.id);

        // Attach delete event
        deleteButton.addEventListener("click", () => this.delete());

        deleteWrapper.append(deleteButton);
        profileContainer.append(deleteWrapper);
    }
}

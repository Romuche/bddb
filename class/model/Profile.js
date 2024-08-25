class Profile {
    id;
    name;
    messages;
    photos;
    notes;
    #tab;
    #repository;

    constructor(data = null, repository) {
        if (data && data.id) {
            // Build from local storage
            this.id = data.id;
            this.name = data.name;
            this.messages = new MessageCollection(data.messages);
            this.photos = new PhotoCollection(data.photos);
            this.notes = new NoteCollection(data.notes, this);
            this.#tab = new Tab(data);
        } else {
            // Build empty
            this.id = window.location.href.match(/\/messages\/([^/]+)/)[1];
            this.name = this.#parseName();
            this.messages = new MessageCollection();
            this.photos = new PhotoCollection();
            this.notes = new NoteCollection([], this);
            this.#tab = new Tab();
        }

        this.#repository = repository;
    }

    async save() {
        await this.#repository.addOrUpdate(this.id, {
            id: this.id,
            name: this.name,
            messages: this.messages.serialize(),
            photos: this.photos.serialize(),
            notes: this.notes.serialize(),
        });
    }

    parseMessages() {
        const messages = document.querySelector(".chat > div[id^='SC.chat']");

        this.messages = new MessageCollection(messages);
    }

    parsePhoto() {
        const activeImage = document.querySelector('.keen-slider__slide[aria-hidden="false"] .profileCard__slider__img');

        this.photos.add(new Photo(activeImage));
    }

    parseSelection() {
        const selectedText = window.getSelection().toString();

        this.notes.add(new Note(selectedText, null));
    }

    draw() {
        const container = document.querySelector("[data-profiles]");
        let profileContainer = document.querySelector("[data-profile-id='" + this.id + "']");

        if (profileContainer) {
            // Update existing profile
            profileContainer.innerHTML = "";
        } else {
            // Create profile
            profileContainer = document.createElement("div");
            profileContainer.classList.add("profile");
            profileContainer.setAttribute("data-profile-id", this.id);
            container.append(profileContainer);

            // Make sure first child is selected if there is no active tab
            if (!container.querySelector("[data-profile-id].is-active")) {
                container.querySelector("[data-profile-id]:first-child").classList.add("is-active");
            }

            // Also draw tab
            this.#tab.draw();
        }

        // Build content
        this.#buildDeleteButton(profileContainer);
        this.photos.draw(profileContainer);
        this.messages.draw(profileContainer);
        this.notes.draw(profileContainer);
    }

    async delete() {
        await new ProfileRepository("bddb_").deleteById(this.id);
        this.#tab.delete();
    }

    async refresh() {
        const data = await this.#repository.getById(this.id);

        this.id = data.id;
        this.name = data.name;
        this.messages = new MessageCollection(data.messages);
        this.photos = new PhotoCollection(data.photos);
        this.notes = new NoteCollection(data.notes, this);
        this.#tab = new Tab(data);

        this.draw();
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
        // Setup container
        const deleteWrapper = document.createElement("div");
        deleteWrapper.classList.add("is-clearfix", "pb-2");

        // Build button
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

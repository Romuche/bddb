class Note {
    content;
    #profile;

    constructor(data, profile) {
        if (typeof data === "object") {
            // Build from local storage
            this.content = data.content;
            this.#profile = profile;
        } else {
            // Build from selection
            this.content = data;
        }
    }

    draw(notepadContainer) {
        const noteWrapper = document.createElement("div");
        noteWrapper.classList.add("note", "message", "is-info", "is-small", "mb-4");

        const noteContainer = document.createElement("div");
        noteContainer.innerHTML = this.content;
        noteContainer.setAttribute("contenteditable", true);
        noteContainer.classList.add("message-body");

        // Attach enter event
        noteContainer.addEventListener("keydown", (e) => this.save(e));

        noteWrapper.append(noteContainer);
        notepadContainer.append(noteWrapper);
    }

    serialize() {
        return {
            content: this.content,
        };
    }

    save(event) {
        // Check if only Enter is pressed (without Shift)
        if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            this.content = event.target.innerHTML;
            this.#profile.save();
        }
    }
}

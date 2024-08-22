class Notepad {
    notes = [];

    constructor(data = [], profile) {
        for (const noteData of data) {
            this.add(new Note(noteData, profile));
        }
    }

    add(newNote) {
        this.notes.push(newNote);
    }

    serialize() {
        const serializedData = [];

        for (const note of this.notes) {
            serializedData.push(note.serialize());
        }

        return serializedData;
    }

    draw(profileContainer) {
        // Build container
        const notepadContainer = document.createElement("div");
        notepadContainer.classList.add("notepad", "mt-3", "pl-4", "is-pulled-right");

        // Build photos
        for (const note of this.notes) {
            note.draw(notepadContainer);
        }

        profileContainer.append(notepadContainer);
    }
}

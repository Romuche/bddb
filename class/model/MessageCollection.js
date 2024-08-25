class MessageCollection {
    messages = [];

    constructor(data = []) {
        if (data instanceof Element) {
            // Build from DOM element
            for (const message of data.querySelectorAll(".msg")) {
                this.messages.push(new Message(message));
            }
        } else {
            // Build from serialized data
            for (const message of data) {
                this.messages.push(new Message(message));
            }
        }
    }

    // Get text only transcript of messages
    transcript() {
        let transcript;

        for (const message of this.messages) {
            transcript += message.author + ' : "' + message.content + '"\n';
        }

        return transcript;
    }

    serialize() {
        const serializedData = [];

        for (const message of this.messages) {
            serializedData.push(message.serialize());
        }

        return serializedData;
    }

    draw(profileContainer) {
        // Build container
        const messagesContainer = document.createElement("div");
        messagesContainer.classList.add("messages", "mt-3", "is-pulled-left");

        for (const message of this.messages) {
            message.draw(messagesContainer);
        }

        profileContainer.append(messagesContainer);
    }
}

class Chat {
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

    // Get text only transcript of chat
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
        const chatContainer = document.createElement("div");
        chatContainer.classList.add("chat", "mt-3");

        for (const message of this.messages) {
            message.draw(chatContainer);
        }

        profileContainer.append(chatContainer);
    }
}

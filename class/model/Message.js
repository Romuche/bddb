class Message {
    author;
    content;

    constructor(data = []) {
        if (data instanceof Element) {
            // Build from DOM element
            this.author = data.classList.contains("msg--received") ? "person" : "me";
            this.content = data.querySelector(".text").textContent;
        } else {
            // Build from serialized data
            this.author = data.author;
            this.content = data.content;
        }
    }

    draw(chatContainer) {
        const messageWrapper = document.createElement("div");
        messageWrapper.classList.add("is-clearfix");

        const messageContainer = document.createElement("div");
        messageContainer.innerHTML = this.content;
        messageContainer.classList.add("message", "p-2", "mb-1");

        // Style messages depending on author
        if (this.author == "me") {
            messageWrapper.classList.add("author-me");
            messageContainer.classList.add("has-background-info", "is-pulled-right");
        } else {
            messageWrapper.classList.add("author-person");
            messageContainer.classList.add("has-background-light", "is-pulled-left");
        }

        messageWrapper.append(messageContainer);
        chatContainer.append(messageWrapper);
    }

    serialize() {
        return {
            author: this.author,
            content: this.content,
        };
    }
}

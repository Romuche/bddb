class Message {
    author;
    content;
    type;

    constructor(data = []) {
        if (data instanceof Element) {
            // Build from DOM element
            this.author = data.classList.contains("msg--received") ? "person" : "me";

            // Get message content
            if (data.querySelector("img")) {
                this.content = data.querySelector("img").getAttribute("src");
                this.type = "img";
            } else if (data.querySelector(".link")) {
                this.content = data.querySelector("a").getAttribute("href");
                this.type = "link";
            } else {
                this.content = data.querySelector(".text").textContent;
                this.type = "txt";
            }
        } else {
            // Build from serialized data
            this.author = data.author;
            this.content = data.content;
            this.type = data.type;
        }
    }

    draw(messagesContainer) {
        const messageWrapper = document.createElement("div");
        messageWrapper.classList.add("is-clearfix");

        const messageContainer = document.createElement("div");
        messageContainer.classList.add("message", "p-2", "mb-1");

        if (this.type == "img") {
            const image = document.createElement("img");
            image.setAttribute("src", this.content);
            messageContainer.append(image);
        } else if (this.type == "link") {
            const link = document.createElement("a");
            link.setAttribute("href", this.content);
            messageContainer.append(link);
        } else {
            messageContainer.innerHTML = this.content;
        }

        // Style messages depending on author
        if (this.author == "me") {
            messageWrapper.classList.add("author-me");
            messageContainer.classList.add("has-background-info", "is-pulled-right");
        } else {
            messageWrapper.classList.add("author-person");
            messageContainer.classList.add("has-background-light", "is-pulled-left");
        }

        messageWrapper.append(messageContainer);
        messagesContainer.append(messageWrapper);
    }

    serialize() {
        return {
            author: this.author,
            content: this.content,
            type: this.type,
        };
    }
}

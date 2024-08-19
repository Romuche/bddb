class Profile {
    id;
    name;
    chat = [];
    photos = [];

    constructor() {
        this.id = this.extractId();
    }

    async initialize() {
        const result = await chrome.storage.local.get(["bddb_" + this.id]);

        if (result["bddb_" + this.id]) {
            // Existing profile
            this.name = result["bddb_" + this.id].name;
            this.chat = result["bddb_" + this.id].chat || [];
            this.photos = result["bddb_" + this.id].photos || [];
        } else {
            // New profile
            this.name = this.extractName();
            this.chat = [];
            this.photos = [];
        }
    }

    save() {
        chrome.storage.local.set({
            ["bddb_" + this.id]: {
                id: this.id,
                name: this.name,
                chat: this.chat,
                photos: this.photos,
            },
        });
    }

    extractChat() {
        const chat = [];

        for (const message of document.querySelectorAll(".chat > div[id^='SC.chat'] > div:not(:empty) .msg")) {
            chat.push({
                author: message.classList.contains("msg--received") ? "person" : "me",
                content: message.querySelector(".text").textContent,
            });
        }

        this.chat = chat;
    }

    extractPhoto() {
        const activeImage = document.querySelector('.keen-slider__slide[aria-hidden="false"] .profileCard__slider__img ');

        const imageSrc = this.getBackgroundImageUrl(activeImage);
        const originalSrc = this.getOriginaPhotolUrl(imageSrc);
        const photoId = this.getPhotoId(originalSrc);

        if (!this.getPhotoById(photoId)) {
            this.photos.push({
                id: photoId,
                src: imageSrc,
                original_src: originalSrc,
            });
        }
    }

    extractId() {
        // Return current profile ID from URL
        return window.location.href.match(/\/messages\/([^/]+)/)[1];
    }

    extractName() {
        // Return current profile name from sidebar
        const sidebarName = document.querySelector('.messageList a[aria-current="page"] .messageListItem__name');
        if (sidebarName) {
            return sidebarName.textContent;
        }

        // Return current profile name from card
        const cardName = document.querySelector(".profileCard__card h1 > span:first-child");
        if (cardName) {
            return cardName.textContent;
        }

        // Return current profile name from empty chat
        const chatName = document.querySelector(".chat > div[id^='SC.chat'] h3 span");
        if (chatName) {
            return chatName.textContent;
        }
    }

    transcript() {
        let transcript = "";

        // Format transript line by line
        for (const message of this.chat) {
            transcript += message.author + ' : "' + message.content + '"\n';
        }

        return transcript;
    }

    getBackgroundImageUrl(element) {
        const style = window.getComputedStyle(element);
        const backgroundImage = style.backgroundImage;

        // Extract the url from the CSS definition
        const urlPattern = /url\(["']?(.*?)["']?\)/;
        const matches = urlPattern.exec(backgroundImage);

        return matches ? matches[1] : null;
    }

    getOriginaPhotolUrl(photoUrl) {
        // Replace the dimension part with original
        photoUrl = photoUrl.replace(/\/640x640_75_/, "/original_");
        photoUrl = photoUrl.replace(/\/640x640_/, "/original_");
        photoUrl = photoUrl.replace(/\/640x800_75_/, "/original_");
        photoUrl = photoUrl.replace(/\/640x800_/, "/original_");

        // Replace the extension with "jpeg"
        photoUrl = photoUrl.replace(/\.\w+$/, ".jpeg");

        return photoUrl;
    }

    getPhotoId(originalPhotoUrl) {
        return originalPhotoUrl.match(/original_(.+?)(\.\w+)$/)[1];
    }

    getPhotoById(photoId) {
        for (const photo of this.photos) {
            if (photo.id == photoId) {
                return photo;
            }
        }

        return null;
    }
}

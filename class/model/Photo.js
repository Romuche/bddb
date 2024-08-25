class Photo {
    id;
    src;
    originalSrc;

    constructor(data) {
        if (data instanceof Element) {
            // Build from DOM element
            this.src = this.#getElementBGImageUrl(data);
            this.originalSrc = this.#getOriginaPhotolUrl(this.src);
            this.id = this.#getPhotoId(this.originalSrc);
        } else {
            // Build from serialized data
            this.id = data.id;
            this.src = data.src;
            this.originalSrc = data.originalSrc;
        }
    }

    serialize() {
        return {
            id: this.id,
            src: this.src,
            originalSrc: this.originalSrc,
        };
    }

    draw(photosContainer) {
        const photoElement = document.createElement("div");

        photoElement.style.backgroundImage = "url(" + this.src + ")";
        photoElement.classList.add("photo");

        photosContainer.append(photoElement);
    }

    #getElementBGImageUrl(element) {
        const style = window.getComputedStyle(element);
        const backgroundImage = style.backgroundImage;

        // Extract the url from the CSS definition
        const urlPattern = /url\(["']?(.*?)["']?\)/;
        const matches = urlPattern.exec(backgroundImage);

        return matches ? matches[1] : null;
    }

    #getOriginaPhotolUrl(photoUrl) {
        // Replace the dimension part with original
        photoUrl = photoUrl.replace(/\/640x640_75_/, "/original_");
        photoUrl = photoUrl.replace(/\/640x640_/, "/original_");
        photoUrl = photoUrl.replace(/\/640x800_75_/, "/original_");
        photoUrl = photoUrl.replace(/\/640x800_/, "/original_");

        // Replace the extension with "jpeg"
        photoUrl = photoUrl.replace(/\.\w+$/, ".jpeg");

        return photoUrl;
    }

    #getPhotoId(originalPhotoUrl) {
        return originalPhotoUrl.match(/original_(.+?)(\.\w+)$/)[1];
    }
}

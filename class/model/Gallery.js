class Gallery {
    photos = [];

    constructor(data = []) {
        for (const photoData of data) {
            this.add(new Photo(photoData));
        }
    }

    add(newPhoto) {
        // Check if photo already in array
        for (const photo of this.photos) {
            if (photo.id === newPhoto.id) {
                return;
            }
        }

        this.photos.push(newPhoto);
    }

    serialize() {
        const serializedData = [];

        for (const photo of this.photos) {
            serializedData.push(photo.serialize());
        }

        return serializedData;
    }

    draw(profileContainer) {
        // Build container
        const galleryContainer = document.createElement("div");
        galleryContainer.classList.add("photos", "is-flex");

        // Build photos
        for (const photo of this.photos) {
            photo.draw(galleryContainer);
        }

        profileContainer.append(galleryContainer);
    }
}

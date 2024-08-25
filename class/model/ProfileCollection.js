class ProfileCollection {
    profiles = [];

    constructor(data = []) {
        for (const elementData of data) {
            this.profiles.push(new Profile(elementData, new ProfileRepository("bddb_")));
        }
    }

    getById(id) {
        for (const profile of this.profiles) {
            if (profile.id === id) {
                return profile;
            }
        }
    }

    add(newProfile) {
        // Check if profile already in array
        for (const profile of this.profiles) {
            if (profile.id === newProfile.id) {
                return;
            }
        }

        this.profiles.push(newProfile);
    }
}

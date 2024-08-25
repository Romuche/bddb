class ProfileRepository {
    constructor(prefix = "") {
        this.prefix = prefix;
    }

    // Get all entries
    async getAll() {
        const allData = await chrome.storage.sync.get(null);

        return Object.keys(allData)
            .filter((key) => key.startsWith(this.prefix))
            .reduce((result, key) => {
                result.push(allData[key]);

                return result;
            }, []);
    }

    // Get a single entry by ID
    async getById(id) {
        const key = this.#getKey(id);

        // Using try to get around errors throwing on extension update
        try {
            const result = await chrome.storage.sync.get([key]);
            return result[key] || null;
        } catch (error) {}
    }

    // Add or update an entry
    async addOrUpdate(id, data) {
        const key = this.#getKey(id);

        await chrome.storage.sync.set({ [key]: data });
    }

    // Delete an entry by ID
    async deleteById(id) {
        const key = this.#getKey(id);

        await chrome.storage.sync.remove([key]);
    }

    // Helper to generate the storage key with the prefix
    #getKey(id) {
        return this.prefix + id;
    }
}

class ProfileRepository {
    constructor(prefix = "") {
        this.prefix = prefix;
    }

    // Get all entries
    async getAll() {
        const allData = await chrome.storage.local.get(null);
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
        const result = await chrome.storage.local.get([key]);

        return result[key] || null;
    }

    // Add or update an entry
    async addOrUpdate(id, data) {
        const key = this.#getKey(id);
        await chrome.storage.local.set({ [key]: data });
    }

    // Delete an entry by ID
    async deleteById(id) {
        const key = this.#getKey(id);
        await chrome.storage.local.remove([key]);
    }

    // Helper to generate the storage key with the prefix
    #getKey(id) {
        return this.prefix + id;
    }
}

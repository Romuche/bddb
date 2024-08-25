let profileCollection;

// Build popup
(async () => {
    const profileRepository = new ProfileRepository("bddb_");
    profileCollection = new ProfileCollection(await profileRepository.getAll());

    for (const profile of profileCollection.profiles) {
        profile.draw();
    }
})();

// Listen for changes in the sync storage
chrome.storage.onChanged.addListener(function (changes, areaName) {
    if (areaName === "sync") {
        for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
            // If key matches and profile exists
            if (key.startsWith("bddb_") && newValue) {
                // Create profile with updated data if non existant
                profileCollection.add(new Profile(newValue, new ProfileRepository("bddb_")));

                // Refresh data
                profileCollection.getById(newValue.id).refresh();
            }
        }
    }
});

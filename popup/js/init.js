// Build popup
(async () => {
    const profileRepository = new ProfileRepository("bddb_");

    for (const profileData of await profileRepository.getAll()) {
        const profile = new Profile(profileData);
        profile.draw();
    }
})();

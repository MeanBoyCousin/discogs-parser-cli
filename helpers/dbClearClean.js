const clearAndClean = async db => {
    await db.run('DELETE FROM releases'); // Clear database before appending parsed data.
    await db.run('VACUUM'); // Clean up space.
};

module.exports = clearAndClean;

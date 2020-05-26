const clearAndClean = async db => {
    try {
        await db.run('DELETE FROM releases'); // Clear database before appending parsed data.
        await db.run('VACUUM'); // Clean up space.
    } catch (error) {
        console.log(error);
    }
};

module.exports = clearAndClean;

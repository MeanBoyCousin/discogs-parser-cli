const clearAndClean = db => {
    db.run('DELETE FROM releases') // Clear database before appending parsed data.
    db.run('VACUUM') // Clean up space.
}

module.exports = clearAndClean

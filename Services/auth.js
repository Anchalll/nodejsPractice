const sessionIdToUserMapping = new Map();

function setUserToSession(sessionId, user) {
    sessionIdToUserMapping.set(sessionId, user);
}

function getUserFromSession(sessionId) {
    return sessionIdToUserMapping.get(sessionId);
}

module.exports = {
    setUserToSession,
    getUserFromSession
}
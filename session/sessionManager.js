const db = require('./sessionDb')


class Session {
  constructor(userId) {
    this.userId = userId
    this.sessionId = Date.now().toString()
    this.timer = null

    this.expire()
  }
  expire() {
    if (this.timer) {
      clearTimeout(this.timer)
    }
    this.timer = setTimeout(() => {
      sessionManager.unset(this.userId)
    }, 10 * 60 * 60 * 1000)
  }
}


let sessionManager = {
  sessions: {},
  getUserSession(userId) {
    let sessionId = db.get(`sessions.${userId}`).value()
    return sessionId
  },
  set(userId) {
    if (this.getUserSession(userId)) {
      this.sessions[userId].expire()
    } else {
      let session = new Session(userId)
      this.sessions[userId] = session
      db.set(`sessions.${userId}`, session.sessionId)
        .write()
    }
    return this.sessions[userId].sessionId
  },
  unset(userId) {
    let sessionId = db.get(`sessions.${userId}`).value()
    if (sessionId) {
      db.unset(`sessions.${userId}`)
        .write()
      clearTimeout(this.sessions[userId].timer)
      delete this.sessions[userId]
    }
  }
}



module.exports = sessionManager
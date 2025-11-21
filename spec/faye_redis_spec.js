var RedisEngine = require('../faye-redis')

JS.Test.describe("Redis engine", function() { with(this) {
  before(function() {
    var pw = process.env.TRAVIS ? undefined : "foobared"
    this.engineOpts = {type: RedisEngine, password: pw, namespace: new Date().getTime().toString()}
  })

  after(function(resume) { with(this) {
    disconnect_engine()
    var redis = require('redis').createClient({
      socket: { host: 'localhost', port: 6379 },
      password: engineOpts.password,
      legacyMode: true
    })
    redis.connect().then(function() {
      redis.flushall(function() {
        redis.quit()
        resume()
      })
    })
  }})

  itShouldBehaveLike("faye engine")

  describe("distribution", function() { with(this) {
    itShouldBehaveLike("distributed engine")
  }})

  if (process.env.TRAVIS) return

  describe("using a Unix socket", function() { with(this) {
    before(function() { with(this) {
      this.engineOpts.socket = "/tmp/redis.sock"
    }})

    itShouldBehaveLike("faye engine")
  }})
}})

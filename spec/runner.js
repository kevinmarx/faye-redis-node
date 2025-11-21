JS = require('jstest')

Faye = require('faye')
require('faye/spec/javascript/engine_spec')
require('./faye_redis_spec')

JS.Test.autorun()

const fastify = require('fastify')({ logger: true })
const PORT = process.env.PORT || 4321

// print all X-... request headers
fastify.addHook('preHandler', (request, reply, done) => {
  Object.keys(request.headers).forEach((key) => {
    if (key.startsWith('x')) {
      console.log(
        '🎩 %s: %s %s %s',
        key,
        request.headers[key],
        request.method,
        request.url,
      )
    }
  })
  done()
})

fastify.get('/', () => {
  return { ok: true }
})

// Run the server!
const start = async () => {
  try {
    await fastify.listen({ port: PORT })
    console.log('running server on port %d', PORT)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()

async function closeServer(signal) {
  console.log(`closing the server with the signal ${signal}`)
  await fastify.close()
  process.kill(process.pid, signal)
}
process.once('SIGINT', closeServer)
process.once('SIGTERM', closeServer)

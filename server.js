const fastify = require('fastify')({ logger: true })

const PORT = process.env.PORT || 4321

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

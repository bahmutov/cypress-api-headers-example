const path = require('path')
const fastify = require('fastify')({ logger: true })
const PORT = process.env.PORT || 4321

const publicFolder = path.join(__dirname, 'public')

// all request headers are lowercase
const startsWithX = (key) => key.startsWith('x')

// print all X-... request headers
fastify.addHook('preHandler', (request, reply, done) => {
  const hasXheaders = Object.keys(request.headers).some(
    startsWithX,
  )
  if (hasXheaders) {
    console.log('🎩 %s %s:', request.method, request.url)
  } else {
    done()
    return
  }

  Object.keys(request.headers)
    .filter(startsWithX)
    .forEach((key) => {
      console.log('\t%s:\t%s', key, request.headers[key])
    })
  done()
})

fastify.get('/', () => {
  return { ok: true }
})

// all other default static HTML files
fastify.register(require('@fastify/static'), {
  root: publicFolder,
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

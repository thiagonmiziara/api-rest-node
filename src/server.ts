import fastify from 'fastify'

const app = fastify()

app.get('/hello', () => {
  return 'hello world!'
})

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log('Server is running on port 3333')
  })

// comando para rodar o servidor npx tsx src/server.ts
// script no package.json "dev" para rodar servidor yarn dev

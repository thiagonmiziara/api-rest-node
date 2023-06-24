import { app } from './app'
import { env } from './env'

app
  .listen({
    port: env.PORT,
  })
  .then(() => {
    console.log('HTTP Server is running')
  })

// comando para rodar o servidor npx tsx src/server.ts
// script no package.json "dev" para rodar servidor yarn dev
// comando pra criar uma migration yarn knex migrate:make nome da migration
// comando pra rodar a migration yarn knex migrate:latest
// comando pra desfazer a migration ou alterar algum nome de campo errado antes de subir para produção yarn knex migrate:rollback

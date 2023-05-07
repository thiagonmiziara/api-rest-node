import fastify from 'fastify'
// import crypto from 'node:crypto'
import { knex } from './database'

const app = fastify()

app.get('/hello', async () => {
  // inserindo dados na tabela transactions
  // const transaction = await knex('transactions')
  //   .insert({
  //     id: crypto.randomUUID(),
  //     title: 'Salário',
  //     amount: 5000,
  //   })
  //   .returning('*')

  const transaction = await knex('transactions').select('*')
  return transaction
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
// comando pra criar uma migration yarn knex migrate:make nome da migration
// comando pra rodar a migration yarn knex migrate:latest
// comando pra desfazer a migration ou alterar algum nome de campo errado antes de subir para produção yarn knex migrate:rollback

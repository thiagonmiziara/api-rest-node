import { afterAll, describe, expect, it, beforeAll, beforeEach } from 'vitest'
import { execSync } from 'node:child_process'
import request from 'supertest'
import { app } from '../src/app'

describe('Delete transaction', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  beforeEach(() => {
    execSync('yarn knex migrate:rollback --all')
    execSync('yarn knex migrate:latest')
  })

  it('should be able to delete a transaction', async () => {
    // Primeiro, cria-se uma transação para ser excluída
    const createResponse = await request(app.server)
      .post('/transactions')
      .send({
        title: 'New transaction',
        type: 'credit',
        amount: 2000,
      })

    expect(createResponse.status).toEqual(201)

    // Obtém o ID da transação criada
    const transactionId = createResponse.body.id

    // Em seguida, envia-se uma solicitação DELETE para excluir a transação
    const deleteResponse = await request(app.server).delete(
      `/transactions/${transactionId}`,
    )

    expect(deleteResponse.status).toEqual(200)
    expect(deleteResponse.body.message).toEqual(
      'Transaction deleted successfully',
    )
  })
})

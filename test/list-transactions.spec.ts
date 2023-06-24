import { afterAll, describe, expect, it, beforeAll, beforeEach } from 'vitest'
import { execSync } from 'node:child_process'
import request from 'supertest'
import { app } from '../src/app'

describe('List transactions', () => {
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

  it('should be able to list all transactions', async () => {
    const createTransactionResponse = await request(app.server)
      .post('/transactions')
      .send({
        title: 'New transaction',
        type: 'credit',
        amount: 2000,
      })

    const cookies = createTransactionResponse.get('Set-Cookie')

    const response = await request(app.server)
      .get('/transactions')
      .set('Cookie', cookies)

    expect(response.status).toEqual(200)
    expect(response.body.transactions).toEqual([
      expect.objectContaining({
        title: 'New transaction',
        type: 'credit',
        amount: 2000,
      }),
    ])
  })

  it('should be able to get specific transaction by id', async () => {
    const createTransactionResponse = await request(app.server)
      .post('/transactions')
      .send({
        title: 'New transaction',
        type: 'credit',
        amount: 2000,
      })

    const cookies = createTransactionResponse.get('Set-Cookie')

    const responseListAllTransactions = await request(app.server)
      .get('/transactions')
      .set('Cookie', cookies)

    const transactionId = responseListAllTransactions.body.transactions[0].id

    const responseSpecificTransaction = await request(app.server)
      .get(`/transactions/${transactionId}`)
      .set('Cookie', cookies)
      .expect(200)

    expect(responseSpecificTransaction.body.transaction).toEqual(
      expect.objectContaining({
        title: 'New transaction',
        amount: 2000,
      }),
    )
  })
})

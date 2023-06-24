import { afterAll, describe, expect, it, beforeAll } from 'vitest'
import request from 'supertest'
import { app } from '../src/app'

describe('List transactions', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
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
})

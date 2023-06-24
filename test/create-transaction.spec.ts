import { afterAll, describe, expect, it, beforeAll } from 'vitest'
import request from 'supertest'
import { app } from '../src/app'

describe('Create new transaction', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a new transaction', async () => {
    const response = await request(app.server).post('/transactions').send({
      title: 'New transaction',
      type: 'credit',
      amount: 2000,
    })

    expect(response.status).toEqual(201)
  })
})

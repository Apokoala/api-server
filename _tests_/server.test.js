'use strict';

const { server } = require('../src/server.js');
const supertest = require('supertest');
const { sequelize } = require('../src/models/index.js');
const request = supertest(server);

beforeEach(async () => {await sequelize.sync()});

const createItems = async () => {
  await request.post('/food').send({   
    name:'apple',
    group: 'fruit',
  });
  await request.post('/food').send({
      name:'cucumber',
      group: 'vegetable',
  });
  await request.post('/clothes').send({   
    name:'shirt',
    group: 'shirt',
  });
  await request.post('/clothes').send({
    name:'shirt',
    group: 'shirt',
  });
}

describe('RESTful API', () => {

  test('Handles 404 requests', async () => {
    const res = await request.get('/bar');
    expect(res.status).toEqual(404);
  });

  test('Create two items', async () => {
    let res = await request.post('/food').send({   
        name:'apple',
        group: 'fruit',
    });
    let resTwo = await request.post('/food').send({
        name:'cucumber',
        group: 'vegetable',
    });
    expect(res.body.name).toEqual('apple');
    expect(res.body.group).toEqual('fruit');
    expect(resTwo.body.name).toEqual('cucumber');
    expect(resTwo.body.group).toEqual('vegetable');
  });

  test('Find all items', async () => {
    await createItems()
    let res = await request.get('/food');
    expect(res.body[0].name).toEqual('apple');
    expect(res.body[0].group).toEqual('fruit');
    expect(res.body[1].name).toEqual('cucumber');
    expect(res.body[1].group).toEqual('vegetable');
  });

  test('Find one item', async () => {
    await createItems()
    let res = await request.get('/food/2');
    expect(res.body.name).toEqual('cucumber');
    expect(res.body.group).toEqual('vegetable');
  });

  test('updates a single food item', async () => {
    await createItems()
    await request.put('/food/1').send({
        name: "tomato",
        group: 'vegetable',
    });
    let res = await request.get('/food/1');
    expect(res.body.name).toEqual('tomato');
    expect(res.body.group).toEqual('vegetable');
  });

  test('deletes a single food item', async () => {
    await createItems()
    await request.delete('/food/1');
    let res = await request.get('/food');
    expect(res.body[0].name).toEqual('cucumber');
    expect(res.body[0].group).toEqual('vegetable');
  });

  test('Handles 404 requests', async () => {
    const res = await request.get('/bar');
    expect(res.status).toEqual(404);
  });

  test('Create two items', async () => {
    let res = await request.post('/clothes').send({   
        name:'shirt',
        group: 'shirt',
    });
    let resTwo = await request.post('/clothes').send({
        name:'shirt',
        group: 'shirt',
    });
    expect(res.body.name).toEqual('shirt');
    expect(res.body.group).toEqual('shirt');
    expect(resTwo.body.name).toEqual('shirt');
    expect(resTwo.body.group).toEqual('shirt');
  });

  test('Find all items', async () => {
    await createItems()
    let res = await request.get('/clothes');
    expect(res.body[0].name).toEqual('shirt');
    expect(res.body[0].group).toEqual('shirt');
    expect(res.body[1].name).toEqual('shirt');
    expect(res.body[1].group).toEqual('shirt');
  });

  test('Find one item', async () => {
    await createItems()
    let res = await request.get('/clothes/2');
    expect(res.body.name).toEqual('shirt');
    expect(res.body.group).toEqual('shirt');
  });

  test('Updates a single clothes item', async () => {
    await createItems()
    await request.put('/clothes/1').send({
        name: "boots",
        group: 'shoes',
    });
    let res = await request.get('/clothes/1');
    expect(res.body.name).toEqual('boots');
    expect(res.body.group).toEqual('shoes');
  });

  test('Deletes a single clothes item', async () => {
    await createItems()
    await request.delete('/clothes/1');
    let res = await request.get('/clothes');
    expect(res.body[0].name).toEqual('shirt');
    expect(res.body[0].group).toEqual('shirt');
  });
});

afterEach(async () => {await sequelize.drop();});

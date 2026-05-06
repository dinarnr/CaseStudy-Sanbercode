describe('API Testing', () => {
  it('Categories', () => {
    cy.request('GET', 'https://api.escuelajs.co/api/v1/categories')
      .then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body[0]).to.have.property('id')
      })
  })

  it('Get a single category by ID Valid', () => {
    cy.request('GET', 'https://api.escuelajs.co/api/v1/categories/5')
      .then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body).to.have.property('id')
        expect(response.body.name).to.eq('Miscellaneous')
      })
  })

  it('Get a single category by slug', () => {
    cy.request('GET', 'https://api.escuelajs.co/api/v1/categories/slug/new-category')
      .then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body.slug).to.eq('new-category')
      })
  })

  it('Create a category (with data)', () => {
    cy.request({
      method: 'POST',
      url: 'https://api.escuelajs.co/api/v1/categories/',
      body: {
        "name": "New Category3",
        "image": "https://placeimg.com/640/480/any"
      }})
    .then((response) => {
      expect(response.status).to.eq(201)
      expect(response.body.name).to.eq('New Category3')
    })
})

it('Create a category (with no data)', () => {
    cy.request({
      method: 'POST',
      url: 'https://api.escuelajs.co/api/v1/categories/',
      })
    .then((response) => {
      expect(response.status).to.eq(500)
    })
})

it('Update a category', () => {
    cy.request({
      method: 'PUT',
      url: 'https://api.escuelajs.co/api/v1/categories/1',
      body: {
        "name": "UPDATE LAGI",
        "image": "https://placeimg.com/640/480/any"
      }})
    .then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body).to.have.property('name', "UPDATE LAGI")
    })
})

it('Get all products by category', () => {
    cy.request({
      method: 'GET',
      url: 'https://api.escuelajs.co/api/v1/categories/1/products'
      })
    .then((response) => {
      expect(response.status).to.eq(200)
      // krn bentuk array, cek data pertama
      expect(response.body[0]).to.have.property('title')
      expect(response.body[0]).to.have.property('description')
    })
})

it('Delete a category', () => {
    cy.request({
      method: 'DELETE',
      url: 'https://api.escuelajs.co/api/v1/categories/2'
      })
    .then((response) => {
      expect(response.status).to.eq(200)
    })
})
})
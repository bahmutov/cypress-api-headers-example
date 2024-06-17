/// <reference types="cypress" />

describe('API', { tags: '@static' }, () => {
  it('Visible button', { tags: '@sanity' }, () => {
    cy.visit('/home.html')
    cy.contains('button', 'Click me').click()
  })
})

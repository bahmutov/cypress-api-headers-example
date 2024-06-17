/// <reference types="cypress" />

describe('API', () => {
  it('C123456 serves the homepage', () => {
    cy.visit('/home.html')
    cy.contains('h1', 'Homepage')
  })
})

/// <reference types="cypress" />

beforeEach(() => {
  cy.intercept({ resourceType: /fetch|xhr/ }, (req) => {
    req.headers['X-Test-Source'] = 'Cypress'
  })
})

/// <reference types="cypress" />

describe('API', () => {
  it('C123456 responds with OK', () => {
    cy.request('/')
      .its('body')
      .should('deep.equal', { ok: true })
  })
})

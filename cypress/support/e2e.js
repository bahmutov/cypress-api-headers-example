/// <reference types="cypress" />

beforeEach(() => {
  const currentTestTitle = Cypress.currentTest.title
  // there might be TestRail case id in the title
  // try extracting it separately
  const testRailId =
    currentTestTitle.match(/(?<caseId>C\d+)/)?.groups?.caseId

  cy.intercept({ resourceType: /fetch|xhr/ }, (req) => {
    req.headers['X-Test-Source'] = 'Cypress'
    req.headers['X-Test-Title'] = currentTestTitle
    if (testRailId) {
      req.headers['X-Test-Rail-Id'] = testRailId
    }
  })
})

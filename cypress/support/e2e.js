/// <reference types="cypress" />

import registerCypressGrep from '@bahmutov/cy-grep/src/support'
registerCypressGrep()

beforeEach(() => {
  const currentTestTitle = Cypress.currentTest.title
  // there might be TestRail case id in the title
  // try extracting it separately
  const testRailId =
    currentTestTitle.match(/(?<caseId>C\d+)/)?.groups?.caseId

  // the effective test tags are set by the plugin
  // @bahmutov/cy-grep
  const testTags = Cypress.env('testTags')

  cy.intercept({ resourceType: /fetch|xhr/ }, (req) => {
    req.headers['X-Test-Source'] = 'Cypress'
    req.headers['X-Test-Title'] = currentTestTitle
    if (testRailId) {
      req.headers['X-Test-Rail-Id'] = testRailId
    }
    if (Cypress.env('runId')) {
      req.headers['X-Run-Id'] = Cypress.env('runId')
    }
    if (Cypress.env('runNumber')) {
      req.headers['X-Run-Number'] = Cypress.env('runNumber')
    }
    if (Cypress.env('runAttempt')) {
      req.headers['X-Run-Attempt'] = Cypress.env('runAttempt')
    }
    if (Cypress.env('jobName')) {
      req.headers['X-Job-Name'] = Cypress.env('jobName')
    }

    if (testTags && testTags.length) {
      req.headers['X-Test-Tags'] = testTags.join(',')
    }
  })
})

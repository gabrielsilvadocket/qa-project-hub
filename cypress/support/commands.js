const getEnv = () => Cypress.env('environment') || 'homologation'

Cypress.Commands.add('loginPageSuccess', () => {
  cy.fixture(`${getEnv()}/login`).then((data) => {
    cy.get('input[id="email"]').type(data.loginPageSuccess.email)
    cy.get('input[id="password"]').type(data.loginPageSuccess.password)
    cy.get('button[type="submit"]').click()
    
    cy.url().should('not.include', '/login')
  })
})

Cypress.Commands.add('loginPageInvalid', () => {
  cy.fixture(`${getEnv()}/login`).then((data) => {
    cy.get('input[id="email"]').type(data.loginPageInvalid.email)
    cy.get('input[id="password"]').type(data.loginPageInvalid.password)
    cy.get('button[type="submit"]').click()

    cy.contains('E-mail ou senha incorretos').should('be.visible')
  })
})
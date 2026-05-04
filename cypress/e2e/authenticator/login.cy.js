describe('Login Test', () => {
  beforeEach(() => {
    cy.visit("/") 
  })

  it('Must login successfully', () => {
    cy.loginPageSuccess()
  })

  it('Should display an error message with invalid data', () => {
    cy.loginPageInvalid()
  })
})
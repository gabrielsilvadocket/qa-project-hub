describe('Analysis Operation Test', () => {

  beforeEach(() => {
    cy.visit('/')
    cy.loginPageSuccess()
  })

  it('CT-03 | Must create an analysis operation successfully', () => {
    cy.createAnalysisOperation()
  })

})
describe('Issuance Operation Test', () => {

  beforeEach(() => {
    cy.visit('/')
    cy.loginPageSuccess()
  })

  it('CT-04 | Must create an issuance operation with birth, marriage and death certificates', () => {
    cy.createIssuanceOperation()
  })

})
describe('Login Test', () => {
  beforeEach(() => {
    cy.visit("/") 
    //teste
  })

  it('Must login successfully', () => {
    cy.loginPageSuccess()
  })

  it('Should display an error message with invalid data', () => {
    cy.loginPageInvalid()
  })


   //MAPEAMENTO DE TESTE
    
    // CT - 01 
      // acessar com login e clicar no submit - [x]
      // em seguida, clicar em clientes
      // clicar na barra de pesquisa
      // depois, inserir nome como DOCKET
      // clicar na primeira opcao
      // esperar pagina carregar
      // clicar em mesa agro
      // clicar em digite cpf titular
      // enviar cpf titular valido - exemplos em arquivo env

})
const getEnv = () => Cypress.env('environment') || 'homologation'

Cypress.Commands.add('loginPageSuccess', () => {
  cy.fixture(`${getEnv()}/login`).then((data) => {
    cy.get('input[id="email"]').type(data.loginPageSuccess.email)
    cy.get('input[id="password"]').type(data.loginPageSuccess.password)
    cy.get('button[type="submit"]').click()
    
    cy.wait(1000)
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

Cypress.Commands.add('createAnalysisOperation', () => {
  cy.fixture(`${Cypress.env('environment') || 'homologation'}/analysis`).then((data) => {

    // 1. Clicar em Nova Operação
    cy.get('[data-test-id="new-operation-button"]').click()

    // 2. Selecionar tipo 'Nova operação de análise'
    cy.get('[data-test-id="operation-type-analysis-option"]').click()

    // 3. Preencher nome da operação
    cy.get('[data-test-id="analysis-operation-name-input"]').type(data.operationName)

    // 4. Selecionar Grupo
    cy.get('[data-test-id="analysis-group-select"]').select(data.group)

    // 5. Selecionar Custo
    cy.get('[data-test-id="analysis-cost-select"]').select(data.cost)

    // 6. Selecionar Operação
    cy.get('[data-test-id="analysis-operation-select"]').select(data.operation)

    // 7. Upload de arquivo
    cy.get('[data-test-id="analysis-file-upload-input"]').selectFile('cypress/fixtures/files/contrato-social.pdf', { force: true })

    // 8. Selecionar Template
    cy.get('[data-test-id="analysis-template-select"]').select(data.template)

    // 9. Submeter
    cy.get('[data-test-id="analysis-start-submit-button"]').click()

    // 10. Validar número do documento
    cy.get('[data-test-id="operation-document-number"]')
      .should('be.visible')
  })
})

Cypress.Commands.add('createIssuanceOperation', () => {
  cy.fixture(`${Cypress.env('environment') || 'homologation'}/issuance`).then((data) => {

    // ─── Iniciar operação ───────────────────────────────────────────
    cy.get('[data-testid="new-operation-button"]').click()
    cy.get('[data-testid="operation-type-issuance-option"]').click()

    // ─── Step 1 — Dados da operação ────────────────────────────────
    cy.get('[data-testid="issuance-operation-name-input"]').type(data.operationName)
    cy.get('[data-testid="issuance-operation-type-select"]').select(data.operationType)
    cy.get('[data-testid="issuance-group-select"]').select(data.group)
    cy.get('[data-testid="issuance-cost-center-select"]').select(data.costCenter)
    cy.get('[data-testid="issuance-step1-next-button"]').click()

    // ─── Step 2 — Dados do titular ─────────────────────────────────
    cy.get('[data-testid="holder-cpf-input"]').type(data.holder.cpf)
    cy.get('[data-testid="holder-name-input"]').type(data.holder.name)
    cy.get('[data-testid="holder-state-select"]').select(data.holder.state)
    cy.get('[data-testid="holder-city-select"]').select(data.holder.city)
    cy.get('[data-testid="holder-add-button"]').click()
    cy.get('[data-testid="issuance-step2-next-button"]').click()

    // ─── Step 3 — Seleção de documentos ───────────────────────────
    const searchAndSelect = (docName, checkboxId) => {
      cy.get('[data-testid="document-search-input"]').type(docName)
      cy.get(`#${checkboxId}`).check()
      cy.get('[data-testid="document-search-clear-button"]').click()
    }

    searchAndSelect(
      data.documents.birthCertificate.name,
      data.documents.birthCertificate.checkboxId
    )
    searchAndSelect(
      data.documents.marriageCertificate.name,
      data.documents.marriageCertificate.checkboxId
    )
    searchAndSelect(
      data.documents.deathCertificate.name,
      data.documents.deathCertificate.checkboxId
    )

    cy.get('[data-testid="issuance-step3-next-button"]').click()

    // ─── Step 4 — Campos dinâmicos ─────────────────────────────────
    cy.get('[data-testid="document-dynamic-text-input"]').each(($el, index) => {
      const textValues = [
        data.dynamicFields.nationality,
        data.dynamicFields.motherName,
        data.dynamicFields.spouseName
      ]
      if (textValues[index]) cy.wrap($el).type(textValues[index])
    })

    cy.get('[data-testid="document-dynamic-number-input"]').each(($el, index) => {
      const numberValues = [
        data.dynamicFields.rg,
        data.dynamicFields.registrationNumber
      ]
      if (numberValues[index]) cy.wrap($el).type(numberValues[index])
    })

    cy.get('[data-testid="document-dynamic-date-input"]').each(($el, index) => {
      const dateValues = [
        data.dynamicFields.birthDate,
        data.dynamicFields.deathDate
      ]
      if (dateValues[index]) cy.wrap($el).type(dateValues[index])
    })

    cy.get('[data-testid="document-dynamic-file-upload"]')
      .selectFile('cypress/fixtures/files/sample-dummy.pdf', { force: true })

    cy.get('[data-testid="document-dynamic-select"]').each(($el) => {
      cy.wrap($el).select(data.dynamicFields.notary)
    })

    cy.get('[data-testid="issuance-step4-next-button"]').click()

    // ─── Step 5 — Validação do resumo ──────────────────────────────
    cy.get('[data-testid="summary-operation-name"]')
      .should('contain', data.expectedSummary.operationName)
    cy.get('[data-testid="summary-operation-type"]')
      .should('contain', data.expectedSummary.operationType)
    cy.get('[data-testid="summary-group"]')
      .should('contain', data.expectedSummary.group)
    cy.get('[data-testid="summary-cost-center"]')
      .should('contain', data.expectedSummary.costCenter)

    cy.get('[data-testid="issuance-finish-submit-button"]').click()

    // ─── Modal de sucesso ──────────────────────────────────────────
    cy.get('[data-testid="success-go-to-operation-button"]').click()

    // ─── Detalhamento do pedido ────────────────────────────────────
    cy.get('[data-testid="operation-holder-name"]')
      .should('be.visible')
      .and('contain', data.expectedDetails.holderName)
    cy.get('[data-testid="operation-holder-cpf"]')
      .should('be.visible')
      .and('contain', data.expectedDetails.holderCpf)
  })
})
const { defineConfig } = require('cypress')

const ENVIRONMENTS = {
  homologation: {
    baseUrl: 'https://int-app.dev.docket.com.br/'
  },
  production: {
    baseUrl: 'https://app.docket.com.br/'
  }
}

module.exports = defineConfig({
  viewportWidth: 1536,
  viewportHeight: 960,

  reporter: 'mochawesome',
  reporterOptions: {
    reportDir: 'cypress/reports/mocha',
    quite: true,
    overwrite: false,
    html: false,
    json: true
  },

  e2e: {
    setupNodeEvents(on, config) {
      const environment = config.env.environment || 'homologation'
      const selectedEnv = ENVIRONMENTS[environment]
      config.baseUrl = selectedEnv.baseUrl
      config.env.environment = environment

      return config
    },
    experimentalRunAllSpecs: true
  }
})
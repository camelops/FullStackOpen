describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.visit('http://localhost:3000')
  })

  it('login form is shown', function() {
    cy.contains('username')
    cy.contains('password')
  })

  it('Login form can be opened', function() {
    cy.contains('login').click()
    cy.get('#username').type('test')
    cy.get('#password').type('test123')
    cy.get('#login-button').click()

    cy.contains('Test User is logged in')

  })
})
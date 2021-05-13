describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.request('POST', 'http://localhost:3003/api/users', {
      username: 'mluukkai', password: 'salainen'
    }).then(response => {
      localStorage.setItem('loggedNoteappUser', JSON.stringify(response.body))
      cy.visit('http://localhost:3000')
    })
  })

  it('login form is shown', function() {
    cy.contains('username')
    cy.contains('password')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.contains('login').click()
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()
      cy.contains('mluukkai has successfully logged in')
    })

    it('fails with wrong credentials', function() {
      cy.contains('login').click()
      cy.get('#username').type('test')
      cy.get('#password').type('test123')
      cy.get('#login-button').click()
      cy.contains('Wrong credentials entered')
    })

    describe('When logged in', function() {
      beforeEach(function() {
        cy.login({ username: 'mluukkai', password: 'salainen' })

      })
      it('A blog can be created', function() {
        cy.contains('create blog').click()
        cy.get('#title').type('Big Bad E2E Blog')
        cy.get('#author').type('Big Author')
        cy.get('#url').type('www.cypress.com')
        cy.get('#submitBlog').click()
        cy.contains('Big Author')
      })
    })
  })
})
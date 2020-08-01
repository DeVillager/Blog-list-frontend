describe('Blog app', function () {

  beforeEach(function () {
    // cy.visit('http://localhost:3000')
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'hellocypress',
      username: 'cypress',
      password: 'cypress2'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('login')
  })

  describe('Login', function () {

    it('succeeds with correct credentials', function () {
      cy.get('#username').type('cypress')
      cy.get('#password').type('cypress2')
      cy.contains('login').click()
      cy.contains('hellocypress logged-in')
    })

    it('fails with wrong credentials', function () {
      cy.get('#username').type('cypress')
      cy.get('#password').type('wrong')
      cy.contains('login').click()
      cy.get('.error')
          .should('contain', 'Wrong username or password')
          .and('have.css', 'color', 'rgb(255, 0, 0)')
      cy.get('html').should('not.contain', 'cypress logged in')
    })
  })

  describe.only('When logged in', function () {
    
    beforeEach(function () {
      // cy.loginMocked();

      // log in user here
      cy.get('#username').type('cypress')
      cy.get('#password').type('cypress2')
      cy.contains('login').click()
      cy.contains('hellocypress logged-in')
      // cy.contains('Blog added')
      cy.login({username: 'cypress', password: 'cypress2'})
    })

    it('A blog can be created', function () {
      // ...
      cy.createBlog({title: 'newTitle', author: 'newAuthor', url: 'newUrl'})
      // cy.get('#bloglist').contains('newTitle newAuthor')
      cy.contains('newTitle newAuthor')
      // cy.contains('newTitle newAuthor').parent()
          // .should('contain', 'Blogs')
      // cy.get('#title').type('new title')
      // cy.get('#author').type('new author')
      // cy.get('#url').type('new url')
      // cy.get('#create').click()
      // cy.contains('Blog added')
    })

    it('User can like a blog', function () {
      // ...
      cy.createBlog({title: 'newTitle', author: 'newAuthor', url: 'newUrl'})
      cy.contains('view').click()
      cy.contains('like').click()
      cy.contains('likes 1')
    })

    it('User can remove a blog', function () {
      // ...
      cy.createBlog({title: 'newTitle', author: 'newAuthor', url: 'newUrl'})
      cy.contains('view').click()
      cy.get('html').should('contain', 'newTitle')
      cy.contains('remove').click()
      cy.get('html').should('not.contain', 'newTitle')
    })

    it('Blogs are ordered by likes', function () {
      // ...
      cy.createBlog({title: 'newTitle', author: 'newAuthor', url: 'newUrl'})
      cy.createBlog({title: 'newTitle2', author: 'newAuthor2', url: 'newUrl2'})
      cy.createBlog({title: 'newTitle3', author: 'newAuthor3', url: 'newUrl3'})
      cy.contains('view').click()
      cy.contains('like').click().click()
      //TODO loppuun
      cy.get('html').should('contain', 'newTitle')
      cy.contains('remove').click()
      cy.get('html').should('not.contain', 'newTitle')
    })
  })

})

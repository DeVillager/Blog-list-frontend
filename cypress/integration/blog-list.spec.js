describe('Blog app', function () {

  beforeEach(function () {
    // reset database
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    // create two users
    const user = {
      name: 'hellocypress',
      username: 'cypress',
      password: 'cypress2'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)

    const user2 = {
      name: 'other',
      username: 'other',
      password: 'other2'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user2)
    
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

  describe('When logged in', function () {

    beforeEach(function () {
      // log in user here
      cy.get('#username').type('cypress')
      cy.get('#password').type('cypress2')
      cy.contains('login').click()
      cy.contains('hellocypress logged-in')
      cy.login({username: 'cypress', password: 'cypress2'})
    })

    it('A blog can be created', function () {
      cy.createBlog({title: 'newTitle', author: 'newAuthor', url: 'newUrl'})
      cy.contains('newTitle newAuthor')
    })

    it('User can like a blog', function () {
      cy.createBlog({title: 'newTitle', author: 'newAuthor', url: 'newUrl'})
      cy.contains('view').click()
      cy.contains('like').click()
      cy.contains('likes 1')
    })

    it('User can remove a blog', function () {
      cy.createBlog({title: 'newTitle', author: 'newAuthor', url: 'newUrl'})
      cy.contains('view').click()
      cy.contains('newTitle')
      cy.contains('remove').click()
      cy.get('html').should('not.contain', 'newTitle')
    })

    it('Other users can not remove a blog', function () {
      // hellocypress makes new blog and logs out
      cy.createBlog({title: 'newTitle', author: 'newAuthor', url: 'newUrl'})
      cy.contains('logout').click()

      // other user logs in
      cy.get('#username').type('other')
      cy.get('#password').type('other2')
      cy.contains('login').click()
      cy.login({username: 'other', password: 'other2'})
      cy.contains('other logged-in')

      // Blog is visible but delete button not
      cy.contains('view').click()
      cy.get('html').should('contain', 'newTitle')
      cy.get('#deleteButton').should('not.be.visible')
    })

    it('Blogs are ordered by likes', function () {
      // Create three blogs and open them with view button
      cy.createBlog({title: 'newTitle', author: 'newAuthor', url: 'newUrl'})
      cy.createBlog({title: 'newTitle2', author: 'newAuthor2', url: 'newUrl2'})
      cy.createBlog({title: 'newTitle3', author: 'newAuthor3', url: 'newUrl3'})
      cy.get('[id="showButton"]')
          .each(($button, index, $list) => {
            cy.wrap($button).click()
          })
      // Give first blog no likes, second blog one like and last blog 2 likes
      cy.get('[id="likeButton"]')
          .then(buttons => {
            cy.wrap(buttons[2]).click().click()
            cy.wrap(buttons[1]).click()
          })
      cy.visit('http://localhost:3000')
      // Blogs should be ordered by likes and have likes amount 2, 1, 0
      cy.get('[id="likes"]')
          .then(likes => {
            cy.wrap(likes[0]).should('contain', 'likes 2')
            cy.wrap(likes[1]).should('contain', 'likes 1')
            cy.wrap(likes[2]).should('contain', 'likes 0')
          })
    })
  })
})


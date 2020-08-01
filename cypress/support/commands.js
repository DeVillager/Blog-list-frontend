Cypress.Commands.add("login", ({username, password}) => {
  cy.request('POST', 'http://localhost:3001/api/login', {
    username, password
  }).then(({body}) => {
    window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(body))
    // Cypress.Cookies.preserveOnce('loggedBlogAppUser', JSON.stringify(body))
    // cy.request('GET', 'http://localhost:3000')
    // console.log("moikku")
    cy.visit('http://localhost:3000')
  })
})

Cypress.Commands.add('createBlog', ({title, author, url}) => {
  // Cypress.Cookies.preserveOnce('loggedBlogAppUser', JSON.stringify(body))
  console.log(window.localStorage.getItem('loggedBlogAppUser'))
  cy.request({
    url: 'http://localhost:3001/api/blogs',
    method: 'POST',
    body: {title, author, url},
    headers: {
      'Authorization': `bearer ${JSON.parse(localStorage.getItem('loggedBlogAppUser')).token}`
    }
  })
  cy.visit('http://localhost:3000')
})

// Cypress.Commands.add('loginMocked', (type = 'admin') => {
//   window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(auths[type])); // this works each time
//   cy.visit('/');
// });

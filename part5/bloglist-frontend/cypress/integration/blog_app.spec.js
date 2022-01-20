describe('Blog app', function () {
    beforeEach(function () {
        cy.request('POST', 'http://localhost:3003/api/testing/reset')
        const user = {name: 'Matti Luukkainen', username: 'mluukkai', password: 'salainen'}
        cy.request('POST', 'http://localhost:3003/api/users/', user)
        cy.visit('http://localhost:3000')
    })

    it('front page can be opened and login button shown', function () {
        cy.contains('blogs')
        cy.contains('Login')
    })

    it('user can log in', function () {
        cy.contains('Login').click()
        cy.get('#username').type('mluukkai')
        cy.get('#password').type('salainen')
        cy.get('#login-button').click()

        cy.contains('Matti Luukkainen logged-in')
        cy.contains('Log out')
    })


    it('login fails with wrong password', function () {
        cy.contains('Login').click()
        cy.get('#username').type('mluukkai')
        cy.get('#password').type('wrong')
        cy.get('#login-button').click()

        cy.get('.success')
            .should('contain', 'Wrong credentials')
            .and('have.css', 'color', 'rgb(255, 0, 0)')
        cy.get('html').should('not.contain', 'Matti Luukkainen logged-in')
        cy.get('html').should('not.contain', 'Create new blog')
    })

    describe('when logged in', function () {
        beforeEach(function () {
            cy.login({
                username: 'mluukkai',
                password: 'salainen'
            })
        })
        const blog = {
            title: 'a blog created by cypress',
            author: 'Some Random Dude',
            url: 'http://localhost:3000'
        }
        it('a new blog can be created', function () {
            cy.contains('Create new blog').click()
            cy.get('#title').type(blog.title)
            cy.get('#author').type(blog.author)
            cy.get('#url').type(blog.url)
            cy.contains('add').click()
            cy.contains('a blog created by cypress')
            cy.contains('Some Random Dude')
            cy.get('.short-blog').should('not.contain', 'http://localhost:3000')
        })

        describe('and a blog exists', function () {
            beforeEach(function () {
                cy.createBlog(blog)
            })

            it('a blog can be liked', function () {
                cy.contains(blog.title)
                  .contains('Show more')
                    .click()
                cy.get('.long-blog')
                    .should('contain', 'Likes: 0')
                    .contains('Like')
                    .click()
                cy.get('.long-blog')
                    .contains('Likes: 1')
            })

            it('a blog can be deleted', function () {
                cy.contains(blog.title)
                    .contains('Show more')
                    .click()
                cy.get('.long-blog')
                    .contains('Remove')
                    .click()
                cy.get('html')
                    .should('not.contain', blog.title)
                cy.get('.success')
                    .should('contain', 'Blog deleted')
                    .and('have.css', 'color', 'rgb(0, 128, 0)')            })
        })
    })
})
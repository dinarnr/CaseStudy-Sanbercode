class loginPage {
    visitPage() {
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    }

    inputUsername(username) {
        cy.get('input[name="username"]').type(username);
    }

    inputPassword(password) {
        cy.get('input[type="password"]').type(password);
    }

    clickButton() {
        cy.get('.orangehrm-login-button').click();
    }

    validasiURL() {
        cy.url().should('include', '/dashboard');
    }

    validasiInvalidCredentials() {
        cy.get('.oxd-text.oxd-text--p.oxd-alert-content-text')
            .should('exist')
            .should('be.visible')
            .should('have.text', 'Invalid credentials');
    }

    validasiRequired(eq) {
        cy.get('.oxd-text.oxd-text--span.oxd-input-field-error-message.oxd-input-group__message')
            .eq(eq)
            .should('exist')
            .should('be.visible')
            .should('have.text', 'Required');
    }

    validasiPassHidden(eq) {
        cy.get('input[name="password"]').should('have.attr', 'type', 'password');
    }

    interceptValidate() {
        cy.intercept('POST', 'web/index.php/auth/validate').as('Validate')
    }

    interceptLogin() {
        cy.intercept('GET', 'web/index.php/auth/login').as('Login')
    }

    waitInterceptValidate() {
        cy.wait('@Validate');
    }

    waitInterceptLogin() {
        cy.wait('@Login');
    }
}

// biar bisa dibaca oleh file lain
export default new loginPage()
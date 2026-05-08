class resetPassword {
    visitLoginPage() {
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    }

    visitRP() {
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/requestPasswordResetCode');
    }

    clickForgotYourPassword() {
        cy.get('.orangehrm-login-forgot-header').click();
    }

    inputUsername(username) {
        cy.get('.oxd-input.oxd-input--active').type(username);
    }

    clickButtonRP() {
        cy.get('.orangehrm-forgot-password-button--reset').click();
    }

    clickButtonCancel() {
        cy.get('.orangehrm-forgot-password-button--cancel').click();
    }

    validasiURLRP() {
        cy.url().should('include', '/requestPasswordResetCode');
    }

    validasiRPSuccess() {
        cy.url().should('include', '/sendPasswordReset');
        cy.get('.orangehrm-forgot-password-title').should('contain', 'successfully');
    }

    validasiRPFailure() {
        cy.url().should('include', '/sendPasswordResetFailure');
        cy.get('.orangehrm-forgot-password-title').should('contain', 'was not sent');
    }

    validasiRequired() {
        cy.get('.oxd-text.oxd-text--span.oxd-input-field-error-message.oxd-input-group__message')
            .should('exist')
            .should('be.visible')
            .should('have.text', 'Required');
    }

    validasiURLLogin() {
        cy.url().should('include', '/login');
    }

    interceptRP() {
        cy.intercept('GET', 'web/index.php/auth/requestResetPassword').as('ResetPassword')
    }

    waitInterceptRP() {
        cy.wait('@ResetPassword');
    }
}

// biar bisa dibaca oleh file lain
export default new resetPassword()
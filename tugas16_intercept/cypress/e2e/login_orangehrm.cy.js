describe('User bisa melakukan proses login', () => {
  it('Login dengan username & password valid', () => {

    cy.intercept('POST', 'web/index.php/auth/validate').as('LoginValid')

    // Visit halaman login
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    // Input username
    cy.get('input[name="username"]').type('Admin');
    // Input password
    cy.get('input[type="password"]').type('admin123');
    // Click button login
    cy.get('.orangehrm-login-button').click();

    cy.wait('@LoginValid').its('response.statusCode').should('eq', 302);

    // Memastikan ketika berhasil login URL ada '/dashboard' 
    cy.url().should('include', '/dashboard')

  });

  it('Login dengan username dan password invalid', () => {

    cy.intercept('POST', 'web/index.php/auth/validate', (req) => {
      expect(req.body).to.include('Atmin');
    }).as('LoginInvalid')

    // Visit halaman login
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    // Input username invalid
    cy.get('input[name="username"]').type('Atmin');
    // Input password invalid
    cy.get('input[type="password"]').type('salah123');
    // Click button login
    cy.get('.orangehrm-login-button').click();

    cy.wait('@LoginInvalid').its('response.statusCode').should('eq', 302);

    // Menunggu proses login
    cy.wait(2000);

    // Memastikan error message
    cy.get('.oxd-text.oxd-text--p.oxd-alert-content-text')
      .should('exist')
      .should('be.visible')
      .should('have.text', 'Invalid credentials');
  });

  it('Login dengan password invalid', () => {

    cy.intercept('POST', 'web/index.php/auth/validate', (req) => {
      expect(req.body).to.include('salah123');
    }).as('LoginWrongPass')

    // Visit halaman login
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    // Input username valid
    cy.get('input[name="username"]').type('Admin');
    // Input password invalid
    cy.get('input[type="password"]').type('salah123');
    // Click button login
    cy.get('.orangehrm-login-button').click();

    cy.wait('@LoginWrongPass').its('response.statusCode').should('eq', 302);

    cy.wait(2000);

    cy.get('.oxd-text.oxd-text--p.oxd-alert-content-text')
      .should('exist')
      .should('be.visible')
      .should('have.text', 'Invalid credentials');
  });

  it('Login dengan username invalid', () => {

    cy.intercept('POST', 'web/index.php/auth/validate', (req) => {
      expect(req.body).to.include('Atmin');
      expect(req.body).to.include('admin123');
    }).as('LoginWrongUser')

    // Visit halaman login
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    // Input username invalid
    cy.get('input[name="username"]').type('Atmin');
    // Input password valid
    cy.get('input[type="password"]').type('admin123');
    // Click button login
    cy.get('.orangehrm-login-button').click();

    cy.wait('@LoginWrongUser').its('response.statusCode').should('eq', 302);

    cy.wait(2000);

    cy.get('.oxd-text.oxd-text--p.oxd-alert-content-text')
      .should('exist')
      .should('be.visible')
      .should('have.text', 'Invalid credentials');
  });

  it('Login tanpa input username & password', () => {

    cy.intercept('GET', 'web/index.php/auth/login').as('LoginNoCredentials')

    // Visit halaman login
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    // Click button login
    cy.get('.orangehrm-login-button').click();

    cy.wait('@LoginNoCredentials').its('response.statusCode').should('eq', 200);

    cy.get('.oxd-text.oxd-text--span.oxd-input-field-error-message.oxd-input-group__message')
      .eq(0)
      .should('exist')
      .should('be.visible')
      .should('have.text', 'Required');

    cy.get('.oxd-text.oxd-text--span.oxd-input-field-error-message.oxd-input-group__message')
      .eq(1)
      .should('exist')
      .should('be.visible')
      .should('have.text', 'Required');
  });

  it('Login tanpa input username', () => {

    cy.intercept('GET', 'web/index.php/auth/login', (req) => {
      expect(req.body).to.be.empty
    }).as('LoginNoUser')

    // Visit halaman login
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    // Field password terisi - valid
    cy.get('input[type="password"]').type('admin123');
    // Click button login
    cy.get('.orangehrm-login-button').click();

    cy.wait('@LoginNoUser').its('response.statusCode').should('eq', 200);

    cy.get('.oxd-text.oxd-text--span.oxd-input-field-error-message.oxd-input-group__message')
      .should('exist')
      .should('be.visible')
      .should('have.text', 'Required');
  });

  it('Login tanpa input password', () => {

    cy.intercept('GET', '**/login').as('LoginNoPass')

    // Visit halaman login
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    // Field username terisi - valid
    cy.get('input[name="username"]').type('Admin');
    // Click button login
    cy.get('.orangehrm-login-button').click();

    cy.wait('@LoginNoPass').its('response.statusCode').should('eq', 200);

    cy.get('.oxd-text.oxd-text--span.oxd-input-field-error-message.oxd-input-group__message')
      .should('exist')
      .should('be.visible')
      .should('have.text', 'Required');
  });

  // CASE SENSITIVE USERNAME
  it('Validasi case sensitive pada username', () => {

    cy.intercept('POST', '**/validate', (req) => {
      expect(req.body).to.include('admin');
      expect(req.body).to.include('admin123');
    }).as('LoginUsernameCS')

    // Visit halaman login
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    // Input username - lower case
    cy.get('input[name="username"]').type('admin');
    // Input password valid 
    cy.get('input[type="password"]').type('admin123');
    // Click button login
    cy.get('.orangehrm-login-button').click();

    cy.wait('@LoginUsernameCS').its('response.statusCode').should('eq', 302);

    cy.url().should('include', '/dashboard')

  });

  // CASE SENSITIVE PASSWORD
  it('Validasi case sensitive pada password', () => {

    cy.intercept('POST', '**/validate', (req) => {
      expect(req.body).to.include('ADMIN123');
    }).as('LoginPassCS')

    // Visit halaman login
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    // Input username valid
    cy.get('input[name="username"]').type('Admin');
    // Input password valid - UPPER CASE
    cy.get('input[type="password"]').type('ADMIN123');
    // Click button login
    cy.get('.orangehrm-login-button').click();

    cy.wait('@LoginPassCS').its('response.statusCode').should('eq', 302);


    cy.wait(2000);

    cy.get('.oxd-text.oxd-text--p.oxd-alert-content-text')
      .should('exist')
      .should('be.visible')
      .should('have.text', 'Invalid credentials');
  });

  it('Validasi password hidden', () => {

    cy.intercept('GET', '**/login', (req) => {
      expect(req.body).to.be.empty
    }).as('PassHidden')

    // Visit halaman login
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    // Password harus hidden 
    cy.get('input[name="password"]').should('have.attr', 'type', 'password');

    cy.wait('@PassHidden').its('response.statusCode').should('eq', 200);

  });
})
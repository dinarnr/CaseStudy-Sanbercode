describe('User bisa melakukan proses login', () => {
  it('Login dengan username & password valid', () => {
    // Visit halaman login
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    // Input username
    cy.get('input[name="username"]').type('Admin');
    // Input password
    cy.get('input[type="password"]').type('admin123');
    // Click button login
    cy.get('.orangehrm-login-button').click();
    // Memastikan ketika berhasil login URL ada '/dashboard' 
    cy.url().should('include', '/dashboard')

  });

  it('Login dengan username dan password invalid', () => {
    // Visit halaman login
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    // Input username invalid
    cy.get('input[name="username"]').type('Atmin');
    // Input password invalid
    cy.get('input[type="password"').type('salah123');
    // Click button login
    cy.get('.orangehrm-login-button').click();
    // Menunggu proses login
    cy.wait(2000);
    // Memastikan error message
    cy.get('.oxd-text.oxd-text--p.oxd-alert-content-text')
      .should('exist')
      .should('be.visible')
      .should('have.text', 'Invalid credentials');
  });

  it('Login dengan password invalid', () => {
    // Visit halaman login
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    // Input username valid
    cy.get('input[name="username"]').type('Admin');
    // Input password invalid
    cy.get('input[type="password"').type('salah123');
    // Click button login
    cy.get('.orangehrm-login-button').click();

    cy.wait(2000);

    cy.get('.oxd-text.oxd-text--p.oxd-alert-content-text')
      .should('exist')
      .should('be.visible')
      .should('have.text', 'Invalid credentials');
  });

  it('Login dengan username invalid', () => {
    // Visit halaman login
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    // Input username invalid
    cy.get('input[name="username"]').type('Atmin');
    // Input password valid
    cy.get('input[type="password"').type('admin123');
    // Click button login
    cy.get('.orangehrm-login-button').click();

    cy.wait(2000);

    cy.get('.oxd-text.oxd-text--p.oxd-alert-content-text')
      .should('exist')
      .should('be.visible')
      .should('have.text', 'Invalid credentials');
  });

  it('Login tanpa input username & password', () => {
    // Visit halaman login
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    // Click button login
    cy.get('.orangehrm-login-button').click();

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
    // Visit halaman login
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    // Field password terisi - valid
    cy.get('input[type="password"').type('admin123');
    // Click button login
    cy.get('.orangehrm-login-button').click();

    cy.get('.oxd-text.oxd-text--span.oxd-input-field-error-message.oxd-input-group__message')
      .should('exist')
      .should('be.visible')
      .should('have.text', 'Required');
  });

  it('Login tanpa input password', () => {
    // Visit halaman login
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    // Field username terisi - valid
    cy.get('input[name="username"]').type('Admin');
    // Click button login
    cy.get('.orangehrm-login-button').click();

    cy.get('.oxd-text.oxd-text--span.oxd-input-field-error-message.oxd-input-group__message')
      .should('exist')
      .should('be.visible')
      .should('have.text', 'Required');
  });

  // CASE SENSITIVE USERNAME
  it('Validasi case sensitive pada username', () => {
    // Visit halaman login
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    // Input username - lower case
    cy.get('input[name="username"]').type('admin');
    // Input password valid 
    cy.get('input[type="password"').type('admin123');
    // Click button login
    cy.get('.orangehrm-login-button').click();
    cy.url().should('include', '/dashboard')

  });

  // CASE SENSITIVE PASSWORD
  it('Validasi case sensitive pada password', () => {
    // Visit halaman login
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    // Input username valid
    cy.get('input[name="username"]').type('Admin');
    // Input password valid - UPPER CASE
    cy.get('input[type="password"').type('ADMIN123');
    // Click button login
    cy.get('.orangehrm-login-button').click();

    cy.wait(2000);

    cy.get('.oxd-text.oxd-text--p.oxd-alert-content-text')
      .should('exist')
      .should('be.visible')
      .should('have.text', 'Invalid credentials');
  });

  it('Validasi password hidden', () => {
    // Visit halaman login
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    // Password harus hidden 
    cy.get('input[name="password"').should('have.attr', 'type', 'password');
  });
})
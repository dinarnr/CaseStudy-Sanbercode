import loginPage from "../support/pageObject/loginPage"
import loginData from "../fixtures/loginData.json"

describe('User bisa melakukan proses login', () => {
  it('Login dengan username & password valid', () => {

    cy.intercept('POST', 'web/index.php/auth/validate').as('LoginValid')

    // Visit halaman login

    loginPage.visitPage();
    loginPage.inputUsername(loginData.validUsername);
    loginPage.inputPassword(loginData.validPassword);
    loginPage.clickButton();

    cy.wait('@LoginValid').its('response.statusCode').should('eq', 302);

    // Memastikan ketika berhasil login URL ada '/dashboard' 
    loginPage.validasiURL();


  });

  it('Login dengan username dan password invalid', () => {

    cy.intercept('POST', 'web/index.php/auth/validate', (req) => {
      expect(req.body).to.include('Atmin');
    }).as('LoginInvalid')


    loginPage.visitPage();
    loginPage.inputUsername(loginData.invalidUsername);
    loginPage.inputPassword(loginData.invalidPassword);
    loginPage.clickButton();


    cy.wait('@LoginInvalid').its('response.statusCode').should('eq', 302);

    // Menunggu proses login
    cy.wait(2000);

    // Memastikan error message
    loginPage.validasiInvalidCredentials();
  });

  it('Login dengan password invalid', () => {

    cy.intercept('POST', 'web/index.php/auth/validate', (req) => {
      expect(req.body).to.include('salah123');
    }).as('LoginWrongPass')

    // Visit halaman login
    loginPage.visitPage();
    loginPage.inputUsername(loginData.validUsername);
    loginPage.inputPassword(loginData.invalidPassword);
    loginPage.clickButton();

    cy.wait('@LoginWrongPass').its('response.statusCode').should('eq', 302);

    cy.wait(2000);

    // Memastikan error message
    loginPage.validasiInvalidCredentials();
  });

  it('Login dengan username invalid', () => {

    cy.intercept('POST', 'web/index.php/auth/validate', (req) => {
      expect(req.body).to.include('Atmin');
      expect(req.body).to.include('admin123');
    }).as('LoginWrongUser')

    // Visit halaman login
    loginPage.visitPage();
    loginPage.inputUsername(loginData.invalidUsername);
    loginPage.inputPassword(loginData.validPassword);
    loginPage.clickButton();

    cy.wait('@LoginWrongUser').its('response.statusCode').should('eq', 302);

    cy.wait(2000);

    // Memastikan error message
    loginPage.validasiInvalidCredentials();
  });

  it('Login tanpa input username & password', () => {

    cy.intercept('GET', 'web/index.php/auth/login').as('LoginNoCredentials')

    // Visit halaman login
    loginPage.visitPage();
    loginPage.clickButton();

    cy.wait('@LoginNoCredentials').its('response.statusCode').should('eq', 200);

    // Memastikan error message
    loginPage.validasiRequired(0);
    loginPage.validasiRequired(1);
  });

  it('Login tanpa input username', () => {

    cy.intercept('GET', 'web/index.php/auth/login', (req) => {
      expect(req.body).to.be.empty
    }).as('LoginNoUser')

    // Visit halaman login
    loginPage.visitPage();
    loginPage.inputPassword(loginData.validPassword);
    loginPage.clickButton();

    cy.wait('@LoginNoUser').its('response.statusCode').should('eq', 200);

    loginPage.validasiRequired(0);
  });

  it('Login tanpa input password', () => {

    cy.intercept('GET', '**/login').as('LoginNoPass')

    // Visit halaman login
    loginPage.visitPage();
    loginPage.inputUsername(loginData.validUsername);
    loginPage.clickButton();

    cy.wait('@LoginNoPass').its('response.statusCode').should('eq', 200);

    loginPage.validasiRequired(0);
  });

  // CASE SENSITIVE USERNAME
  it('Validasi case sensitive pada username', () => {

    cy.intercept('POST', '**/validate', (req) => {
      expect(req.body).to.include('admin');
      expect(req.body).to.include('admin123');
    }).as('LoginUsernameCS')

    // Visit halaman login
    loginPage.visitPage();
    loginPage.inputUsername(loginData.CSUsername);
    loginPage.inputPassword(loginData.validPassword);
    loginPage.clickButton();

    cy.wait('@LoginUsernameCS').its('response.statusCode').should('eq', 302);

    loginPage.validasiURL();
  });

  // CASE SENSITIVE PASSWORD
  it('Validasi case sensitive pada password', () => {

    cy.intercept('POST', '**/validate', (req) => {
      expect(req.body).to.include('ADMIN123');
    }).as('LoginPassCS')

    // Visit halaman login
    loginPage.visitPage();
    loginPage.inputUsername(loginData.validUsername);
    loginPage.inputPassword(loginData.CSPassword);
    loginPage.clickButton();

    cy.wait('@LoginPassCS').its('response.statusCode').should('eq', 302);

    cy.wait(2000);

    loginPage.validasiInvalidCredentials();
  });

  it('Validasi password hidden', () => {

    cy.intercept('GET', '**/login', (req) => {
      expect(req.body).to.be.empty
    }).as('PassHidden')

    // Visit halaman login
    loginPage.visitPage();

    cy.wait('@PassHidden').its('response.statusCode').should('eq', 200);

    loginPage.validasiPassHidden();

  });
})
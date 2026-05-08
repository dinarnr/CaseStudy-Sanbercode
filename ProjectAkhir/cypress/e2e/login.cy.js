import loginPage from "../support/pageObject/loginPage"
import loginData from "../fixtures/loginData.json"

describe('User bisa melakukan proses login', () => {
  it('TC-LOG001 Login dengan username & password valid', () => {
    loginPage.interceptValidate();

    loginPage.visitPage();
    loginPage.inputUsername(loginData.validUsername);
    loginPage.inputPassword(loginData.validPassword);
    loginPage.clickButton();

    loginPage.validasiURL();
    loginPage.waitInterceptValidate();
  });

  it('TC-LOG002 Login dengan username dan password invalid', () => {
    loginPage.interceptValidate();

    loginPage.visitPage();
    loginPage.inputUsername(loginData.invalidUsername);
    loginPage.inputPassword(loginData.invalidPassword);
    loginPage.clickButton();

    cy.wait(2000);
    loginPage.validasiInvalidCredentials();
    loginPage.waitInterceptValidate();
  });

  it('TC-LOG003 Login dengan password invalid', () => {
    loginPage.interceptValidate();

    loginPage.visitPage();
    loginPage.inputUsername(loginData.validUsername);
    loginPage.inputPassword(loginData.invalidPassword);
    loginPage.clickButton();

    cy.wait(2000);
    loginPage.validasiInvalidCredentials();
    loginPage.waitInterceptValidate();
  });

  it('TC-LOG004 Login dengan username invalid', () => {
    loginPage.interceptValidate();

    loginPage.visitPage();
    loginPage.inputUsername(loginData.invalidUsername);
    loginPage.inputPassword(loginData.validPassword);
    loginPage.clickButton();

    cy.wait(2000);

    loginPage.validasiInvalidCredentials();
    loginPage.waitInterceptValidate();
  });

  it('TC-LOG005 Login tanpa input username & password', () => {
    loginPage.interceptLogin();

    loginPage.visitPage();
    loginPage.clickButton();

    loginPage.validasiRequired(0);
    loginPage.validasiRequired(1);
    loginPage.waitInterceptLogin();
  });

  it('TC-LOG006 Login tanpa input username', () => {
    loginPage.interceptLogin();

    loginPage.visitPage();
    loginPage.inputPassword(loginData.validPassword);
    loginPage.clickButton();

    loginPage.validasiRequired(0);
    loginPage.waitInterceptLogin();
  });

  it('TC-LOG007 Login tanpa input password', () => {
    loginPage.interceptLogin();

    loginPage.visitPage();
    loginPage.inputUsername(loginData.validUsername);
    loginPage.clickButton();

    loginPage.validasiRequired(0);
    loginPage.waitInterceptLogin();
  });

  // CASE SENSITIVE USERNAME
  it('TC-LOG008 Validasi case sensitive pada username', () => {
    loginPage.interceptValidate();

    loginPage.visitPage();
    loginPage.inputUsername(loginData.CSUsername);
    loginPage.inputPassword(loginData.validPassword);
    loginPage.clickButton();

    loginPage.validasiURL();
    loginPage.waitInterceptValidate();
  });

  // CASE SENSITIVE PASSWORD
  it('TC-LOG009 Validasi case sensitive pada password', () => {
    loginPage.interceptValidate();

    loginPage.visitPage();
    loginPage.inputUsername(loginData.validUsername);
    loginPage.inputPassword(loginData.CSPassword);
    loginPage.clickButton();

    cy.wait(2000);

    loginPage.validasiInvalidCredentials();
    loginPage.waitInterceptValidate();
  });

  it('TC-LOG010 Validasi password hidden', () => {
    loginPage.interceptLogin();

    loginPage.visitPage();

    loginPage.validasiPassHidden();
    loginPage.waitInterceptLogin();
  });
})
import resetPassword from "../support/pageObject/resetPassword"
import loginPage from "../support/pageObject/loginPage"
import resetPasswordData from "../fixtures/resetPasswordData.json"

describe('User bisa melakukan reset password', () => {
  it('TC-RP001 Verifikasi page reset password', () => {
    loginPage.interceptLogin();

    resetPassword.visitLoginPage();
    resetPassword.clickForgotYourPassword();

    resetPassword.validasiURLRP();

    loginPage.waitInterceptLogin();
  });

  it('TC-RP002 Reset password dengan username valid', () => {
    loginPage.interceptLogin();

    resetPassword.visitLoginPage();
    resetPassword.clickForgotYourPassword();
    resetPassword.validasiURLRP();

    resetPassword.inputUsername(resetPasswordData.validUsername);
    resetPassword.clickButtonRP();

    resetPassword.validasiRPSuccess();

    loginPage.waitInterceptLogin();
  });

  it('TC-RP003 Reset password dengan username invalid', () => {
    loginPage.interceptLogin();

    resetPassword.visitLoginPage();
    resetPassword.clickForgotYourPassword();
    resetPassword.validasiURLRP();
  
    resetPassword.inputUsername(resetPasswordData.invalidUsername);
    resetPassword.clickButtonRP();

    resetPassword.validasiRPFailure();

    loginPage.waitInterceptLogin();
  });

  it('TC-RP004 Reset password tanpa input username', () => {
    loginPage.interceptLogin();

    resetPassword.visitLoginPage();
    resetPassword.clickForgotYourPassword();
    resetPassword.validasiURLRP();
  
    resetPassword.clickButtonRP();

    resetPassword.validasiRequired();

    loginPage.waitInterceptLogin();
  });

  it('TC-RP005 Verifikasi button cancel pada page reset password', () => {
    loginPage.interceptLogin();

    resetPassword.visitLoginPage();
    resetPassword.clickForgotYourPassword();
    resetPassword.validasiURLRP();

    resetPassword.clickButtonCancel();

    resetPassword.validasiURLLogin();

    loginPage.waitInterceptLogin();
  });
})
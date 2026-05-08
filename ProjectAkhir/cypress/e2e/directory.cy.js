import directoryPage from "../support/pageObject/directoryPage"
import directoryData from "../fixtures/directoryData.json"
import loginPage from "../support/pageObject/loginPage"

describe('User bisa melakukan aktivitas di page Directory', () => {
  it('TC-DIR001 Verifikasi page directory', () => {
    loginPage.interceptLogin();

    directoryPage.processLogin();
    loginPage.waitInterceptLogin();
  });

  it('TC-DIR002 Search employee by valid name', () => {
    loginPage.interceptLogin();
    directoryPage.interceptUsername();

    directoryPage.processLogin();
    directoryPage.inputEmployee(directoryData.validEmployeeInput);
    directoryPage.selectValidEmployee();
    directoryPage.clickSearch();
    directoryPage.validResultEmployee();

    loginPage.waitInterceptLogin();
    directoryPage.waitInterceptUsername();
  });

  it('TC-DIR003 Search employee by invalid name', () => {
    loginPage.interceptLogin();
    directoryPage.interceptInvalidUsername();

    directoryPage.processLogin();
    directoryPage.inputEmployee(directoryData.invalidEmployeeName);
    directoryPage.confirmInvalidEmployee();
    directoryPage.clickSearch();
    directoryPage.invalidResultEmployee();

    loginPage.waitInterceptLogin();
    directoryPage.waitInterceptInvalidUsername();
  });

  it('TC-DIR004 Filter employee by job title', () => {
    loginPage.interceptLogin();
    directoryPage.interceptJobTitle();

    directoryPage.processLogin();
    directoryPage.selectJob();
    directoryPage.clickSearch();
    directoryPage.validResultJob();

    loginPage.waitInterceptLogin();
    directoryPage.waitInterceptJobTitle();
  });

  it('TC-DIR005 Filter employee by location', () => {
    loginPage.interceptLogin();
    directoryPage.interceptLocation();

    directoryPage.processLogin();
    directoryPage.selectLocation();
    directoryPage.clickSearch();
    directoryPage.validResultJob();

    loginPage.waitInterceptLogin();
    directoryPage.waitInterceptLocation();
  });

  it('TC-DIR006 Search tanpa input field employee name, select job title, & select location', () => {  
    loginPage.interceptLogin();

    directoryPage.processLogin();
    directoryPage.clickSearch();
    directoryPage.allRecordsFound();

    loginPage.waitInterceptLogin();
  });

  it('TC-DIR007 Search employee by valid name & his job title', () => {  
    loginPage.interceptLogin();
    directoryPage.interceptUserAndJobTitle();

    directoryPage.processLogin();
    directoryPage.inputEmployee(directoryData.validEmployeeInput);
    directoryPage.selectValidEmployee();
    directoryPage.selectJob();
    directoryPage.clickSearch();
    directoryPage.validEmployee_jobTitle();

    loginPage.waitInterceptLogin();
    directoryPage.waitInterceptUserAndJobTitle();
  });

  it('TC-DIR008 Search employee by valid name & not his job title', () => {  
    loginPage.interceptLogin();
    directoryPage.interceptUserAndNotJobTitle();

    directoryPage.processLogin();
    directoryPage.inputEmployee(directoryData.validEmployeeInput);
    directoryPage.selectValidEmployee();
    directoryPage.selectAnotherJob();
    directoryPage.clickSearch();
    directoryPage.noRecordsFound();

    loginPage.waitInterceptLogin();
    directoryPage.waitInterceptUserAndNotJobTitle();
  });

  it('TC-DIR009 Validasi button reset', () => {  
    loginPage.interceptLogin();

    directoryPage.processLogin();
    directoryPage.inputEmployee(directoryData.validEmployeeInput);
    directoryPage.selectValidEmployee();
    directoryPage.selectJob();
    directoryPage.selectLocation();
    directoryPage.clickReset();
    directoryPage.validasiReset();

    loginPage.waitInterceptLogin();
  });

})
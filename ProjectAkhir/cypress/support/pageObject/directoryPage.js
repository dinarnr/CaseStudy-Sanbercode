import loginPage from "./loginPage"
import loginData from "../../fixtures/loginData.json"
import directoryData from "../../fixtures/directoryData.json"

class directoryPage {
    visitLoginPage() {
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    }

    processLogin() {
        this.visitLoginPage();
        loginPage.inputUsername(loginData.validUsername);
        loginPage.inputPassword(loginData.validPassword);
        loginPage.clickButton();
        loginPage.validasiURL();
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/directory/viewDirectory');
    }

    inputEmployee(employee) {
        cy.get('.oxd-autocomplete-text-input.oxd-autocomplete-text-input--active input').type(employee);
    }

    clickSearch() {
        cy.get('.orangehrm-left-space').click();
    }

    clickReset() {
        cy.get('.oxd-button--ghost').click();
    }

    validasiReset() {
        cy.get('.oxd-autocomplete-text-input.oxd-autocomplete-text-input--active input')
            .should('be.empty');
        cy.get('.oxd-select-text-input').eq(0)
            .should('include.text', '-- Select --');
        cy.get('.oxd-select-text-input').eq(1)
            .should('include.text', '-- Select --');
    }

    selectValidEmployee() {
        cy.get('.oxd-autocomplete-option').eq(0).should('include.text', directoryData.validEmployeeName);
        cy.get('.oxd-autocomplete-option').eq(0).click();
    }

    validResultEmployee() {
        cy.get('.oxd-text.oxd-text--p.orangehrm-directory-card-header.--break-words').should('include.text', directoryData.validEmployeeName);
    }

    confirmInvalidEmployee() {
        cy.get('.oxd-autocomplete-option').eq(0).should('include.text', 'No Records Found');
    }

    invalidResultEmployee() {
        cy.get('.oxd-text.oxd-text--span.oxd-input-field-error-message.oxd-input-group__message').should('include.text', 'Invalid');
    }

    selectJob() {
        // cy.get('.oxd-select-text-input').eq(0).click();
        // cy.get('.oxd-select-option').eq(11).should('include.text', directoryData.jobTitle);
        // cy.get('.oxd-select-option').eq(11).click();

        // elemen select yang pertama berarti eq(0)
        cy.get('.oxd-select-text-input').eq(0).click();
        cy.contains('.oxd-select-option', directoryData.jobTitle)
            .scrollIntoView()
            .should('be.visible')
            .click();
    }

    selectAnotherJob() {
        // elemen select yang pertama berarti eq(0)
        cy.get('.oxd-select-text-input').eq(0).click();
        cy.contains('.oxd-select-option', directoryData.anotherJobTitle)
            .scrollIntoView()
            .should('be.visible')
            .click();
    }

    validResultJob() {
        cy.get('.oxd-text.oxd-text--p.orangehrm-directory-card-subtitle.--break-words').should('include.text', directoryData.jobTitle);
    }

    selectLocation() {
        // cy.get('.oxd-select-text-input').eq(1).click();
        // cy.get('.oxd-select-option').eq(3).should('include.text', directoryData.location);
        // cy.get('.oxd-select-option').eq(3).click();

        // elemen select yang kedua berarti eq(1)
        cy.get('.oxd-select-text-input').eq(1).click();
        cy.contains('.oxd-select-option', directoryData.location)
            .scrollIntoView()
            .should('be.visible')
            .click();
    }

    validResultLocation() {
        cy.get('.oxd-text.oxd-text--p.orangehrm-directory-card-description.--break-words').should('include.text', directoryData.location);
    }

    allRecordsFound() {
        cy.get('.orangehrm-corporate-directory')
            .should('be.visible')
            .and('contain.text', 'Records Found')
    }

    noRecordsFound() {
        cy.get('.orangehrm-corporate-directory')
            .should('be.visible')
            .and('contain.text', 'No Records Found')
    }

    validEmployee_jobTitle() {
        cy.get('.oxd-text.oxd-text--p.orangehrm-directory-card-header.--break-words')
            .should('include.text', directoryData.validEmployeeName);
        cy.get('.oxd-text.oxd-text--p.orangehrm-directory-card-subtitle.--break-words')
            .should('include.text', directoryData.jobTitle);
    }

    interceptUsername() {
        cy.intercept('GET', 'https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/directory/employees?limit=14&offset=0&empNumber=3').as('Username')
    }

    interceptJobTitle() {
        cy.intercept('GET', 'https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/directory/employees?limit=14&offset=0&jobTitleId=2').as('JobTitle')
    }

    interceptLocation() {
        cy.intercept('GET', 'https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/directory/employees?limit=14&offset=0&locationId=2').as('Location')
    }

    interceptUserAndJobTitle() {
        cy.intercept('GET', 'https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/directory/employees?limit=14&offset=0&empNumber=3&jobTitleId=2').as('UserAndJobTitle')
    }

    interceptUserAndNotJobTitle() {
        cy.intercept('GET', 'https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/directory/employees?limit=14&offset=0&empNumber=3&jobTitleId=9').as('UserAndNotJobTitle')
    }

    interceptInvalidUsername() {
        cy.intercept('GET', 'https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/directory/employees?nameOrId=Dinar').as('InvalidUsername')
    }

    waitInterceptUsername() {
        cy.wait('@Username');
    }
    
    waitInterceptJobTitle() {
        cy.wait('@JobTitle');
    }

    waitInterceptLocation() {
        cy.wait('@Location');
    }
    
    waitInterceptInvalidUsername() {
        cy.wait('@InvalidUsername');
    }

    waitInterceptUserAndJobTitle() {
        cy.wait('@UserAndJobTitle');
    }

    waitInterceptUserAndNotJobTitle() {
        cy.wait('@UserAndNotJobTitle');
    }
}

// biar bisa dibaca oleh file lain
export default new directoryPage()
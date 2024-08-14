// cypress/pages/addCompanyPage.js

class AddCompanyPage {

    visitEmpresas() {
        cy.contains('Empresas').click();
    }

    clickAñadirEmpresa() {
        cy.contains('Añadir empresa').should('be.visible').click();
    }

    fillCompanyName(companyName) {
        cy.get('#input-company').type(companyName);
    }

    fillCompanyAddress(address) {
        cy.get('#input-address').type(address);
        cy.get('.py-2 > .text-md', { timeout: 8000 }).should('be.visible').click();
        //cy.contains('.py-2 > .text-md', address, { timeout: 8000 }).should('be.visible').click();
    }

    fillStatusId(statusId) {
        cy.get('#select-statusId').select(statusId);
    }

    fillFirstName(firstName) {
        cy.get('#input-firstName').type(firstName);
    }

    fillLastName(lastName) {
        cy.get('#input-lastName').type(lastName);
    }

    fillEmailUser(email) {
        cy.get('#input-email').type(email);
    }

    fillPhone(phoneUser) {
        cy.get('[data-testid="rfs-btn"]').click();
        cy.get('.ReactFlagsSelect-module_selectOptions__3LNBJ').contains('+34').click();
        cy.get('#input-phone').type(phoneUser);
    }

    submit() {
        cy.get('.text-black').click();
    }
    wait() {
        cy.wait(3000);
    }

    generateRandomData() {
        return {
            companyName: `EmpresaCypress-${Math.random().toString(36).substring(7)}`,
            address: 'C. Gloria Fuertes, 27, 45223 Seseña, Toledo, Spain',
            firstName: `NombreCyp-${Math.random().toString(36).substring(7)}`,
            lastName: `ApellidoCype-${Math.random().toString(36).substring(7)}`,
            email: `cypress-${Math.random().toString(36).substring(7)}@example.com`,
            phoneUser: `6${Math.floor(Math.random() * 100000000)}`,
            statusId: Math.random() < 0.5 ? '1' : '2'
        };
    }

    addCompanyWithRandomData() {
        const data = this.generateRandomData();
        this.addCompany(data.companyName, data.address, data.statusId, data.firstName, data.lastName, data.email, data.phoneUser);

        // Guardar los datos generados en un fixture
        cy.writeFile('cypress/fixtures/addedRandomCompany.json', data);

        return data;
    }

    addCompanyWithOutRandomData(fixtureName = 'addedRandomCompany') {
        cy.fixture(fixtureName).then((data) => {

            this.addCompany(data.companyName, data.address, data.statusId, data.firstName, data.lastName, data.email, data.phoneUser);

        })
    }

    addCompany(companyName, address, statusId, firstName, lastName, email, phoneUser) {
        this.visitEmpresas();
        this.clickAñadirEmpresa();
        this.fillCompanyName(companyName);
        this.fillCompanyAddress(address);
        this.fillStatusId(statusId);
        this.fillFirstName(firstName);
        this.fillLastName(lastName);
        this.fillEmailUser(email);
        this.fillPhone(phoneUser);
        this.submit();
        this.wait();
    }
}

export default AddCompanyPage;

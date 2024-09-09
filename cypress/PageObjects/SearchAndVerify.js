import Search from './Search';
import SearchInTable from './SearchInTable';
import OwnerTable from './OwnerTable';
import CommerceTable from './CommerceTable';

class SearchAndVerify {
    constructor() {
        this.search = new Search();
        this.searchInTable = new SearchInTable();
        this.ownerTable = new OwnerTable();
        this.CommerceTable = new CommerceTable();
    }


    searchAndVerify(sectionName, text, expectedData) {
        this.search.searchAndVerifyResults(sectionName, text);
        this.searchInTable.verifyTableContent(expectedData, sectionName);
    }

    searchAndOpenOwnerById(sectionName, text, id) {
        this.search.searchAndVerifyResults(sectionName, text);
        this.ownerTable.clickOnEyeIconForId(id);
        cy.wait(1000);  // Esperar a que se cargue la siguiente página
    }

    searchAndOpenCommerceById(id){
        this.CommerceTable.clickOnEyeIconForId(id);
        cy.wait(1200);
    }

    verifyOwnerDetails(expectedData) {
        // Aquí añades las verificaciones que necesites en la página que se abre.
        // Ejemplo:
        cy.get('.mt-2 > :nth-child(1) > .flex > .text-xBlack').should('contain.text', expectedData.dashboardTitle);
        // Otras verificaciones que consideres necesarias
    }
}

export default SearchAndVerify;

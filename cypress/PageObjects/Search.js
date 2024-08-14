class Search {

    // Método para visitar una sección específica basada en el nombre
    visitSection(sectionName) {
        cy.contains(sectionName).click();
        cy.wait(1500);
    }

    // Método para buscar un texto en el campo de búsqueda
    searchFor(text) {
        cy.get('input[name="search"]').eq(0).type(text, { force: true });  // Asegúrate que el selector del input sea el correcto
        cy.wait(3000);
    }

    // Método para verificar que cada fila en la tabla contiene el texto buscado
    verifyTableResults(text) {
        cy.get('table tbody tr').each(($row) => {
            cy.wrap($row).should('contain.text', text);
        });
    }

    // Método principal para buscar y verificar resultados en una tabla
    searchAndVerifyResults(sectionName, text) {
        this.visitSection(sectionName);
        this.searchFor(text);
        this.verifyTableResults(text);
    }
}

export default Search;

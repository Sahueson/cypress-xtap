class OwnerTable {
    constructor() {
        this.tableRows = 'tbody > tr';
        this.eyeIconSelector = ':nth-child(10)';  // Selector del icono de ojo
    }

    clickOnEyeIconForId(id) {
        cy.get(this.tableRows).each((row) => {
            cy.wrap(row).within(() => {
                cy.get(':nth-child(2)').then(($idColumn) => {
                    if ($idColumn.text().trim() === id) {
                        cy.get(this.eyeIconSelector).click();
                    }
                });
            });
        });
    }
}

export default OwnerTable;

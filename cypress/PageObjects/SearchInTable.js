class SearchInTable {

    visitSection(sectionName) {
        cy.contains(sectionName).click();
        cy.wait(1500);
    }

    // Método para verificar los encabezados de la tabla basados en el nombre de la sección
    verifyTableHeadersBySection(sectionName) {
        let expectedHeaders;

        switch (sectionName) {
            case 'Usuarios':
                expectedHeaders = ['Nombre', 'Perfil', 'Empresa', 'Establecimiento', 'Email', 'Teléfono', 'Estado', ''];
                break;
            case 'Empresas':
                expectedHeaders = ['Nombre', 'ID', 'Contact', 'Categoría', 'Reseñas', 'Paquete', 'Establecimientos','Fecha compra', 'Estado', ''];
                break;
            case 'Clientes':
                expectedHeaders = ['Nombre', 'ID', 'Email', 'Teléfono', 'Reseñas', 'Fecha 1ª reseña', 'Estado', ''];
                break;
            case 'Paquetes':
                expectedHeaders = ['Nombre', 'Bonus', 'Productos', 'Cantidad', 'Precio', 'Fecha creación', 'Estado', 'Detalle'];
                break;
            default:
                throw new Error(`No se reconoció la sección: ${sectionName}`);
        }

        // Verificar los encabezados de la tabla
        cy.get('table thead tr th').each((header, index) => {
            cy.wrap(header).should('contain.text', expectedHeaders[index]);
        });

        // Devolver la longitud de los encabezados para su uso posterior
        return expectedHeaders.length;
    }

    // Método para verificar el contenido de la tabla
    verifyTableContent(expectedData, sectionName) {

        this.visitSection(sectionName);
        // Primero, obtenemos la longitud de los encabezados según la sección
        const columnCount = this.verifyTableHeadersBySection(sectionName);

        cy.get('table tbody tr').each((row, rowIndex) => {
            const expectedRow = expectedData[rowIndex];

            // Verificar cada celda de la fila en función de la longitud de los encabezados
            for (let colIndex = 0; colIndex < columnCount; colIndex++) {
                cy.wrap(row).find('td').eq(colIndex).invoke('text').then(text => {
                    const header = Object.keys(expectedRow)[colIndex];
                    cy.wrap(text).should('eq', expectedRow[header]);
                });
            }
        });
    }

    findAndClickActionButton(sectionName, nombre) {
        this.visitSection(sectionName);

        cy.wait(1500);
        
        // Buscar la fila que contiene el nombre
        cy.get('table tbody tr').contains('td', nombre).parent('tr').within(() => {
            // Hacer clic en el último elemento de la fila (que debería ser el botón de acción)
            cy.get('td').last().find('svg').click();
        });
    }
}

export default SearchInTable;

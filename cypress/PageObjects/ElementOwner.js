class ElementOwner {

    // Método para verificar los encabezados de la tabla
    verificarEncabezadosTabla() {
        const expectedHeaders = ['Nombre', 'ID', 'Contact', 'Categoría', 'Reseñas', 'Productos', 'Fecha Compra', 'Empleados', ''];
        cy.get('table thead tr th').each((header, index) => {
            cy.wrap(header).should('contain.text', expectedHeaders[index]);
        });
    }

    // Método para revisar los paquetes
    revisarPaquetes() {
        cy.get('.p-8 > :nth-child(3) > :nth-child(1) > .gap-4 > :nth-child(2)').click();
        cy.wait(1000);
        cy.get('.mt-2 > :nth-child(1) > .flex > .text-xBlack').should('contain.text', 'Paquetes');
    }

    // Método para revisar los productos
    revisarProductos() {
        cy.get('.gap-4 > :nth-child(3)').click();
        cy.wait(1000);
        cy.get('.mt-2 > :nth-child(1) > .flex > .text-xBlack').should('contain.text', 'Productos');
    }

    // Método para revisar la información del Owner
    revisarInformacionOwner(owner) {
        cy.get('.w-full > :nth-child(4)').click();
        cy.wait(1000);
        cy.fixture(owner).then((data) => {
            cy.get('#input-company').should('have.value', data.nombreEmpresaOwnerEsperada);
            cy.get('#input-address').should('have.value', data.direccionOwnerEsperada);
            cy.get('#select-statusId').should('have.value', '1');
            cy.get('#input-firstName').should('have.value', data.nombreOwnerEsperado);
            cy.get('#input-lastName').should('have.value', data.apellidoOwnerEsperado);
            cy.get('#input-email').should('have.value', data.emailOwnerEsperado);
            cy.get('#input-phone').should('have.value', data.telefonoOwnerEsperado);
        });
    }

    revisarTodo(owner){
        this.verificarEncabezadosTabla();
        this.revisarPaquetes();
        this.revisarProductos();
        this.revisarInformacionOwner(owner);
    }
}

export default new ElementOwner();

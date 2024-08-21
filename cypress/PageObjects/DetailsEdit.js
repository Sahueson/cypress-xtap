class DetailsEdit {
    constructor() {
        this.form = 'form'; // Selector para el formulario dentro del modalthis.anadirPaqueteButton = 'button.anadir-paquete'; // Usa una clase específica si está disponible
    }

    // Método genérico para modificar un campo de texto
    modificarCampo(labelText, valor) {
        cy.get(this.form, { timeout: 10000 }) // Espera hasta 10 segundos
            .should('be.visible') // Asegúrate de que el formulario esté visible
            .contains('label', labelText)
            .parent() // Asumiendo que el input está dentro del mismo contenedor
            .find('input')
            .clear()
            .type(valor);
    }

    // Método genérico para seleccionar un valor en un dropdown
    seleccionarDropdown(labelText, valor) {
        cy.get(this.form, { timeout: 10000 }) // Espera hasta 10 segundos
            .should('be.visible') // Asegúrate de que el formulario esté visible
            .contains('label', labelText)
            .parent() // Asumiendo que el select está dentro del mismo contenedor
            .find('select')
            .select(valor);
    }

    // Método para verificar un valor de solo lectura
    verificarCampoSoloLectura(labelText, valorEsperado) {
        cy.get(this.form, { timeout: 10000 }) // Espera hasta 10 segundos
            .should('be.visible') // Asegúrate de que el formulario esté visible
            .contains(labelText)
            .next() // Asumiendo que el valor está justo después de la etiqueta
            .should('contain', valorEsperado);
    }

    // Método para modificar la cantidad de un producto (específico para Paquetes)
    modificarCantidadProducto(nombreProducto, cantidad) {
        cy.get(this.form)
            .contains(nombreProducto)
            .closest('.producto-container')
            .find('input[type="number"]')
            .clear()
            .type(cantidad);
    }

    clickGuardar() {
        cy.get(this.form, { timeout: 10000 })
            .contains('button, input', 'Guardar')
            .click();
    }
    

    // Método para seleccionar un Bonus
    seleccionarBonus(bonus) {
        cy.get(this.form)
            .contains('label', 'Bonus')
            .parent() // Asegúrate de que el contenedor del select es el correcto
            .find('select')
            .select(bonus);
    }

    // Método para ajustar la cantidad de un producto
    ajustarCantidadProducto(nombreProducto, cantidad) {
        cy.get(this.form)
            .contains(nombreProducto)
            .closest('.producto-container')
            .find('input[type="number"]')
            .clear()
            .type(cantidad);
    }

    // Método para incrementar la cantidad de un producto
    incrementarCantidadProducto(nombreProducto, veces = 1) {
        cy.get(this.form)
            .contains(nombreProducto)
            .closest('.producto-container')
            .find('button:contains("+")')
            .click({ times: veces });
    }

    // Método para decrementar la cantidad de un producto
    decrementarCantidadProducto(nombreProducto, veces = 1) {
        cy.get(this.form)
            .contains(nombreProducto)
            .closest('.producto-container')
            .find('button:contains("-")')
            .click({ times: veces });
    }

    // Método para modificar el precio
    modificarPrecio(precio) {
        cy.get(this.form)
            .contains('label', 'Precio')
            .parent() // Asegúrate de que el contenedor del input es el correcto
            .find('input')
            .clear()
            .type(precio);
    }

    // Método para seleccionar el estado
    seleccionarEstado(estado) {
        cy.get(this.form)
            .contains('label', 'Estado')
            .parent() // Asegúrate de que el contenedor del select es el correcto
            .find('select')
            .select(estado);
    }

    clickAnadirPaquete() {
        cy.get(this.form).find(this.anadirPaqueteButton).click();
    }

    // Métodos específicos para cada tipo de modal
    modificarUsuario(datosUsuario) {
        this.modificarCampo('Nombre', datosUsuario.nombre);
        this.modificarCampo('Apellidos', datosUsuario.apellidos);
        this.seleccionarDropdown('Perfil', datosUsuario.perfil);
        this.modificarCampo('Email', datosUsuario.email);
        this.modificarCampo('Teléfono', datosUsuario.telefono);

        cy.writeFile('cypress/fixtures/userRandomCompanyModify.json', datosUsuario);

        this.clickGuardar();
    }

    modificarCliente(datosCliente) {
        this.verificarCampoSoloLectura('ID', datosCliente.id);
        this.verificarCampoSoloLectura('Nombre', datosCliente.nombre);
        this.modificarCampo('Email', datosCliente.email);
        this.modificarCampo('Teléfono', datosCliente.telefono);
        this.seleccionarDropdown('Estado', datosCliente.estado);
        this.clickGuardar();
    }

    modificarPaquete(datosPaquete) {
        this.verificarCampoSoloLectura('Fecha de creación', datosPaquete.fechaCreacion);
        this.modificarCampo('Nombre', datosPaquete.nombre);
        this.modificarCampo('Descripción', datosPaquete.descripcion);
        this.seleccionarBonus(datosPaquete.bonus);

        datosPaquete.productos.forEach(producto => {
            this.ajustarCantidadProducto(producto.nombre, producto.cantidad);
            // Alternativamente, puedes usar incrementar o decrementar:
            // this.incrementarCantidadProducto(producto.nombre, producto.cantidad);
            // this.decrementarCantidadProducto(producto.nombre, producto.cantidad);
        });

        this.modificarPrecio(datosPaquete.precio);
        this.seleccionarEstado(datosPaquete.estado);
        this.clickAnadirPaquete();
    }
}

export default new DetailsEdit();

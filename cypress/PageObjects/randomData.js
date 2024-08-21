import { faker } from '@faker-js/faker';

class RandomData {


    generarUsuario() {
        return {
            nombre: faker.name.firstName(),
            apellidos: faker.name.lastName(),
            perfil: faker.helpers.arrayElement(['Admin', 'Propietario', 'Cliente']),
            email: faker.internet.email(),
            telefono: this.generarTelefonoEspanol(), // Usa el método personalizado
        };
    }

    generarCliente() {
        return {
            id: faker.datatype.uuid(),
            nombre: faker.company.companyName(),
            email: faker.internet.email(),
            telefono: this.generarTelefonoEspañol(), // Usa el método personalizado
            estado: faker.helpers.arrayElement(['Activo', 'Inactivo']),
        };
    }

    generarPaquete() {
        return {
            fechaCreacion: faker.date.past().toISOString().split('T')[0],
            nombre: faker.commerce.productName(),
            descripcion: faker.lorem.sentences(),
            bonus: faker.helpers.arrayElement(['Sí', 'No']),
            productos: [
                { nombre: faker.commerce.product(), cantidad: faker.datatype.number({ min: 1, max: 100 }) },
                { nombre: faker.commerce.product(), cantidad: faker.datatype.number({ min: 1, max: 100 }) },
            ],
            precio: faker.commerce.price(),
        };
    }

    // Método para generar números de teléfono en formato español
    generarTelefonoEspanol() {
        const areaCode = faker.datatype.number({ min: 600000000, max: 699999999 });
        return areaCode;
    }
}

export default new RandomData();

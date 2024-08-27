import createReview from "../../PageObjects/createReview";

describe('Test de creación de reviews', () => {


    it('Debería modificar una review usando datos desde un fixture', () => {
        createReview.crearReviewDesdeFixture('userCreateReview');
        
    });

    it('Debería crear una review usando datos aleatorios', () => {
        createReview.crearReviewAleatoria();
    });

    it('Debería crear una review sin participar en el sorteo', () => {
        createReview.crearReviewSinParticipar();
    });

    it('Debería intentar crear y/o modificar una review usando datos desde un fixture, pero no puede', () => {
        createReview.crearReviewDesdeFixture('userCreateReview');
        
    })

});

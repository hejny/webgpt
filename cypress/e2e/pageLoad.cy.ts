/// <reference types="cypress" />

context('localhost', () => {
    beforeEach(() => {
        cy.visit('http://localhost:4455/');
    });

    describe('Visiting the page', () => {
        it('should be able to see the heading', () => {
            cy.contains(/From 0 to 1/i);
        });
    });
});

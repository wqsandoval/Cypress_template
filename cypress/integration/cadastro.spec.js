/// <reference types="cypress" />
import Cadastro from '../support/pages/Cadastro'

let Chance = require('chance');
let chance = new Chance();

context('Cadastro',()=>{
    it('Cadastro De Usuario no site',()=>{
        cy.server();
        cy.route('post','**/api/1/databases/userdetails/collections/newtable**').as('postNewTable');
        cy.route('post','**/api/1/databases/userdetails/collections/usertable**').as('postUserTable');
        cy.route('get','**/api/1/databases/userdetails/collections/usertable**').as('getUserTable');

        cy.visit('Register.html');

        cy.get('input[placeholder="First Name"]').type(chance.first());
        cy.get('input[ng-model^="Last"]').type(chance.last());
        cy.get('input[ng-model^="Email"]').type(chance.email());
        cy.get('input[ng-model^="Phone"]').type(chance.phone({formatted:false}));

        cy.get('input[value="Male"]').check();
        cy.get('input[type="checkbox"]').check('Movies');

        cy.get('#Skills').select('C');
        cy.get('#countries').select('Australia');
        cy.get('#country').select('Australia',{force:true});

        cy.get('#yearbox').select('2000');
        cy.get('select[ng-model^=month]').select('June');
        cy.get('#daybox').select('1');

        cy.get('input#firstpassword').type('Agilizei@2020');
        cy.get('input#secondpassword').type('Agilizei@2020');

        cy.get('#imagesrc').attachFile('image.png');

        cy.get('#submitbtn').click();

        cy.wait('@postNewTable').then((response) => {
            expect(response.status).to.be.equals(200);
        })
        cy.wait('@postUserTable').then((response) => {
            expect(response.status).to.be.equals(200);
        })
        cy.wait('@getUserTable').then((response) => {
            expect(response.status).to.be.equals(200);
        })

        cy.url().should('contain','WebTable');
    })

    it.only('Cadastro De Usuario no site - PageObjects',()=>{
        Cadastro.visitCadastro();
        Cadastro.fillCadastro();
        Cadastro.saveCadastro();

        cy.wait('@postNewTable').then((response) => {
            expect(response.status).to.be.equals(200);
        })
        cy.wait('@postUserTable').then((response) => {
            expect(response.status).to.be.equals(200);
        })
        cy.wait('@getUserTable').then((response) => {
            expect(response.status).to.be.equals(200);
        })

        cy.url().should('contain','WebTable');
    })

})
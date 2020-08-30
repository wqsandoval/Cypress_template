let Chance = require('chance');
let chance = new Chance();
const cadastroElements = require('./elements').elements;

class Cadastro{
    visitCadastro(){
        cy.server();
        cy.route('post','**/api/1/databases/userdetails/collections/newtable**').as('postNewTable');
        cy.route('post','**/api/1/databases/userdetails/collections/usertable**').as('postUserTable');
        cy.route('get','**/api/1/databases/userdetails/collections/usertable**').as('getUserTable');

        cy.visit('Register.html');
    }
    fillCadastro(){
        cy.get(cadastroElements.textFirstName).type(chance.first());
        cy.get(cadastroElements.textLastname).type(chance.last());
        cy.get(cadastroElements.textEmail).type(chance.email());
        cy.get(cadastroElements.textPhone).type(chance.phone({formatted:false}));

        cy.get(cadastroElements.inputGenderMale).check();
        cy.get(cadastroElements.inputHobbies).check('Movies');

        cy.get(cadastroElements.selectSkills).select('C');
        cy.get(cadastroElements.selectCountries).select('Australia');
        cy.get(cadastroElements.selectCountry).select('Australia',{force:true});

        cy.get(cadastroElements.selectYear).select('2000');
        cy.get(cadastroElements.selectMonth).select('June');
        cy.get(cadastroElements.selectDay).select('1');

        cy.get(cadastroElements.inputFirstpassword).type('Agilizei@2020');
        cy.get(cadastroElements.inputSecondpassword).type('Agilizei@2020');

        cy.get(cadastroElements.attachImage).attachFile('image.png');
    }
    saveCadastro(){
        cy.get(cadastroElements.buttonSave).click();
    }
}

export default new Cadastro();

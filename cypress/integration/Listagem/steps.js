/// <reference types="cypress" />

let Chance = require('chance');
let chance = new Chance();

const {Given} = require("cypress-cucumber-preprocessor/resolveStepDefinition");
const {Then} = require("cypress-cucumber-preprocessor/resolveStepDefinition");
const {When} = require("cypress-cucumber-preprocessor/resolveStepDefinition");

Given(/^que o site possui apenas um registro$/, function () {
    cy.server();
    cy.route(
        {method:'GET',
            url:'**/api/1/databases/userdetails/collections/newtable**',
            status:200,
            response:'fx:webtable'
        }).as('getNewTable');
});
Given(/^que o site não possui registros$/, function () {
    cy.server();
    cy.route(
        {method:'GET',
            url:'**/api/1/databases/userdetails/collections/newtable**',
            status:200,
            response:'[]'
        }).as('getNewTable');
});
When(/^acessar a listagem$/, function () {
    cy.visit('WebTable.html')
});
Then(/^devo visualizar a listagem vazia$/, function () {
    cy.get('div[role=row]').should('have.length',1);
});
Then(/^devo visualizar apenas um registro$/, function () {
    cy.get('div[role=row] div[role=gridcell]').eq(4).find('div').as('gridCellPhone');
    cy.get('@gridCellPhone').should('contain.text','5408196723');
});
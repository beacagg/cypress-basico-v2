/// <reference types="Cypress" />

describe('Central de Atendimento ao cliente Tat', () => {
    beforeEach(() => cy.visit('./src/index.html'))
    it('verifica o titulo da aplicacao', () => {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })
    it('preenche os campos obrigatórios e envia o formulário', () => {
        cy.get('input[id="firstName"]').type('Jane', { delay: 0}).should('have.value', 'Jane');

         cy.get('input[id="lastName"]').type('Doe').should('have.value', 'Doe')

         cy.get('input[id="email"]').type('janedoe@email.com').should('have.value', 'janedoe@email.com');

         cy.get('textarea[id="open-text-area"]').type('Test').should('have.value', 'Test');

         cy.get('button[class="button"]').click()

         cy.get('span[class="success"]').should('be.visible')
    });
    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
        cy.get('input[id="firstName"]').type('Jane').should('have.value', 'Jane');

         cy.get('input[id="lastName"]').type('Doe').should('have.value', 'Doe')

         cy.get('input[id="email"]').type('janedoe#email.com').should('have.value', 'janedoe#email.com');

         cy.get('textarea[id="open-text-area"]').type('Test').should('have.value', 'Test');

         cy.get('button[class="button"]').click()

         cy.get('span[class="error"]').should('be.visible')
    });
    it('valida se o valor no campo telefone é um número', () => {
        cy.get('input[id="phone"]').type('Texto').should('not.have.value');
    })
    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
        cy.get('input[id="phone-checkbox"]').click()
        cy.get('button[class="button"]').click()
        cy.get('span[class="error"]').should('be.visible')
    })
    it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
        cy.get('input[id="firstName"]').type('Jane').should('have.value', 'Jane');
         cy.get('input[id="lastName"]').type('Doe').should('have.value', 'Doe')
         cy.get('input[id="email"]').type('janedoe@email.com').should('have.value', 'janedoe@email.com');
         cy.get('input[id="phone"]').type(1199339393).should('have.value', 1199339393)
         cy.get('input[id="firstName"]').clear().should('have.value', '')
    })

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
        cy.get('button[class="button"]').click()
        cy.get('span[class="error"]').should('be.visible')
    })
})
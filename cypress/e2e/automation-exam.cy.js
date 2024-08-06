/// <reference types="cypress" />

import cadastro from '../pages/cadastro';
import login from '../pages/login';
import menu from '../pages/menu';
import popups from '../pages/popups';
import carrinho from '../pages/carrinho';
import checkout from '../pages/checkout';
import pagamento from '../pages/pagamento';
import home from '../pages/home';
import produtos from '../pages/produtos';
import faleconosco from '../pages/faleconosco';

describe('Automation Exercise', () => {

  beforeEach(() => {
    cy.visit('https://automationexercise.com');
  })

  it('Test Case 1: Cadastrar um usuário', () => {
    cadastro.preencherFormulario();

    cy.get('i.fa-user')
      .parent()
      .should('contain', Cypress.env('signUpName'));

  });

  it('Test Case 2: Login User with correct email and password', () => {
    menu.irParaCadastro();
    login.preencherLogin('tester-1722907186321@mail.com', '12345');

    cy.get('i.fa-user')
      .parent()
      .should('contain', 'Testar QA')
  });

  it('Test Case 3: Login User with incorrect email and password', () => {
    menu.irParaCadastro();
    login.preencherLogin('tester-1721346302730@mail.com', '54321');

    cy.get('p')
      .should('contain', 'Your email or password is incorrect!');
  });

  it('Test Case 4: Logout User', () => {
    menu.irParaCadastro();
    login.preencherLogin('tester-1722907186321@mail.com', '12345');

    cy.get('i.fa-user')
      .parent()
      .should('contain', 'Testar QA')

    menu.clicarEmLogout()

    cy.url()
      .should('contain', 'login')
    cy.contains("Login to your account")
      .should("be.visible");

  });

  it('Test Case 5: Register User with existing email', () => {
    menu.irParaCadastro();
    cadastro.preencherNome('Teste QA')
      .preencherEmailExistente()
      .clicarEmSignup()

    cy.get(`.signup-form form p`)
      .should('be.visible')
      .and('contain', 'Email Address already exist!')
  });

  it('Test Case 6: Contact Us Form', () => {
    menu.irParaEntreEmContato();

    cy.get(`.contact-form h2`)
      .should('be.visible')
      .and('have.text', 'Get In Touch')

    faleconosco.preencherFormulario('Tester', 'tester-qa@mail.com', 'Test Automation', 'Learning Test Automation')
      .enviarArquivo()
      .clicarEmEnviar()

    cy.get('.status')
      .should('have.text', 'Success! Your details have been submitted successfully.')
  });

  it('Test Case 8: Verify All Products and product detail page', () => {
    menu.irParaProdutos();

    cy.url()
      .should('contain', 'products')
    cy.get('.title')
      .should('be.visible')
      .and('contain', 'All Products')

    produtos.verDetalhePrimeiroProduto()

    cy.get('.product-information > h2')
      .should('be.visible')
    cy.get('.product-information p')
      .should('be.visible').and('have.length', 4)
    cy.get('.product-information span span')
      .should('be.visible')

  });

  it('Test Case 9: Search Product', () => {
    menu.irParaProdutos();

    cy.url().should('contain', 'products')
    cy.get('.title').should('be.visible').and('contain', 'All Products')

    produtos.informarProduto('Shirt')
      .pesquisarProduto()

    cy.get('.title')
      .should('be.visible')
      .and('contain', 'Searched Products')

    cy.get('.single-products')
      .should('be.visible')
      .and('have.length.at.least', 1)

  });

  it('Test Case 10: Verify Subscription in home page', () => {
    home.informarEmailNoCampoSubscription('tester-qa@mail.com')
      .clicarNoBotaoSubscription()

    cy.contains('You have been successfully subscribed!')
      .should('be.visible')

  });

  it('Test Case 15: Place Order: Register before Checkout', () => {
    cadastro.preencherFormulario();
    home.clicarNoPrimeiroAdicionarAoCarrinho();
    popups.irParaVerCarrinho();
    carrinho.irParaCheckout();
    checkout.irParaPagamento();
    pagamento.preencherCartaoConfirmarPedido();

    cy.get('[data-qa="order-placed"]')
      .should('be.visible');

    menu.clicarEmDeletarConta();

    cy.get('b').should('contain', 'Account Deleted!')
      .get('[data-qa="continue-button"]')
      .click();
  });
});
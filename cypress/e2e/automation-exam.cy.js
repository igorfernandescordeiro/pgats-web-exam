/// <reference types="cypress" />

import cadastro from '../pages/cadastro';
import login from '../pages/login';
import menu from '../pages/menu';
import popups from '../pages/popups';
import carrinho from '../pages/carrinho';
import checkout from '../pages/checkout';

import { faker } from '@faker-js/faker' 

describe('Automation Exercise', () => {

  beforeEach(() => {
    cy.visit('https://automationexercise.com');
  })

  it('Test Case 1: Cadastrar um usuário', () => {
    
    cadastro.preencherFormulario();
    cy.get('i.fa-user').parent().should('contain', Cypress.env('signUpName'));

  });

  it('Test Case 2: Login User with correct email and password', () => {
    // Triplo A - Arrange, Act, Assert

    // arrange - preparacao
    
    menu.irParaCadastro();

    
    login.preencherLogin('tester-1721346302730@mail.com', '12345');

    // assert - verificacao da saída do teste / comportamento esperado

    cy.get('i.fa-user').parent().should('contain', 'Tester QA')

  });

  it('Test Case 3: Login User with incorrect email and password', () => {
    // Triplo A - Arrange, Act, Assert

    // arrange - preparacao

    menu.irParaCadastro();

    // act - acao principal
    login.preencherLogin('tester-1721346302730@mail.com', '54321');

    // assert - verificacao da saída do teste / comportamento esperado

    // cy.get(`.login-form form p`).should('contain', 'Your email or password is incorrect!')
    cy.get('p').should('contain', 'Your email or password is incorrect!')
  });

  it('Test Case 4: Logout User', () => {
    // Triplo A - Arrange, Act, Assert

    // arrange - preparacao

    // cy.contains('Signup').click()
    // menu.irParaCadastro();
    menu.irPara(menu.menus.CADASTRO);

    login.preencherLogin('tester-1721346302730@mail.com', '12345');

    cy.get('i.fa-user').parent().should('contain', 'Tester QA')

    // act - acao principal
    cy.contains('Logout').click()

    // assert - verificacao da saída do teste / comportamento esperado
    cy.url().should('contain', 'login')
    cy.contains("Login to your account").should("be.visible");

  });

  it('Test Case 5: Register User with existing email', () => {
    // cy.contains('Signup').click()
    menu.irParaCadastro();

    cy.get('[data-qa="signup-name"]').type(`Tester QA`)
    cy.get('[data-qa="signup-email"]').type(`tester-1721346302730@mail.com`)
    cy.contains('button', 'Signup').click()

    // assert
    cy.get(`.signup-form form p`)
      .should('be.visible')
      .and('contain', 'Email Address already exist!')
  });

  it('Test Case 6: Contact Us Form', () => {
    // cy.contains(`Contact us`).click()
    menu.irParaEntreEmContato();

    cy.get(`.contact-form h2`)
      .should('be.visible')
      .and('have.text', 'Get In Touch')

    cy.get('[data-qa="name"]').type(`Tester`)
    cy.get('[data-qa="email"]').type(`tester-qa@mail.com`)
    cy.get('[data-qa="subject"]').type(`Test Automation`)
    cy.get('[data-qa="message"]').type(`Learning Test Automation`)

    cy.fixture('example.json').as('arquivo')
    cy.get('input[name="upload_file"]').selectFile('@arquivo')

    cy.get('[data-qa="submit-button"]').click()

    cy.get('.status').should('have.text', 'Success! Your details have been submitted successfully.')
  });

  it('Test Case 8: Verify All Products and product detail page', () => {
    // cy.contains(`Products`).click()
    menu.irParaProdutos();

    cy.url().should('contain', 'products')
    cy.get('.title').should('be.visible').and('contain', 'All Products')

    cy.get('.single-products')
      .should('be.visible')
      .and('have.length.at.least', 1)
      .first()
      .parent()
      .contains('View Product')
      .click()

    // cy.contains('View Product').first().click()
    // product name, category, price, availability, condition, brand
    cy.get('.product-information > h2').should('be.visible')
    cy.get('.product-information p').should('be.visible').and('have.length', 4)
    cy.get('.product-information span span').should('be.visible')

  });

  it('Test Case 9: Search Product', () => {
    // cy.contains(`Products`).click()
    menu.irParaProdutos();

    cy.url().should('contain', 'products')
    cy.get('.title').should('be.visible').and('contain', 'All Products')

    cy.get('input#search_product').type('Shirt')
    cy.get('button#submit_search').click()

    cy.get('.title').should('be.visible').and('contain', 'Searched Products')

    cy.get('.single-products')
      .should('be.visible')
      .and('have.length.at.least', 1)

  });

  it('Test Case 10: Verify Subscription in home page', () => {
    cy.get('input#susbscribe_email')
      .scrollIntoView()
      .type('tester-qa@mail.com')

    cy.get('button#subscribe').click()

    cy.contains('You have been successfully subscribed!').should('be.visible')

  });

  it.only('Test Case 15: Place Order: Register before Checkout', () => {
    cadastro.preencherFormulario()
   
    cy.contains("Add to cart")
    .click()

    popups.irParaVerCarrinho()

    carrinho.irParaCheckout()

    // cy.get('.heading').first().should('have.text', 'Address Details')
    // cy.get('.heading').last().should('have.text', 'Review Your Order')
    // cy.get('.form-control').type('378 98562-8781')
    // cy.get('.btn-default.check_out').click()

    checkout.irParaPagamento();

    // now I need to think WHERE I should create the method to fulfill the credit card
    // cy.get('[data-qa="name-on-card"]').type(faker.person.fullName())
    // cy.get('[data-qa="card-number"]').type(faker.finance.creditCardNumber())
    // cy.get('[data-qa="cvc"]').type(faker.finance.creditCardCVV())
    // cy.get('[data-qa="expiry-month"]').type(12)
    // cy.get('[data-qa="expiry-year"]').type(2035)
    // cy.get('[data-qa="pay-button"]').click()
    // cy.get('[data-qa="order-placed"]').should('be.visible')
    // cy.get('[href *="delete"]').click()
    // cy.get('b').should('contain', 'Account Deleted!')
    // cy.get('[data-qa="continue-button"]').click()


  });
});
/// <reference types="Cypress" />

describe('Tabs', function() {
  
    const checkComponent = function(element, classToCheck) {
  
      cy.get(element, { timeout: 5000 })
          .should('have.class', 'hydrated')
          .children()
          .first()
          .should('have.class', classToCheck);
    };

    before(function() {

        cy.visit('tests/custom-elements/tabs.html');
    });
  
    describe('Horizontal Tabs', function() {

        it('Tabs custom element should initiate a Chi tabs component. ', () => {

            checkComponent('[data-cy="test-horizontal"]', 'a-tabs');
        });

        it('Tabs custom element should include a border when in bordered mode. ', () => {

            checkComponent('[data-cy="test-horizontal-bordered"]', '-border');
        });

        it('Tabs custom element should include an icon when in icons mode. ', () => {

            checkComponent('[data-cy="test-horizontal-icons"]', '-icons');
        });

        it('Tabs custom element should include a border and an icon when in bordered plus icons mode. ', () => {

            checkComponent('[data-cy="test-horizontal-bordered-icons"]', '-border');
            checkComponent('[data-cy="test-horizontal-bordered-icons"]', '-icons');
        });

        it('Tabs custom element should change active tab when another one is clicked. ', () => {

            cy.get('[data-cy="test-horizontal"]')
                .first()
                .find('li', { timeout: 5000 })
                .as('chi-tabs');

            cy.get('@chi-tabs')
                .first()
                .as('first-tab');

            cy.get('@chi-tabs')
                .eq(1)
                .as('second-tab');

            cy.get('@first-tab')
                .should('have.class', '-active');

            cy.get('@second-tab')
                .click()
                .should('have.class', '-active');
        });
    });
  
    describe('Vertical Tabs', function() {
  
        it('Vertical Tabs custom element should initiate a Chi tabs component. ', () => {

            checkComponent('[data-cy="test-vertical"]', 'a-tabs');
        });

        it('Vertical Tabs custom element should include a border when in bordered mode. ', () => {

            checkComponent('[data-cy="test-vertical-bordered"]', '-border');
        });

        it('Vertical Tabs custom element should include an icon when in icons mode. ', () => {

            checkComponent('[data-cy="test-vertical-icons"]', '-icons');
        });

        it('Vertical Tabs custom element should include a border and an icon when in bordered plus icons mode. ', () => {

            checkComponent('[data-cy="test-vertical-bordered-icons"]', '-border');
            checkComponent('[data-cy="test-vertical-bordered-icons"]', '-icons');
        });

        it('Vertical Tabs custom element should change active tab when another one is clicked. ', () => {

            cy.get('[data-cy="test-vertical"]')
                .first()
                .find('li', { timeout: 5000 })
                .should('exist')
                .as('chi-vertical-tabs');

            cy.get('@chi-vertical-tabs')
                .first()
                .as('first-vertical-tab');

            cy.get('@chi-vertical-tabs')
                .eq(1)
                .as('second-vertical-tab');

            cy.get('@first-vertical-tab')
                .should('have.class', '-active');

            cy.get('@second-vertical-tab')
                .click()
                .should('have.class', '-active');
        });
    });
  });

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
    });
  });

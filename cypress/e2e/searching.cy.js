import locators from '../POM/searching/locators';

describe('Searching Tests', () => {
  beforeEach(() => {
      cy.visit('/');
  });

  it('searching Lenovo and retrienving info like name, color, memory, ram and price', () => {
      cy.get(locators.searchBar).should('be.visible').type('Lenovo{enter}');
      cy.get(locators.product).should('be.visible').click();
      cy.get(locators.name)
        .should('be.visible')
        .invoke('text')
        .then((text) => {
            expect(text.toLowerCase()).to.include('lenovo');
        });
      cy.get(locators.color)
        .should('be.visible')
        .invoke('text')
        .then((colorText) => {
            expect(colorText.toLowerCase()).to.include('starlight');
        });
      cy.get(locators.memory)
        .should('be.visible')
        .invoke('text')
        .then((memoryText) => {
            expect(memoryText.toLowerCase()).to.include('256');
        });
      cy.get(locators.ram)
        .should('be.visible')
        .invoke('text')
        .then((ramText) => {
            expect(ramText.toLowerCase()).to.include('8');
        });
      cy.get(locators.price)
        .first()
        .should('be.visible')
        .invoke('text')
        .then((priceText) => {
            expect(parseInt(priceText.replace(/\s/g, ''), 10)).to.match(/^\d{6}$/);
        });
  });


  it('searching 123456789 and expecting no products to be found', () => {
    cy.get(locators.searchBar).should('be.visible').type('123456789{enter}');

    cy.get(locators.product)
      .should('not.exist');
  });

  it('searching Apple Airpods 3 and expecting first element found is Airpods 3', () => {
    cy.get(locators.searchBar).should('be.visible').type('Apple Airpods 3{enter}');

    cy.get(locators.airpods_product).click();
    cy.get(locators.name)
      .first()
      .should('be.visible')
      .invoke('text')
      .then((text) => {
          expect(text.toLowerCase()).to.include('airpods 3');
      });
});



});
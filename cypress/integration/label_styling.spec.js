describe('The label_styling example', function() {
  it('successfully loads', function() {
    cy.clearCookies();
    cy.visit('http://localhost:8080/examples/label_styling.html');
  });

  it('checks canvas rendering', function() {
    cy.fixture('../base_images/label_styling/initialCanvas.jpg').then(
      base64string => {
        cy.get('#test')
          .click()
          .should('have.attr', 'href', base64string);
      }
    );
  });
});

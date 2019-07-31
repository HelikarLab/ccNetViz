describe('The multi_level example', function() {
  it('successfully loads', function() {
    cy.visit('http://localhost:8080/examples/multi_level.html');
  });

  it('checks canvas rendering', function() {
    cy.fixture('../base_images/multi_level/initialCanvas.jpg').then(
      base64string => {
        cy.get('#test')
          .click()
          .should('have.attr', 'href', base64string);
      }
    );
  });

  it('clicks world node and renders another layer', function() {
    cy.get('#canvas').click(470, 350);
  });

  it('checks canvas rendering', function() {
    cy.fixture('../base_images/multi_level/worldClick.jpg').then(
      base64string => {
        cy.get('#test')
          .click()
          .should('have.attr', 'href', base64string);
      }
    );
  });
});

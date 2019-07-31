describe('The edges_to_edges example', function() {
  it('successfully loads', function() {
    cy.visit('http://localhost:8080/examples/edges_to_edges.html');
  });

  it('checks canvas rendering', function() {
    cy.fixture('../base_images/edges_to_edges/initialCanvas.jpg').then(
      base64string => {
        cy.get('#test')
          .click()
          .should('have.attr', 'href', base64string);
      }
    );
  });

  it('renders position of the world node', function() {
    cy.get('#container').click(465, 395);
    cy.get('#nodes').contains(1);
    cy.get('#edges').contains(3);
  });

  it('renders position of the hello node', function() {
    cy.get('#container').click(30, 470);
    cy.get('#nodes').contains(1);
    cy.get('#edges').contains(4);
  });
});

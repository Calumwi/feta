import Post from './Post'

describe("Post", () => {
  it('renders a post with a message', () => {
    cy.mount(<Post post={{_id: 1, message: "Hello, world"}} />);
    cy.get('[data-cy="post"]').should('contain.text', "Hello, world")
  })

  it('renders a post containing a url as an image', () => {
    cy.mount(<Post post={{_id: 1, img: "https://i.kym-cdn.com/entries/icons/original/000/027/475/Screen_Shot_2018-10-25_at_11.02.15_AM.png"}} />);
    cy.get('[data-cy="post"]').should('be.visible').and(($img) => {
      // "naturalWidth" and "naturalHeight" are set when the image loads
      expect($img[0].naturalWidth).to.be.greaterThan(0)
    })
  })

  it('prints the timestamp for each post', () => {
    cy.mount(<Post post={{_id: 1, date: ISODate("2022-11-08T15:41:21.730Z")}} />);
    cy.get('[data-cy="post"]').should('contain.text', "2022-11-08T15:41:21.730Z")
  })
})

import SignUpPage from './SignUpPage'
const navigate = () => {}

describe("Signing up", () => {
  it("calls the /users endpoint", () => {
    cy.mount(<SignUpPage navigate={navigate}/>)

    cy.intercept('POST', '/users', { message: "OK" }).as("signUpRequest")

    cy.get("#email").type("someone@example.com");
    cy.get("#password").type("password");
    cy.get("#submit").click();
    cy.wait('@signUpRequest').then( interception => {
      expect(interception.response.body.message).to.eq("OK")
    })
  })
})


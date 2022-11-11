import Comment from "./Comment";

describe("Comment", () => {
  it("renders a comment with a message", () => {
    cy.mount(<Comment comment={{ _id: 1, message: "Hello, world" }} />);
    cy.get('[data-cy="comment"]').should("contain.text", "Hello, world");
  });

  it("prints the timestamp for each comment", () => {
    cy.mount(
      <Comment
        comment={{ _id: 1, date: ISODate("2022-11-08T15:41:21.730Z") }}
      />
    );
    cy.get('[data-cy="comment"]').should(
      "contain.text",
      "2022-11-08T15:41:21.730Z"
    );
  });
});

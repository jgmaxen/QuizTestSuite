import { mount } from "cypress/react";
import Quiz from "../../client/src/components/Quiz";

describe("Quiz Component", () => {
// url from questionApi
beforeEach( () => {
  cy.intercept({
    method: "GET",
    url: "/api/questions/random"
  },
  // fixture is drawing mock 
  {
    fixture: "questions.json",
    statusCode: 200,
  }
).as("getRandomQuestion") 

})


  it("should render the Quiz component", () => {
    // see: https://on.cypress.io/mounting-react
    mount(<Quiz />);
    cy.get("button").contains("Start Quiz").should("be.visible");
  });

  it("should render the Quiz component with the proper content", () => {
    mount(<Quiz />);
    cy.get("button").contains("Start Quiz").click();
    cy.get(".card").should("be.visible");
  });

  // it("should move to the next question when button is clicked", () => {
  //   cy.mount(<Quiz />);
  //   cy.get("button").contains("Start Quiz").click();
  //   cy.get(".card").should("be.visible");
  //   cy.get("button").contains('A JavaScript testing framework').click();

  //   cy.get("h2").contains('Which language is used to write Cypress tests?');
  // });

  it("should finish the quiz after the last question", () => {
    cy.mount(<Quiz />);
    cy.get("button").contains("Start Quiz").click();
    for (let i=0; i<20; i++) {
      cy.get("button").contains("1").click()
    }
    cy.get("h2").contains("Quiz Completed").should("exist");
  });

  it("should begin a new quiz when selecting take new quiz", () => {
    cy.mount(<Quiz />);
    cy.get("button").contains("Start Quiz").click();
    for (let i=0; i<20; i++) {
      cy.get("button").contains("1").click()
    }
    cy.get("button").click();
    cy.get(".card").should("be.visible");
  })
});
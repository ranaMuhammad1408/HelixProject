/// <reference types="Cypress" />
const careLocators = require("../../cypress/Locators/Delete_careplane.json")
// const careData = require("../../cypress/fixtures/deleteCarePlan.json")

describe("Helix project", () => {
  before(() => {
    cy.visit("https://mayank-dev.citizensupport.app/")
  })

  it("Verify Admin is able to delete a form from a care plan template ", () => {
    cy.fixture("deleteCarePlan").then(data => {
      cy.get(careLocators.deleteCarePlan.signInBtn).last().should("not.be.disabled").click()
      cy.get(careLocators.deleteCarePlan.signInWithPasswordBtn).should("not.be.disabled").click()
      cy.get(careLocators.deleteCarePlan.email).should("be.visible").type(data.email)
      cy.get(careLocators.deleteCarePlan.password).should("be.visible").type(data.password)
      cy.get(careLocators.deleteCarePlan.submitBtn).click()
      cy.get(careLocators.deleteCarePlan.carePlanTemplateBtn).should("not.be.disabled").click()
      cy.get(careLocators.deleteCarePlan.templateBtn).first().should("not.be.disabled").click()
      cy.get(careLocators.deleteCarePlan.statusDropDownBtn).should("not.be.disabled").click()
      cy.get(careLocators.deleteCarePlan.statusBtn).should("have.text", "In Review").click({ force: true })
      cy.get(careLocators.deleteCarePlan.updateBtn).last().should("not.be.visible")
      cy.get(careLocators.deleteCarePlan.updateBtn).last().click()
      cy.get(careLocators.deleteCarePlan.alertMsg).then(($btn) => {
        const txt = $btn.text()
        cy.log(txt)
        if (txt === data.alertMsg) {
          cy.get(careLocators.deleteCarePlan.alertMsg).should("have.text", data.alertMsg)
        }
        else {
          cy.get(careLocators.deleteCarePlan.alertMsg).should("have.text", data.alertMsg2)

        }
      })
      cy.get(careLocators.deleteCarePlan.formBtn).click({ force: true })
      cy.get(careLocators.deleteCarePlan.deleteBtn).eq(0).scrollIntoView().should("be.visible").click()
      cy.get(careLocators.deleteCarePlan.okBtn).last().contains("OK").click()
      cy.get(careLocators.deleteCarePlan.deleteConfrim).should("have.text", data.deleteConfirm)
      cy.get(careLocators.deleteCarePlan.overViewBtn).click({ force: true })
      cy.get(careLocators.deleteCarePlan.updateBtn).last().should("not.be.visible")
      cy.get(careLocators.deleteCarePlan.updateBtn).last().click()
      cy.get(careLocators.deleteCarePlan.alertMsg).should("have.text", data.alertMsg)

    })
  })
})

export const recruitment = () => {
  // เข้าเมนู Recruitment
  cy.contains('.oxd-main-menu-item', 'Recruitment').click();

  // เช็คว่าอยู่หน้า Candidate
  cy.url().should('include', '/viewCandidates');
  cy.get('.oxd-topbar-header-breadcrumb').should("contain.text", "Recruitment");

  // เตรียมถ่าย screenshot
  cy.wait(5000);
  cy.scrollTo("topLeft");

  const screenshotName = "TC002-01";
  const screenshotPath = `${Cypress.config("screenshotsFolder")}/${screenshotName}.png`;

  // ถ่ายรูปถ้ายังไม่มีไฟล์
  cy.task("fileExists", screenshotPath).then((exists) => {
    if (!exists) cy.screenshot(screenshotName, { capture: "viewport" });
    else cy.log("Skip screenshot เพราะมีไฟล์อยู่แล้ว");
  });
};

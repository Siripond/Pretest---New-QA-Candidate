import 'cypress-file-upload';

// คำสั่งถ่าย screenshot ถ้ายังไม่มีไฟล์
Cypress.Commands.add("takeScreenshotIfNotExists", (screenshotName) => {
  const screenshotPath = `${Cypress.config("screenshotsFolder")}/${screenshotName}.png`;

  cy.task("fileExists", screenshotPath).then((exists) => {
    if (!exists) {
      cy.wait(5000);          // รอให้หน้าโหลดนิ่ง
      cy.scrollTo("topLeft"); // จัดมุมก่อนถ่าย
      cy.screenshot(screenshotName, { capture: "viewport" });
      cy.log(`Screenshot ${screenshotName} taken.`);
    } else {
      cy.log(`Skip screenshot: ${screenshotName}.png already exists.`);
    }
  });
});

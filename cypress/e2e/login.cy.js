export const login = () => {
  // โหลดข้อมูลจาก fixture
  cy.fixture("example").then((data) => {
    // เปิดเว็บจาก URL ในไฟล์ fixture
    cy.visit(data.UrlTest);

    // ล็อกอิน
    cy.get('input[name="username"]').type(data.Username);
    cy.get('input[name="password"]').type(data.Password);
    cy.get(".orangehrm-login-button").click();
  });

  // แคปหน้าจอ TC001-01
  cy.get(".oxd-topbar-header-breadcrumb", { timeout: 10000 }).should(
    "contain.text",
    "Dashboard"
  );

  cy.wait(5000);
  cy.scrollTo("topLeft");

  const screenshotName = "TC001-01";
  const screenshotPath = `${Cypress.config(
    "screenshotsFolder"
  )}/${screenshotName}.png`;

  cy.task("fileExists", screenshotPath).then((exists) => {
    if (!exists) {
      cy.screenshot(screenshotName, { capture: "viewport" });
    } else {
      cy.log("Skip screenshot เพราะมีไฟล์อยู่แล้ว");
    }
  });
};

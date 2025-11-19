import { login } from "./login.cy";
import { recruitment } from "./recruitment.cy";

describe("Pretest - New QA Candidate", () => {
  beforeEach("Start flow: Login and Navigate to Recruitment", () => {
    login();
    recruitment();

    cy.get(".oxd-topbar-header-breadcrumb", { timeout: 15000 })
      .should("contain.text", "Recruitment")
      .and("be.visible");

    cy.contains('button[type="submit"]', "Search").should("be.visible");
  });

  // --- Test Case 01: Search for applicants ---
  it("01. Search for applicants", () => {
    // Vacancy
    cy.contains(".oxd-input-group", "Vacancy").find(".oxd-select-text").click();
    cy.get(".oxd-select-dropdown .oxd-select-option").eq(2).click();

    // คลิก Search
    cy.get('button[type="submit"]').contains("Search").click();

    // รอให้ตารางโหลดด้วยการเช็ค Loader แทน cy.wait
    cy.get(".oxd-table-loader", { timeout: 10000 }).should("not.exist");

    // --- Screenshot TC003-01 ---
    cy.takeScreenshotIfNotExists("TC003-01");
  });

  // -------------------------------------------------------------------

  // --- Test Case 02: Add new candidates ---
  it("02. Add new candidates", () => {
    const uniqueEmail = `test${Cypress._.random(0, 1e6)}@testmail.com`;
    const newFirstName = "Test0002_Auto";

    // คลิกปุ่ม Add
    cy.contains("button", "Add").click({ force: true });

    // เช็คว่าเข้าสู่หน้า Add Candidate แล้ว
    cy.contains("h6", "Add Candidate").should("be.visible");

    // --- Full Name ---
    cy.get('input[name="firstName"]').type(newFirstName);
    cy.get('input[name="middleName"]').type("ABC");
    cy.get('input[name="lastName"]').type("XYZ");

    // --- Vacancy ---
    cy.contains(".oxd-input-group", "Vacancy").find(".oxd-select-text").click();
    cy.get(".oxd-select-dropdown .oxd-select-option").eq(2).click();

    // --- Email ---
    cy.contains(".oxd-input-group", "Email").find("input").type(uniqueEmail);

    // --- Contact Number ---
    cy.contains(".oxd-input-group", "Contact Number")
      .find("input")
      .type("0912345678");

    // --- Upload Resume ---
    cy.get('input[type="file"]').selectFile("cypress/fixtures/Test.pdf", {
      force: true,
    });

    // --- Keywords & Notes ---
    cy.contains(".oxd-input-group", "Keywords")
      .find("input")
      .type("automation, tester");
    cy.contains(".oxd-input-group", "Notes")
      .find("textarea")
      .type("This is test candidate.");

    // SAVE
    cy.get("button").contains("Save").click({ force: true });

    // ยืนยันว่ามาอยู่หน้าโปรไฟล์ของ candidate แล้ว
    cy.get(".oxd-toast-container", { timeout: 10000 })
      .should("be.visible")
      .and("contain", "Success");

    // --- Screenshot TC003-02 ---
    cy.takeScreenshotIfNotExists("TC003-02");
  });
  // -------------------------------------------------------------------

  // --- Test Case 03: Edit candidates ---
  it("03. Edit candidates", () => {
    // Keywords 
    cy.contains(".oxd-input-group", "Keywords")
      .find("input")
      .clear()
      .type("test");

    // Click Search
    cy.get('button[type="submit"]').contains("Search").click();

    // รอให้ตารางโหลดด้วยการเช็ค Loader
    cy.get(".oxd-table-loader", { timeout: 10000 }).should("not.exist");

    // รอให้ผลลัพธ์อัปเดต
    cy.get(".oxd-table-body .oxd-table-row", { timeout: 10000 }).should(
      "have.length.greaterThan",
      0
    );

    // คลิกเฉพาะแถวแรกของผลลัพธ์ใหม่เท่านั้น
    cy.get(".oxd-table-body .oxd-table-row")
      .first()
      .within(() => {
        // คลิกไอคอนลูกตา (View)
        cy.get("i.bi-eye-fill").click({ force: true });
      });

    // รอจนกว่าหน้าโปรไฟล์จะโหลด
    cy.url().should("include", "/recruitment/addCandidate");

    // เปิดสวิตช์ Edit
    cy.contains(".oxd-switch-wrapper label", "Edit").click({ force: true });

    // สร้าง Timestamp
    const now = new Date();
    const timestamp = now.toISOString().replace(/[:T]/g, "-").split(".")[0];
    const newFirstName = `Test Edit-${timestamp}`;

    // แก้ไข First Name
    cy.get('input[name="firstName"]')
      .clear({ force: true })
      .type(newFirstName, { force: true });

    // คลิก Save
    cy.get("button.oxd-button--secondary.orangehrm-left-space")
      .contains("Save")
      .click({ force: true });

    // เช็คว่าอัพเดทจริง และฟิลด์ถูก disabled
    cy.get('input[name="firstName"]', { timeout: 5000 })
      .should("have.value", newFirstName)
      .and("be.disabled");

    // --- Screenshot TC003-03 ---
    cy.takeScreenshotIfNotExists("TC003-03");
  });

  // -------------------------------------------------------------------

  // --- Test Case 04: Validation Message ---
  it("04. Validation Message", () => {
    // 1. เปิดหน้า Add Candidate
    cy.contains("button", "Add").click({ force: true });
    cy.contains("h6", "Add Candidate").should("be.visible");

    // 2. กด Save โดยไม่กรอกข้อมูล
    cy.contains("button", "Save").click({ force: true });

    // ตรวจสอบ Validation Message ที่ล้มเหลว 

    // A. ตรวจสอบ First Name (Required)
    cy.get('input[name="firstName"]')
      .parents(".oxd-input-field-bottom-space")
      .contains(".oxd-input-field-error-message", "Required")
      .should("be.visible");

    // B. ตรวจสอบ Last Name (Required)
    cy.get('input[name="lastName"]')
      .parents(".oxd-input-field-bottom-space")
      .contains(".oxd-input-field-error-message", "Required")
      .should("be.visible");

    // C. ตรวจสอบ Email (Required) 
    cy.contains("label", "Email")
      .parents(".oxd-input-group")
      .find(".oxd-input-field-error-message")
      .should("be.visible")
      .and("contain.text", "Required");

    // --- Screenshot TC003-04 ---
    cy.takeScreenshotIfNotExists("TC003-04");
  
  });

  // -------------------------------------------------------------------

  // --- Test Case 05: Sorting & Pagination ---
  it("05. Sorting & Pagination (Date of Application Ascending + Pagination)", () => {

    // ส่วนที่ 1: การ Sorting (เพื่อจัดเรียงข้อมูลก่อน Pagination)

    // 1. เปิดเมนู sort ของคอลัมน์ Date of Application
    cy.contains(".oxd-table-header-cell", "Date of Application").within(() => {
      cy.get(".oxd-table-header-sort-icon").click({ force: true });
      cy.get(".oxd-table-header-sort-dropdown").should("be.visible"); // เลือก Ascending (เก่า → ใหม่)

      cy.contains(".oxd-table-header-sort-dropdown-item", "Ascending").click({
        force: true,
      });
    }); 
    
    // 2. รอให้ตารางโหลด และตรวจสอบ Sorting
    cy.get(".oxd-table-loader", { timeout: 10000 }).should("not.exist");

    // เก็บข้อมูลแรกสุดก่อนเปลี่ยนหน้า
    let firstRowTextBeforePagination;

    cy.get(".oxd-table-body .oxd-table-row", { timeout: 10000 })
      .should("have.length.greaterThan", 0)
      .then(($rows) => {
        // เก็บข้อความในแถวแรกทั้งหมดเพื่อใช้เปรียบเทียบภายหลัง
        firstRowTextBeforePagination = $rows.eq(0).text();

        // ส่วน Assertion การ Sorting เหมือนเดิม
        const DATE_COLUMN_INDEX = 4;
        const date1Text = $rows
          .eq(0)
          .find(".oxd-table-cell")
          .eq(DATE_COLUMN_INDEX)
          .text();
        const dateLastText = $rows
          .last()
          .find(".oxd-table-cell")
          .eq(DATE_COLUMN_INDEX)
          .text();

        const date1 = new Date(date1Text);
        const dateLast = new Date(dateLastText);
        expect(date1.getTime(), "First date must be a valid date").to.not.be
          .NaN;
        expect(dateLast.getTime(), "Last date must be a valid date").to.not.be
          .NaN;
        expect(
          date1.getTime(),
          `Comparing ${date1Text} <= ${dateLastText}`
        ).to.be.lte(dateLast.getTime());
        cy.log("Sorting by Date of Application: **Ascending** verified.");
      });
    
    // --- Screenshot TC003-05.1 ---
    cy.takeScreenshotIfNotExists("TC003-05.1");

    // ส่วนที่ 2: การ Pagination (คลิกปุ่ม Next)

    // 4. คลิกปุ่ม Next Page (ปุ่มที่มี icon bi-chevron-right)
    // เราต้องหาปุ่มที่มี icon ชี้ขวา (Next) และต้องมั่นใจว่ามีมากกว่า 1 หน้า (ถ้ามี "Record Found" เกินจำนวนแถวต่อหน้า)
    cy.get(".oxd-pagination-page-item i.bi-chevron-right")
      .first() // เลือกปุ่ม Next Page ปุ่มแรก (หากมีปุ่มอื่น เช่น Previous)
      .click({ force: true });

    // 5. รอให้ตารางโหลดอีกครั้ง
    cy.get(".oxd-table-loader", { timeout: 10000 }).should("not.exist");

    // 6. ตรวจสอบว่าตารางเปลี่ยนหน้าแล้วจริง
    cy.get(".oxd-table-body .oxd-table-row", { timeout: 10000 })
      .should("have.length.greaterThan", 0)
      .then(($rows) => {
        const firstRowTextAfterPagination = $rows.eq(0).text();

        // ยืนยันว่าข้อมูลในแถวแรกของหน้าใหม่ ไม่ใช่ข้อมูลเดียวกับแถวแรกของหน้าเดิม
        expect(
          firstRowTextAfterPagination,
          "Pagination failed: Content remains the same as the previous page."
        ).to.not.equal(firstRowTextBeforePagination);

        cy.log("Pagination to the next page verified.");
      });

    // --- Screenshot TC003-05.2 ---
    cy.takeScreenshotIfNotExists("TC003-05.2");
  });
});

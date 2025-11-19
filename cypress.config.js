const fs = require("fs");  

module.exports = {
  projectId: 'gh9pou',
  e2e: {
    // ขนาดหน้าจอเวลารัน Cypress
    viewportWidth: 1366,
    viewportHeight: 900,

    // ไม่ต้อง watch ไฟล์เวลามีการแก้ไข
    watchForFileChanges: false,

    setupNodeEvents(on, config) {
      // task ไว้เช็กว่าไฟล์มีอยู่จริงหรือไม่
      on("task", {
        fileExists(path) {
          return fs.existsSync(path);
        },
      });
    },
  },
};

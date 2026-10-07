// Bound to the existing Portfolio Contact Form spreadsheet.
const SHEET_NAME = "Sheet1";

function jsonResponse(result) {
  return ContentService.createTextOutput(JSON.stringify(result))
    .setMimeType(ContentService.MimeType.JSON);
}

function doGet() {
  return jsonResponse({ status: "ready", service: "portfolio-contact" });
}

function doPost(e) {
  try {
    const parameters = e && e.parameter || {};
    const fields = ["name", "email", "message"].map((key) =>
      typeof parameters[key] === "string" ? parameters[key].trim() : "");
    const [name, email, message] = fields;
    if (!name || !email || !message || name.length > 120 || email.length > 254 || message.length > 5000 ||
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return jsonResponse({ status: "error", message: "Please check the form details." });
    }
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
    // Store visitor input as plain text, never as a spreadsheet formula.
    const values = fields.map((value) => /^[=+@-]/.test(value) ? "'" + value : value);
    sheet.appendRow([new Date(), ...values]);
    return jsonResponse({ status: "success", message: "Message saved." });
  } catch {
    return jsonResponse({ status: "error", message: "The message could not be saved. Please try again later." });
  }
}

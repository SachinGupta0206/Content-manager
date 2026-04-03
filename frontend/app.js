const API_URL = "/api/content";
const HEX_REGEX = /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/;

// Init Quill
const quill = new Quill("#quillEditor", {
  theme: "snow",
  placeholder: "Write your paragraph here...",
  modules: {
    toolbar: [
      ["bold", "italic", "underline"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link"],
      ["clean"],
    ],
  },
});

// Sync color picker <-> text input
const textColorInput = document.getElementById("textColor");
const colorPicker = document.getElementById("colorPicker");

colorPicker.addEventListener("input", () => {
  textColorInput.value = colorPicker.value;
  clearError("textColor");
});

textColorInput.addEventListener("input", () => {
  if (HEX_REGEX.test(textColorInput.value.trim())) {
    colorPicker.value = textColorInput.value.trim();
  }
});

// Helpers
function showError(field, msg) {
  const el = document.getElementById(field + "Error");
  if (el) el.textContent = msg;

  if (field === "paragraph") {
    document.getElementById("quillEditor").classList.add("invalid");
  } else {
    const input = document.getElementById(field);
    if (input) input.classList.add("invalid");
  }
}

function clearError(field) {
  const el = document.getElementById(field + "Error");
  if (el) el.textContent = "";

  if (field === "paragraph") {
    document.getElementById("quillEditor").classList.remove("invalid");
  } else {
    const input = document.getElementById(field);
    if (input) input.classList.remove("invalid");
  }
}

function clearAllErrors() {
  ["heading", "paragraph", "backgroundImage", "textColor"].forEach(clearError);
  document.getElementById("successMsg").textContent = "";
}

// Client-side validation
function validateForm(data) {
  const errors = {};
  if (!data.heading.trim()) errors.heading = "Heading is required.";
  if (!data.paragraph.trim() || data.paragraph.trim() === "<p><br></p>")
    errors.paragraph = "Paragraph is required.";
  if (!data.backgroundImage.trim())
    errors.backgroundImage = "Background image URL is required.";
  if (!data.textColor.trim()) {
    errors.textColor = "Text color is required.";
  } else if (!HEX_REGEX.test(data.textColor.trim())) {
    errors.textColor =
      "Text color must be a valid HEX code (e.g. #fff or #ffffff).";
  }
  return errors;
}

// Update preview
function updatePreview(data) {
  const block = document.getElementById("previewBlock");
  const content = document.getElementById("previewContent");

  block.style.backgroundImage = `url('${data.backgroundImage}')`;
  content.style.color = data.textColor;
  document.getElementById("previewHeading").textContent = data.heading;
  document.getElementById("previewParagraph").innerHTML = data.paragraph;
}

// Form submit
document.getElementById("contentForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  clearAllErrors();

  const data = {
    heading: document.getElementById("heading").value,
    paragraph: quill.root.innerHTML,
    backgroundImage: document.getElementById("backgroundImage").value,
    textColor: textColorInput.value,
  };

  // Client-side validation first
  const clientErrors = validateForm(data);
  if (Object.keys(clientErrors).length > 0) {
    Object.entries(clientErrors).forEach(([field, msg]) =>
      showError(field, msg),
    );
    return;
  }

  const btn = document.getElementById("submitBtn");
  btn.disabled = true;
  btn.textContent = "Submitting...";

  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await res.json();

    if (result.success) {
      document.getElementById("successMsg").textContent = result.message;
      updatePreview(result.data);
    } else {
      // Server-side errors
      Object.entries(result.errors || {}).forEach(([field, msg]) =>
        showError(field, msg),
      );
    }
  } catch {
    document.getElementById("successMsg").style.color = "#e53e3e";
    document.getElementById("successMsg").textContent =
      "Could not reach the server. Please try again.";
  } finally {
    btn.disabled = false;
    btn.textContent = "Submit";
  }
});

// Clear errors on input
document
  .getElementById("heading")
  .addEventListener("input", () => clearError("heading"));
document
  .getElementById("backgroundImage")
  .addEventListener("input", () => clearError("backgroundImage"));
textColorInput.addEventListener("input", () => clearError("textColor"));
quill.on("text-change", () => clearError("paragraph"));

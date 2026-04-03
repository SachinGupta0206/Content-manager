const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const HEX_REGEX = /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/;
const URL_REGEX = /^https?:\/\/.+/;

app.post("/api/content", async (req, res) => {
  const { heading, paragraph, backgroundImage, textColor } = req.body;
  const errors = {};

  // Required field validation
  if (!heading || !heading.trim()) errors.heading = "Heading is required.";
  if (!paragraph || !paragraph.trim())
    errors.paragraph = "Paragraph is required.";
  if (!backgroundImage || !backgroundImage.trim())
    errors.backgroundImage = "Background image URL is required.";
  if (!textColor || !textColor.trim())
    errors.textColor = "Text color is required.";

  // HEX color validation
  if (textColor && !HEX_REGEX.test(textColor.trim())) {
    errors.textColor =
      "Text color must be a valid HEX code (e.g. #fff or #ffffff).";
  }

  // URL format validation
  if (backgroundImage && !URL_REGEX.test(backgroundImage.trim())) {
    errors.backgroundImage =
      "Background image must be a valid URL starting with http:// or https://.";
  }

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ success: false, errors });
  }

  // Validate image URL is accessible using Node 18+ built-in fetch
  try {
    const response = await fetch(backgroundImage.trim(), {
      method: "HEAD",
      signal: AbortSignal.timeout(5000),
    });
    if (!response.ok) {
      return res.status(400).json({
        success: false,
        errors: {
          backgroundImage:
            "Background image URL is inaccessible or returned an error.",
        },
      });
    }
  } catch {
    return res.status(400).json({
      success: false,
      errors: {
        backgroundImage:
          "Background image URL is inaccessible or could not be reached.",
      },
    });
  }

  return res.status(200).json({
    success: true,
    message: "Content submitted successfully.",
    data: {
      heading: heading.trim(),
      paragraph: paragraph.trim(),
      backgroundImage: backgroundImage.trim(),
      textColor: textColor.trim(),
    },
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`),
);

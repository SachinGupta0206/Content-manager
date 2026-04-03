import { useState, useRef } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

const HEX_REGEX = /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/;
const API_URL = "/api/content";

const quillModules = {
  toolbar: [
    ["bold", "italic", "underline"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link"],
    ["clean"],
  ],
};

export default function ContentForm({ onSuccess }) {
  const [heading, setHeading] = useState("");
  const [paragraph, setParagraph] = useState("");
  const [backgroundImage, setBackgroundImage] = useState("");
  const [textColor, setTextColor] = useState("#ffffff");
  const [errors, setErrors] = useState({});
  const [successMsg, setSuccessMsg] = useState("");
  const [loading, setLoading] = useState(false);

  function validate() {
    const errs = {};
    if (!heading.trim()) errs.heading = "Heading is required.";
    if (!paragraph.trim() || paragraph.trim() === "<p><br></p>")
      errs.paragraph = "Paragraph is required.";
    if (!backgroundImage.trim())
      errs.backgroundImage = "Background image URL is required.";
    if (!textColor.trim()) {
      errs.textColor = "Text color is required.";
    } else if (!HEX_REGEX.test(textColor.trim())) {
      errs.textColor =
        "Text color must be a valid HEX code (e.g. #fff or #ffffff).";
    }
    return errs;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSuccessMsg("");
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setLoading(true);

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          heading,
          paragraph,
          backgroundImage,
          textColor,
        }),
      });
      const result = await res.json();
      if (result.success) {
        setSuccessMsg(result.message);
        onSuccess(result.data);
      } else {
        setErrors(result.errors || {});
      }
    } catch {
      setSuccessMsg("");
      setErrors({ server: "Could not reach the server. Please try again." });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="form-column">
      <h2>Content Form</h2>
      <form onSubmit={handleSubmit} noValidate>
        <div className="field">
          <label htmlFor="heading">Heading</label>
          <input
            type="text"
            id="heading"
            placeholder="Enter heading"
            value={heading}
            onChange={(e) => {
              setHeading(e.target.value);
              setErrors((p) => ({ ...p, heading: "" }));
            }}
            className={errors.heading ? "invalid" : ""}
          />
          <span className="error">{errors.heading}</span>
        </div>

        <div className="field">
          <label>Paragraph</label>
          <div
            className={errors.paragraph ? "quill-wrap invalid" : "quill-wrap"}
          >
            <ReactQuill
              theme="snow"
              value={paragraph}
              onChange={(val) => {
                setParagraph(val);
                setErrors((p) => ({ ...p, paragraph: "" }));
              }}
              modules={quillModules}
              placeholder="Write your paragraph here..."
            />
          </div>
          <span className="error">{errors.paragraph}</span>
        </div>

        <div className="field">
          <label htmlFor="backgroundImage">Background Image URL</label>
          <input
            type="url"
            id="backgroundImage"
            placeholder="https://example.com/image.jpg"
            value={backgroundImage}
            onChange={(e) => {
              setBackgroundImage(e.target.value);
              setErrors((p) => ({ ...p, backgroundImage: "" }));
            }}
            className={errors.backgroundImage ? "invalid" : ""}
          />
          <span className="error">{errors.backgroundImage}</span>
        </div>

        <div className="field">
          <label htmlFor="textColor">Text Color (HEX)</label>
          <div className="color-input-row">
            <input
              type="text"
              id="textColor"
              placeholder="#ffffff"
              maxLength={7}
              value={textColor}
              onChange={(e) => {
                setTextColor(e.target.value);
                setErrors((p) => ({ ...p, textColor: "" }));
              }}
              className={errors.textColor ? "invalid" : ""}
            />
            <input
              type="color"
              value={HEX_REGEX.test(textColor) ? textColor : "#ffffff"}
              onChange={(e) => {
                setTextColor(e.target.value);
                setErrors((p) => ({ ...p, textColor: "" }));
              }}
              title="Pick a color"
            />
          </div>
          <span className="error">{errors.textColor}</span>
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </button>

        {errors.server && (
          <div className="error" style={{ marginTop: 10 }}>
            {errors.server}
          </div>
        )}
        {successMsg && <div className="success-msg">{successMsg}</div>}
      </form>
    </div>
  );
}

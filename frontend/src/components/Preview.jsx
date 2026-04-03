export default function Preview({ data }) {
  const { heading, paragraph, backgroundImage, textColor } = data;

  return (
    <div className="preview-column">
      <h2>Preview</h2>
      <div
        className="preview-block"
        style={
          backgroundImage
            ? { backgroundImage: `url('${backgroundImage}')` }
            : {}
        }
      >
        <div className="preview-content" style={{ color: textColor }}>
          <h3 id="previewHeading">{heading || "Default Heading"}</h3>
          <div
            id="previewParagraph"
            dangerouslySetInnerHTML={{
              __html:
                paragraph ||
                "<p>This is the default paragraph content. Submit the form to update this preview with your own content.</p>",
            }}
          />
        </div>
      </div>
    </div>
  );
}

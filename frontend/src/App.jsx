import { useState } from "react";
import ContentForm from "./components/ContentForm";
import Preview from "./components/Preview";
import "./App.css";

const defaultPreview = {
  heading: "Default Heading",
  paragraph:
    "<p>This is the default paragraph content. Submit the form to update this preview with your own content.</p>",
  backgroundImage:
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
  textColor: "#ffffff",
};

export default function App() {
  const [previewData, setPreviewData] = useState(defaultPreview);

  return (
    <div className="layout">
      <ContentForm onSuccess={setPreviewData} />
      <Preview data={previewData} />
    </div>
  );
}

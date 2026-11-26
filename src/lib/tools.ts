export type ToolId =
  | "compress-image"
  | "passport-photo"
  | "convert-image"
  | "image-to-pdf"
  | "merge-pdf"
  | "social-resizer";

export type Tool = {
  id: ToolId;
  title: string;
  shortTitle: string;
  description: string;
  detail: string;
  category: "Image" | "PDF";
  accepted: string;
  multiple: boolean;
  steps: string[];
  faqs: { question: string; answer: string }[];
};

export const tools: Tool[] = [
  {
    id: "compress-image",
    title: "Compress image to KB",
    shortTitle: "Image compressor",
    description: "Get your photo under a target file size, right in your browser.",
    detail:
      "Reduce a photo to a specific file size for an application form, email attachment, or online upload. Choose a target in kilobytes and download the closest result without sending your image to a server.",
    category: "Image",
    accepted: "image/jpeg,image/png,image/webp",
    multiple: false,
    steps: ["Choose a JPG, PNG, or WebP image.", "Set your maximum file size.", "Download the optimized image."],
    faqs: [
      { question: "Will the image be exactly the size I enter?", answer: "The tool targets your chosen maximum. Image complexity and format affect the final size, so the result may be a little smaller. If a very small target cannot be reached without extreme quality loss, the best available version is provided with a notice." },
      { question: "Does compression change my image dimensions?", answer: "Dimensions stay the same when quality adjustment is enough. If needed to meet a very small target, the tool gradually reduces dimensions and tells you when it has done so." },
      { question: "Are my photos uploaded?", answer: "No. Compression runs locally in your browser. Your selected image is not sent to PrepKit." },
    ],
  },
  {
    id: "passport-photo",
    title: "Passport & ID photo sheet",
    shortTitle: "Passport photo",
    description: "Arrange standard photo sizes on a print-ready A4 sheet.",
    detail:
      "Make a printable sheet of repeated ID photos in common 35 × 45 mm or 2 × 2 inch sizes. Your original stays on your device; check your application’s official photo rules before submitting.",
    category: "Image",
    accepted: "image/jpeg,image/png,image/webp",
    multiple: false,
    steps: ["Choose a clear portrait photo.", "Select a common print size.", "Download your A4 photo sheet."],
    faqs: [
      { question: "Does this guarantee my passport photo will be accepted?", answer: "No. Photo rules vary by country and application. This tool sets print dimensions only; review the official guidance for background, face position, expression, and digital submission requirements." },
      { question: "What resolution is the sheet?", answer: "The A4 sheet is rendered at 300 pixels per inch for printing. Print at actual size (100%) and disable fit-to-page scaling." },
      { question: "Can I move the crop?", answer: "The current MVP centers and fills the selected photo size automatically. Use a portrait with the face centered for the best result." },
    ],
  },
  {
    id: "convert-image",
    title: "Convert image format",
    shortTitle: "Image converter",
    description: "Convert JPG, PNG, and WebP images in one simple step.",
    detail:
      "Change images between JPEG, PNG, and WebP using your browser. Add several files at once and download the converted images together in a ZIP file.",
    category: "Image",
    accepted: "image/jpeg,image/png,image/webp",
    multiple: true,
    steps: ["Add one or more images.", "Choose the format you need.", "Download a file or a ZIP of all results."],
    faqs: [
      { question: "Which formats can I convert?", answer: "The tool supports JPEG, PNG, and WebP. Browser support is checked before conversion." },
      { question: "Will transparent backgrounds be kept?", answer: "Transparency is preserved when exporting PNG or WebP. JPEG does not support transparency, so transparent areas are filled white." },
      { question: "Can I convert many images together?", answer: "Yes. Select multiple images and download the converted files as a ZIP archive." },
    ],
  },
  {
    id: "image-to-pdf",
    title: "Images to PDF",
    shortTitle: "Image to PDF",
    description: "Combine photos into a neat, downloadable PDF document.",
    detail:
      "Turn multiple JPG, PNG, or WebP images into a single PDF. Each photo is placed on its own A4 page and scaled to fit without stretching.",
    category: "PDF",
    accepted: "image/jpeg,image/png,image/webp",
    multiple: true,
    steps: ["Select the images in page order.", "Create your PDF.", "Save the document to your device."],
    faqs: [
      { question: "Can I add more than one image?", answer: "Yes. Each selected image is added as a page in the order you select them." },
      { question: "Will my images be stretched?", answer: "No. Each image keeps its aspect ratio and is centered on an A4 page." },
      { question: "Are my files sent to a server?", answer: "No. PDF creation happens locally in your browser." },
    ],
  },
  {
    id: "merge-pdf",
    title: "Merge or split PDF",
    shortTitle: "PDF merge & split",
    description: "Join PDF files or extract selected pages into a new PDF.",
    detail:
      "Merge several PDFs in the order you choose, or extract page numbers and ranges from one PDF. Processing is local, so your documents stay on your device.",
    category: "PDF",
    accepted: "application/pdf,.pdf",
    multiple: true,
    steps: ["Choose PDF files to merge, or one PDF to split.", "For splitting, enter pages such as 1,3-5.", "Download the new PDF or a ZIP of individual pages."],
    faqs: [
      { question: "How do I merge PDFs?", answer: "Select two or more PDF files in the order you want them combined, then choose Merge PDFs." },
      { question: "How do I extract pages?", answer: "Select one PDF and enter page numbers and ranges, for example 1,3-5. You can save the selection as one PDF or separate files in a ZIP." },
      { question: "What if a PDF is password protected?", answer: "Encrypted PDFs that cannot be opened by the browser library are not supported. The tool shows an error rather than changing your file." },
    ],
  },
  {
    id: "social-resizer",
    title: "Social media image resizer",
    shortTitle: "Social resizer",
    description: "Resize images for Instagram, LinkedIn, and YouTube.",
    detail:
      "Prepare an image for popular social formats. Pick a preset size and choose whether to crop-fill or fit the whole photo on a background.",
    category: "Image",
    accepted: "image/jpeg,image/png,image/webp",
    multiple: false,
    steps: ["Choose an image.", "Pick a platform size and fit mode.", "Download your resized image."],
    faqs: [
      { question: "Which sizes are included?", answer: "Presets include square and portrait Instagram posts, Instagram Stories, LinkedIn landscape, and YouTube thumbnails." },
      { question: "What is the difference between Fill and Fit?", answer: "Fill crops the edges to cover the full frame. Fit keeps the complete image and adds a background where needed." },
      { question: "Will the output be stretched?", answer: "No. The selected fit mode preserves the image proportions." },
    ],
  },
];

export const sizeLandingPages = [
  { slug: "compress-to-20kb", kb: 20 },
  { slug: "compress-to-50kb", kb: 50 },
  { slug: "compress-to-100kb", kb: 100 },
];

export function getTool(slug: string): Tool | undefined {
  return tools.find((tool) => tool.id === slug);
}

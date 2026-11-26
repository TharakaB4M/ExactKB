export type Article = {
  slug: string;
  title: string;
  summary: string;
  category: string;
  intro: string;
  sections: { heading: string; paragraphs: string[]; bullets?: string[] }[];
};

export const articles: Article[] = [
  {
    slug: "compress-image-under-50kb",
    title: "How to compress an image under 50 KB",
    summary: "A practical way to meet an image upload limit without making your photo look worse than it needs to.",
    category: "Image sizes",
    intro: "A 50 KB upload limit can feel surprisingly strict, especially when a phone photo starts out several megabytes large. The trick is to reduce file size gradually and check the result, rather than immediately shrinking the image as far as possible.",
    sections: [
      { heading: "Start with a suitable original", paragraphs: ["Use the clearest copy you have, not a screenshot of a screenshot. If the photo is much larger in pixel dimensions than the website needs, resizing it can reduce file size while keeping it looking sharp at its final display size."] },
      { heading: "Reduce file size in sensible steps", paragraphs: ["Open the image in PrepKit's image compressor, choose 50 KB, and create a result. The tool adjusts JPEG quality and, only if needed, dimensions. A simpler image may reach the target at higher quality than a detailed scene with lots of texture."] },
      { heading: "Check the output before uploading", paragraphs: ["Zoom in on faces, text, and edges. Compare the output dimensions with the form's requirements, and confirm the file extension is accepted. A file being under 50 KB does not by itself mean it meets an application’s photo specifications.", "If a target can only be reached by making the image noticeably soft, try a higher limit if the form allows it or begin with a better-sized original."] },
      { heading: "Keep an original copy", paragraphs: ["Save the compressed version as a new file. That way, you can retry with different settings without losing the source. PrepKit works locally in your browser and does not upload the selected image."] },
    ],
  },
  {
    slug: "passport-photo-sizes-by-country",
    title: "Passport photo sizes: what to check before printing",
    summary: "Common print dimensions, why requirements vary, and how to get a useful photo sheet.",
    category: "Photo preparation",
    intro: "There is no single passport photo size accepted everywhere. A 35 × 45 mm print is common in many places, while U.S. passport photos are typically 2 × 2 inches. These examples are starting points, not a substitute for the authority's current instructions.",
    sections: [
      { heading: "Confirm the official requirements first", paragraphs: ["Check the exact application page for the country or organization receiving your photo. It may specify the print dimensions, digital pixel dimensions, background, head size, expression, recency, and whether prints or digital files are accepted.", "Rules can differ between a passport, visa, identity card, exam application, and job portal—even within the same country."] },
      { heading: "Print dimensions are only one part", paragraphs: ["A correctly sized print can still be rejected if the face is too small, the background is unsuitable, shadows are visible, or the image is not recent enough. Don't retouch or alter the photo in a way that conflicts with the official requirements."] },
      { heading: "Create a print sheet", paragraphs: ["PrepKit can place repeated 35 × 45 mm or 2 × 2 inch crops on an A4 sheet at 300 pixels per inch. The crop is centered automatically, so choose a portrait where the face is centered and check the preview after printing.", "When printing, choose actual size or 100% and turn off fit-to-page scaling. Printer margins and settings can affect the final physical dimensions, so measure a test print if exact sizing matters."] },
      { heading: "Digital application?", paragraphs: ["If the application asks for a digital image, a print sheet is not the right output. Follow the portal's pixel, file-size, and aspect-ratio instructions instead, and use the original photo when preparing a digital copy."] },
    ],
  },
  {
    slug: "webp-vs-jpg-vs-png",
    title: "WebP vs JPG vs PNG: which image format should you use?",
    summary: "A straightforward guide to file size, transparency, compatibility, and everyday uses.",
    category: "Image formats",
    intro: "An image format affects file size, image quality, transparency, and compatibility. The best choice depends on where the image is going—not on a rule that one format is always best.",
    sections: [
      { heading: "JPEG / JPG: photos and broad compatibility", paragraphs: ["JPEG is widely supported and works well for photographs. It uses lossy compression, so saving repeatedly at low quality can add visible artifacts. JPEG does not support transparent backgrounds."] },
      { heading: "PNG: sharp graphics and transparency", paragraphs: ["PNG is useful for logos, screenshots, diagrams, and images that need transparency. It preserves exact pixel values, but photo files can be considerably larger than compressed JPEG or WebP versions."] },
      { heading: "WebP: a practical web format", paragraphs: ["WebP supports both lossy and lossless compression, plus transparency. It is supported by modern browsers and is often useful for websites, though older apps or workflows may still ask for JPEG or PNG."] },
      { heading: "A quick way to choose", bullets: ["Choose JPEG for photographs that need wide compatibility and no transparency.", "Choose PNG for crisp interface graphics or transparent backgrounds.", "Choose WebP for modern web delivery when the destination supports it.", "Check the upload form's accepted formats before converting an application photo."], paragraphs: ["Converting a file does not automatically improve its appearance. Keep an original, compare the result, and choose a format the destination accepts."] },
    ],
  },
  {
    slug: "private-image-processing-in-your-browser",
    title: "What it means when an image tool works in your browser",
    summary: "Understand local processing, what your browser still does, and how to handle sensitive files thoughtfully.",
    category: "Privacy",
    intro: "Some online utilities upload a file to a server, process it there, and return a result. A browser-based tool can instead use your device's own memory and processing power to create that result locally.",
    sections: [
      { heading: "Local processing, simply explained", paragraphs: ["When you select a file in PrepKit, the browser gives the page access to the selected file. JavaScript and browser features such as Canvas can transform image pixels, while a PDF library can read or create PDF bytes. The result is downloaded by your browser.", "PrepKit's image and PDF operations are designed to run in the browser; selected file contents are not sent to PrepKit's servers by those tools."] },
      { heading: "What this does—and does not—promise", paragraphs: ["Local processing reduces the need to send a document to a separate file-processing service. It is not a blanket guarantee about every part of your device or internet connection. Your browser, extensions, device security, network, and hosting provider have their own roles.", "Only use sensitive documents on a device and browser you trust. Keep original copies and avoid sharing generated files through channels you don't trust."] },
      { heading: "Why it can be useful", paragraphs: ["Processing locally can avoid an upload step, reduce server infrastructure for a utility site, and let a tool work without a file-processing backend. Very large files can still use substantial memory and battery on your device."] },
      { heading: "How to check a tool's privacy claim", bullets: ["Read the privacy policy and look for a clear explanation of file handling.", "For technical users, browser developer tools can show whether a page sends network requests while processing.", "Do not treat a privacy slogan as a substitute for reviewing the service and your device."], paragraphs: ["PrepKit aims to make this distinction clear: files selected for its tools are processed locally, while ordinary website delivery may still involve standard technical request data."] },
    ],
  },
];

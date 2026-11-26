"use client";

import {
  ArrowDownToLine,
  Check,
  FileImage,
  FilePlus2,
  FileText,
  ImagePlus,
  LoaderCircle,
  LockKeyhole,
  RefreshCw,
  ShieldCheck,
  Upload,
  X,
} from "lucide-react";
import { PDFDocument } from "pdf-lib";
import JSZip from "jszip";
import { ChangeEvent, DragEvent, useRef, useState } from "react";
import type { Tool } from "@/lib/tools";

type DownloadFile = { name: string; blob: Blob };
type SocialPreset = { label: string; width: number; height: number };
const MAX_FILE_BYTES = 25 * 1024 * 1024;
const MAX_TOTAL_BYTES = 100 * 1024 * 1024;
const MAX_FILES = 20;
const MAX_IMAGE_PIXELS = 40_000_000;
const MAX_PDF_PAGES = 500;

const socialPresets: SocialPreset[] = [
  { label: "Instagram post · Square", width: 1080, height: 1080 },
  { label: "Instagram post · Portrait", width: 1080, height: 1350 },
  { label: "Instagram Story / Reel", width: 1080, height: 1920 },
  { label: "LinkedIn post", width: 1200, height: 627 },
  { label: "YouTube thumbnail", width: 1280, height: 720 },
];

function formatBytes(bytes: number) {
  return bytes < 1024 * 1024
    ? `${Math.max(1, Math.round(bytes / 1024))} KB`
    : `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

function extensionFor(type: string) {
  if (type === "image/png") return "png";
  if (type === "image/webp") return "webp";
  return "jpg";
}

function canvasBlob(canvas: HTMLCanvasElement, type: string, quality = 0.92) {
  return new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          reject(new Error("Your browser could not create this image format."));
        } else if (blob.type !== type) {
          reject(new Error(`Your browser does not support exporting ${extensionFor(type).toUpperCase()} images.`));
        } else {
          resolve(blob);
        }
      },
      type,
      quality,
    );
  });
}

async function loadBitmap(file: File) {
  let bitmap: ImageBitmap;
  try {
    bitmap = await createImageBitmap(file);
  } catch {
    throw new Error("This image could not be opened. Try a smaller JPG, PNG, or WebP file.");
  }
  if (bitmap.width * bitmap.height > MAX_IMAGE_PIXELS) {
    bitmap.close();
    throw new Error("This image has too many pixels for safe browser processing. Try a smaller image.");
  }
  return bitmap;
}

async function imageBlob(file: File, type: string, quality = 0.92) {
  const image = await loadBitmap(file);
  const canvas = document.createElement("canvas");
  canvas.width = image.width;
  canvas.height = image.height;
  const context = canvas.getContext("2d");
  if (!context) {
    image.close();
    throw new Error("Your browser could not start image processing.");
  }
  if (type === "image/jpeg") {
    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, canvas.width, canvas.height);
  }
  context.drawImage(image, 0, 0);
  image.close();
  return canvasBlob(canvas, type, quality);
}

function download(blob: Blob, name: string) {
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = name;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function pdfBlob(bytes: Uint8Array) {
  const buffer = new ArrayBuffer(bytes.byteLength);
  new Uint8Array(buffer).set(bytes);
  return new Blob([buffer], { type: "application/pdf" });
}

function safeBaseName(name: string) {
  return name.replace(/\.[^.]+$/, "").replace(/[<>:"/\\|?*\u0000-\u001f]/g, "-") || "image";
}

function isSupportedImage(file: File) {
  return ["image/jpeg", "image/png", "image/webp"].includes(file.type)
    || /\.(jpe?g|png|webp)$/i.test(file.name);
}

async function compressToTarget(file: File, targetBytes: number): Promise<{ blob: Blob; resized: boolean }> {
  if (file.size <= targetBytes) return { blob: file, resized: false };
  const source = await loadBitmap(file);
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  if (!context) {
    source.close();
    throw new Error("Your browser could not start image processing.");
  }
  let width = source.width;
  let height = source.height;
  let best: Blob | undefined;
  let resized = false;

  for (let pass = 0; pass < 9; pass += 1) {
    canvas.width = width;
    canvas.height = height;
    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, width, height);
    context.drawImage(source, 0, 0, width, height);

    let low = 0.12;
    let high = 0.96;
    let passBest: Blob | undefined;
    for (let attempt = 0; attempt < 8; attempt += 1) {
      const quality = (low + high) / 2;
      const candidate = await canvasBlob(canvas, "image/jpeg", quality);
      if (!passBest || candidate.size < passBest.size) passBest = candidate;
      if (candidate.size <= targetBytes) {
        best = candidate;
        low = quality;
      } else {
        high = quality;
      }
    }
    if (passBest && (!best || (passBest.size < best.size && passBest.size > targetBytes))) best = passBest;
    if (best && best.size <= targetBytes) break;
    if (Math.min(width, height) <= 160) break;
    width = Math.max(160, Math.round(width * 0.86));
    height = Math.max(160, Math.round(height * 0.86));
    resized = true;
  }
  source.close();
  if (!best) throw new Error("The image could not be compressed.");
  return { blob: best, resized };
}

async function imageToPdf(files: File[]) {
  const pdf = await PDFDocument.create();
  for (const file of files) {
    let imageBytes: Uint8Array;
    let embedded: Awaited<ReturnType<typeof pdf.embedJpg>>;
    if (file.type === "image/png") {
      imageBytes = new Uint8Array(await file.arrayBuffer());
      embedded = await pdf.embedPng(imageBytes);
    } else {
      const blob = file.type === "image/jpeg" ? file : await imageBlob(file, "image/jpeg");
      imageBytes = new Uint8Array(await blob.arrayBuffer());
      embedded = await pdf.embedJpg(imageBytes);
    }
    const page = pdf.addPage([595.28, 841.89]);
    const margin = 28;
    const scale = Math.min((page.getWidth() - margin * 2) / embedded.width, (page.getHeight() - margin * 2) / embedded.height);
    const width = embedded.width * scale;
    const height = embedded.height * scale;
    page.drawImage(embedded, {
      x: (page.getWidth() - width) / 2,
      y: (page.getHeight() - height) / 2,
      width,
      height,
    });
  }
  return pdfBlob(await pdf.save());
}

function parsePageSelection(value: string, pageCount: number) {
  const pages = new Set<number>();
  const segments = value.split(",").map((part) => part.trim()).filter(Boolean);
  if (!segments.length) throw new Error("Enter at least one page number or range.");
  for (const segment of segments) {
    const match = /^(\d+)(?:\s*-\s*(\d+))?$/.exec(segment);
    if (!match) throw new Error("Use page numbers and ranges like 1,3-5.");
    const start = Number(match[1]);
    const end = Number(match[2] ?? match[1]);
    if (start < 1 || end < start || end > pageCount) {
      throw new Error(`Page numbers must be between 1 and ${pageCount}.`);
    }
    for (let page = start; page <= end; page += 1) pages.add(page - 1);
  }
  return [...pages].sort((a, b) => a - b);
}

export default function ToolWorkspace({
  tool,
  initialTargetKb,
}: {
  tool: Tool;
  initialTargetKb?: number;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [targetKb, setTargetKb] = useState(initialTargetKb ?? 50);
  const [format, setFormat] = useState("image/webp");
  const [photoSize, setPhotoSize] = useState("35x45");
  const [socialPreset, setSocialPreset] = useState(socialPresets[0]);
  const [fitMode, setFitMode] = useState<"fill" | "fit">("fill");
  const [pdfMode, setPdfMode] = useState<"merge" | "split">("merge");
  const [pageSelection, setPageSelection] = useState("1");
  const [separatePages, setSeparatePages] = useState(false);
  const [outputs, setOutputs] = useState<DownloadFile[]>([]);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [busy, setBusy] = useState(false);
  const [dragging, setDragging] = useState(false);

  const chooseFiles = (selected: FileList | File[]) => {
    const selectedFiles = Array.from(selected);
    const valid = selectedFiles.filter((file) => {
      if (tool.id === "merge-pdf") return file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf");
      return isSupportedImage(file);
    });
    if (!valid.length) {
      setError(tool.id === "merge-pdf" ? "Choose a PDF file to continue." : "Choose a supported image file to continue.");
      return;
    }
    if (valid.some((file) => file.size > MAX_FILE_BYTES)) {
      setError("Each file must be 25 MB or smaller to help keep browser memory use manageable.");
      return;
    }
    if (valid.length > MAX_FILES) {
      setError(`Choose no more than ${MAX_FILES} files at a time.`);
      return;
    }
    if (valid.reduce((total, file) => total + file.size, 0) > MAX_TOTAL_BYTES) {
      setError("The selected files together must be 100 MB or smaller.");
      return;
    }
    setFiles(tool.multiple ? valid : valid.slice(0, 1));
    setOutputs([]);
    setError("");
    setNotice("");
  };

  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) chooseFiles(event.target.files);
    event.target.value = "";
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragging(false);
    chooseFiles(event.dataTransfer.files);
  };

  const removeFile = (index: number) => {
    setFiles((current) => current.filter((_, fileIndex) => fileIndex !== index));
    setOutputs([]);
  };

  const makePassportSheet = async (file: File) => {
    const source = await loadBitmap(file);
    const [sizeWide, sizeTall] = photoSize.split("x").map(Number);
    const photoWidth = photoSize === "2x2" ? Math.round(sizeWide * 300) : Math.round((sizeWide / 25.4) * 300);
    const photoHeight = photoSize === "2x2" ? Math.round(sizeTall * 300) : Math.round((sizeTall / 25.4) * 300);
    const sheetWidth = Math.round((210 / 25.4) * 300);
    const sheetHeight = Math.round((297 / 25.4) * 300);
    const margin = 90;
    const gap = 28;
    const columns = Math.floor((sheetWidth - margin * 2 + gap) / (photoWidth + gap));
    const rows = Math.floor((sheetHeight - margin * 2 + gap) / (photoHeight + gap));
    const canvas = document.createElement("canvas");
    canvas.width = sheetWidth;
    canvas.height = sheetHeight;
    const context = canvas.getContext("2d");
    if (!context) {
      source.close();
      throw new Error("Your browser could not create the print sheet.");
    }
    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, sheetWidth, sheetHeight);
    const cropScale = Math.max(photoWidth / source.width, photoHeight / source.height);
    const cropWidth = photoWidth / cropScale;
    const cropHeight = photoHeight / cropScale;
    const sourceX = (source.width - cropWidth) / 2;
    const sourceY = (source.height - cropHeight) / 2;
    for (let row = 0; row < rows; row += 1) {
      for (let column = 0; column < columns; column += 1) {
        const x = margin + column * (photoWidth + gap);
        const y = margin + row * (photoHeight + gap);
        context.drawImage(source, sourceX, sourceY, cropWidth, cropHeight, x, y, photoWidth, photoHeight);
        context.strokeStyle = "#9ca3af";
        context.lineWidth = 2;
        context.strokeRect(x, y, photoWidth, photoHeight);
      }
    }
    source.close();
    return canvasBlob(canvas, "image/jpeg", 0.95);
  };

  const makeSocialImage = async (file: File) => {
    const source = await loadBitmap(file);
    const canvas = document.createElement("canvas");
    canvas.width = socialPreset.width;
    canvas.height = socialPreset.height;
    const context = canvas.getContext("2d");
    if (!context) {
      source.close();
      throw new Error("Your browser could not resize this image.");
    }
    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, canvas.width, canvas.height);
    const scale = fitMode === "fill"
      ? Math.max(canvas.width / source.width, canvas.height / source.height)
      : Math.min(canvas.width / source.width, canvas.height / source.height);
    const width = source.width * scale;
    const height = source.height * scale;
    context.drawImage(source, (canvas.width - width) / 2, (canvas.height - height) / 2, width, height);
    source.close();
    return canvasBlob(canvas, "image/jpeg", 0.92);
  };

  const process = async () => {
    if (!files.length) {
      setError("Add a file before starting.");
      return;
    }
    setBusy(true);
    setError("");
    setNotice("");
    setOutputs([]);
    try {
      let nextOutputs: DownloadFile[] = [];
      if (tool.id === "compress-image") {
        if (!Number.isFinite(targetKb) || targetKb < 1 || targetKb > 50000) {
          throw new Error("Choose a target between 1 KB and 50,000 KB.");
        }
        const result = await compressToTarget(files[0], targetKb * 1024);
        const name = `${safeBaseName(files[0].name)}-${targetKb}kb.${result.blob === files[0] ? files[0].name.split(".").pop() : "jpg"}`;
        nextOutputs = [{ name, blob: result.blob }];
        if (result.blob.size > targetKb * 1024) {
          setNotice("The smallest practical result is still above your target. Try a larger target for better quality.");
        } else if (result.resized) {
          setNotice("To meet your target, the image dimensions were reduced as well as its quality.");
        } else if (result.blob === files[0]) {
          setNotice("This image is already below your target, so the original quality was kept.");
        }
      } else if (tool.id === "convert-image") {
        if (!["image/jpeg", "image/png", "image/webp"].includes(format)) throw new Error("Choose a supported output format.");
        const converted: DownloadFile[] = [];
        for (const file of files) {
          const blob = await imageBlob(file, format);
          converted.push({ name: `${safeBaseName(file.name)}.${extensionFor(format)}`, blob });
        }
        nextOutputs = converted;
      } else if (tool.id === "passport-photo") {
        const sheet = await makePassportSheet(files[0]);
        const pdf = await PDFDocument.create();
        const embedded = await pdf.embedJpg(new Uint8Array(await sheet.arrayBuffer()));
        const page = pdf.addPage([595.28, 841.89]);
        page.drawImage(embedded, { x: 0, y: 0, width: page.getWidth(), height: page.getHeight() });
        nextOutputs = [{ name: `${safeBaseName(files[0].name)}-photo-sheet.pdf`, blob: pdfBlob(await pdf.save()) }];
        setNotice("Print at 100% / actual size and turn off fit-to-page scaling. Check your destination's official photo rules.");
      } else if (tool.id === "social-resizer") {
        const blob = await makeSocialImage(files[0]);
        nextOutputs = [{ name: `${safeBaseName(files[0].name)}-${socialPreset.width}x${socialPreset.height}.jpg`, blob }];
      } else if (tool.id === "image-to-pdf") {
        const blob = await imageToPdf(files);
        nextOutputs = [{ name: "images.pdf", blob }];
      } else if (tool.id === "merge-pdf") {
        if (pdfMode === "merge") {
          if (files.length < 2) throw new Error("Choose at least two PDF files to merge, or switch to Split pages.");
          const merged = await PDFDocument.create();
          let totalPages = 0;
          for (const file of files) {
            const pdf = await PDFDocument.load(await file.arrayBuffer());
            totalPages += pdf.getPageCount();
            if (totalPages > MAX_PDF_PAGES) throw new Error(`PDFs are limited to ${MAX_PDF_PAGES} pages per operation.`);
            const pages = await merged.copyPages(pdf, pdf.getPageIndices());
            pages.forEach((page) => merged.addPage(page));
          }
          nextOutputs = [{ name: "merged-document.pdf", blob: pdfBlob(await merged.save()) }];
        } else {
          if (files.length !== 1) throw new Error("Select exactly one PDF to split.");
          const source = await PDFDocument.load(await files[0].arrayBuffer());
          if (source.getPageCount() > MAX_PDF_PAGES) throw new Error(`PDFs are limited to ${MAX_PDF_PAGES} pages per operation.`);
          const pageIndexes = parsePageSelection(pageSelection, source.getPageCount());
          if (separatePages) {
            const zip = new JSZip();
            for (const pageIndex of pageIndexes) {
              const extracted = await PDFDocument.create();
              const [page] = await extracted.copyPages(source, [pageIndex]);
              extracted.addPage(page);
              zip.file(`page-${pageIndex + 1}.pdf`, await extracted.save());
            }
            nextOutputs = [{ name: "split-pages.zip", blob: await zip.generateAsync({ type: "blob" }) }];
          } else {
            const extracted = await PDFDocument.create();
            const pages = await extracted.copyPages(source, pageIndexes);
            pages.forEach((page) => extracted.addPage(page));
            nextOutputs = [{ name: "selected-pages.pdf", blob: pdfBlob(await extracted.save()) }];
          }
        }
      }
      setOutputs(nextOutputs);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "The file could not be processed. Please try another file.");
    } finally {
      setBusy(false);
    }
  };

  const downloadAll = async () => {
    if (!outputs.length) return;
    if (outputs.length === 1) {
      download(outputs[0].blob, outputs[0].name);
      return;
    }
    const zip = new JSZip();
    outputs.forEach((output) => zip.file(output.name, output.blob));
    download(await zip.generateAsync({ type: "blob" }), "prepkit-files.zip");
  };

  const isPdf = tool.id === "merge-pdf";
  const showPicker = files.length === 0;

  return (
    <div className="workspace">
      <div className="workspace-topline">
        <div>
          <span className="eyebrow">{tool.category} TOOL</span>
          <h1>{tool.title}</h1>
          <p>{tool.detail}</p>
        </div>
        <div className="privacy-chip"><LockKeyhole size={15} /> Private by design</div>
      </div>

      <div className="tool-panel">
        <div className="panel-heading">
          <span className="step-number">01</span>
          <div><h2>Add your file{tool.multiple ? "s" : ""}</h2><p>Nothing leaves your device.</p></div>
        </div>

        <input
          ref={inputRef}
          className="visually-hidden"
          type="file"
          accept={tool.accepted}
          multiple={tool.multiple}
          onChange={handleInput}
          aria-label={`Choose ${isPdf ? "PDF" : "image"} file${tool.multiple ? "s" : ""}`}
        />
        {showPicker ? (
          <div
            className={`dropzone ${dragging ? "dropzone-active" : ""}`}
            onDragOver={(event) => { event.preventDefault(); setDragging(true); }}
            onDragLeave={() => setDragging(false)}
            onDrop={handleDrop}
          >
            <div className="upload-icon">{isPdf ? <FilePlus2 size={25} /> : <ImagePlus size={25} />}</div>
            <strong>Drop your {isPdf ? "PDFs" : "image"} here</strong>
            <span>or browse files from your device</span>
            <button type="button" className="button button-dark browse-button" onClick={() => inputRef.current?.click()}>
              <Upload size={15} /> Choose {isPdf ? "PDF" : "image"}{tool.multiple ? "s" : ""}
            </button>
            <small>{isPdf ? "PDF files" : "JPG, PNG, or WebP"} · Processed locally</small>
          </div>
        ) : (
          <div className="file-list">
            {files.map((file, index) => (
              <div className="file-row" key={`${file.name}-${file.lastModified}-${index}`}>
                <span className="file-icon">{isPdf ? <FileText size={19} /> : <FileImage size={19} />}</span>
                <span className="file-meta"><strong>{file.name}</strong><small>{formatBytes(file.size)}</small></span>
                <button type="button" className="icon-button" aria-label={`Remove ${file.name}`} onClick={() => removeFile(index)}><X size={17} /></button>
              </div>
            ))}
            {tool.multiple && (
              <button type="button" className="add-more-button" onClick={() => inputRef.current?.click()}>
                <FilePlus2 size={16} /> Add more files
              </button>
            )}
          </div>
        )}

        {tool.id === "compress-image" && (
          <div className="option-block">
            <label htmlFor="target-size">Maximum file size</label>
            <div className="input-with-suffix"><input id="target-size" type="number" min="1" max="50000" value={targetKb} onChange={(event) => setTargetKb(Number(event.target.value))} /><span>KB</span></div>
            <div className="quick-sizes">{[20, 50, 100, 200].map((size) => <button key={size} type="button" className={targetKb === size ? "size-active" : ""} onClick={() => setTargetKb(size)}>{size} KB</button>)}</div>
          </div>
        )}

        {tool.id === "convert-image" && (
          <div className="option-block">
            <label htmlFor="output-format">Convert to</label>
            <select id="output-format" value={format} onChange={(event) => setFormat(event.target.value)}>
              <option value="image/webp">WebP · smaller for web</option><option value="image/jpeg">JPG · widely supported</option><option value="image/png">PNG · supports transparency</option>
            </select>
          </div>
        )}

        {tool.id === "passport-photo" && (
          <div className="option-block">
            <label htmlFor="photo-size">Photo print size</label>
            <select id="photo-size" value={photoSize} onChange={(event) => setPhotoSize(event.target.value)}>
              <option value="35x45">35 × 45 mm · common passport size</option><option value="2x2">2 × 2 in · US-style</option>
            </select>
          </div>
        )}

        {tool.id === "social-resizer" && (
          <>
            <div className="option-block">
              <label htmlFor="social-size">Output dimensions</label>
              <select id="social-size" value={socialPreset.label} onChange={(event) => setSocialPreset(socialPresets.find((preset) => preset.label === event.target.value) ?? socialPresets[0])}>
                {socialPresets.map((preset) => <option key={preset.label} value={preset.label}>{preset.label} · {preset.width} × {preset.height}</option>)}
              </select>
            </div>
            <div className="option-block">
              <label htmlFor="fit-mode">Image fit</label>
              <select id="fit-mode" value={fitMode} onChange={(event) => setFitMode(event.target.value as "fill" | "fit")}>
                <option value="fill">Fill frame · crop edges</option><option value="fit">Fit image · keep whole photo</option>
              </select>
            </div>
          </>
        )}

        {tool.id === "merge-pdf" && (
          <>
            <div className="mode-toggle" role="group" aria-label="PDF operation">
              <button type="button" className={pdfMode === "merge" ? "mode-active" : ""} onClick={() => { setPdfMode("merge"); setError(""); }}>Merge PDFs</button>
              <button type="button" className={pdfMode === "split" ? "mode-active" : ""} onClick={() => { setPdfMode("split"); setError(""); }}>Split pages</button>
            </div>
            {pdfMode === "split" && (
              <div className="option-block">
                <label htmlFor="page-selection">Pages to extract</label>
                <input id="page-selection" type="text" value={pageSelection} onChange={(event) => setPageSelection(event.target.value)} placeholder="e.g. 1, 3-5" />
                <label className="checkbox-row"><input type="checkbox" checked={separatePages} onChange={(event) => setSeparatePages(event.target.checked)} /> Download each page as a separate PDF in a ZIP</label>
              </div>
            )}
          </>
        )}

        <button type="button" className="button button-primary process-button" onClick={process} disabled={busy || !files.length}>
          {busy ? <><LoaderCircle className="spin" size={17} /> Working on your file…</> : <><RefreshCw size={16} /> {tool.id === "compress-image" ? "Compress image" : tool.id === "convert-image" ? "Convert image" : tool.id === "passport-photo" ? "Create photo sheet" : tool.id === "social-resizer" ? "Resize image" : tool.id === "image-to-pdf" ? "Create PDF" : pdfMode === "merge" ? "Merge PDFs" : "Extract pages"}</>}
        </button>

        {error && <div className="message message-error" role="alert">{error}</div>}
        {notice && <div className="message message-notice" role="status">{notice}</div>}
        {outputs.length > 0 && (
          <div className="result-card" role="status">
            <span className="result-check"><Check size={19} /></span>
            <div className="result-copy"><strong>Your file is ready</strong>{outputs.map((output) => <small key={output.name}>{output.name} · {formatBytes(output.blob.size)}</small>)}</div>
            <button type="button" className="button button-dark download-button" onClick={downloadAll}><ArrowDownToLine size={16} /> Download{outputs.length > 1 ? " all" : ""}</button>
          </div>
        )}
      </div>
      <p className="local-note"><ShieldCheck size={15} /> Your files are processed on this device and are never uploaded.</p>
    </div>
  );
}

export function ToolInstructions({ tool }: { tool: Tool }) {
  return (
    <section className="tool-info">
      <div className="info-copy">
        <span className="eyebrow">A LITTLE MORE ABOUT IT</span>
        <h2>Simple tools.<br />Thoughtful details.</h2>
        <p>{tool.detail}</p>
        <ol className="instruction-list">
          {tool.steps.map((step, index) => <li key={step}><span>{String(index + 1).padStart(2, "0")}</span>{step}</li>)}
        </ol>
      </div>
      <div className="faq-list">
        <span className="eyebrow">GOOD TO KNOW</span>
        <h2>Frequently asked</h2>
        {tool.faqs.map((faq) => <details key={faq.question}><summary>{faq.question}</summary><p>{faq.answer}</p></details>)}
      </div>
    </section>
  );
}

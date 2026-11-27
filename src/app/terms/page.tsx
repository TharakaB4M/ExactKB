import Editorial from "@/components/Editorial";
import { getPageMetadata } from "@/lib/site-url";

export const metadata = getPageMetadata(
  "/terms",
  "Terms of Use",
  "Terms for using PrepKit's free, browser-based image and PDF utilities.",
);

export default function TermsPage() {
  return (
    <Editorial eyebrow="THE IMPORTANT BITS" title="A few fair ground rules." lead="By using PrepKit, you agree to these straightforward terms. If you don&apos;t agree, please don&apos;t use the tools.">
      <h2>What PrepKit does</h2>
      <p>PrepKit provides browser-based utilities to help prepare images and PDF documents. Tools are provided free of charge and may change, be unavailable, or be removed without notice.</p>
      <h2>Use your own judgment</h2>
      <p>Results depend on your original files, browser, and chosen settings. We don&apos;t guarantee a particular file size, visual quality, print result, or acceptance by any application, government authority, employer, or online platform. Verify the receiving organization&apos;s requirements before relying on a result.</p>
      <h2>Your files and your responsibilities</h2>
      <p>You keep ownership of the files you select. You are responsible for having the right to use them and for keeping a copy of important originals. PrepKit does not upload your selected files, but you should use a trusted device and browser when handling sensitive documents.</p>
      <h2>Acceptable use</h2>
      <p>Do not misuse the website, interfere with its operation, or use it in a way that violates applicable law or another person&apos;s rights.</p>
      <h2>No warranties</h2>
      <p>The tools are provided “as is” and “as available,” to the extent allowed by applicable law. To the extent allowed by law, PrepKit disclaims warranties and liability for loss arising from use of the website or its output.</p>
      <h2>Updates and contact</h2>
      <p>We may update these terms as the service changes. Questions can be sent through the <a href="/contact">contact page</a>.</p>
    </Editorial>
  );
}

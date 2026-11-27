import Editorial from "@/components/Editorial";
import { getPageMetadata } from "@/lib/site-url";

export const metadata = getPageMetadata(
  "/privacy-policy",
  "Privacy Policy",
  "Learn how PrepKit handles your information and why files stay in your browser.",
);

export default function PrivacyPolicyPage() {
  return (
    <Editorial eyebrow="THE IMPORTANT BITS" title="Privacy, in plain language." lead="PrepKit is designed so your images and PDFs stay on your device while you use our tools. This page explains what that means.">
      <h2>Files you choose</h2>
      <p>Image compression, conversion, resizing, image-to-PDF creation, and PDF operations run in your browser. The files you select are not uploaded to PrepKit&apos;s servers. Closing the page clears the tool&apos;s working state; generated downloads are saved by your browser to the location you choose.</p>
      <h2>Information about your visit</h2>
      <p>The website does not require an account. Your hosting provider may receive standard technical request information, such as an IP address, browser details, and requested page, to deliver and protect the website. Google may also receive information from your browser when its advertising script loads or ads are displayed. We do not use this information to inspect the contents of your local files.</p>
      <h2>Cookies and advertising</h2>
      <p>PrepKit loads Google AdSense, an advertising service provided by Google. Google and its partners may use cookies or similar technologies to serve, measure, and personalize ads, subject to your location, consent choices, and Google&apos;s settings. These technologies and related data may include information about your browser, device, and interaction with ads. Learn more in <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer">Google&apos;s advertising information</a> and manage available ad personalization settings at <a href="https://myadcenter.google.com/" target="_blank" rel="noopener noreferrer">My Ad Center</a>.</p>
      <p>Where the law requires it, we must obtain consent before using non-essential advertising cookies or serving personalized ads. Consent options and availability may depend on your region and the consent tools configured on the site. Third-party advertising is also subject to Google&apos;s own privacy policy and terms. PrepKit does not currently use a separate analytics service.</p>
      <h2>Children and sensitive information</h2>
      <p>PrepKit is a general-purpose utility, not a service for collecting children&apos;s information. Do not send sensitive documents or personal data to us for support. File processing happens locally, but downloaded files remain under your browser and device settings.</p>
      <h2>Policy updates</h2>
      <p>We may update this notice when the site changes. The latest version will always be available on this page.</p>
      <h2>Questions</h2>
      <p>For privacy questions, please use the <a href="/contact">contact page</a>.</p>
    </Editorial>
  );
}

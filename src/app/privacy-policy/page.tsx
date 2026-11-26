import type { Metadata } from "next";
import Editorial from "@/components/Editorial";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Learn how PrepKit handles your information and why files stay in your browser.",
};

export default function PrivacyPolicyPage() {
  return (
    <Editorial eyebrow="THE IMPORTANT BITS" title="Privacy, in plain language." lead="PrepKit is designed so your images and PDFs stay on your device while you use our tools. This page explains what that means.">
      <h2>Files you choose</h2>
      <p>Image compression, conversion, resizing, image-to-PDF creation, and PDF operations run in your browser. The files you select are not uploaded to PrepKit&apos;s servers. Closing the page clears the tool&apos;s working state; generated downloads are saved by your browser to the location you choose.</p>
      <h2>Information about your visit</h2>
      <p>The website does not currently require an account. Your hosting provider may receive standard technical request information, such as an IP address, browser details, and requested page, to deliver and protect the website. We do not use that information to inspect the contents of your local files.</p>
      <h2>Cookies, analytics, and advertising</h2>
      <p>PrepKit does not currently include advertising or analytics integrations. If we add analytics, advertising, or other non-essential cookies in the future, we will update this policy and provide any consent or controls required by applicable law. Third-party services may collect information under their own privacy policies when introduced.</p>
      <h2>Children and sensitive information</h2>
      <p>PrepKit is a general-purpose utility, not a service for collecting children&apos;s information. Do not send sensitive documents or personal data to us for support. File processing happens locally, but downloaded files remain under your browser and device settings.</p>
      <h2>Policy updates</h2>
      <p>We may update this notice when the site changes. The latest version will always be available on this page.</p>
      <h2>Questions</h2>
      <p>For privacy questions, please use the <a href="/contact">contact page</a>.</p>
    </Editorial>
  );
}

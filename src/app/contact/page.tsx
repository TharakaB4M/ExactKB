import Editorial from "@/components/Editorial";
import { getPageMetadata } from "@/lib/site-url";

export const metadata = getPageMetadata(
  "/contact",
  "Contact",
  "Get in touch with the PrepKit team about a tool, accessibility, or a support issue.",
);

export default function ContactPage() {
  const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL || "venomtracker000@gmail.com";
  return (
    <Editorial title="We&apos;d love to hear from you." lead="Found something confusing, have an idea for a useful tool, or need to report a problem? Send us a note.">
      <h2>Get in touch</h2>
      <div className="contact-card"><strong>Email</strong><a href={`mailto:${email}`}>{email}</a><span>We aim to reply as soon as we can.</span></div>
      <p>Please don&apos;t send sensitive documents or personal information by email. Files selected in PrepKit tools are processed in your browser and aren&apos;t needed for support requests.</p>
    </Editorial>
  );
}

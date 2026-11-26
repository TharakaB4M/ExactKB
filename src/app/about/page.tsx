import type { Metadata } from "next";
import Editorial from "@/components/Editorial";

export const metadata: Metadata = {
  title: "About PrepKit",
  description: "Why we made PrepKit: simple, private image and PDF tools for everyday file-prep tasks.",
};

export default function AboutPage() {
  return (
    <Editorial title="A small toolkit for the things in between." lead="The application asks for a smaller photo. The form needs a PDF. A post needs one more resize. We made PrepKit for those in-between moments.">
      <h2>Useful tools, without the fuss</h2>
      <p>PrepKit brings common image and PDF tasks into one calm, simple place. Compress an image to a size limit, create a print sheet, convert formats, resize for social platforms, or prepare a PDF.</p>
      <h2>Privacy is part of the product</h2>
      <p>Where possible, each tool works locally in your web browser. Your selected files are processed on your device instead of being uploaded to PrepKit. We built it this way to keep the tools lightweight and your documents private.</p>
      <h2>Made to help, not to promise too much</h2>
      <p>We aim to make the file-preparation step easier. PrepKit cannot guarantee that a photo or document will meet a specific government, employer, school, or social platform&apos;s requirements. Always check the rules of the organization receiving your file.</p>
    </Editorial>
  );
}

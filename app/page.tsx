import fs from "node:fs";
import path from "node:path";
import SiteMotion from "./site-motion";

function getReferenceBody() {
  const file = path.join(process.cwd(), "reference", "source.html");
  const html = fs.readFileSync(file, "utf8");
  const body = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i)?.[1] ?? "";

  return body
    .replaceAll("./【公式】マシン専門ピラティススタジオ｜the SILK(ザ シルク)_files/", "/site-assets/")
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "")
    .replace(/<iframe\b[^>]*>[\s\S]*?<\/iframe>/gi, "")
    .replace(/<noscript\b[^>]*>[\s\S]*?<\/noscript>/gi, "")
    .replace(/\s(?:onclick|onload|onerror)=(?:"[^"]*"|'[^']*')/gi, "")
    .replace(/href="https:\/\/the-silk\.co\.jp\/?"/g, 'href="#top"')
    .replace(/href="https:\/\/the-silk\.co\.jp\/[^\"]*"/g, 'href="#"');
}

export default function Home() {
  const body = getReferenceBody();

  return (
    <>
      <a className="skip-link" href="#main-content">本文へ移動</a>
      <div
        id="top"
        className="reference-site"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: body }}
      />
      <SiteMotion />
    </>
  );
}

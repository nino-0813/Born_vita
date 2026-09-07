import fs from "node:fs";
import path from "node:path";
import SiteMotion from "./site-motion";

function getReferenceBody() {
  const file = path.join(process.cwd(), "reference", "source.html");
  const html = fs.readFileSync(file, "utf8");
  const body = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i)?.[1] ?? "";

  const cleaned = body
    .replaceAll("./【公式】マシン専門ピラティススタジオ｜the SILK(ザ シルク)_files/", "/site-assets/")
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "")
    .replace(/<iframe\b[^>]*>[\s\S]*?<\/iframe>/gi, "")
    .replace(/<noscript\b[^>]*>[\s\S]*?<\/noscript>/gi, "")
    .replace(/\s(?:onclick|onload|onerror)=(?:"[^"]*"|'[^']*')/gi, "")
    .replaceAll('style="position: fixed;"', "")
    .replace(/href="https:\/\/the-silk\.co\.jp\/?"/g, 'href="#top"')
    .replace(/href="https:\/\/the-silk\.co\.jp\/[^\"]*"/g, 'href="#"');

  const localIntro = `
    <section class="campaign-images" aria-label="サマーキャンペーン">
      <header class="campaign-heading">
        <span>Campaign</span>
        <h2>キャンペーン</h2>
      </header>
      <div class="campaign-visuals">
        <img src="/campaign/group-summer-campaign.png" alt="グループレッスン サマーキャンペーン。因島オープン記念価格や入会特典のご案内" width="1597" height="985">
        <img src="/campaign/personal-summer-campaign.png" alt="パーソナルレッスン サマーキャンペーン。体験特典とレッスンプランのご案内" width="1596" height="985" loading="lazy">
      </div>
      <a class="campaign-reserve-button" href="#about" aria-label="無料体験予約はこちら">
        <img src="/site-assets/cta-btn.png" alt="カンタン1分で入力完了！無料体験予約はこちら" width="1260" height="402" loading="lazy">
      </a>
    </section>
    <section class="innoshima-intro" aria-labelledby="innoshima-title">
      <p class="innoshima-brand">INNOSHIMA PILATES</p>
      <h1 id="innoshima-title">何歳からでも、<br><span>身体は整え直せる。</span></h1>
      <p class="innoshima-lead">肩こり・腰痛・姿勢の悩みに寄り添う、<br>因島の女性のための少人数ピラティス。</p>
      <a class="innoshima-cta" href="#about">はじめての体験レッスン <span>→</span></a>
    </section>`;

  return cleaned
    .replace('<section class="about-content">', '<section class="about-content" id="about">')
    .replace(/(<div class="hero"[^>]*>)/, `$1<div class="innoshima-hero-copy"><p>INNOSHIMA PILATES</p><h2>何歳からでも、<br>身体は整え直せる。</h2><span>因島の女性のための少人数ピラティス</span></div>`)
    .replace(/(<\/section>\s*<!-- 20260713 キャンペーンブロック -->)/, `$1${localIntro}`)
    .replaceAll("しなやかに生きる", "自分の身体と向き合う")
    .replace("「しなやかに生きる」", "「週1回、自分のための時間を」")
    .replace("ココロとカラダを大切にしながら、", "家族や仕事を優先してきた女性に、")
    .replace("無理をせず、自分らしく輝く。", "無理なく身体を整える時間を。")
    .replace("　「柔軟で上品かつ、<br class=\"sp-only\">自分の価値観を大事に強く生きる」", "「3か月後、鏡に映る姿勢と、<br class=\"sp-only\">毎朝の身体が変わること」")
    .replace("そんな女性たちの生き方を", "島で暮らす女性のこれからを")
    .replace("応援するのが、私たちの使命です。", "身体づくりから支えることが、私たちの使命です。")
    .replace("習慣化しているカラダの使い方を修正し、深層のコアから鍛えることで", "日々の姿勢や身体の使い方を見直し、無理なく体幹を整えることで")
    .replace("the SILKとは", "私たちのピラティス")
    .replace("レベル別・部位別で分かれた <br>\n              <span class=\"text-gold\">豊富なプログラム</span>", "一人ひとりの身体に寄り添う <br>\n              <span class=\"text-gold\">少人数レッスン</span>")
    .replace("専門監修者オリジナルプログラム全15種類をご用意。", "肩こり・腰痛・猫背・体型の変化など、今のお悩みを丁寧に確認します。")
    .replace("ご自身の経験・目的に合ったプログラムをお楽しみください。", "初心者の方も、同年代の仲間と安心して始められます。")
    .replace("駅チカで <br>\n              <span class=\"text-gold\">スタイリッシュなスタジオ</span>", "島内で無理なく通える <br>\n              <span class=\"text-gold\">身近なスタジオ</span>")
    .replace("「お客様」「インストラクター」全員が自信をもって<br class=\"on-pc\">輝ける場所を創りたい─", "若い人ばかりの場所は不安、という方にも<br class=\"on-pc\">ほっとしていただける場所を。")
    .replace("ライフスタイルに合わせた <br>\n              <span class=\"text-gold\">複数のプラン</span>", "変化が目に見える <br>\n              <span class=\"text-gold\">継続サポート</span>")
    .replace("週1回のピラティスで、ココロもカラダも健康に。", "週1回から、無理なく続けられる身体づくりを。")
    .replace("the SILKを探す", "因島で体験する")
    .replace("Location", "Trial lesson");
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

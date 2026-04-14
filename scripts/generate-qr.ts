/**
 * Generate QR codes for printable collateral.
 * Run: npx tsx scripts/generate-qr.ts
 */
import QRCode from 'qrcode';
import { writeFileSync } from 'fs';
import { join } from 'path';

const PUBLIC_DIR = join(process.cwd(), 'public');

type Target = {
  filename: string;
  url: string;
  label: string;
};

const targets: Target[] = [
  {
    filename: 'oem-qr.png',
    url: 'https://farhand.live/oem',
    label: 'OEM lead capture',
  },
  {
    filename: 'oem-qr.svg',
    url: 'https://farhand.live/oem',
    label: 'OEM lead capture (SVG)',
  },
];

async function main() {
  for (const t of targets) {
    const isSvg = t.filename.endsWith('.svg');
    const out = join(PUBLIC_DIR, t.filename);

    if (isSvg) {
      const svg = await QRCode.toString(t.url, {
        type: 'svg',
        errorCorrectionLevel: 'H',
        margin: 2,
        width: 800,
        color: { dark: '#000000', light: '#ffffff' },
      });
      writeFileSync(out, svg);
    } else {
      await QRCode.toFile(out, t.url, {
        errorCorrectionLevel: 'H',
        margin: 2,
        width: 1200,
        color: { dark: '#000000', light: '#ffffff' },
      });
    }
    console.log(`${t.label}: ${out}`);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

import sharp from 'sharp';

const src = 'public/logo-w-type-light.png';
const out = 'public/logo-w-type-light-on-dark.png';

const img = sharp(src).ensureAlpha();
const { data, info } = await img.raw().toBuffer({ resolveWithObject: true });
const { width, height, channels } = info;
console.log(`input: ${width}x${height}x${channels}`);

const buf = Buffer.from(data);
let whitened = 0, transparent = 0, kept = 0;
for (let i = 0; i < buf.length; i += channels) {
  const r = buf[i], g = buf[i+1], b = buf[i+2];
  const sum = r + g + b;
  const maxc = Math.max(r, g, b);
  const minc = Math.min(r, g, b);
  const sat = maxc - minc;
  if (sat < 25 && sum > 680) {
    buf[i+3] = 0;
    transparent++;
  } else if (sat < 25 && sum < 90) {
    buf[i] = 255; buf[i+1] = 255; buf[i+2] = 255; buf[i+3] = 255;
    whitened++;
  } else {
    kept++;
  }
}
console.log(`whitened=${whitened} transparent=${transparent} kept=${kept}`);

await sharp(buf, { raw: { width, height, channels } }).png().toFile(out);
console.log(`wrote ${out}`);

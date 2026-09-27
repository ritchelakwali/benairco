// Genereert public/og-image.jpg (1200x630) uit het vectorlogo.
// Gebruik: node scripts/generate-og-image.mjs
import sharp from 'sharp';

const W = 1200;
const H = 630;
const logoWidth = 980;

const logo = await sharp('public/brand/benairco-logo.svg', { density: 72 })
  .resize({ width: logoWidth })
  .png()
  .toBuffer();
const { height: logoHeight = 0 } = await sharp(logo).metadata();

const band = Buffer.from(
  `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="14">
    <rect width="${W / 2}" height="14" fill="#d7120b"/>
    <rect x="${W / 2}" width="${W / 2}" height="14" fill="#1d4fd8"/>
  </svg>`,
);

await sharp({ create: { width: W, height: H, channels: 3, background: '#ffffff' } })
  .composite([
    { input: logo, left: Math.round((W - logoWidth) / 2), top: Math.round((H - 14 - logoHeight) / 2) },
    { input: band, left: 0, top: H - 14 },
  ])
  .jpeg({ quality: 88, mozjpeg: true })
  .toFile('public/og-image.jpg');

console.log('public/og-image.jpg bijgewerkt');

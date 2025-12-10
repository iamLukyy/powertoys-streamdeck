const fs = require('fs');
const path = require('path');

// Working 72x72 orange PNG (base64) - tested and known to work
const ORANGE_72 = "iVBORw0KGgoAAAANSUhEUgAAAEgAAABICAIAAADajyQQAAAAaklEQVR42u3PMQEAAAwCoNm/9Er4CRHIUFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVfUBBgAA//8DAF4FAQAA";

// Create a colored 72x72 PNG using pure JS
function createSimplePNG(r, g, b, size) {
  const zlib = require('zlib');

  // PNG chunks
  const signature = Buffer.from([0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A]);

  // IHDR
  const ihdrData = Buffer.alloc(13);
  ihdrData.writeUInt32BE(size, 0);  // width
  ihdrData.writeUInt32BE(size, 4);  // height
  ihdrData[8] = 8;   // bit depth
  ihdrData[9] = 2;   // color type (RGB)
  ihdrData[10] = 0;  // compression
  ihdrData[11] = 0;  // filter
  ihdrData[12] = 0;  // interlace

  const ihdr = createChunk('IHDR', ihdrData);

  // IDAT - image data
  const rawData = Buffer.alloc(size * (1 + size * 3));
  let offset = 0;
  for (let y = 0; y < size; y++) {
    rawData[offset++] = 0; // filter byte
    for (let x = 0; x < size; x++) {
      rawData[offset++] = r;
      rawData[offset++] = g;
      rawData[offset++] = b;
    }
  }

  const compressed = zlib.deflateSync(rawData);
  const idat = createChunk('IDAT', compressed);

  // IEND
  const iend = createChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([signature, ihdr, idat, iend]);
}

function createChunk(type, data) {
  const length = Buffer.alloc(4);
  length.writeUInt32BE(data.length, 0);

  const typeBuffer = Buffer.from(type);
  const crcData = Buffer.concat([typeBuffer, data]);
  const crc = crc32(crcData);

  const crcBuffer = Buffer.alloc(4);
  crcBuffer.writeUInt32BE(crc, 0);

  return Buffer.concat([length, typeBuffer, data, crcBuffer]);
}

function crc32(buf) {
  let crc = 0xFFFFFFFF;
  for (let i = 0; i < buf.length; i++) {
    crc ^= buf[i];
    for (let j = 0; j < 8; j++) {
      crc = (crc >>> 1) ^ (crc & 1 ? 0xEDB88320 : 0);
    }
  }
  return (crc ^ 0xFFFFFFFF) >>> 0;
}

// Colors for each icon
const icons = {
  'plugin/icon': { r: 0, g: 120, b: 212, size: 144 },
  'plugin/category': { r: 0, g: 120, b: 212, size: 56 },

  'actions/colorpicker': { r: 255, g: 87, b: 34 },
  'actions/fancyzones': { r: 0, g: 120, b: 212 },
  'actions/fancyzoneseditor': { r: 0, g: 100, b: 180 },
  'actions/alwaysontop': { r: 0, g: 153, b: 204 },
  'actions/cropandlock': { r: 51, g: 153, b: 255 },
  'actions/workspaces': { r: 0, g: 102, b: 204 },
  'actions/imageresizer': { r: 16, g: 124, b: 16 },
  'actions/fileexplorer': { r: 255, g: 185, b: 0 },
  'actions/powerrename': { r: 0, g: 153, b: 51 },
  'actions/filelocksmith': { r: 153, g: 102, b: 51 },
  'actions/peek': { r: 102, g: 178, b: 255 },
  'actions/newplus': { r: 0, g: 200, b: 83 },
  'actions/keyboardmanager': { r: 107, g: 76, b: 154 },
  'actions/shortcutguide': { r: 136, g: 100, b: 170 },
  'actions/registrypreview': { r: 102, g: 51, b: 153 },
  'actions/environmentvariables': { r: 153, g: 102, b: 204 },
  'actions/cmdpal': { r: 88, g: 88, b: 88 },
  'actions/settings': { r: 100, g: 100, b: 100 },
  'actions/textextractor': { r: 255, g: 152, b: 0 },
  'actions/measuretool': { r: 255, g: 193, b: 7 },
  'actions/advancedpaste': { r: 233, g: 30, b: 99 },
  'actions/pasteplaintext': { r: 244, g: 67, b: 54 },
  'actions/findmymouse': { r: 0, g: 188, b: 212 },
  'actions/mousehighlighter': { r: 0, g: 150, b: 136 },
  'actions/mousejump': { r: 38, g: 166, b: 154 },
  'actions/mousecrosshairs': { r: 77, g: 182, b: 172 },
  'actions/mousewithoutborders': { r: 0, g: 172, b: 193 },
  'actions/cursorwrap': { r: 128, g: 222, b: 234 },
  'actions/powertoysrun': { r: 255, g: 193, b: 7 },
  'actions/awake': { r: 255, g: 213, b: 79 },
  'actions/hosts': { r: 200, g: 180, b: 100 },
  'actions/quickaccent': { r: 255, g: 224, b: 130 },
  'actions/zoomit': { r: 156, g: 39, b: 176 },
  'actions/lightswitch': { r: 255, g: 235, b: 59 },
};

const baseDir = path.join(__dirname, '..', 'com.powertoys.controller.sdPlugin', 'imgs');

// Create directories
['plugin', 'actions'].forEach(dir => {
  const p = path.join(baseDir, dir);
  if (!fs.existsSync(p)) fs.mkdirSync(p, { recursive: true });
});

// Generate
let count = 0;
for (const [name, cfg] of Object.entries(icons)) {
  const size = cfg.size || 72;
  const png = createSimplePNG(cfg.r, cfg.g, cfg.b, size);
  const png2x = createSimplePNG(cfg.r, cfg.g, cfg.b, size * 2);

  fs.writeFileSync(path.join(baseDir, `${name}.png`), png);
  fs.writeFileSync(path.join(baseDir, `${name}@2x.png`), png2x);

  count += 2;
  console.log(`${name}: ${png.length}b / ${png2x.length}b`);
}

console.log(`\nDone! ${count} files`);

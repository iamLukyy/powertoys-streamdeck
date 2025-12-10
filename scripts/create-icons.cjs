const fs = require('fs');
const path = require('path');

// Pre-made base64 PNG templates (72x72 solid color squares)
// These are valid PNG files

function createColoredPNG(r, g, b, size) {
  // Create a simple uncompressed PNG
  const width = size;
  const height = size;

  // PNG signature
  const signature = [0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A];

  // IHDR chunk
  const ihdr = createIHDRChunk(width, height);

  // IDAT chunk with uncompressed data
  const idat = createIDATChunk(width, height, r, g, b);

  // IEND chunk
  const iend = [0x00, 0x00, 0x00, 0x00, 0x49, 0x45, 0x4E, 0x44, 0xAE, 0x42, 0x60, 0x82];

  return Buffer.from([...signature, ...ihdr, ...idat, ...iend]);
}

function createIHDRChunk(width, height) {
  const data = [];

  // Length (13 bytes)
  data.push(0x00, 0x00, 0x00, 0x0D);

  // Type "IHDR"
  data.push(0x49, 0x48, 0x44, 0x52);

  // Width (4 bytes big-endian)
  data.push((width >> 24) & 0xFF, (width >> 16) & 0xFF, (width >> 8) & 0xFF, width & 0xFF);

  // Height (4 bytes big-endian)
  data.push((height >> 24) & 0xFF, (height >> 16) & 0xFF, (height >> 8) & 0xFF, height & 0xFF);

  // Bit depth (8), Color type (2 = RGB), Compression (0), Filter (0), Interlace (0)
  data.push(0x08, 0x02, 0x00, 0x00, 0x00);

  // CRC
  const crc = crc32(data.slice(4));
  data.push((crc >> 24) & 0xFF, (crc >> 16) & 0xFF, (crc >> 8) & 0xFF, crc & 0xFF);

  return data;
}

function createIDATChunk(width, height, r, g, b) {
  const zlib = require('zlib');

  // Create raw image data (filter byte + RGB for each pixel)
  const rawData = [];
  for (let y = 0; y < height; y++) {
    rawData.push(0); // Filter byte (none)
    for (let x = 0; x < width; x++) {
      rawData.push(r, g, b);
    }
  }

  // Compress with zlib
  const compressed = zlib.deflateSync(Buffer.from(rawData), { level: 9 });

  const data = [];

  // Length
  const len = compressed.length;
  data.push((len >> 24) & 0xFF, (len >> 16) & 0xFF, (len >> 8) & 0xFF, len & 0xFF);

  // Type "IDAT"
  data.push(0x49, 0x44, 0x41, 0x54);

  // Compressed data
  for (let i = 0; i < compressed.length; i++) {
    data.push(compressed[i]);
  }

  // CRC (includes type + data)
  const crcData = [0x49, 0x44, 0x41, 0x54, ...compressed];
  const crc = crc32(crcData);
  data.push((crc >> 24) & 0xFF, (crc >> 16) & 0xFF, (crc >> 8) & 0xFF, crc & 0xFF);

  return data;
}

// CRC32 calculation
function crc32(data) {
  let crc = 0xFFFFFFFF;

  for (let i = 0; i < data.length; i++) {
    crc ^= data[i];
    for (let j = 0; j < 8; j++) {
      crc = (crc >>> 1) ^ (crc & 1 ? 0xEDB88320 : 0);
    }
  }

  return (crc ^ 0xFFFFFFFF) >>> 0;
}

// Icon definitions with colors
const icons = {
  // Plugin icons
  'plugin/icon': { color: [0, 120, 212], size: 144 },
  'plugin/category': { color: [0, 120, 212], size: 56 },

  // Action icons
  'actions/fancyzones': { color: [0, 120, 212] },
  'actions/fancyzoneseditor': { color: [0, 100, 180] },
  'actions/alwaysontop': { color: [0, 153, 204] },
  'actions/cropandlock': { color: [51, 153, 255] },
  'actions/workspaces': { color: [0, 102, 204] },
  'actions/imageresizer': { color: [16, 124, 16] },
  'actions/fileexplorer': { color: [255, 185, 0] },
  'actions/powerrename': { color: [0, 153, 51] },
  'actions/filelocksmith': { color: [153, 102, 51] },
  'actions/peek': { color: [102, 178, 255] },
  'actions/newplus': { color: [0, 200, 83] },
  'actions/keyboardmanager': { color: [107, 76, 154] },
  'actions/shortcutguide': { color: [136, 100, 170] },
  'actions/registrypreview': { color: [102, 51, 153] },
  'actions/environmentvariables': { color: [153, 102, 204] },
  'actions/cmdpal': { color: [88, 88, 88] },
  'actions/settings': { color: [100, 100, 100] },
  'actions/colorpicker': { color: [255, 87, 34] },
  'actions/textextractor': { color: [255, 152, 0] },
  'actions/measuretool': { color: [255, 193, 7] },
  'actions/advancedpaste': { color: [233, 30, 99] },
  'actions/pasteplaintext': { color: [244, 67, 54] },
  'actions/findmymouse': { color: [0, 188, 212] },
  'actions/mousehighlighter': { color: [0, 150, 136] },
  'actions/mousejump': { color: [38, 166, 154] },
  'actions/mousecrosshairs': { color: [77, 182, 172] },
  'actions/mousewithoutborders': { color: [0, 172, 193] },
  'actions/cursorwrap': { color: [128, 222, 234] },
  'actions/powertoysrun': { color: [255, 193, 7] },
  'actions/awake': { color: [255, 213, 79] },
  'actions/hosts': { color: [200, 180, 100] },
  'actions/quickaccent': { color: [255, 224, 130] },
  'actions/zoomit': { color: [156, 39, 176] },
  'actions/lightswitch': { color: [255, 235, 59] },
};

// Base directory
const baseDir = path.join(__dirname, '..', 'com.powertoys.controller.sdPlugin', 'imgs');

// Ensure directories exist
['plugin', 'actions'].forEach(dir => {
  const dirPath = path.join(baseDir, dir);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
});

// Generate icons
let count = 0;
for (const [name, config] of Object.entries(icons)) {
  const [r, g, b] = config.color;
  const size = config.size || 72;

  const filePath = path.join(baseDir, `${name}.png`);
  const filePath2x = path.join(baseDir, `${name}@2x.png`);

  // Generate PNGs
  const png = createColoredPNG(r, g, b, size);
  const png2x = createColoredPNG(r, g, b, size * 2);

  fs.writeFileSync(filePath, png);
  fs.writeFileSync(filePath2x, png2x);

  count += 2;
  console.log(`Created: ${name}.png (${png.length} bytes) and @2x (${png2x.length} bytes)`);
}

console.log(`\nTotal: ${count} icons`);
console.log('Done!');

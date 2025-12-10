// Simple script to generate placeholder icons
// These are minimal 72x72 PNG images with text

const fs = require('fs');
const path = require('path');

// Base64 of a simple 72x72 blue PNG (PowerToys color)
const PLACEHOLDER_PNG_BASE64 = 'iVBORw0KGgoAAAANSUhEUgAAAEgAAABICAYAAABV7bNHAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAOxAAADsQBlSsOGwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAGlSURBVHic7dq9TsNAEATgmYMAoaGgoKChoYOKggJqCgooKCj4BbwA+gDvwSPQUFBQUFBQUFBQUCCBAokisyOtFFnend3zniTJZ/1s7e3sOQsAAAAAAAAAgGbLpl7AKtpFSy0ayrJoqEVDWTSUZdFQloZa1JdFQy0ayspsqEV9WTTUoqEsC7WoL4uGWjSUZdFQi/qyaKhFQ1kWDbWoL4uGWjSUZdFQi/qyaKhFQ1kWDbWoL4uGWjSUZdFQi/qy0KLpLBuLeNn4aLl92RhtNpb2YMuioRYNZVk01KK+LBpq0VCWRUMt6suioRYNZVk01KK+LBpq0VCWRUMt6suioRYNZVk01KK+LBpq0VCWRUMt6suioRYNZVk01KK+LBpq0VCW/0MAAAAAgP+iW7TUoqEsGsqyaCjLoqEWDWVZNNSioSwLtWhoy6KhFg1lWTTUor4sGmrRUJZFQy3qy6KhFg1lWTTUor4sGmrRUJZFQy3qy6KhFg1lWTTUor4stGg6y8YiXjY+Wm5fNkabjaU92LJoqEVDWRYNtWgoKwu1qC+LhgAAAAAAAIAf9gVOXB7zU+iHhwAAAABJRU5ErkJggg==';

const BASE_DIR = path.join(__dirname, '..', 'com.powertoys.controller.sdPlugin', 'imgs');

// Directories to create
const dirs = [
  'plugin',
  'toggle',
  'trigger'
];

// Icon files needed
const toggleIcons = [
  'fancyzones', 'imageresizer', 'fileexplorer', 'shortcutguide', 'powerrename',
  'keyboardmanager', 'powertoysrun', 'colorpicker', 'cropandlock', 'awake',
  'mousewithoutborders', 'findmymouse', 'mousehighlighter', 'mousejump',
  'alwaysontop', 'mousecrosshairs', 'quickaccent', 'textextractor',
  'advancedpaste', 'measuretool', 'hosts', 'filelocksmith', 'peek',
  'registrypreview', 'cmdnotfound', 'environmentvariables', 'newplus',
  'workspaces', 'cmdpal', 'zoomit', 'cursorwrap', 'lightswitch'
];

const triggerIcons = [
  'colorpicker', 'alwaysontop', 'fancyzoneseditor', 'textextractor',
  'shortcutguide', 'measuretool', 'findmymouse', 'mousehighlighter',
  'mousejump', 'mousecrosshairs', 'peek', 'advancedpaste', 'pasteplaintext',
  'cropandlock', 'cropandlock-thumb', 'workspaces', 'powertoysrun',
  'cmdpal', 'settings', 'awake-on', 'awake-off'
];

// Create directories
dirs.forEach(dir => {
  const fullPath = path.join(BASE_DIR, dir);
  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath, { recursive: true });
    console.log(`Created directory: ${fullPath}`);
  }
});

// Create placeholder PNG
const pngBuffer = Buffer.from(PLACEHOLDER_PNG_BASE64, 'base64');

// Create plugin icon
fs.writeFileSync(path.join(BASE_DIR, 'plugin', 'icon.png'), pngBuffer);
fs.writeFileSync(path.join(BASE_DIR, 'plugin', 'category.png'), pngBuffer);
console.log('Created plugin icons');

// Create toggle icons
toggleIcons.forEach(name => {
  fs.writeFileSync(path.join(BASE_DIR, 'toggle', `${name}.png`), pngBuffer);
  fs.writeFileSync(path.join(BASE_DIR, 'toggle', `${name}-on.png`), pngBuffer);
  fs.writeFileSync(path.join(BASE_DIR, 'toggle', `${name}-off.png`), pngBuffer);
});
console.log(`Created ${toggleIcons.length * 3} toggle icons`);

// Create trigger icons
triggerIcons.forEach(name => {
  fs.writeFileSync(path.join(BASE_DIR, 'trigger', `${name}.png`), pngBuffer);
});
console.log(`Created ${triggerIcons.length} trigger icons`);

console.log('Done! Placeholder icons created.');
console.log('Replace these with proper PowerToys-style icons later.');

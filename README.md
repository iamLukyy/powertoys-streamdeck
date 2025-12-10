# PowerToys Controller for Stream Deck

A Stream Deck plugin for complete control over Microsoft PowerToys modules.

![PowerToys](https://img.shields.io/badge/PowerToys-v0.96+-blue)
![Stream Deck](https://img.shields.io/badge/Stream%20Deck-6.6+-green)
![Windows](https://img.shields.io/badge/Windows-10%2F11-blue)

## Features

### Toggle Actions (17 modules)
Enable/disable PowerToys modules with visual ON/OFF state:

- **FancyZones** - Window management zones
- **Image Resizer** - Bulk image resizing
- **File Explorer Preview** - Preview handlers
- **PowerRename** - Bulk file renaming
- **Keyboard Manager** - Key remapping
- **Crop And Lock** - Window cropping
- **Awake** - Keep PC awake
- **Mouse Without Borders** - Multi-PC mouse sharing
- **Quick Accent** - Special characters
- **Hosts Editor** - Hosts file editing
- **File Locksmith** - File lock detection
- **Registry Preview** - .reg file preview
- **Environment Variables** - Env vars editor
- **New+** - File templates
- **ZoomIt** - Screen zoom/annotation
- **Cursor Wrap** - Cursor wrapping between monitors
- **Light Switch** - Theme switching

### Trigger Actions (21 features)
Activate PowerToys features with keyboard shortcuts:

- **Color Picker** - Pick any color (Win+Shift+C)
- **Always On Top** - Pin window (Win+Ctrl+T)
- **FancyZones Editor** - Edit zones (Win+Shift+`)
- **Text Extractor** - OCR text (Win+Shift+T)
- **Shortcut Guide** - Show shortcuts (Win+Shift+/)
- **Screen Ruler** - Measure pixels (Win+Ctrl+Shift+M)
- **Find My Mouse** - Spotlight cursor
- **Mouse Highlighter** - Highlight clicks
- **Mouse Jump** - Jump cursor
- **Mouse Crosshairs** - Show crosshairs (Win+Alt+P)
- **Peek** - File preview (Ctrl+Space)
- **Advanced Paste** - Paste options (Win+Shift+V)
- **Paste Plain Text** - Plain paste (Win+Ctrl+Alt+V)
- **Crop Window** - Crop and lock (Win+Ctrl+Shift+R)
- **Crop Thumbnail** - Thumbnail mode (Win+Ctrl+Shift+T)
- **Workspaces Editor** - Edit workspaces (Win+Ctrl+`)
- **PowerToys Run** - App launcher (Alt+Space)
- **Command Palette** - Commands (Win+Ctrl+Space)
- **PowerToys Settings** - Open settings
- **Keep Awake** - Stay awake mode
- **Sleep Normal** - Allow sleep

## Requirements

- **Windows 10/11**
- **Microsoft PowerToys** v0.96 or later - [Download](https://github.com/microsoft/PowerToys)
- **Elgato Stream Deck** software v6.6 or later

## Installation

### Option 1: Download Release
1. Download `com.powertoys.controller.streamDeckPlugin` from [Releases](../../releases)
2. Double-click to install
3. Restart Stream Deck

### Option 2: Manual Install
1. Clone this repository
2. Copy `com.powertoys.controller.sdPlugin` folder to:
   ```
   %APPDATA%\Elgato\StreamDeck\Plugins\
   ```
3. Restart Stream Deck

### Option 3: Development
```bash
# Clone repo
git clone https://github.com/user/powertoys-streamdeck.git
cd powertoys-streamdeck

# Install dependencies
npm install

# Build
npm run build

# Link to Stream Deck
npx @elgato/cli link com.powertoys.controller.sdPlugin
```

## Building from Source

```bash
# Install dependencies
npm install

# Build plugin
npm run build

# Create distributable package
npx @elgato/cli pack com.powertoys.controller.sdPlugin
```

## Project Structure

```
├── src/
│   ├── plugin.ts              # Entry point
│   ├── actions/
│   │   ├── toggle-action.ts   # Toggle ON/OFF actions
│   │   └── trigger-action.ts  # Trigger feature actions
│   ├── services/
│   │   ├── powertoys-service.ts   # PowerToys DSC integration
│   │   └── keyboard-service.ts    # Keyboard shortcut simulation
│   └── types/
│       └── index.ts           # TypeScript types
├── com.powertoys.controller.sdPlugin/
│   ├── manifest.json          # Plugin manifest
│   ├── bin/plugin.js          # Compiled code
│   └── imgs/                  # Icons
├── package.json
├── tsconfig.json
└── rollup.config.js
```

## How It Works

- **Toggle actions** use `PowerToys.DSC.exe` to enable/disable modules
- **Trigger actions** simulate keyboard shortcuts using [nut.js](https://github.com/nut-tree/nut.js)
- Icons are sourced from official PowerToys repository

## License

MIT License

## Credits

- [Microsoft PowerToys](https://github.com/microsoft/PowerToys)
- [Elgato Stream Deck SDK](https://developer.elgato.com/documentation/stream-deck/)
- [nut.js](https://github.com/nut-tree/nut.js) for keyboard simulation

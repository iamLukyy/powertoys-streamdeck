# PowerToys Controller for Stream Deck

A Stream Deck plugin to activate Microsoft PowerToys features with a single button press.

![PowerToys](https://img.shields.io/badge/PowerToys-v0.96+-blue)
![Stream Deck](https://img.shields.io/badge/Stream%20Deck-6.6+-green)
![Windows](https://img.shields.io/badge/Windows-10%2F11-blue)

## Features

### 19 Trigger Actions
Activate PowerToys features instantly:

| Action | Default Shortcut |
|--------|-----------------|
| Color Picker | Win+Shift+C |
| Always On Top | Win+Ctrl+T |
| FancyZones Editor | Win+Shift+` |
| Text Extractor (OCR) | Win+Shift+T |
| Shortcut Guide | Win+Shift+/ |
| Screen Ruler | Win+Ctrl+Shift+M |
| Find My Mouse | Double Ctrl |
| Mouse Highlighter | Win+Shift+H |
| Mouse Jump | Win+Shift+D |
| Mouse Crosshairs | Win+Alt+P |
| Peek | Ctrl+Space |
| Advanced Paste | Win+Shift+V |
| Paste Plain Text | Win+Ctrl+Alt+V |
| Crop Window | Win+Ctrl+Shift+R |
| Crop Thumbnail | Win+Ctrl+Shift+T |
| Workspaces Editor | Win+Ctrl+` |
| PowerToys Run | Alt+Space |
| Command Palette | Win+Ctrl+Space |
| PowerToys Settings | - |

### Shortcut Sync
Shortcuts are **automatically synced** from PowerToys settings. Change a shortcut in PowerToys and the plugin uses it immediately - no configuration needed!

View current shortcut in Property Inspector (right panel when action is selected).

## Requirements

- **Windows 10/11**
- **Microsoft PowerToys** v0.96+ - [Download](https://github.com/microsoft/PowerToys)
- **Elgato Stream Deck** software v6.6+

## Installation

### Option 1: Download Release (Recommended)
1. Download `com.powertoys.controller.streamDeckPlugin` from [Releases](../../releases/latest)
2. Double-click to install
3. Restart Stream Deck

### Option 2: Build from Source
```bash
git clone https://github.com/iamLukyy/powertoys-streamdeck.git
cd powertoys-streamdeck
npm install
npm run build
npx @elgato/cli link com.powertoys.controller.sdPlugin
```

## How It Works

- Reads keyboard shortcuts from PowerToys JSON settings (`%LOCALAPPDATA%\Microsoft\PowerToys\`)
- Simulates keyboard input using [nut.js](https://github.com/nut-tree/nut.js)
- Icons sourced from official PowerToys repository

## License

MIT License

## Credits

- [Microsoft PowerToys](https://github.com/microsoft/PowerToys)
- [Elgato Stream Deck SDK](https://developer.elgato.com/documentation/stream-deck/)
- [nut.js](https://github.com/nut-tree/nut.js) for keyboard simulation

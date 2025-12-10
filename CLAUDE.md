# PowerToys StreamDeck Plugin

## Popis projektu
StreamDeck XL plugin pro kompletní ovládání Microsoft PowerToys modulů.

## Stav projektu
- **Fáze:** Vytvořeno, potřebuje ověření s dokumentací
- **Build:** Funkční (`npm run build`)
- **Ikony:** Placeholder (modré čtverce)

## Struktura
```
C:\Users\lukyn\Powertoys_helper\
├── src/
│   ├── plugin.ts              # Entry point
│   ├── services/
│   │   ├── powertoys-service.ts   # PowerToys.DSC.exe wrapper
│   │   └── keyboard-service.ts    # Klávesové zkratky
│   ├── actions/
│   │   ├── toggle-action.ts   # Toggle on/off moduly
│   │   └── trigger-action.ts  # Spouštění funkcí
│   └── types/
│       └── index.ts           # TypeScript typy
├── com.powertoys.controller.sdPlugin/
│   ├── manifest.json          # Plugin definice
│   ├── bin/plugin.js          # Zkompilovaný kód
│   └── imgs/                  # Ikony
├── package.json
├── tsconfig.json
└── rollup.config.js
```

## DŮLEŽITÉ - Použij context7 MCP!

Před úpravami VŽDY pullni dokumentaci přes context7:

1. **StreamDeck SDK dokumentace:**
   - Elgato StreamDeck SDK
   - Manifest.json struktura
   - Action registration API

2. **PowerToys dokumentace:**
   - PowerToys.DSC.exe příkazy
   - Module names a settings
   - Keyboard shortcuts

## Příkazy

```bash
# Build
npm run build

# Watch mode
npm run watch

# Instalace do StreamDeck
# Zkopíruj com.powertoys.controller.sdPlugin do:
# %APPDATA%\Elgato\StreamDeck\Plugins\
```

## Co plugin dělá

### Toggle akce (32)
Zapnout/vypnout PowerToys moduly:
- FancyZones, PowerToys Run, Color Picker, Always On Top
- Awake, Text Extractor, Image Resizer, PowerRename
- Mouse utilities, Peek, Hosts Editor, atd.

### Trigger akce (21)
Spustit funkce klávesovými zkratkami:
- Color Picker (Win+Shift+C)
- PowerToys Run (Alt+Space)
- Text Extractor OCR (Win+Shift+T)
- Always On Top (Win+Ctrl+T)
- A další...

## PowerToys ovládání

Používá `PowerToys.DSC.exe`:
```powershell
# Cesta
C:\Program Files\PowerToys\PowerToys.DSC.exe

# Získat stav modulů
PowerToys.DSC.exe get --resource settings --module App

# Zapnout/vypnout modul
PowerToys.DSC.exe set --resource settings --module App --input "{\"settings\":{\"enabled\":{\"FancyZones\":true}}}"
```

## TODO po restartu

1. [ ] Pullnout StreamDeck SDK docs přes context7
2. [ ] Ověřit manifest.json strukturu
3. [ ] Ověřit action registration API
4. [ ] Pullnout PowerToys DSC docs
5. [ ] Ověřit module names
6. [ ] Otestovat plugin v StreamDeck
7. [ ] Vytvořit lepší ikony (volitelné)

## Známé problémy

- Ikony jsou placeholder (modré čtverce)
- Kód nebyl ověřen proti oficiální dokumentaci
- Potřebuje testování na reálném StreamDeck

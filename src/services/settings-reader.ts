import * as fs from "fs";
import * as path from "path";
import type { HotkeyDefinition } from "../types/index.js";

// Mapping module names to their settings folder names
const MODULE_FOLDER_NAMES: Record<string, string> = {
  "ColorPicker": "ColorPicker",
  "AlwaysOnTop": "AlwaysOnTop",
  "FancyZones": "FancyZones",
  "TextExtractor": "TextExtractor",
  "Shortcut Guide": "Shortcut Guide",
  "Measure Tool": "Measure Tool",
  "Peek": "Peek",
  "AdvancedPaste": "AdvancedPaste",
  "PastePlain": "AdvancedPaste",
  "PowerToys Run": "PowerToys Run",
  "CropAndLock": "CropAndLock",
  "Workspaces": "Workspaces",
  "CmdPal": "CmdPal",
  "FindMyMouse": "FindMyMouse",
  "MouseHighlighter": "MouseHighlighter",
  "MouseJump": "MouseJump",
  "MousePointerCrosshairs": "MousePointerCrosshairs"
};

// Mapping module names to hotkey paths within settings.json
const HOTKEY_PATHS: Record<string, string[]> = {
  "ColorPicker": ["properties", "ActivationShortcut"],
  "AlwaysOnTop": ["properties", "hotkey", "value"],
  "FancyZones": ["properties", "fancyzones_editor_hotkey", "value"],
  "TextExtractor": ["properties", "ActivationShortcut"],
  "Shortcut Guide": ["properties", "open_shortcutguide"],
  "Measure Tool": ["properties", "ActivationShortcut"],
  "Peek": ["properties", "ActivationShortcut"],
  "AdvancedPaste": ["properties", "advanced-paste-ui-hotkey"],
  "PastePlain": ["properties", "paste-as-plain-hotkey"],
  "PowerToys Run": ["properties", "open_powerlauncher"],
  "CropAndLock": ["properties", "ActivationShortcut"],
  "Workspaces": ["properties", "Hotkey", "value"],
  "CmdPal": ["properties", "open_hotkey", "value"]
};

// Virtual key code to key name mapping
const VK_TO_NAME: Record<number, string> = {
  // Letters
  65: "A", 66: "B", 67: "C", 68: "D", 69: "E", 70: "F", 71: "G", 72: "H",
  73: "I", 74: "J", 75: "K", 76: "L", 77: "M", 78: "N", 79: "O", 80: "P",
  81: "Q", 82: "R", 83: "S", 84: "T", 85: "U", 86: "V", 87: "W", 88: "X",
  89: "Y", 90: "Z",
  // Numbers
  48: "0", 49: "1", 50: "2", 51: "3", 52: "4", 53: "5", 54: "6", 55: "7",
  56: "8", 57: "9",
  // Special keys
  32: "Space", 13: "Enter", 9: "Tab", 27: "Esc", 8: "Backspace", 46: "Delete",
  // OEM keys
  186: ";", 187: "=", 188: ",", 189: "-", 190: ".", 191: "/", 192: "`",
  219: "[", 220: "\\", 221: "]", 222: "'"
};

interface PowerToysHotkey {
  win: boolean;
  ctrl: boolean;
  alt: boolean;
  shift: boolean;
  code: number;
  key?: string;
}

// Cache for settings
const settingsCache: Map<string, { hotkey: HotkeyDefinition; timestamp: number }> = new Map();
const CACHE_TTL = 5000; // 5 seconds

class SettingsReaderService {
  private powerToysPath: string;

  constructor() {
    this.powerToysPath = path.join(
      process.env.LOCALAPPDATA || "",
      "Microsoft",
      "PowerToys"
    );
  }

  /**
   * Get hotkey for a module from PowerToys settings
   */
  async getHotkey(moduleName: string): Promise<HotkeyDefinition | null> {
    // Check cache
    const cached = settingsCache.get(moduleName);
    if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
      return cached.hotkey;
    }

    try {
      const folderName = MODULE_FOLDER_NAMES[moduleName] || moduleName;
      const settingsPath = path.join(this.powerToysPath, folderName, "settings.json");

      if (!fs.existsSync(settingsPath)) {
        return null;
      }

      const content = fs.readFileSync(settingsPath, "utf-8");
      const settings = JSON.parse(content);

      const hotkeyPath = HOTKEY_PATHS[moduleName];
      if (!hotkeyPath) {
        return null;
      }

      // Navigate to hotkey in settings
      let hotkey: PowerToysHotkey | undefined = settings;
      for (const key of hotkeyPath) {
        hotkey = hotkey?.[key as keyof typeof hotkey] as PowerToysHotkey | undefined;
        if (!hotkey) break;
      }

      if (!hotkey || typeof hotkey.code !== "number") {
        return null;
      }

      const result: HotkeyDefinition = {
        code: hotkey.code,
        win: hotkey.win || false,
        ctrl: hotkey.ctrl || false,
        alt: hotkey.alt || false,
        shift: hotkey.shift || false
      };

      // Update cache
      settingsCache.set(moduleName, { hotkey: result, timestamp: Date.now() });

      return result;
    } catch {
      return null;
    }
  }

  /**
   * Convert hotkey to human-readable string
   */
  hotkeyToString(hotkey: HotkeyDefinition): string {
    const parts: string[] = [];

    if (hotkey.win) parts.push("Win");
    if (hotkey.ctrl) parts.push("Ctrl");
    if (hotkey.alt) parts.push("Alt");
    if (hotkey.shift) parts.push("Shift");

    const keyName = VK_TO_NAME[hotkey.code] || `Key${hotkey.code}`;
    parts.push(keyName);

    return parts.join("+");
  }

  /**
   * Clear cache for a specific module or all
   */
  clearCache(moduleName?: string): void {
    if (moduleName) {
      settingsCache.delete(moduleName);
    } else {
      settingsCache.clear();
    }
  }
}

export const settingsReader = new SettingsReaderService();

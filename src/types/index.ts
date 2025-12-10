// PowerToys module names as used by DSC.exe
export const POWERTOYS_MODULES = {
  FancyZones: "FancyZones",
  ImageResizer: "Image Resizer",
  FileExplorerPreview: "File Explorer Preview",
  ShortcutGuide: "Shortcut Guide",
  PowerRename: "PowerRename",
  KeyboardManager: "Keyboard Manager",
  PowerToysRun: "PowerToys Run",
  ColorPicker: "ColorPicker",
  CropAndLock: "CropAndLock",
  Awake: "Awake",
  MouseWithoutBorders: "MouseWithoutBorders",
  FindMyMouse: "FindMyMouse",
  MouseHighlighter: "MouseHighlighter",
  MouseJump: "MouseJump",
  AlwaysOnTop: "AlwaysOnTop",
  MousePointerCrosshairs: "MousePointerCrosshairs",
  QuickAccent: "QuickAccent",
  TextExtractor: "TextExtractor",
  AdvancedPaste: "AdvancedPaste",
  MeasureTool: "Measure Tool",
  Hosts: "Hosts",
  FileLocksmith: "File Locksmith",
  Peek: "Peek",
  RegistryPreview: "RegistryPreview",
  CmdNotFound: "CmdNotFound",
  EnvironmentVariables: "EnvironmentVariables",
  NewPlus: "NewPlus",
  Workspaces: "Workspaces",
  CmdPal: "CmdPal",
  ZoomIt: "ZoomIt",
  CursorWrap: "CursorWrap",
  LightSwitch: "LightSwitch"
} as const;

export type PowerToysModuleName = typeof POWERTOYS_MODULES[keyof typeof POWERTOYS_MODULES];

// Module display names for UI
export const MODULE_DISPLAY_NAMES: Record<string, string> = {
  "FancyZones": "FancyZones",
  "Image Resizer": "Image Resizer",
  "File Explorer Preview": "File Explorer",
  "Shortcut Guide": "Shortcut Guide",
  "PowerRename": "PowerRename",
  "Keyboard Manager": "Keyboard Manager",
  "PowerToys Run": "PowerToys Run",
  "ColorPicker": "Color Picker",
  "CropAndLock": "Crop And Lock",
  "Awake": "Awake",
  "MouseWithoutBorders": "Mouse Without Borders",
  "FindMyMouse": "Find My Mouse",
  "MouseHighlighter": "Mouse Highlighter",
  "MouseJump": "Mouse Jump",
  "AlwaysOnTop": "Always On Top",
  "MousePointerCrosshairs": "Mouse Crosshairs",
  "QuickAccent": "Quick Accent",
  "TextExtractor": "Text Extractor",
  "AdvancedPaste": "Advanced Paste",
  "Measure Tool": "Screen Ruler",
  "Hosts": "Hosts Editor",
  "File Locksmith": "File Locksmith",
  "Peek": "Peek",
  "RegistryPreview": "Registry Preview",
  "CmdNotFound": "Command Not Found",
  "EnvironmentVariables": "Environment Variables",
  "NewPlus": "New+",
  "Workspaces": "Workspaces",
  "CmdPal": "Command Palette",
  "ZoomIt": "ZoomIt",
  "CursorWrap": "Cursor Wrap",
  "LightSwitch": "Light Switch"
};

// Hotkey definition for trigger actions
export interface HotkeyDefinition {
  win?: boolean;
  ctrl?: boolean;
  alt?: boolean;
  shift?: boolean;
  code: number;
  key?: string;
}

// Default hotkeys for PowerToys features
export const DEFAULT_HOTKEYS: Record<string, HotkeyDefinition> = {
  ColorPicker: { win: true, shift: true, code: 67 }, // Win+Shift+C
  AlwaysOnTop: { win: true, ctrl: true, code: 84 }, // Win+Ctrl+T
  FancyZonesEditor: { win: true, shift: true, code: 192 }, // Win+Shift+`
  TextExtractor: { win: true, shift: true, code: 84 }, // Win+Shift+T
  ShortcutGuide: { win: true, shift: true, code: 191 }, // Win+Shift+/
  MeasureTool: { win: true, ctrl: true, shift: true, code: 77 }, // Win+Ctrl+Shift+M
  FindMyMouse: { win: true, shift: true, code: 70 }, // Win+Shift+F (double ctrl is actual)
  MouseHighlighter: { win: true, shift: true, code: 72 }, // Win+Shift+H
  MouseJump: { win: true, shift: true, code: 68 }, // Win+Shift+D
  MouseCrosshairs: { win: true, alt: true, code: 80 }, // Win+Alt+P
  Peek: { ctrl: true, code: 32 }, // Ctrl+Space
  AdvancedPaste: { win: true, shift: true, code: 86 }, // Win+Shift+V
  PastePlainText: { win: true, ctrl: true, alt: true, code: 86 }, // Win+Ctrl+Alt+V
  CropAndLockReparent: { win: true, ctrl: true, shift: true, code: 82 }, // Win+Ctrl+Shift+R
  CropAndLockThumbnail: { win: true, ctrl: true, shift: true, code: 84 }, // Win+Ctrl+Shift+T
  WorkspacesEditor: { win: true, ctrl: true, code: 192 }, // Win+Ctrl+`
  PowerToysRun: { alt: true, code: 32 }, // Alt+Space
  CmdPal: { win: true, ctrl: true, code: 32 } // Win+Ctrl+Space
};

// Use JsonValue for compatibility
type JsonValue = string | number | boolean | null | JsonValue[] | { [key: string]: JsonValue };

// Settings types for actions (with index signature for JsonObject compatibility)
export type ToggleSettings = {
  moduleName?: string;
  pollInterval?: number;
  showTitle?: boolean;
  [key: string]: JsonValue | undefined;
};

export type TriggerSettings = {
  moduleName?: string;
  customHotkey?: { win?: boolean; ctrl?: boolean; alt?: boolean; shift?: boolean; code: number; key?: string };
  autoEnable?: boolean;
  [key: string]: JsonValue | undefined;
};

export type AwakeSettings = {
  mode?: 0 | 1 | 2; // 0=off, 1=indefinite, 2=timed
  keepDisplayOn?: boolean;
  intervalMinutes?: number;
  [key: string]: JsonValue | undefined;
};

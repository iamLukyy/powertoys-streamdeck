import streamDeck, {
  action,
  KeyDownEvent,
  WillAppearEvent,
  SingletonAction,
  type JsonObject
} from "@elgato/streamdeck";
import { powerToysService } from "../services/powertoys-service.js";
import { keyboardService } from "../services/keyboard-service.js";
import { settingsReader } from "../services/settings-reader.js";
import type { HotkeyDefinition } from "../types/index.js";
import { DEFAULT_HOTKEYS } from "../types/index.js";

import type { JsonValue } from "@elgato/streamdeck";

// Settings type for trigger actions
type TriggerSettings = {
  currentShortcut?: string;
  autoEnable?: boolean;
  [key: string]: JsonValue | undefined;
};

// Base trigger action with PowerToys settings sync
class BaseTriggerAction extends SingletonAction<TriggerSettings> {
  protected moduleName: string = "";
  protected featureName: string = "";
  protected defaultHotkey: HotkeyDefinition = { code: 0 };
  protected settingsKey: string = ""; // Key for settings reader (if different from moduleName)

  override async onWillAppear(ev: WillAppearEvent<TriggerSettings>): Promise<void> {
    // Read current shortcut from PowerToys settings
    await this.updateShortcutDisplay(ev);
  }

  private async updateShortcutDisplay(ev: WillAppearEvent<TriggerSettings> | KeyDownEvent<TriggerSettings>): Promise<void> {
    try {
      const key = this.settingsKey || this.moduleName;
      const hotkey = await settingsReader.getHotkey(key);

      if (hotkey) {
        const shortcutString = settingsReader.hotkeyToString(hotkey);
        await ev.action.setSettings({
          ...ev.payload.settings,
          currentShortcut: shortcutString
        });
      } else {
        // Use default hotkey
        const shortcutString = settingsReader.hotkeyToString(this.defaultHotkey);
        await ev.action.setSettings({
          ...ev.payload.settings,
          currentShortcut: `${shortcutString} (default)`
        });
      }
    } catch (error) {
      streamDeck.logger.error(`Failed to read shortcut: ${error}`);
    }
  }

  override async onKeyDown(ev: KeyDownEvent<TriggerSettings>): Promise<void> {
    try {
      // Auto-enable if needed
      if (ev.payload.settings.autoEnable) {
        const isEnabled = await powerToysService.isModuleEnabled(this.moduleName);
        if (!isEnabled) {
          await powerToysService.setModuleEnabled(this.moduleName, true);
          await new Promise(r => setTimeout(r, 500));
        }
      }

      // Read hotkey from PowerToys settings (with fallback to default)
      const key = this.settingsKey || this.moduleName;
      const hotkey = await settingsReader.getHotkey(key) || this.defaultHotkey;

      await keyboardService.sendShortcut(hotkey);
      await ev.action.showOk();
      streamDeck.logger.info(`Triggered: ${this.featureName}`);

      // Update display after trigger
      await this.updateShortcutDisplay(ev);
    } catch (error) {
      streamDeck.logger.error(`Trigger failed: ${error}`);
      await ev.action.showAlert();
    }
  }
}

@action({ UUID: "com.powertoys.controller.trigger.colorpicker" })
export class TriggerColorPicker extends BaseTriggerAction {
  moduleName = "ColorPicker";
  featureName = "Color Picker";
  defaultHotkey = DEFAULT_HOTKEYS.ColorPicker;
}

@action({ UUID: "com.powertoys.controller.trigger.alwaysontop" })
export class TriggerAlwaysOnTop extends BaseTriggerAction {
  moduleName = "AlwaysOnTop";
  featureName = "Always On Top";
  defaultHotkey = DEFAULT_HOTKEYS.AlwaysOnTop;
}

@action({ UUID: "com.powertoys.controller.trigger.fancyzoneseditor" })
export class TriggerFancyZonesEditor extends BaseTriggerAction {
  moduleName = "FancyZones";
  featureName = "FancyZones Editor";
  defaultHotkey = DEFAULT_HOTKEYS.FancyZonesEditor;
}

@action({ UUID: "com.powertoys.controller.trigger.textextractor" })
export class TriggerTextExtractor extends BaseTriggerAction {
  moduleName = "TextExtractor";
  featureName = "Text Extractor";
  defaultHotkey = DEFAULT_HOTKEYS.TextExtractor;
}

@action({ UUID: "com.powertoys.controller.trigger.shortcutguide" })
export class TriggerShortcutGuide extends BaseTriggerAction {
  moduleName = "Shortcut Guide";
  featureName = "Shortcut Guide";
  defaultHotkey = DEFAULT_HOTKEYS.ShortcutGuide;
}

@action({ UUID: "com.powertoys.controller.trigger.measuretool" })
export class TriggerMeasureTool extends BaseTriggerAction {
  moduleName = "Measure Tool";
  featureName = "Screen Ruler";
  defaultHotkey = DEFAULT_HOTKEYS.MeasureTool;
}

@action({ UUID: "com.powertoys.controller.trigger.findmymouse" })
export class TriggerFindMyMouse extends BaseTriggerAction {
  moduleName = "FindMyMouse";
  featureName = "Find My Mouse";
  defaultHotkey = DEFAULT_HOTKEYS.FindMyMouse;
}

@action({ UUID: "com.powertoys.controller.trigger.mousehighlighter" })
export class TriggerMouseHighlighter extends BaseTriggerAction {
  moduleName = "MouseHighlighter";
  featureName = "Mouse Highlighter";
  defaultHotkey = DEFAULT_HOTKEYS.MouseHighlighter;
}

@action({ UUID: "com.powertoys.controller.trigger.mousejump" })
export class TriggerMouseJump extends BaseTriggerAction {
  moduleName = "MouseJump";
  featureName = "Mouse Jump";
  defaultHotkey = DEFAULT_HOTKEYS.MouseJump;
}

@action({ UUID: "com.powertoys.controller.trigger.mousecrosshairs" })
export class TriggerMouseCrosshairs extends BaseTriggerAction {
  moduleName = "MousePointerCrosshairs";
  featureName = "Mouse Crosshairs";
  defaultHotkey = DEFAULT_HOTKEYS.MouseCrosshairs;
}

@action({ UUID: "com.powertoys.controller.trigger.peek" })
export class TriggerPeek extends BaseTriggerAction {
  moduleName = "Peek";
  featureName = "Peek";
  defaultHotkey = DEFAULT_HOTKEYS.Peek;
}

@action({ UUID: "com.powertoys.controller.trigger.advancedpaste" })
export class TriggerAdvancedPaste extends BaseTriggerAction {
  moduleName = "AdvancedPaste";
  featureName = "Advanced Paste";
  defaultHotkey = DEFAULT_HOTKEYS.AdvancedPaste;
}

@action({ UUID: "com.powertoys.controller.trigger.pasteplaintext" })
export class TriggerPastePlainText extends BaseTriggerAction {
  moduleName = "AdvancedPaste";
  settingsKey = "PastePlain";
  featureName = "Paste Plain Text";
  defaultHotkey = DEFAULT_HOTKEYS.PastePlainText;
}

@action({ UUID: "com.powertoys.controller.trigger.cropandlock.reparent" })
export class TriggerCropAndLockReparent extends BaseTriggerAction {
  moduleName = "CropAndLock";
  featureName = "Crop And Lock";
  defaultHotkey = DEFAULT_HOTKEYS.CropAndLockReparent;
}

@action({ UUID: "com.powertoys.controller.trigger.cropandlock.thumbnail" })
export class TriggerCropAndLockThumbnail extends BaseTriggerAction {
  moduleName = "CropAndLock";
  featureName = "Crop Thumbnail";
  defaultHotkey = DEFAULT_HOTKEYS.CropAndLockThumbnail;
}

@action({ UUID: "com.powertoys.controller.trigger.workspaceseditor" })
export class TriggerWorkspacesEditor extends BaseTriggerAction {
  moduleName = "Workspaces";
  featureName = "Workspaces Editor";
  defaultHotkey = DEFAULT_HOTKEYS.WorkspacesEditor;
}

@action({ UUID: "com.powertoys.controller.trigger.powertoysrun" })
export class TriggerPowerToysRun extends BaseTriggerAction {
  moduleName = "PowerToys Run";
  featureName = "PowerToys Run";
  defaultHotkey = DEFAULT_HOTKEYS.PowerToysRun;
}

@action({ UUID: "com.powertoys.controller.trigger.cmdpal" })
export class TriggerCmdPal extends BaseTriggerAction {
  moduleName = "CmdPal";
  featureName = "Command Palette";
  defaultHotkey = DEFAULT_HOTKEYS.CmdPal;
}

@action({ UUID: "com.powertoys.controller.trigger.settings" })
export class OpenSettingsAction extends SingletonAction<TriggerSettings> {
  override async onWillAppear(ev: WillAppearEvent<TriggerSettings>): Promise<void> {
    await ev.action.setSettings({
      ...ev.payload.settings,
      currentShortcut: "Opens Settings"
    });
  }

  override async onKeyDown(ev: KeyDownEvent<TriggerSettings>): Promise<void> {
    try {
      await keyboardService.openPowerToysSettings();
      await ev.action.showOk();
    } catch (error) {
      streamDeck.logger.error(`Open settings failed: ${error}`);
      await ev.action.showAlert();
    }
  }
}

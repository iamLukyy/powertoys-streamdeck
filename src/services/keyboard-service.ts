import { keyboard, Key } from "@nut-tree-fork/nut-js";
import type { HotkeyDefinition } from "../types/index.js";

// Map VK codes to nut.js Key enum
const VK_TO_KEY: Record<number, Key> = {
  // Letters
  65: Key.A, 66: Key.B, 67: Key.C, 68: Key.D, 69: Key.E, 70: Key.F,
  71: Key.G, 72: Key.H, 73: Key.I, 74: Key.J, 75: Key.K, 76: Key.L,
  77: Key.M, 78: Key.N, 79: Key.O, 80: Key.P, 81: Key.Q, 82: Key.R,
  83: Key.S, 84: Key.T, 85: Key.U, 86: Key.V, 87: Key.W, 88: Key.X,
  89: Key.Y, 90: Key.Z,
  // Numbers
  48: Key.Num0, 49: Key.Num1, 50: Key.Num2, 51: Key.Num3, 52: Key.Num4,
  53: Key.Num5, 54: Key.Num6, 55: Key.Num7, 56: Key.Num8, 57: Key.Num9,
  // Special keys
  32: Key.Space,
  13: Key.Return,
  9: Key.Tab,
  27: Key.Escape,
  8: Key.Backspace,
  46: Key.Delete,
  // OEM keys
  191: Key.Slash,      // /
  192: Key.Grave,      // `
  186: Key.Semicolon,  // ;
  187: Key.Equal,      // =
  188: Key.Comma,      // ,
  189: Key.Minus,      // -
  190: Key.Period,     // .
};

const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));

export class KeyboardService {
  /**
   * Send a keyboard shortcut using pressKey/releaseKey with delays
   * This works better for multi-modifier shortcuts like Win+Ctrl+Shift+M
   */
  async sendShortcut(hotkey: HotkeyDefinition): Promise<void> {
    const mainKey = VK_TO_KEY[hotkey.code];
    if (!mainKey) {
      console.error(`Unknown key code: ${hotkey.code}`);
      throw new Error(`Unknown key code: ${hotkey.code}`);
    }

    try {
      // Press modifiers with delays (order: Ctrl, Shift, Alt, Win)
      if (hotkey.ctrl) {
        await keyboard.pressKey(Key.LeftControl);
        await sleep(30);
      }
      if (hotkey.shift) {
        await keyboard.pressKey(Key.LeftShift);
        await sleep(30);
      }
      if (hotkey.alt) {
        await keyboard.pressKey(Key.LeftAlt);
        await sleep(30);
      }
      if (hotkey.win) {
        await keyboard.pressKey(Key.LeftWin);
        await sleep(30);
      }

      // Press and release main key
      await keyboard.pressKey(mainKey);
      await sleep(30);
      await keyboard.releaseKey(mainKey);

      // Release modifiers in reverse order
      await sleep(30);
      if (hotkey.win) await keyboard.releaseKey(Key.LeftWin);
      if (hotkey.alt) await keyboard.releaseKey(Key.LeftAlt);
      if (hotkey.shift) await keyboard.releaseKey(Key.LeftShift);
      if (hotkey.ctrl) await keyboard.releaseKey(Key.LeftControl);

    } catch (error: any) {
      console.error("Failed to send keyboard shortcut:", error.message);
      throw error;
    }
  }

  /**
   * Open PowerToys Settings
   */
  async openPowerToysSettings(): Promise<void> {
    const { exec } = await import("node:child_process");
    const { promisify } = await import("node:util");
    const execAsync = promisify(exec);

    const possiblePaths = [
      "C:\\Program Files\\PowerToys\\PowerToys.Settings.exe",
      `${process.env.LOCALAPPDATA}\\PowerToys\\PowerToys.Settings.exe`
    ];

    for (const path of possiblePaths) {
      try {
        await execAsync(`start "" "${path}"`, { shell: "cmd.exe" });
        return;
      } catch {
        continue;
      }
    }

    // Fallback
    await execAsync(`start ms-settings:powertoys`, { shell: "cmd.exe" }).catch(() => {});
  }
}

// Singleton instance
export const keyboardService = new KeyboardService();

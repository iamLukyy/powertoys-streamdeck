import { exec } from "node:child_process";
import { promisify } from "node:util";
import { existsSync } from "node:fs";

const execAsync = promisify(exec);

export interface ModuleStatus {
  [moduleName: string]: boolean;
}

export class PowerToysService {
  private dscPath: string | null = null;

  constructor() {
    this.findDscPath();
  }

  private findDscPath(): void {
    const possiblePaths = [
      "C:\\Program Files\\PowerToys\\PowerToys.DSC.exe",
      `${process.env.LOCALAPPDATA}\\PowerToys\\PowerToys.DSC.exe`,
      "C:\\Program Files (x86)\\PowerToys\\PowerToys.DSC.exe"
    ];

    for (const path of possiblePaths) {
      if (existsSync(path)) {
        this.dscPath = path;
        console.log(`Found PowerToys.DSC.exe at: ${path}`);
        return;
      }
    }

    console.error("PowerToys.DSC.exe not found! PowerToys may not be installed.");
  }

  private async execDsc(args: string): Promise<string> {
    if (!this.dscPath) {
      throw new Error("PowerToys.DSC.exe not found");
    }

    try {
      const { stdout, stderr } = await execAsync(`"${this.dscPath}" ${args}`, {
        encoding: "utf8",
        maxBuffer: 1024 * 1024
      });

      if (stderr && stderr.trim()) {
        console.warn("DSC stderr:", stderr);
      }

      return stdout;
    } catch (error: any) {
      console.error("DSC execution failed:", error.message);
      throw error;
    }
  }

  /**
   * Get all module enabled states
   */
  async getModuleStatuses(): Promise<ModuleStatus> {
    const result = await this.execDsc("get --resource settings --module App");

    try {
      const data = JSON.parse(result);
      return data.settings?.enabled || {};
    } catch {
      console.error("Failed to parse module statuses:", result);
      return {};
    }
  }

  /**
   * Check if a specific module is enabled
   */
  async isModuleEnabled(moduleName: string): Promise<boolean> {
    try {
      const statuses = await this.getModuleStatuses();
      return statuses[moduleName] ?? false;
    } catch {
      return false;
    }
  }

  /**
   * Enable or disable a module
   */
  async setModuleEnabled(moduleName: string, enabled: boolean): Promise<void> {
    const settings = {
      settings: {
        enabled: {
          [moduleName]: enabled
        }
      }
    };

    // Escape JSON for command line
    const input = JSON.stringify(JSON.stringify(settings));
    await this.execDsc(`set --resource settings --module App --input ${input}`);
  }

  /**
   * Toggle a module's enabled state
   */
  async toggleModule(moduleName: string): Promise<boolean> {
    const currentState = await this.isModuleEnabled(moduleName);
    const newState = !currentState;
    await this.setModuleEnabled(moduleName, newState);
    return newState;
  }

  /**
   * Get module-specific settings
   */
  async getModuleSettings(moduleName: string): Promise<any> {
    try {
      const result = await this.execDsc(`get --resource settings --module ${moduleName}`);
      return JSON.parse(result);
    } catch {
      return null;
    }
  }

  /**
   * Set Awake mode
   */
  async setAwakeMode(mode: 0 | 1 | 2, keepDisplayOn = false, intervalMinutes?: number): Promise<void> {
    const properties: any = {
      mode: mode,
      keepDisplayOn: keepDisplayOn
    };

    if (mode === 2 && intervalMinutes) {
      properties.intervalMinutes = intervalMinutes;
    }

    const settings = {
      settings: {
        properties: properties
      }
    };

    const input = JSON.stringify(JSON.stringify(settings));
    await this.execDsc(`set --resource settings --module Awake --input ${input}`);
  }

  /**
   * Get Awake mode
   */
  async getAwakeMode(): Promise<{ mode: number; keepDisplayOn: boolean }> {
    try {
      const result = await this.getModuleSettings("Awake");
      return {
        mode: result?.settings?.properties?.mode ?? 0,
        keepDisplayOn: result?.settings?.properties?.keepDisplayOn ?? false
      };
    } catch {
      return { mode: 0, keepDisplayOn: false };
    }
  }

  /**
   * Check if PowerToys DSC is available
   */
  isAvailable(): boolean {
    return this.dscPath !== null;
  }
}

// Singleton instance
export const powerToysService = new PowerToysService();

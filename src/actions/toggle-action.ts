import streamDeck, {
  action,
  KeyDownEvent,
  SingletonAction,
  WillAppearEvent,
  WillDisappearEvent,
  type JsonObject,
  type KeyAction
} from "@elgato/streamdeck";
import { powerToysService } from "../services/powertoys-service.js";

// Store for polling timers
const pollingTimers = new Map<string, ReturnType<typeof setInterval>>();

// Base toggle action class
class BaseToggleAction extends SingletonAction<JsonObject> {
  protected moduleName: string = "";
  protected displayName: string = "";

  override async onWillAppear(ev: WillAppearEvent<JsonObject>): Promise<void> {
    streamDeck.logger.info(`Toggle appeared: ${this.displayName}`);
    await this.updateState(ev);

    const pollInterval = (ev.payload.settings.pollInterval as number) || 5000;
    const timer = setInterval(() => this.updateState(ev), pollInterval);
    pollingTimers.set(ev.action.id, timer);
  }

  override async onWillDisappear(ev: WillDisappearEvent<JsonObject>): Promise<void> {
    const timer = pollingTimers.get(ev.action.id);
    if (timer) {
      clearInterval(timer);
      pollingTimers.delete(ev.action.id);
    }
  }

  override async onKeyDown(ev: KeyDownEvent<JsonObject>): Promise<void> {
    try {
      const newState = await powerToysService.toggleModule(this.moduleName);
      await ev.action.setState(newState ? 1 : 0);
      await ev.action.showOk();
      streamDeck.logger.info(`Toggled ${this.displayName}: ${newState}`);
    } catch (error) {
      streamDeck.logger.error(`Toggle failed: ${error}`);
      await ev.action.showAlert();
    }
  }

  private async updateState(ev: WillAppearEvent<JsonObject>): Promise<void> {
    try {
      const isEnabled = await powerToysService.isModuleEnabled(this.moduleName);
      await (ev.action as KeyAction<JsonObject>).setState(isEnabled ? 1 : 0);
    } catch (error) {
      streamDeck.logger.error(`Update state failed: ${error}`);
    }
  }
}

// Toggle actions - only for modules WITHOUT trigger shortcuts
// (modules with trigger shortcuts don't need enable/disable toggle)

@action({ UUID: "com.powertoys.controller.toggle.fancyzones" })
export class ToggleFancyZones extends BaseToggleAction {
  moduleName = "FancyZones";
  displayName = "FancyZones";
}

@action({ UUID: "com.powertoys.controller.toggle.imageresizer" })
export class ToggleImageResizer extends BaseToggleAction {
  moduleName = "Image Resizer";
  displayName = "Image Resizer";
}

@action({ UUID: "com.powertoys.controller.toggle.fileexplorer" })
export class ToggleFileExplorer extends BaseToggleAction {
  moduleName = "File Explorer Preview";
  displayName = "File Explorer";
}

@action({ UUID: "com.powertoys.controller.toggle.powerrename" })
export class TogglePowerRename extends BaseToggleAction {
  moduleName = "PowerRename";
  displayName = "PowerRename";
}

@action({ UUID: "com.powertoys.controller.toggle.keyboardmanager" })
export class ToggleKeyboardManager extends BaseToggleAction {
  moduleName = "Keyboard Manager";
  displayName = "Keyboard Manager";
}

@action({ UUID: "com.powertoys.controller.toggle.cropandlock" })
export class ToggleCropAndLock extends BaseToggleAction {
  moduleName = "CropAndLock";
  displayName = "Crop And Lock";
}

@action({ UUID: "com.powertoys.controller.toggle.awake" })
export class ToggleAwake extends BaseToggleAction {
  moduleName = "Awake";
  displayName = "Awake";
}

@action({ UUID: "com.powertoys.controller.toggle.mousewithoutborders" })
export class ToggleMouseWithoutBorders extends BaseToggleAction {
  moduleName = "MouseWithoutBorders";
  displayName = "Mouse Without Borders";
}

@action({ UUID: "com.powertoys.controller.toggle.quickaccent" })
export class ToggleQuickAccent extends BaseToggleAction {
  moduleName = "QuickAccent";
  displayName = "Quick Accent";
}

@action({ UUID: "com.powertoys.controller.toggle.hosts" })
export class ToggleHosts extends BaseToggleAction {
  moduleName = "Hosts";
  displayName = "Hosts Editor";
}

@action({ UUID: "com.powertoys.controller.toggle.filelocksmith" })
export class ToggleFileLocksmith extends BaseToggleAction {
  moduleName = "File Locksmith";
  displayName = "File Locksmith";
}

@action({ UUID: "com.powertoys.controller.toggle.registrypreview" })
export class ToggleRegistryPreview extends BaseToggleAction {
  moduleName = "RegistryPreview";
  displayName = "Registry Preview";
}

@action({ UUID: "com.powertoys.controller.toggle.environmentvariables" })
export class ToggleEnvironmentVariables extends BaseToggleAction {
  moduleName = "EnvironmentVariables";
  displayName = "Environment Variables";
}

@action({ UUID: "com.powertoys.controller.toggle.newplus" })
export class ToggleNewPlus extends BaseToggleAction {
  moduleName = "NewPlus";
  displayName = "New+";
}

@action({ UUID: "com.powertoys.controller.toggle.zoomit" })
export class ToggleZoomIt extends BaseToggleAction {
  moduleName = "ZoomIt";
  displayName = "ZoomIt";
}

@action({ UUID: "com.powertoys.controller.toggle.cursorwrap" })
export class ToggleCursorWrap extends BaseToggleAction {
  moduleName = "CursorWrap";
  displayName = "Cursor Wrap";
}

@action({ UUID: "com.powertoys.controller.toggle.lightswitch" })
export class ToggleLightSwitch extends BaseToggleAction {
  moduleName = "LightSwitch";
  displayName = "Light Switch";
}

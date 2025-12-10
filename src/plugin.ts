import streamDeck, { LogLevel } from "@elgato/streamdeck";

// Import toggle action classes (modules without trigger shortcuts)
import {
  ToggleFancyZones,
  ToggleImageResizer,
  ToggleFileExplorer,
  TogglePowerRename,
  ToggleKeyboardManager,
  ToggleCropAndLock,
  ToggleAwake,
  ToggleMouseWithoutBorders,
  ToggleQuickAccent,
  ToggleHosts,
  ToggleFileLocksmith,
  ToggleRegistryPreview,
  ToggleEnvironmentVariables,
  ToggleNewPlus,
  ToggleZoomIt,
  ToggleCursorWrap,
  ToggleLightSwitch
} from "./actions/toggle-action.js";

// Import trigger action classes
import {
  TriggerColorPicker,
  TriggerAlwaysOnTop,
  TriggerFancyZonesEditor,
  TriggerTextExtractor,
  TriggerShortcutGuide,
  TriggerMeasureTool,
  TriggerFindMyMouse,
  TriggerMouseHighlighter,
  TriggerMouseJump,
  TriggerMouseCrosshairs,
  TriggerPeek,
  TriggerAdvancedPaste,
  TriggerPastePlainText,
  TriggerCropAndLockReparent,
  TriggerCropAndLockThumbnail,
  TriggerWorkspacesEditor,
  TriggerPowerToysRun,
  TriggerCmdPal,
  OpenSettingsAction,
  AwakeIndefiniteAction,
  AwakeOffAction
} from "./actions/trigger-action.js";

// Set logging level
streamDeck.logger.setLevel(LogLevel.DEBUG);

// Register toggle actions (17 modules)
streamDeck.actions.registerAction(new ToggleFancyZones());
streamDeck.actions.registerAction(new ToggleImageResizer());
streamDeck.actions.registerAction(new ToggleFileExplorer());
streamDeck.actions.registerAction(new TogglePowerRename());
streamDeck.actions.registerAction(new ToggleKeyboardManager());
streamDeck.actions.registerAction(new ToggleCropAndLock());
streamDeck.actions.registerAction(new ToggleAwake());
streamDeck.actions.registerAction(new ToggleMouseWithoutBorders());
streamDeck.actions.registerAction(new ToggleQuickAccent());
streamDeck.actions.registerAction(new ToggleHosts());
streamDeck.actions.registerAction(new ToggleFileLocksmith());
streamDeck.actions.registerAction(new ToggleRegistryPreview());
streamDeck.actions.registerAction(new ToggleEnvironmentVariables());
streamDeck.actions.registerAction(new ToggleNewPlus());
streamDeck.actions.registerAction(new ToggleZoomIt());
streamDeck.actions.registerAction(new ToggleCursorWrap());
streamDeck.actions.registerAction(new ToggleLightSwitch());

// Register trigger actions (21 actions)
streamDeck.actions.registerAction(new TriggerColorPicker());
streamDeck.actions.registerAction(new TriggerAlwaysOnTop());
streamDeck.actions.registerAction(new TriggerFancyZonesEditor());
streamDeck.actions.registerAction(new TriggerTextExtractor());
streamDeck.actions.registerAction(new TriggerShortcutGuide());
streamDeck.actions.registerAction(new TriggerMeasureTool());
streamDeck.actions.registerAction(new TriggerFindMyMouse());
streamDeck.actions.registerAction(new TriggerMouseHighlighter());
streamDeck.actions.registerAction(new TriggerMouseJump());
streamDeck.actions.registerAction(new TriggerMouseCrosshairs());
streamDeck.actions.registerAction(new TriggerPeek());
streamDeck.actions.registerAction(new TriggerAdvancedPaste());
streamDeck.actions.registerAction(new TriggerPastePlainText());
streamDeck.actions.registerAction(new TriggerCropAndLockReparent());
streamDeck.actions.registerAction(new TriggerCropAndLockThumbnail());
streamDeck.actions.registerAction(new TriggerWorkspacesEditor());
streamDeck.actions.registerAction(new TriggerPowerToysRun());
streamDeck.actions.registerAction(new TriggerCmdPal());
streamDeck.actions.registerAction(new OpenSettingsAction());
streamDeck.actions.registerAction(new AwakeIndefiniteAction());
streamDeck.actions.registerAction(new AwakeOffAction());

// Connect to Stream Deck
streamDeck.connect();

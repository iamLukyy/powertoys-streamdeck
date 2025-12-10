import streamDeck, { LogLevel } from "@elgato/streamdeck";

// Import trigger action classes
import {
  TriggerColorPicker,
  TriggerAlwaysOnTop,
  TriggerFancyZonesEditor,
  TriggerTextExtractor,
  TriggerShortcutGuide,
  TriggerMeasureTool,
  TriggerPeek,
  TriggerAdvancedPaste,
  TriggerPastePlainText,
  TriggerCropAndLockReparent,
  TriggerCropAndLockThumbnail,
  TriggerWorkspacesEditor,
  TriggerPowerToysRun,
  TriggerCmdPal,
  OpenSettingsAction
} from "./actions/trigger-action.js";

// Set logging level
streamDeck.logger.setLevel(LogLevel.DEBUG);

// Register trigger actions (19 actions)
streamDeck.actions.registerAction(new TriggerColorPicker());
streamDeck.actions.registerAction(new TriggerAlwaysOnTop());
streamDeck.actions.registerAction(new TriggerFancyZonesEditor());
streamDeck.actions.registerAction(new TriggerTextExtractor());
streamDeck.actions.registerAction(new TriggerShortcutGuide());
streamDeck.actions.registerAction(new TriggerMeasureTool());
streamDeck.actions.registerAction(new TriggerPeek());
streamDeck.actions.registerAction(new TriggerAdvancedPaste());
streamDeck.actions.registerAction(new TriggerPastePlainText());
streamDeck.actions.registerAction(new TriggerCropAndLockReparent());
streamDeck.actions.registerAction(new TriggerCropAndLockThumbnail());
streamDeck.actions.registerAction(new TriggerWorkspacesEditor());
streamDeck.actions.registerAction(new TriggerPowerToysRun());
streamDeck.actions.registerAction(new TriggerCmdPal());
streamDeck.actions.registerAction(new OpenSettingsAction());

// Connect to Stream Deck
streamDeck.connect();

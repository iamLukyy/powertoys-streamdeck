$baseUrl = "https://raw.githubusercontent.com/microsoft/PowerToys/main/src/settings-ui/Settings.UI/Assets/Settings/Icons"
$outDir = "C:\Users\lukyn\Powertoys_helper\com.powertoys.controller.sdPlugin\imgs\actions"

# Mapping: local name -> PowerToys icon name
$icons = @{
    "colorpicker" = "ColorPicker"
    "fancyzones" = "FancyZones"
    "fancyzoneseditor" = "FancyZones"
    "alwaysontop" = "AlwaysOnTop"
    "imageresizer" = "ImageResizer"
    "fileexplorer" = "PowerPreview"
    "powerrename" = "PowerRename"
    "keyboardmanager" = "KeyboardManager"
    "shortcutguide" = "ShortcutGuide"
    "powertoysrun" = "PowerLauncher"
    "awake" = "Awake"
    "mousewithoutborders" = "MouseWithoutBorders"
    "findmymouse" = "MouseUtils"
    "mousehighlighter" = "MouseUtils"
    "mousejump" = "MouseUtils"
    "mousecrosshairs" = "MouseUtils"
    "textextractor" = "TextExtractor"
    "hosts" = "Hosts"
    "filelocksmith" = "FileLocksmith"
    "measuretool" = "MeasureTool"
    "peek" = "Peek"
    "registrypreview" = "RegistryPreview"
    "cropandlock" = "CropAndLock"
    "environmentvariables" = "EnvironmentVariables"
    "advancedpaste" = "AdvancedPaste"
    "pasteplaintext" = "AdvancedPaste"
    "quickaccent" = "QuickAccent"
    "workspaces" = "Workspaces"
    "cmdpal" = "CmdPal"
    "newplus" = "NewPlus"
    "zoomit" = "ZoomIt"
    "cursorwrap" = "MouseUtils"
    "lightswitch" = "ColorPicker"
    "settings" = "Settings"
}

foreach ($local in $icons.Keys) {
    $remote = $icons[$local]
    $url = "$baseUrl/$remote.png"
    $outFile = "$outDir\$local.png"

    try {
        Invoke-WebRequest -Uri $url -OutFile $outFile -ErrorAction Stop
        Write-Host "OK: $local <- $remote"
    } catch {
        Write-Host "FAIL: $local <- $remote ($url)"
    }
}

# Copy as @2x too (StreamDeck will scale)
Get-ChildItem "$outDir\*.png" | Where-Object { $_.Name -notmatch '@2x' } | ForEach-Object {
    $name = $_.BaseName
    Copy-Item $_.FullName "$outDir\$name@2x.png" -Force
}

Write-Host "`nDone!"

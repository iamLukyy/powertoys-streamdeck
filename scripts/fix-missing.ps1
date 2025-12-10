$outDir = "C:\Users\lukyn\Powertoys_helper\com.powertoys.controller.sdPlugin\imgs\actions"
$baseUrl = "https://raw.githubusercontent.com/microsoft/PowerToys/main/src/settings-ui/Settings.UI/Assets/Settings/Icons"

# FileExplorer - use FancyZones as fallback
Copy-Item "$outDir\fancyzones.png" "$outDir\fileexplorer.png" -Force
Write-Host "fileexplorer: copied from fancyzones"

# Settings - use ColorPicker as fallback
Copy-Item "$outDir\colorpicker.png" "$outDir\settings.png" -Force
Write-Host "settings: copied from colorpicker"

# MeasureTool - use TextExtractor as fallback
Copy-Item "$outDir\textextractor.png" "$outDir\measuretool.png" -Force
Write-Host "measuretool: copied from textextractor"

# PowerToysRun - use ShortcutGuide as fallback
Copy-Item "$outDir\shortcutguide.png" "$outDir\powertoysrun.png" -Force
Write-Host "powertoysrun: copied from shortcutguide"

# Create @2x copies
Get-ChildItem "$outDir\*.png" | Where-Object { $_.Name -notmatch '@2x' } | ForEach-Object {
    Copy-Item $_.FullName "$outDir\$($_.BaseName)@2x.png" -Force
}

Write-Host "Done! All @2x copies created"

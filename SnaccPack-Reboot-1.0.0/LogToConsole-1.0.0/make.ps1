npm run clean:environment | out-null
npm run build:unzipped | out-null
if (Test-Path -Path C:\Games\ETM\user\mods\SnaccPack-Reboot\) {
    Remove-Item -Recurse -Force C:\Games\ETM\user\mods\SnaccPack-Reboot\ | out-null
}
mkdir C:\Games\ETM\user\mods\SnaccPack-Reboot\ | out-null
Copy-Item -Recurse -Path .\dist\* -Destination C:\Games\ETM\user\mods\SnaccPack-Reboot\ | out-null
Remove-Item C:\Games\ETM\user\mods\SnaccPack-Reboot\make.ps1 | out-null
Set-Location C:\Games\ETM\ | out-null
Start-Process powershell {./Aki.Server.exe}
Start-Process powershell {./Aki.Launcher.exe}
Set-Location C:\Users\TheEyeOfAr3s\Documents\coding\SPTarkov\SnaccPack-Reboot\ | out-null
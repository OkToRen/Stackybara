@echo off
    wt --title "Run Motoko" powershell "wsl && dfx start --clean --background && npm run setup && npm start"

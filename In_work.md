# Security Audit & Hardening Tasks

The following tasks outline the identified security threats in the current form submission feature and provide step-by-step instructions and hints for a faster AI model to fix them and harden the application.

## 🛠 Fix: Paraglide-js Re-compilation Loop

The project is currently stuck in an infinite re-compilation loop because message files are duplicated and Inlang is watching the wrong directory.

### Sequential Steps to Fix:

1. **Stop the Dev Server**: Press `Ctrl+C` in the terminal to stop `npm run dev`.
2. **Update Inlang Settings**:
   - Open `project.inlang/settings.json`.
   - Change `"pathPattern": "./messages/{languageTag}/*.json"` to `"pathPattern": "../messages/{languageTag}/*.json"`.
   - This points Inlang to the root `messages` folder instead of the one inside `project.inlang`.
3. **Consolidate Message Folders**:
   - Delete the redundant folder: `project.inlang/messages`.
   - Ensure all your translations are in the root `messages/` folder.
4. **Remove Unused Folders**:
   - Delete the `/locales` folder in the root (it seems to be a leftover and is not used by Paraglide).
5. **Restart Dev Server**:
   - Run `npm run dev`.
   - The loop should now be gone as there is only one source of truth for messages.

> [!TIP]
> This loop usually happens when a file-syncing tool or the Inlang extension tries to synchronize two identical message folders, triggering a chain reaction of filesystem events.





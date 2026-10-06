# Banners of the Vale: Android app (no browser needed)

This project turns the game into a real Android app. The game is packed **inside**
the app: it needs no browser, no website and no internet, and your saved games stay
on the device. GitHub builds the APK for you in the cloud, so you need no computer.

## 1. Make a new repository
On github.com: **+ → New repository**, for example `banners-android`.
It can be **Private** (the build works either way).

## 2. Upload the files
Upload everything from this zip, keeping the folders:
- `www/index.html` (the game)
- `assets/icon-192.png`, `assets/icon-512.png`
- `package.json`, `capacitor.config.json`, `README.md`
- `debug.keystore` (the app's signing key: keep it, so updates install over the old app)
- `.github/workflows/build-apk.yml` (the build recipe)

**On a tablet**, folders can be awkward to upload. Two tips:
- Upload the files first, then use **Add file → Create new file**, type the name
  `.github/workflows/build-apk.yml` (the slashes create the folders), and paste the
  contents of that file.
- In the same way you can type `www/index.html` as a file name, or upload the file
  from inside the `www` folder while viewing that folder on GitHub.

## 3. Build
Open the **Actions** tab. The build starts by itself after an upload (or tap
**Build Android APK → Run workflow**). It takes about 5–8 minutes. A green tick
means it worked.

## 4. Download and install
Open the finished run, scroll to **Artifacts**, and download
**banners-of-the-vale-apk** (a .zip). Open it with the Files app, extract
`app-debug.apk` and tap it. Android will ask you to allow installing apps from
this source the first time.

## Updating the game later
Replace `www/index.html` with the new game file (the single
`banners-of-the-vale.html`, renamed to `index.html`), upload it, and a new APK is
built automatically. Install it over the old one: your saved games are kept.

## Updates keep your saved games
Every build is signed with the same key (`debug.keystore`, keep it in the repository),
so a new APK installs over the old one as an update. Android refuses an update signed
with a different key: if you ever see "App not installed", uninstall the old app first
(this deletes its saved games), then install the new one.

## Good to know
- This is a **debug** APK: perfect for your own devices and for friends. Publishing on
  Google Play needs a signed **release** build; ask, and the recipe can be extended.
- If a build ever fails, open the red run, tap the failed step and copy the last
  lines of its log: that says exactly what went wrong.

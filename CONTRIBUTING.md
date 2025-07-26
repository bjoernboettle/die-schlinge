# Beitrag leisten zu „Die Schlinge“

Dieses Dokument richtet sich an alle, die zu „Die Schlinge“ beitragen möchten – egal ob mit Text, Quellen, Modulen oder technischem Input.
Hier findest du alles Wichtige zu Stil, Struktur, Workflow und technischen Details.

**Danke, dass du dieses Projekt verbesserst!**

## Wie du beitragen kannst

- **Korrekturen, neue Quellen, Module:**
  Über [Pull Request](https://github.com/bjoernboettle/die-schlinge/pulls) oder [Issue](https://github.com/bjoernboettle/die-schlinge/issues)
- **Kleine Fehler, Typos:**
  Direkt editieren oder ein Issue anlegen
- **Fragen, Diskussion:**
  Nutze Issues für Feedback, Ideen und größere Debatten

## Stil & Struktur

- **Sprache:** Klar, inklusiv, diskriminierungsfrei, keine Klimaleugnung
- **Markdown:** Saubere Überschriftenstruktur (H1, H2, …), Listen, Zitate
- **Barrierefreiheit:**
  - ALT-Texte für Bilder
  - Gute Lesbarkeit (Kontrast, keine reinen Fließtext-Bilder)
- **Fiktionale Passagen:**
  _kursiv_ oder mit `<span class="fiction">…</span>` kennzeichnen

## Quellen und Belege

- Jede Aussage braucht mindestens **eine seriöse Quelle** (DOI, Zeitung, Studie, Buch ...)
- Fiktionales und Realtext **klar trennen**
- Keine unbelegten Einzelbehauptungen

## Lizenz

Mit deinem Beitrag erklärst du dich einverstanden, dass alles unter [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/) veröffentlicht wird.

## Review & Freischaltung

- PRs werden in der Regel innerhalb von 3–5 Tagen geprüft
- Bei Rückfragen gibt’s konstruktives Feedback
- Ziel: Möglichst barrierefreie, nachvollziehbare und quellengestützte Texte

## Credits

Alle Beitragenden werden (auf Wunsch) im Projekt genannt – etwa in CONTRIBUTORS.md oder README.

## Technische Struktur & wichtige Pfade

| Pfad                    | Inhalt                                     |
| ----------------------- | ------------------------------------------ |
| `/docs/`                | Alle Kapitel & Materialien (Markdown)      |
| `/docs/public/assets/`  | Bilder, Grafiken, Zusatzmaterial           |
| `/docs/public/styles/`  | PDF-/Print-Styles (z.B. `pdf-content.css`) |
| `/docs/public/archive/` | Generierte PDFs (nicht Teil des Repos)     |
| `/scripts/`             | Automatisierungs-Skripte                   |
| `/scripts/lib/`         | Wiederverwendbare Code-Module              |
| `/LICENSE`              | Lizenztext (CC BY-SA 4.0)                  |
| `.github/`              | Issue- und PR-Vorlagen, CONTRIBUTING       |

**Hinweis:**
Generierte PDFs werden _nicht_ eingecheckt (siehe `.gitignore`).
Bilder für das Dossier bitte **immer** unter `/docs/public/assets/` ablegen.

## Skripte & Checks

Für Qualitätssicherung und PDF-Generierung stehen mehrere npm-Skripte bereit.
**Nutze sie regelmäßig, vor allem vor Pull Requests!**

| Befehl                     | Was es tut                                                                                       |
| -------------------------- | ------------------------------------------------------------------------------------------------ |
| `npm run check:links`      | Prüft interne & externe Links auf Gültigkeit (CSV-Export möglich)                                |
| `npm run check:footnotes`  | Überprüft alle Fußnoten auf Korrektheit & Konsistenz                                             |
| `npm run check:structure`  | Analysiert die Markdown-Struktur (Reihenfolge, Format, Titel etc.)                               |
| `npm run generate:version` | Setzt automatisch die Version auf Basis der Git-Historie                                         |
| `npm run generate:pdf`     | Baut aktuelle PDFs                                                                               |
| `npm run generate:epub`    | Baut aktuelle PDFs                                                                               |
| `npm run dev`              | Startet die lokale Vorschau **und** erzeugt automatisch PDFs sowie ePubs inkl. aktueller Version |
| `npm run build`            | Baut die Produktionsseite für GitHub Pages **und** PDFs sowie ePubs inkl. aktueller Version      |

**Alle Skripte** findest du im Ordner `/scripts/` und kannst sie auch direkt per Node ausführen.

## Lokale Entwicklung, Schreiben & PDF-Generierung (npm-Workflow)

Dieses Projekt nutzt [VitePress](https://vitepress.dev/) für die Dokumentation, Markdown als Hauptformat und automatisierte Checks/PDF-Export via node.js.

### Voraussetzungen

- [Node.js](https://nodejs.org/) **≥18** (empfohlen: LTS)
- [npm](https://www.npmjs.com/) **≥9**
- (Optional: [git](https://git-scm.com/) für Zusammenarbeit)

### 1. Projekt klonen und installieren

```sh
git clone https://github.com/bjoernboettle/die-schlinge.git
cd die-schlinge
npm install
```

### 2. Kapitel schreiben & editieren

- Die Inhalte liegen als Markdown-Dateien im Ordner `docs/`
- Du kannst sie mit jedem Editor (z.B. VS Code, Typora, Obsidian, ...) bearbeiten

**Tipp:**

- Fiktionale Szenen bitte _kursiv_ oder mit eigener Klasse markieren (`<span class="fiction">...</span>`)
- Bilder/Infografiken in `docs/public/assets/`
- Barrierefreiheit: Bilder immer mit ALT-Text!

---

### 3. Vorschau lokal starten

**Live-Vorschau:**
Startet die VitePress-Doku und erzeugt parallel PDF-Versionen (siehe `generate:pdf`):

```sh
npm run dev
```

- Die Seite ist dann unter [http://localhost:5173/](http://localhost:5173/) verfügbar.
- Änderungen an Markdown-Dateien werden sofort übernommen.

---

### 4. PDF-Generierung

Alle PDFs werden mit dem eigenen node.js-Skript (siehe `scripts/generate-pdf.js`) erzeugt und im `docs/public/archive`-Verzeichnis abgelegt.

**Manuell PDF erzeugen:**

```sh
npm run generate:pdf
```

- Die PDFs werden **nicht eingecheckt** (siehe `.gitignore`).
- PDFs können je Kapitel oder als Gesamtdossier erstellt werden (siehe Skript-Doku oder Quelltext im `scripts/`-Ordner).

---

### 5. Checks & Qualitätssicherung

Vor Push kannst du die wichtigsten Checks ausführen:

- **Link-Check:**

  ```sh
  npm run check:links
  ```

- **Fußnoten-Check:**

  ```sh
  npm run check:footnotes
  ```

- **Struktur-Check:**

  ```sh
  npm run check:structure
  ```

---

### 6. Build & Deployment (GitHub Pages)

- Build für Produktion:

  ```sh
  npm run build
  ```

  Das erzeugt die statische Site im `.vitepress/dist`-Ordner.

- Deployment geschieht automatisch (über GitHub Pages).\
  Branch: `main` / Ordner: `/docs`

---

### Troubleshooting / Tipps

- Stelle sicher, dass alle Scripts unter `scripts/` **ausführbar** sind (`chmod +x scripts/*.js` bei Problemen)
- Bei PDF-Fehlern prüfe, ob Puppeteer und Chromium korrekt installiert wurden (`npm install puppeteer` zieht eine eigene Chrome-Version)
- Link-Check kann langsam sein bei vielen Links/Quellen – `--csv` gibt kompakte Übersicht
- **Pull Requests** bitte mit bestehendem Check-Workflow (alle `npm run check:*` sollten grün durchlaufen)

---

### Weiterführend / Hilfe

- **Feedback, Korrekturen, Fragen:**\
  Stelle ein [Issue](https://github.com/bjoernboettle/die-schlinge/issues) oder mache einen [Pull Request](https://github.com/bjoernboettle/die-schlinge/pulls)!
- **PDF/Release-Probleme?**
  Prüfe die Skripte in `scripts/`, sie sind kommentiert.
- **VitePress-Doku:**\
  https://vitepress.dev/guide/getting-started

---

## Automatisiertes Changelog & Versionierung

Alle Änderungen werden bei jedem Release **automatisch** im `CHANGELOG.md` dokumentiert –\
dank [semantic-release](https://semantic-release.gitbook.io/semantic-release/).\
Schreibe Commits bitte immer im [Conventional Commits](https://www.conventionalcommits.org/de/v1.0.0/) Stil, z.B.:

- `feat: [Neues Feature oder Kapitel]`
- `fix: [Bugfix oder Korrektur]`
- `chore: [Sonstiges, z.B. Build, Tools]`

So bleiben Changelog und Versionierung immer nachvollziehbar und aktuell!

export const config = {
  base: "/die-schlinge/",
  pdfPrefix: "die-schlinge",
  lang: "de",
  tableOfContents: "Inhaltsverzeichnis",
  title: "Die Schlinge",
  subtitle: "Strukturen erkennen. Muster unterbrechen. Wandel ermöglichen.",
  author: "Björn Böttle",
  publisher: "Björn Böttle",
  coverEpub: "assets/cover-epub.png",
  bookStructure: [
    { title: "Home", file: "index.md", webOnly: true },
    { title: "Prolog", file: "prolog.md" },
    { title: "Kapitel 0 – Executive Summary", file: "00_executive-summary.md" },
    {
      title: "Kapitel 1 –  Methodik & Zielgruppe",
      file: "01_methodik-und-zielgruppe.md",
    },
    {
      title: "Kapitel 2 – Einstieg für Eilige",
      file: "02_einstieg-fuer-eilige.md",
    },
    {
      title: "Kapitel 3 – Warum Wissen nicht reicht",
      file: "03_warum-wissen-nicht-reicht.md",
    },
    {
      title: "Kapitel 4 – Kontextkompass",
      file: "04_kontextkompass.md",
    },
    {
      title: "Kapitel 5 - Zeitleiste",
      file: "05_zeitleiste.md",
    },
    {
      title: "Kapitel 6 – Schlüssel­ebenen",
      children: [
        {
          title: "Einleitung",
          file: "06_schluesselebenen/00_einleitung.md",
        },
        {
          title: "6.1 Wissenschaft",
          file: "06_schluesselebenen/01_wissenschaft.md",
        },
        {
          title: "6.2 Fossile Industrie",
          file: "06_schluesselebenen/02_fossile-industrie.md",
        },
        {
          title: "6.3 Think Tanks",
          file: "06_schluesselebenen/03_thinktanks.md",
        },
        {
          title: "6.4 Lobbyismus",
          file: "06_schluesselebenen/04_lobbyismus.md",
        },
        {
          title: "6.5 Nationale Ebene",
          file: "06_schluesselebenen/05_nationale-ebene.md",
        },
        {
          title: "6.6 Internationale Ebene",
          file: "06_schluesselebenen/06_internationale-ebene.md",
        },
        {
          title: "6.7 Medien",
          file: "06_schluesselebenen/07_medien.md",
        },
        {
          title: "6.8 Gesellschaft",
          file: "06_schluesselebenen/08_gesellschaft.md",
        },
        {
          title: "6.9 Juristische Ebene",
          file: "06_schluesselebenen/09_juristische-ebene.md",
        },
        {
          title: "6.10 Ethik",
          file: "06_schluesselebenen/10_ethik.md",
        },
        {
          title: "6.11 Bildungssystem",
          file: "06_schluesselebenen/11_bildungssystem.md",
        },
        {
          title: "6.12 Strukturdiagnose",
          file: "06_schluesselebenen/12_strukturdiagnose.md",
        },
        {
          title: "6.13 Das Muster und seine Ausreden",
          file: "06_schluesselebenen/13_muster-und-ausreden.md",
        },
        {
          title: "6.14 Dynamiken",
          file: "06_schluesselebenen/14_dynamiken.md",
        },
      ],
    },
    {
      title: "Kapitel 7 – Gegenmacht",
      children: [
        {
          title: "Einleitung",
          file: "07_gegenmacht/00_einleitung.md",
        },
        {
          title: "7.1 Systemische Hebel",
          file: "07_gegenmacht/01_hebel.md",
        },
        {
          title: "7.2 System unter Druck",
          file: "07_gegenmacht/02_system-unter-druck.md",
        },
        {
          title: "7.3 Systemwechsel konkret",
          file: "07_gegenmacht/03_systemwechsel-konkret.md",
        },
        {
          title: "7.4 Werkzeugkasten",
          file: "07_gegenmacht/04_werkzeugkasten.md",
        },
        {
          title: "7.5 Risse im System",
          file: "07_gegenmacht/05_risse-im-system.md",
        },
        {
          title: "7.6 Fallbeispiele",
          file: "07_gegenmacht/06_fallbeispiele.md",
        },
        {
          title: "7.7 Kommunale Praxis",
          file: "07_gegenmacht/07_kommunale-praxis.md",
        },
      ],
    },
    {
      title: "Kapitel 8 – Was jetzt?",
      children: [
        { title: "Einleitung", file: "08_was-jetzt/00_einleitung.md" },
        {
          title: "8.1 Handlungskompass",
          file: "08_was-jetzt/01_handlungskompass.md",
        },
        {
          title: "8.2 Widerstand im Alltag",
          file: "08_was-jetzt/02_widerstand-im-alltag.md",
        },
        {
          title: "8.3 Alltag und Verantwortung",
          file: "08_was-jetzt/03_alltag-und-verantwortung.md",
        },
        {
          title: "8.4 Handlungsraster",
          file: "08_was-jetzt/04_handlungsraster.md",
        },
        {
          title: "8.5 Einwände, Zweifel, Widerstand",
          file: "08_was-jetzt/05_einwaende.md",
        },
      ],
    },
    {
      title: "Kapitel 9 – Rollen im System",
      children: [
        {
          title: "Einleitung",
          file: "09_rollen/00_einleitung.md",
        },
        {
          title: "9.1 Lehrkräfte",
          file: "09_rollen/01_lehrkraefte.md",
        },
        {
          title: "9.2 Journalist:innen",
          file: "09_rollen/02_journalistinnen.md",
        },
        {
          title: "9.3 Jurist:innen",
          file: "09_rollen/03_juristinnen.md",
        },
        {
          title: "9.4 Aktivist:innen",
          file: "09_rollen/04_aktivistinnen.md",
        },
        {
          title: "9.5 Alltagsperspektive",
          file: "09_rollen/05_alltag.md",
        },
        {
          title: "9.6 Verwaltungsakteur:innen",
          file: "09_rollen/06_verwaltung.md",
        },
        {
          title: "9.7 Hochschulen & Wissenschaft",
          file: "09_rollen/07_hochschulen.md",
        },
        {
          title: "9.8 Kirchen & spirituelle Gruppen",
          file: "09_rollen/08_kirchen.md",
        },
        {
          title: "9.9 Kulturschaffende",
          file: "09_rollen/09_kulturschaffende.md",
        },
        {
          title: "9.10 Kinder & Jugendliche",
          file: "09_rollen/10_kinder-und-jugendliche.md",
        },
      ],
    },
    {
      title: "Kapitel 10 – Anhang",
      children: [
        {
          title: "Übersicht",
          file: "10_anhang/00_einleitung.md",
        },
        {
          title: "10.1 Systemlogik in Zahlen",
          file: "10_anhang/01_zahlen.md",
        },
        {
          title: "10.2 Glossar",
          file: "10_anhang/02_glossar.md",
        },
        {
          title: "10.3 Zielgruppen-Module",
          file: "10_anhang/03_zielgruppen.md",
        },
      ],
    },
    {
      title: "Kapitel 11 – Didaktische Module",
      children: [
        {
          title: "Einleitung",
          file: "11_didaktik/00_einleitung.md",
        },
        {
          title: "11.1 Das Verzögerungssystem",
          file: "11_didaktik/01_verzoegerungssystem.md",
        },
        {
          title: "11.2 Systemmuster: Wissen → Wirkungslosigkeit",
          file: "11_didaktik/02_systemmuster.md",
        },
        {
          title: "11.3 Sprache & Narrative im Wandel",
          file: "11_didaktik/03_sprache-narrative.md",
        },
        {
          title: "11.4 Werkzeugkasten – Was tun gegen strukturelle Blockade?",
          file: "11_didaktik/04_werkzeugkasten-bildung.md",
        },
      ],
    },
    { title: "Nachwort", file: "nachwort.md" },
    { title: "Impressum", file: "impressum.md" },
    { title: "Rechtliche Hinweise & Lizenz", file: "rechtliches.md" },
    { title: "Über den Autor", file: "ueber-den-autor.md" },
  ],
  formatFooter: (date, commit, version, author, title) =>
    `© ${new Date(date).toLocaleDateString("de-DE", {
      year: "numeric",
      month: "short",
    })} ${author} · "${title}" (v${version}) · Lizenz: CC BY-SA 4.0 · ` +
    `Feedback oder Fehlerhinweise: <a href="https://github.com/bjoernboettle/die-schlinge">GitHub</a><br />` +
    `<b>Maßgeblich ist nur die offizielle Version unter <a href="https://github.com/bjoernboettle/die-schlinge">github.com/bjoernboettle/die-schlinge</a></b>`,
};

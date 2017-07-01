# feeNotes
CAS-FEE notes

Silvio Bischof

## Running HowTo

- Clone repository

- Install dependencies:

  npm update

- Start node server:

  npm start



## Schedule

- [x] 1: Projekt im Github eintragen.
- [x] 2: HTML Gerüst erstellen für die WireFrames inkl. CSS. Ändern der Wireframes ist erlaubt.
- [x] 3, 17.05.2017: «Create New Note» auf der Detail-Seite implementieren.Die Daten in den «LocalStorage» einpflegen. Navigation zwischen den beiden HTML-Seiten.
      Auf der Hauptseite die Anzahl darstellen.
- [x] Style Switcher implementieren.
      Einen zweiten sinnvollen Style ausdenken.
- [x] 4, 24.05.2017: Hauptseite ausprogrammieren: Anzeigen der Einträge / Filtern / Sortieren
- [x] Handlebars verwenden für das Rendern der Einträge.
- [x] Zentraler Storage Manager (Class oder Modul)
      - [x] Edit Button: id abgefüllt -> Listener auf Button setzen oder globale Funktion ID -> new.html#id= oder GET variable
      - [x] getById
      - [x] Editierung
- [x] !Importance mit subfilter eliminieren
- [x] time darstellung by handlebars
- [x] umbauen richtiger bool: JSON.parse(JSON.stringify(true))


- [x] Detailseite ausprogrammieren: Erfassen / Editieren
- [x] 5, 31.05.2017: JavaScript optimieren. Patterns anwenden. Nutzen von Klassen für die Datenhaltung.
   (Revealing) Module Pattern für die"Datenklassen" erstellen.
- [x] IIFE anwenden.
- [x] 6, 07.06.2017: Client Modularisierung fortführen.
   Node-Module erstellen zum Verwalten der Daten auf dem Server.
    Bonus: Neue Einträge sollen auf andern Browser sichtbar werden. z.B. durch Polling.
- [x] 7, 14.06.2017: Die REST API vom Server implementieren. Diese im Client anbinden.
   - [x] Rest Anfragen statt localStorage
   - [x] Rest Serverside
   - [x] Storage: ajax("POST", "/notes/", entry); alles zu Rest umbauen und Serverseitig abspeichern
- [x] Sortierung fixen
- [x] Importance Anzeige auf List
- [ ] 2ter Style verbessern
- [x] gImportance ersetzen
- [x] packageJson erstellen Abhängigkeiten
- [x] auf anderem host testen
- [ ] Warnungen prüfen Webstorm
- [ ] 8+9, 02.07.2017: Finalisieren & Abgabe


 ​				
 ​			
 ​		
 ​	
# Card Manager – Frontend & Backend

Projekt zaliczeniowy z przedmiotu **Frontend Development II**.  
Aplikacja umożliwia zarządzanie kolekcjami kart
z wykorzystaniem Angulara oraz mockowanego backendu REST (JSON Server).

---

## ⚙️ Wymagania środowiskowe

Do uruchomienia projektu wymagane są:

- **Node.js** – wersja **18+** (zalecane LTS)
- **npm** – wersja **9+**
- **Angular CLI** – wersja **21**

Włączanie aplikacji:

```bash
npm run backend
```

W drugim terminalu:

```bash
npm run start
```

Aplikacja jest dostępne pod adresem http://localhost:4200

🔐 Logowanie

Logowanie jest mockowane – backend zwraca token jako zwykły string
który zapisywany jest w localStorage.

Przykładowe dane:

login: admin

password: admin

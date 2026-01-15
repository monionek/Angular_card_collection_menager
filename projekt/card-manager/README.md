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

Sprawdzenie wersji:

```bash
node -v
npm -v
ng version
📦 Instalacja zależności
W katalogu głównym projektu:

bash
Skopiuj kod
npm install
🚀 Uruchomienie backendu (JSON Server)
Backend uruchamiany jest z katalogu głównego projektu:

bash
Skopiuj kod
npm run backend
Backend będzie dostępny pod adresem:

🚀 Uruchomienie frontendu (Angular)
W osobnym terminalu, również w katalogu głównym projektu:

bash
Skopiuj kod
npm run start
Aplikacja frontendowa będzie dostępna pod adresem:
```

🔐 Logowanie

Logowanie jest mockowane – backend zwraca token jako zwykły string,
który zapisywany jest w localStorage.

Przykładowe dane:

login: admin

password: admin

# Proba IT 2024 - Novac Diana

### Backend
Inainte de a rula backend-ul, rulati comanda "mongod".

Pentru a rula backend-ul aplicatiei, navigati in directorul `backend` si executati urmatoarea comanda:

node index.js

Backend-ul va rula pe portul 5000. 

### Frontend
Pentru a rula frontend-ul aplicatiei, navigati in directorul `frontend` si executati comanda:

npm run dev

Frontend-ul va rula pe portul 5173.

### Functionalitati implementate backend

Pe parcursul acestei perioade de 3 saptamani, am dezvoltat un backend complet functional pentru platforma de retete culinare. Am implementat aproape toate functionalitatile cerute in specificatii, cu exceptia functionalitatilor de upload pentru imagini si resetare a parolei. Le-am verificat pe toate cu Postman.

- **Endpoint-uri**:
  - `POST /register` – Permite inregistrarea utilizatorilor noi, cu criptarea parolei folosind `bcrypt`.
    - Am verificat daca utilizatorul exista deja in baza de date folosind email-ul. Daca nu exista, parola este criptata folosind `bcrypt` si se creeaza un nou document in baza de date cu datele utilizatorului.

  - `POST /login` – Permite autentificarea utilizatorilor existenti, cu generarea unui token JWT pentru sesiune.
    - Am verificat existenta utilizatorului in baza de date si am comparat parola furnizata cu cea criptata din baza de date folosind `bcrypt.compare`. Daca autentificarea este reusita, am generat un token JWT cu timp de expirare de 1 ora.

  - `GET /profile` – Returneaza detaliile utilizatorului autentificat (username, nume complet, email).
    - Am utilizat middleware-ul de autentificare pentru a verifica validitatea token-ului JWT si pentru a obtine ID-ul utilizatorului. Apoi am extras datele utilizatorului din baza de date si le-am trimis ca raspuns.

  - `POST /add-recipe` – Permite adaugarea unei retete de catre un utilizator autentificat.
    - Am validat campurile necesare pentru reteta (nume si descriere) si am folosit ID-ul utilizatorului autentificat pentru a lega reteta de acesta. Reteta este salvata in baza de date si se returneaza un mesaj de succes.

  - `GET /all-recipes` – Returneaza toate retetele din baza de date.
    - Am folosit metoda `find` din MongoDB pentru a extrage toate retetele din baza de date, inclusiv detalii despre autorul fiecarei retete, utilizand `populate`.

  - `POST /rate-recipe/:id` – Permite utilizatorilor autentificati sa voteze o reteta.
    - Am verificat daca utilizatorul a votat deja reteta, pentru a preveni voturile multiple. Apoi am adaugat votul utilizatorului in campul `ratings` al retetei si am recalculat media rating-urilor.

  - `DELETE /delete-recipe/:id` – Permite stergerea unei retete proprii.
    - Am verificat daca reteta exista si daca autorul retetei este acelasi cu utilizatorul autentificat. Daca verificarea este reusita, reteta este stearsa din baza de date.

  - `GET /top-recipes` – Returneaza primele 3 retete sortate descrescator dupa rating.
    - Am folosit metoda `find` pentru a extrage retetele si `sort` pentru a le ordona descrescator dupa campul `averageRating`. Am limitat rezultatele la 3 folosind `limit`.

   - Accesul la profil, adaugarea, votarea si stergerea retetelor este permis doar utilizatorilor autentificati.
     - Am creat un middleware care valideaza token-ul JWT si extrage ID-ul utilizatorului. Middleware-ul este atasat endpoint-urilor care necesita autentificare.

### Functionalitati implementate frontend

Am dezvoltat doar partial frontend-ul platformei. Am reusit sa implementez cateva componente esentiale, cum ar fi navbar-ul, paginile de login si register, pagina de profil si pagina de adaugare retete. Aplicatia nu respecta complet design-ul primit in Figma. Nu am implementat nici partea de
responsive design.

  - **Navbar** – Am creat o bara de navigare simpla care permite utilizatorilor sa se deplaseze intre diferitele pagini ale aplicatiei;

  - **Pagina de Login** - Am creat un formular cu campuri pentru email si parola. La submit, datele sunt trimise catre backend folosind axios. Daca autentificarea este reusita, token-ul JWT este salvat in `localStorage` si utilizatorul e redirectionat la Homepage;

  - **Pagina de Register** - Am implementat un formular cu campuri pentru username, nume complet, email si parola;

  - **Pagina de Adaugare Retete** - Am creat un formular cu campuri pentru numele retetei si descriere;

  - **Pagina de Profil** – Afiseaza informatii despre utilizatorul autentificat. De asemenea, am inclus un buton pentru redirectionarea catre pagina de adaugare retete;

### Ce am invatat?

Pe parcursul acestei perioade, am invatat foarte multe lucruri, avand in vedere ca la inceputul probei nu aveam experienta deloc cu dezvoltarea web.

- **Backend Development**:
  - Am invatat cum sa structurez un backend folosind Node.js si Express;
  - Am inteles conceptele de autentificare si autorizare;
  - Am invatat cum sa lucrez cu baze de date MongoDB pentru stocarea si gestionarea datelor utilizatorilor si retetelor;
  - Mi-a placut foarte mult sa dezvolt backend-ul si sa vad cum toate functionalitatile se leaga;

- **Frontend Development**:
  - Am invatat sa folosesc React la un nivel de baza pentru a structura interfata aplicatiei;
  - Am inteles cum sa trimit cereri catre backend folosind `axios` si cum sa gestionez starea aplicatiei;
  - Totusi, am descoperit ca frontend-ul, mai ales partea de design, nu este ceva care imi place. Am realizat ca partea de stilizare si de urmarire a design-urilor predefinite in Figma nu imi place deloc;

- **Despre mine**:
  - Mi-am dat seama ca prefer mult mai mult sa lucrez la backend decat la frontend. Faptul ca am reusit sa implementez aproape toate functionalitatile backend-ului m-a motivat si mi-a placut sa vad progresul facut. In schimb, partea de frontend si design m-a facut sa realizez ca aceasta zona nu este una care sa ma atraga;

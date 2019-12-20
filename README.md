# **Nume echipă:** Codella
# **Temă:** Aplicație web pentru gestionarea notițelor de curs/seminar
# **Membri:**
  - Calotă Denisa-Andreea - Product Owner
  - Baicu Andrei - Project Manager
  - Cervinski Teodor - Software Developer
  - Berdei Ioana-Andreea - Software Developer

# **Colecția de requesturi în Postman**
- pentru fiecare request există și un exemplu salvat (aici se poate vedea body-ul requestului și response-ul)
[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/17b9f52f9a8526054066)

# API Rest
 **USERS:**
 - **POST /users** – adaugă un utilizator -> folosit doar în testarea prin intermediul Postman deoarece în aplicație se va realiza la Google Auth (pentru testarea Google Auth se va deschide din instanța C9 proiectul prin funcționalitatea Share, iar în continuarea adresei ip va fi adăugat sufixul **.xip.io** -> serviciu gratuit de wildcard DNS pentru testare deoarece Google nu acceptă DNS-ul de la AWS)
 - **DELETE /users/:id** -> șterge contul unui utilizator
 
 **GROUPS:**
 - **POST /groups** -> adaugă un grup
 - **POST /groups/:groupId/:user_id** -> adaugă un utilizator la un grup
 - **GET /group/:groupId** -> selectează toți utilizatorii dintr-un grup
 - **GET /groups/:user_id** -> selectează toate grupurile unui utilizator
 - **DELETE /groups/:groupId/:user_id** -> șterge un utilizator dintr-un grup
 - **POST /users/notes/:groupId/:noteId** – adaugă o notiță la un grup
 - **GET /users/notes/:groupId** -> listează toate notițele unui grup
 - **DELETE /groups/:groupId** -> șterge un grup
 
 **NOTES:**
 - **POST /notes/:userId** -> adaugă o notiță la un utilizator
 - **GET /notes/users/:userId** -> listează toate notițele pentru un utilizator
 - **GET /note/:id** -> listează o notiță
 - **PUT /notes/:id** -> updatează conținutul unei notițe
 - **DELETE /notes/:id** -> șterge o notiță

  **KEYWORDS:**
 - **POST /keywords/:note_id** -> adaugă un cuvânt cheie la o notiță
 - **GET /keywords** -> listează toate cuvintele cheie
 - **GET /keywords/:note_id** – listează toate cuvintele cheie pentru o notiță
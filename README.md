# Planty - Szobanövény Applikáció   
[GitHub repository](https://github.com/green-fox-academy/noroon-masterwork)


## Tartalomjegyzék
* [Leírás](#leírás)
* [Funkciók](#funkciók)
* [Technikai követelmények](#technikai-követelmények)
* [Használat](#használat)


## Leírás
A felhasználók az adatbázisban szereplő szobanövények között kereshetnek, megnézhetik a növények specifikációját, gondozási útmutatóját.
Regisztrációt követően a felhasználónak lehetősége nyílik saját kollekció létrehozására a már meglévő növényei számára, illetve létre tud hozni kívánságlistát, amiben a még be nem szerzett növényeket tudja tárolni. A már meglévő növényekhez tartozik egy naptár, amiben vezetni lehet az ültetés idejét, az ültetéshez használt földkeverék arányait, összetételét, a tápoldatozást és az öntözést. Egy-egy növénykártya alatti kommentszekcióban lehetősége van a felhasználóknak egymással tippeket és bevált gondozási módszereket megosztani.
A felhasználók létrehozhatnak új növénykártyákat.


## Funkciók

### Regisztráció nélküli felhasználó funkciói
- Növények keresése név és egyéb jellemzők alapján
- Regisztráció email és jelszó alapján

### Regisztrációval rendelkező felhasználó funkciói
- Minden regisztráció nélküli felhasználó által elérhető funkció
- Ki- és bejelentkezés
- Saját profil adatok szerkesztése, avatar feltöltése, jelszó módosítása
- Profil törlése
- Saját kollekció szerkesztése
- A saját kollekcióban szereplő növényekhez ültetőmixek hozzárendelése, gondozási naptár hozzáadása, szerkesztése  
- Saját kívánságlista szerkesztése
- A növénykártyákhoz komment írása
- Növénykártyák létrehozása

### Adminisztrátori funkciók
- Felhasználók kezelése
- A felhasználók által létrehozott növénykártyák szerkesztése, törlése


## Technikai követelmények

### Backend
- Node.js
- Express.js
- MongoDB, Mongoose
- Json Web Token
- Docker

### Frontend
- React
- Bootstrap


### API dokumentáció
- [OpenAPI/Swagger](open-api-doc)


## Használat

### Backend
- `.env` fájl létrehozása az `.env.example` alapján
- Parancsok:
  - `yarn install` - függőségek installálása
  - `yarn start` - alkalmazás indítása
  - `yarn test` - teszt fájlok futtatása
  - `yarn lint` - linter futtatása
  - `yarn build` - alkalmazás buildelése
  - `yarn load-data` - adatbázis feltöltése

### Frontend
- `.env` fájl létrehozása az `.env.example` alapján
- Parancsok:
  - `yarn install` - függőségek installálása
  - `yarn start` - alkalmazás indítása
  - `yarn lint` - linter futtatása
  - `yarn build` - alkalmazás buildelése

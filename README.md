# Planty - Szobanövény Applikáció   
[GitHub repository](https://github.com/green-fox-academy/noroon-masterwork)


## Tartalomjegyzék
* [Leírás](#leírás)
* [Funkciók](#funkciók)
* [Technikai követelmények](#technikai-követelmények)
* [Használat](#használat)


## Leírás
A felhasználók megnézhetik az adatbázisban szereplő növények specifikációját, gondozási útmutatóját, feliratkozhatnak hírlevélre.
Regisztrációt követően a felhasználónak lehetősége nyílik saját gyűjtemény létrehozására az adatbázisban szereplő növényekből. Ha nem talál egy növényt, küldhet egy kérést az admin számára a növény nevével, aki a kéréseket látja és a későbbiekben kezelni tudja. A felhasználó képes földkeverékrecepteket felvinni az adatbázisba, illetve megnézni a már felvitt földkeverékeket.
Növénykártyákat csak az admin tud felvinni.
Prezentáció: https://www.canva.com/design/DAFECIbudzk/1CS5wlvigE493pT15rhD2Q/view?utm_content=DAFECIbudzk&utm_campaign=designshare&utm_medium=link&utm_source=publishsharelink#1

## Funkciók

### Regisztráció nélküli felhasználó funkciói
- Növények megtekintése
- Regisztráció email és jelszó alapján

### Regisztrációval rendelkező felhasználó funkciói
- Növények megtekintése
- Ki- és bejelentkezés
- Saját felhasználónevének és email-címének módosítása
- Saját gyűjtemény létrehozása 
- Földkeverékrecept felvitele

### Adminisztrátori funkciók
- Felhasználói kérések megtekintése
- Növénykártyák létrehozása
- Földkeverékrecept felvitele

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

## Applikáció indítása
- Az adatbázis feltölthető a backend mappából `yarn load-data` paranccsal, ehhez a .env.example alapján létre kell hozni a .env fájlt
- .env.dev létrehozása a .env.dev.example alapján
  - AWS S3 bucket: https://portal.aws.amazon.com/billing/signup#/start/email
  - MongoDB: https://account.mongodb.com/
- docker-compose --env-file ./.env.dev build parancs futtatása a gyökérkönyvtárban
- docker-compose --env-file ./.env.dev up parancs futtatása
  - Planty-app: http://localhost:3000/
  - Open API dokumentáció http://localhost:4000/

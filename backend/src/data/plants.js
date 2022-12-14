const plants = [
  {
    name: 'Lantlevelű fikusz (Ficus lyrata)',
    moisture: 2,
    water: 2,
    light: 2,
    petfriendly: false,
    edible: false,
    easyToCare: false,
    care: 'Nincsenek különleges igényei, csak a szélsőséges körülményeket nem szereti (erős napsütés, túl meleg és túl száraz levegő, túl hideg és nedves környezet, huzat).\n\nAhogy a legtöbb fikusz, így a lantlevelű fikusz esetében sem jó választás, ha huzatos helyen tartjuk, mivel erre a levelek ledobásával reagál a növény. Keressünk számára kellemesen meleg és világos, tűző naptól, és huzattól mentes helyet.\n\nÖntözés, párásítás, tápoldatozás\nPáratartalom igénye közepes, ezért ha párásítunk, azt meghálálja. Ha túlságosan száraz és fűtött, meleg a szoba levegője, az kedvez a pajzstetvek, takácsatkák és tripszek megjelenésének. A párásításra jó módszer a közvetlen párásítás, azaz a levelek vízzel való permetezése.\n\nKözepes vízigényű növény, rendszeres, mérsékelt öntözést igényel, télen ritkábban öntözzük. Figyeljünk arra, hogy ne öntözzük túl, a pangó víz ártalmas, és levélhullást eredményez.\n\nA felhasznált tápanyagok pótlásáról, rendszeres tápoldatozással gondoskodjunk, nyáron kéthetente adjunk neki tápoldatot.\n\nÁtültetés, szaporítás\nHa szükségesnek látjuk az átültetést, mert már kicsi lett a növény cserepe, vagy kimerült és elhasználódott a növény földje, akkor tavasszal B típusú virágföldbe ültethetjük át.\n\nSzaporítani dugványozással lehet, ehhez kellemesen meleg, világos hely, és pára szükséges. A dugványozáshoz levágott hajtáscsúcsot és szárdugványt is használhatunk!\n\nMetszés\nA fikuszokat metszéssel alakíthatjuk, különösen jól alakítható a Ficus microcarpa, a kislevelű fikusz (Ficus benjamina), és a hosszúlevelű fikusz (Ficus longifolia).\n\nMunka előtt érdemes kesztyűt húzni, és leteríteni a növény alatt a padlót, a csepegő tejnedv miatt. Egy-egy ágat vagy tőből vágjunk le vagy egy levélnél metsszük el. Érdemes lentről felfelé haladva végezni a metszést. Ha ezzel végeztünk forgassuk meg a növényt, vagy részletenként haladjunk körbe.\n\nKártevők betegségek\nTúlságosan száraz levegőjű, fűtött helyiségben takácsatkák, pajzstetvek és tripszek is megtámadhatják. Huzatos helyen, valamint túlöntözés hatására is hullajthatja leveleit. Ha télen túl hűvös és hideg helyen tartjuk szintén ledobhatja a leveleit.',
    imageKey: 'a5e7d1d01a2402be46085858f2d3adae',
    image: {
      path: 'src/data/images/lauren-mancke-DpphPG9ENsI-unsplash.jpg',
      filename: 'a5e7d1d01a2402be46085858f2d3adae',
    },
  },
  {
    name: 'Monstera Minima',
    moisture: 3,
    water: 2,
    light: 3,
    petfriendly: false,
    edible: false,
    easyToCare: true,
    care: 'A Monstera minima vagy Rhaphidophora tetrasperma a könnyezőpálma (Monstera) kistermetű, lassú növekedésű változata, melynek hajtásait felfuttathatjuk, de le is lógathatjuk a növényt függesztett kaspóba ültetve.\n\nFő díszét erősen szeldelt élénkzöld levelei adják, bármely lakásnak különleges dísze lehet ez a növény. Helyéül kellemesen meleg, világos, de nem tűző napos, helyet keressünk, mivel a tűző nap könnyen megégetheti leveleit.\n\nSzereti a párás környezetet, ezért érdemes sűrűn permetezni a levélzetet. Rendszeres öntözést igényel, de állni azért ne álljon a vízben.\n\nTavasszal és nyáron tápoldatozhatjuk, meghálálja! Ha szükségét érezzük, hogy átültessük, azt tavasszal tegyük meg.',
    imageKey: 'e3eaffc80715bdfdcd27153849e066fe',
    image: {
      path: 'src/data/images/severin-candrian-RHe-ebrSUTE-unsplash.jpg',
      filename: 'e3eaffc80715bdfdcd27153849e066fe',
    },
  },
  {
    name: 'Márványos szobafutóka (Scindapsus Pictus Aargyraeus)',
    moisture: 3,
    water: 2,
    light: 2,
    petfriendly: false,
    edible: false,
    easyToCare: true,
    care: 'A szobai futóka (Epipremnum aureum, Scindapsus aureus) a kontyvirágfélék családjába tartozó kúszónövény, mely márványos mintázatú, szív alakú leveleivel díszít. Függesztett cserépbe ültetve, valamint támasztékra felfuttatva is nevelhetjük.\n\nA szobai futóka egyszerű gondozása és mutatós külseje miatt régóta közkedvelt szobanövény, gyakran találkozhatunk vele közintézményekben, irodaházakban és természetesen a lakásokban is.\n\nA szobai futóka világos, de nem tűző napos, kellemesen meleg, szobahőmérsékletű helyen fejlődik a legszebben. Ha túl kevés fényt kap, levelei elveszítik szép mintázatukat, míg túl sok fény hatására kifakulnak.\n\nA szobai futóka rendszeres, de körültekintő öntözést igényel, földjét tartsuk kissé nyirkosan, de soha ne öntözzük túl. Ha elkezdenek lekókadni a levelei, akkor vízre van szüksége. Ne várjunk addig az öntözéssel, míg fonnyadni kezdenek a levelek.\n\nHa a leveleken fekete foltok jelennek meg, az azt jelzi, hogy túlságosan nedves a talaj. A szobai futóka tolerálja az alacsonyabb páratartalmat is, ugyanakkor a párás környezetet kimondottan szereti.\n\nMeghálálja a párásítást, de az is jó megoldást jelent, ha a lakás valamelyik párásabb helyiségében, például a konyhában vagy a fürdőszobában helyezzük el. Tavasszal és nyáron kéthetente tápoldatozzuk, az év egyéb időszakaiban nem szükséges tápoldatozni.\n\nÁtültetése\nHa azt tapasztaljunk, hogy a megfelelő öntözés ellenére is lógnak a növény levelei, illetve, ha a cserép alján is megjelennek a gyökerek, akkor az azt jelzi, hogy a gyökérzet teljesen benőtte a földet, ilyenkor ültessük át a szobai futókát egy vagy két számmal nagyobb cserépbe.\n\nAz ültetéshez olyan edényt válasszunk, amelynek alján vízelvezető nyílások is találhatók. Az ültetéshez megfelelő a B típusú virágföld, a lényeg, hogy jó vízáteresztő képességű legyen a talaj.\n\nBetegségei és kártevői\nA szobai futóka nem számít kényes szobanövénynek, azonban időnként károsíthatják a pajzstetvek. Az egyéb problémák a nem megfelelő gondozásból fakadnak, túlöntözés hatására gyökérrothadás és levélhullás jelentkezhet.\n\nHa nagyon keveset öntözzük, azt száraz, barna levélszélek jelzik, sőt levélhullás is előfordulhat, a túlöntözött növények levelén pedig fekete foltok jelennek meg. Fényhiányos helyen a levelek elveszítik a mintájukat, míg, ha túl sok fényt kapnak, fakóvá válhatnak.\n\nSzaporítása\nA szobai futóka nagyon egyszerűen szaporítható dugványozás segítségével. Ehhez egy éles és steril késsel vagy ollóval, vágjunk le egy legalább három leveles egészséges szárrészt. A legalsó leveleket szedjük le szárról, a dugványt pedig állítsuk egy vízzel teli pohárba vagy befőttes üvegbe.\n\nAz üveget tegyük világos, kellemesen meleg helyre, amennyiben szükséges cseréljük a vizet. Néhány hét alatt a dugványon megjelennek a gyökerek, ezt követően ültessük el jó szerkezetű virágfölddel töltött cserépbe és helyezzük világos helyre. Földjét tartsuk nedvesen, de arra figyeljünk, hogy ne öntözzük túl.',
    imageKey: '42071d72a9d584106667bf1b60428d6e',
    image: {
      path: 'src/data/images/severin-candrian-SVRKkENpalg-unsplash.jpg',
      filename: '42071d72a9d584106667bf1b60428d6e',
    },
  },
  {
    name: 'Pénzlevelű Pilea',
    moisture: 2,
    water: 2,
    light: 2,
    petfriendly: false,
    edible: false,
    easyToCare: true,
    care: 'A pénzlevelű pilea (Pilea peperomioides) a Pilea nemzetségbe tartozó Kínában őshonos növény. Magyarországon szobanövényként forgalmazzák, alkalmas terráriumba való ültetésre is. Szerencsehozó növénynek tarják, gyakran ajándékozzák a barátság jelképeként is.\n\nTermészetes élőhelyén 1500-3000 méter tengerszint feletti magasságban, árnyékosabb helyeken, erdőkben, nedves sziklákon él.\n \nRendkívül érdekes megjelenésű, gyors növekedésű növény, külseje valamelyest a Peperomia polybotrya törpebors fajra emlékeztet. Díszét hosszú levélnyelű, kerekded alakú zöld színű levelei adják, virágai nem túl dekoratívak.\n\nA pénzlevelű pilea az állandó, kiszámítható környezetet és a kellemesen párás levegőt szereti. Helyéül, világos, szórt fénnyel bevont, kellemes szobahőmérsékletű helyet válasszunk, tűző napos helyen ne tartsuk.\n\nÁtlagos víz és tápanyagigényű növény, rendszeres mérsékelt öntözést kíván, a túlöntözésre és az alulöntözésre érzékeny. Ha időnként tápoldatozzuk a tavasztól őszig tartó időszakban, azt meghálálja. Fontos, hogy kellemesen párás környezetet is biztosítsunk párásítással.\n\nMegfelelő gondozás mellett a pénzlevelű pilea gyökér és tősarjakat nevel, ezeket szétültetve szaporíthatjuk a legegyszerűbben. Ha szeretnénk átültetni, tavasszal végezzük el az ültetést, az átültetéshez megfelelő az általános virágföld.',
    imageKey: 'c1d89a5ff08c56b581a55a9c9132c4c0',
    image: {
      path: 'src/data/images/andrew-reshetov-f8tr3-MJzhc-unsplash.jpg',
      filename: 'c1d89a5ff08c56b581a55a9c9132c4c0',
    },
  },
  {
    name: 'Agglegénypálma',
    moisture: 1,
    water: 1,
    light: 1,
    petfriendly: false,
    edible: false,
    easyToCare: true,
    care: 'Az agglegénypálma nagyon jól tolerálja a különböző fényviszonyokat, azonban legszebben világos, de nem tűző napos, kellemesen meleg, szobahőmérsékletű helyiségben fejlődik. Az erős napfény megégetheti a leveleit.\r\n\r\nAz agglegénypálma a lakás félárnyékos részeiben is megél, túlságosan sötét helyiségben tartva azonban megnyúlhat. A hideget és a huzatot nem szereti, ezt vegyük figyelembe, amikor helyet keresünk számára.\r\n\r\nNagyon jól bírja a szárazságot, a túlöntözésre viszont érzékeny, ezért csak ritkán kell öntözni, elég akkor, amikor a földje már teljesen kiszáradt, a pangó vizet mindenképpen kerüljük. A tavasztól őszig terjedő időszakban, meghálálja, ha havonta tápoldatozzuk kis töménységű tápoldattal.\r\n\r\nAz agglegénypálma nem igényel páradús környezetet, a lakás levegőjének páratartalma általában megfelelő a számára. Gondozási feladatként az előbbieken túl a levelek portalanítását, tisztítását lehet még megemlíteni.\r\n\r\nA növény levelei nagyon szép fényesek, egy idő után azonban megülhet rajtuk a port, melyet nedves ruha segítségével távolíthatunk el a legegyszerűbben. Fontos megemlíteni, hogy az agglegénypálma gondozása során nem szabad a boltban kapható levélfényesítő sprayt használni!',
    imageKey: '74a3ddab255e3a9c8df8fbb791910561',
    image: {
      path: 'src/data/images/severin-candrian-cLaaxa4DSnc-unsplash.jpg',
      filename: '74a3ddab255e3a9c8df8fbb791910561',
    },
  },
  {
    name: 'Madárfészek páfrány (Asplenium nidus)',
    moisture: 3,
    water: 3,
    light: 2,
    petfriendly: true,
    edible: false,
    easyToCare: false,
    care: 'A madárfészekpáfrány (Asplenium nidus) a fodorkafélék családjából származó, Ázsia, Afrika, és Ausztrália trópusi esőerdeiben gyakori növényfaj. \n\nA félárnyékos, egész évben 20 fokos vagy annál melegebb szobahőmérsékletű helyet igényel, 16 foknál hűvösebb soha ne legyen.\n\nLágy vízzel rendszeresen öntözzük, tavasszal és nyáron mérsékelt töménységű tápoldatot kapjon 2-3 hetente.\n\nFűtött helyiségben gondoskodjunk közvetett párásításról, és rendszeresen permetezzük is. Átültetni minden második nyáron kell A virágföldbe. Meleg szaporítóágyban spóráról szaporíható.',
    imageKey: '63ba034534285518e1d9b259bde1d5f2',
    image: {
      path: 'src/data/images/severin-candrian-rL5Jz2e9Rao-unsplash.jpg',
      filename: '63ba034534285518e1d9b259bde1d5f2',
    },
  },
  {
    name: 'Anthurium Clarinervium',
    moisture: 3,
    water: 2,
    light: 2,
    petfriendly: true,
    edible: false,
    easyToCare: true,
    care: 'Virágoztatás, tápoldatozás\nGyakran előfordul, hogy virágzása sok helyen elmarad, ez amiatt következik be, hogy a növény rengeteg tápanyagot használ fel a virágképzéshez, a következő virágzáshoz már nem marad elég tápanyaga.\nA virágzást, a tavasztól őszig tartó időszakban heti egyszeri tápoldatozással, kellő méretű cserépbe való ültetéssel, és kétévente történő átültetéssel segíthetjük elő.\n\nElhelyezés, öntözés, párásítás\nA növényt világos, vagy félárnyékos, kellemesen meleg helyre helyezzük, a tűző naptól viszont óvjuk. Egész éven át 20 fok körüli hőmérséklet megfelelő számára.\nTélen mérsékeljük az öntözést, míg tavasztól őszig legyen rendszeres, víz soha ne álljon alatta. A meszes víz akár a növény pusztulását is eredményezheti, ezért lágy vízzel öntözzünk.\nKedveli a párás környezetet, ezt párásítással biztosíthatjuk a számára. A párásítás során, figyeljünk rá oda, hogy a virágokra ne kerüljön a kipermetezett vízből. Ha a virágokra kerül a vízből, akkor barna foltok jelenhetnek meg rajtuk.\n\nSzaporítás, átültetés\nA flamingóvirágot magról, valamint egyszerűbben tőosztással lehet szaporítani. Átültetni tavasszal lehet, ez akkor válik szükségessé, ha kinőtte a cserepét, illetve elhasználódott a földje.\nA tőosztással való szaporítást elvégezhetjük az átültetéssel egy időben. Az átültetéshez A típusú virágföldet válasszunk.\n\nBetegségek, kártevők\nA flamingóvirágot nem megfelelő gondozás esetén, sajnos megtámadhatják különféle kártevők, és egyéb problémák is adódhatnak. Ha napon tartjuk, és a levegő is túl száraz, akkor a takácsatkák támadhatják meg, a levelek széle pedig besodródik.\nLevéltetvek és pajzstetvek szintén veszélyt jelenthetnek rá. Betegségek közül a gyökérrothadás és a levélfoltosság jelentkezhet.',
    imageKey: '011e0057b56648a650a0f3ca37f1d8ba',
    image: {
      path: 'src/data/images/severin-candrian-qmCt4XB11Z0-unsplash.jpg',
      filename: '011e0057b56648a650a0f3ca37f1d8ba',
    },
  },
];

export default plants;

// Accès par grilleprogrammes[ jour ][ heure ]
// Dimanche en premier, car convention temps Unix: jour 0 d'une semaine est le dimanche
var grilleprogrammes = [
  [
    // Dimanche
    "Bonne Nuit les Puissants", // 00h - 01h
    "Bonne Nuit les Puissants", // 01h - 02h
    "Bonne Nuit les Puissants", // 02h - 03h
    "Bonne Nuit les Puissants", // 03h - 04h
    "Bonne Nuit les Puissants", // 04h - 05h
    "Bonne Nuit les Puissants", // 05h - 06h
    "Le Monde d'IMAscore", // 06h - 07h
    "Le Monde d'IMAscore", // 07h - 08h
    "Le Monde d'IMAscore", // 08h - 09h
    "MegaMix", // 09h - 10h
    "MegaMix", // 10h - 11h
    "MegaMix", // 11h - 12h
    "America f*** Yeah", // 12h - 13h
    "America f*** Yeah", // 13h - 14h
    "MegaMix", // 14h - 15h
    "MegaMix", // 15h - 16h
    "MegaMix", // 16h - 17h
    "Made in Europe", // 17h - 18h
    "Made in Europe", // 18h - 19h
    "Made in Europe", // 19h - 20h
    "RetroLand", // 20h - 21h
    "RetroLand", // 21h - 22h
    "RetroLand", // 22h - 23h
    "MegaMix", // 23h - 00h
  ],

  [
    // Lundi
    "Bonne Nuit les Puissants", // 00h - 01h
    "Bonne Nuit les Puissants", // 01h - 02h
    "Bonne Nuit les Puissants", // 02h - 03h
    "Bonne Nuit les Puissants", // 03h - 04h
    "Bonne Nuit les Puissants", // 04h - 05h
    "Bonne Nuit les Puissants", // 05h - 06h
    "Le Monde d'IMAscore", // 06h - 07h
    "Le Monde d'IMAscore", // 07h - 08h
    "Le Monde d'IMAscore", // 08h - 09h
    "MegaMix", // 09h - 10h
    "MegaMix", // 10h - 11h
    "MegaMix", // 11h - 12h
    "America f*** Yeah", // 12h - 13h
    "America f*** Yeah", // 13h - 14h
    "MegaMix", // 14h - 15h
    "MegaMix", // 15h - 16h
    "MegaMix", // 16h - 17h
    "Made in Europe", // 17h - 18h
    "Made in Europe", // 18h - 19h
    "Made in Europe", // 19h - 20h
    "Le Monde d'IMAscore", // 20h - 21h
    "Le Monde d'IMAscore", // 21h - 22h
    "Le Monde d'IMAscore", // 22h - 23h
    "MegaMix", // 23h - 00h
  ],

  [
    // Mardi
    "Bonne Nuit les Puissants", // 00h - 01h
    "Bonne Nuit les Puissants", // 01h - 02h
    "Bonne Nuit les Puissants", // 02h - 03h
    "Bonne Nuit les Puissants", // 03h - 04h
    "Bonne Nuit les Puissants", // 04h - 05h
    "Bonne Nuit les Puissants", // 05h - 06h
    "Made in Europe", // 06h - 07h
    "Made in Europe", // 07h - 08h
    "Made in Europe", // 08h - 09h
    "MegaMix", // 09h - 10h
    "MegaMix", // 10h - 11h
    "MegaMix", // 11h - 12h
    "Le Monde d'IMAscore", // 12h - 13h
    "Le Monde d'IMAscore", // 13h - 14h
    "MegaMix", // 14h - 15h
    "MegaMix", // 15h - 16h
    "MegaMix", // 16h - 17h
    "America f*** Yeah", // 17h - 18h
    "America f*** Yeah", // 18h - 19h
    "America f*** Yeah", // 19h - 20h
    "Made in Europe", // 20h - 21h
    "Made in Europe", // 21h - 22h
    "Made in Europe", // 22h - 23h
    "MegaMix", // 23h - 00h
  ],

  [
    // Mercredi
    "Bonne Nuit les Puissants", // 00h - 01h
    "Bonne Nuit les Puissants", // 01h - 02h
    "Bonne Nuit les Puissants", // 02h - 03h
    "Bonne Nuit les Puissants", // 03h - 04h
    "Bonne Nuit les Puissants", // 04h - 05h
    "Bonne Nuit les Puissants", // 05h - 06h
    "America f*** Yeah", // 06h - 07h
    "America f*** Yeah", // 07h - 08h
    "America f*** Yeah", // 08h - 09h
    "MegaMix", // 09h - 10h
    "MegaMix", // 10h - 11h
    "MegaMix", // 11h - 12h
    "OnBoard", // 12h - 13h
    "OnBoard", // 13h - 14h
    "MegaMix", // 14h - 15h
    "MegaMix", // 15h - 16h
    "MegaMix", // 16h - 17h
    "Le Monde d'IMAscore", // 17h - 18h
    "Le Monde d'IMAscore", // 18h - 19h
    "Le Monde d'IMAscore", // 19h - 20h
    "America f*** Yeah", // 20h - 21h
    "America f*** Yeah", // 21h - 22h
    "America f*** Yeah", // 22h - 23h
    "MegaMix", // 23h - 00h
  ],

  [
    // Jeudi
    "Bonne Nuit les Puissants", // 00h - 01h
    "Bonne Nuit les Puissants", // 01h - 02h
    "Bonne Nuit les Puissants", // 02h - 03h
    "Bonne Nuit les Puissants", // 03h - 04h
    "Bonne Nuit les Puissants", // 04h - 05h
    "Bonne Nuit les Puissants", // 05h - 06h
    "Made in Europe", // 06h - 07h
    "Made in Europe", // 07h - 08h
    "Made in Europe", // 08h - 09h
    "MegaMix", // 09h - 10h
    "MegaMix", // 10h - 11h
    "MegaMix", // 11h - 12h
    "RetroLand", // 12h - 13h
    "RetroLand", // 13h - 14h
    "MegaMix", // 14h - 15h
    "MegaMix", // 15h - 16h
    "MegaMix", // 16h - 17h
    "America f*** Yeah", // 17h - 18h
    "America f*** Yeah", // 18h - 19h
    "America f*** Yeah", // 19h - 20h
    "Made in Europe", // 20h - 21h
    "Made in Europe", // 21h - 22h
    "Made in Europe", // 22h - 23h
    "MegaMix", // 23h - 00h
  ],

  [
    // Vendredi
    "Bonne Nuit les Puissants", // 00h - 01h
    "Bonne Nuit les Puissants", // 01h - 02h
    "Bonne Nuit les Puissants", // 02h - 03h
    "Bonne Nuit les Puissants", // 03h - 04h
    "Bonne Nuit les Puissants", // 04h - 05h
    "Bonne Nuit les Puissants", // 05h - 06h
    "Le Monde d'IMAscore", // 06h - 07h
    "Le Monde d'IMAscore", // 07h - 08h
    "Le Monde d'IMAscore", // 08h - 09h
    "MegaMix", // 09h - 10h
    "MegaMix", // 10h - 11h
    "MegaMix", // 11h - 12h
    "America f*** Yeah", // 12h - 13h
    "America f*** Yeah", // 13h - 14h
    "MegaMix", // 14h - 15h
    "MegaMix", // 15h - 16h
    "MegaMix", // 16h - 17h
    "Made in Europe", // 17h - 18h
    "Made in Europe", // 18h - 19h
    "Made in Europe", // 19h - 20h
    "Le Monde d'IMAscore", // 20h - 21h
    "Le Monde d'IMAscore", // 21h - 22h
    "Le Monde d'IMAscore", // 22h - 23h
    "Friday Night Fright", // 23h - 00h
  ],

  [
    // Samedi
    "Friday Night Fright", // 00h - 01h
    "Bonne Nuit les Puissants", // 01h - 02h
    "Bonne Nuit les Puissants", // 02h - 03h
    "Bonne Nuit les Puissants", // 03h - 04h
    "Bonne Nuit les Puissants", // 04h - 05h
    "Bonne Nuit les Puissants", // 05h - 06h
    "America f*** Yeah", // 06h - 07h
    "America f*** Yeah", // 07h - 08h
    "America f*** Yeah", // 08h - 09h
    "MegaMix", // 09h - 10h
    "MegaMix", // 10h - 11h
    "MegaMix", // 11h - 12h
    "Le Monde d'IMAscore", // 12h - 13h
    "Le Monde d'IMAscore", // 13h - 14h
    "MegaMix", // 14h - 15h
    "MegaMix", // 15h - 16h
    "MegaMix", // 16h - 17h
    "Made in Europe", // 17h - 18h
    "Made in Europe", // 18h - 19h
    "Made in Europe", // 19h - 20h
    "OnBoard", // 20h - 21h
    "OnBoard", // 21h - 22h
    "OnBoard", // 22h - 23h
    "MegaMix", // 23h - 00h
  ],
];

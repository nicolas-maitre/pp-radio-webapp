// VARIABLES
// Récupération des paramètres passés en URL
var parametresUrl = new URLSearchParams(location.search);
const afficherAuditeurs = parametresUrl.get("auditeurs");

// Variables générales
var dateActuelle = new Date();
var arraySyntheseProgrammes = [];
var historiqueMetas = [];
var messageActuel = "";
var messageConsulte = false;
var ecranActuel = "endirect";
var chronoMasquageUI = "";
var imagesCartons = [
  ["MegaMix", "images/poster-megamix.png"],
  ["Made in Europe", "images/poster-madeineurope.png"],
  ["Le Monde d'IMAscore", "images/poster-mondeimascore.png"],
  ["America f*** Yeah !", "images/poster-americafyeah.png"],
  ["RetroLand", "images/poster-retroland.png"],
  ["OnBoard!", "images/poster-onboard.png"],
  ["Friday Night Fright", "images/poster-fridaynightfright.png"],
  ["Le Live", "images/poster-lelive.png"],
];
var compteurSyntheInfos = 0;
var syntheInfos = [
  "Retrouvez le podcast Puissance Parcs un vendredi sur deux, sur SoundCloud et la plupart des plateformes audio...",
  "Vous préférez regarder ? Puissance Parcs est aussi disponible en vidéo sur YouTube et en live sur Twitch...",
  "Rejoignez la communauté Puissance Parcs, et échangez entre passionnés sur notre serveur Discord...",
  "Suivez nos comptes Instagram, Facebook et Twitter pour rester en contact avec l'équipe Puissance Parcs...",
];
var compteurInfosEmission = 0;

// FONCTIONS
// Horloge temps réel
setInterval(function () {
  // Créer l'élément date
  dateActuelle = new Date();

  // La décaler de 5 secondes, pour synchroniser cette date avec le buffer de streaming (et donc le flux radio)
  dateActuelle.setSeconds(dateActuelle.getSeconds() - 5);

  // Remplir les textes
  $("#heure").html(
    dateActuelle.getHours() + ":" + ("0" + dateActuelle.getMinutes()).slice(-2)
  );
  $("#visu-tophoraire").html(
    dateActuelle.getHours() +
      ":" +
      ("0" + dateActuelle.getMinutes()).slice(-2) +
      ":" +
      ("0" + dateActuelle.getSeconds()).slice(-2)
  );

  // A l'approche de l'heure fixe (XX:59:55), afficher le top horaire du mode Visualiseur
  if (dateActuelle.getMinutes() === 59 && dateActuelle.getSeconds() === 55) {
    afficherTopHoraireVisu();
  }

  // A l'heure fixe (XX:00:00), afficher le carton avec le logo de la radio
  if (dateActuelle.getMinutes() === 00 && dateActuelle.getSeconds() === 00) {
    afficherCarton("images/poster-radiopuissanceparcs.png", 2000);
  }
}, 1000);

// Afficher/Masquer le compteur d'auditeurs en direct
if (afficherAuditeurs) {
  // Après 1 seconde d'attente (le temps que la page charge)
  setTimeout(function () {
    $("#compteur-auditeurs").show("fade", 250);
  }, 1000);
}

// Faire défiler les infos dans le syntheinfos du mode Visualiseur et cycler entre émission actuelle et emission suivante dans la barre inférieure
function defilementRegulierInfos() {
  // MODE VISUALISEUR: Synthétiseur d'infos
  // Masquer le texte actuel...
  $("#visu-syntheinfos").hide("fade", 1000, function () {
    // Si le compteur dépasse le nombre max d'éléments dans l'array syntheInfos...
    if (compteurSyntheInfos >= syntheInfos.length - 1) {
      // Le remettre à 0
      compteurSyntheInfos = 0;

      // Si le compteur ne le dépasse pas...
    } else {
      // L'incrémenter
      compteurSyntheInfos++;
    }

    // Puis changer le texte
    $("#visu-syntheinfos").text(syntheInfos[compteurSyntheInfos]);

    // Puis réafficher le synthé
    $("#visu-syntheinfos").show("fade", 1000);
  });

  // BARRE INFERIEURE: Texte Emissions
  var dateEmissionSuivante = "";
  var heureEmissionSuivante = "";

  // Si l'heure actuelle est 23
  if (dateActuelle.getHours() == 23) {
    heureEmissionSuivante = 0;

    // Si on est au 7ème jour de la semaine (samedi, le "numéro 6", vu qu'on numérote depuis 0)
    if (dateActuelle.getDay() == 6) {
      // Le lendemain sera donc le jour 0, donc remettre le numéro de jour demandé à 0
      dateEmissionSuivante = grilleprogrammes[0][0];

      // Sinon, si on est en semaine (numéros de 0 à 5)...
    } else {
      // Laisser tel quel
      dateEmissionSuivante = grilleprogrammes[dateActuelle.getDay() + 1][0];
    }

    // Sinon...
  } else {
    heureEmissionSuivante = dateActuelle.getHours() + 1;
    dateEmissionSuivante =
      grilleprogrammes[dateActuelle.getDay()][dateActuelle.getHours() + 1];
  }

  // Masquer le texte-infoemission...
  $("#texte-infoemission").hide("fade", 500, function () {
    // Si le compteurInfosEmission est à 0
    if (compteurInfosEmission == 0) {
      compteurInfosEmission = 1;
      $("#texte-infoemission").html(
        "<span style='font-size: 1.5vh;'>Actuellement</span></br>" +
          grilleprogrammes[dateActuelle.getDay()][dateActuelle.getHours()]
      );

      // Sinon...
    } else {
      compteurInfosEmission = 0;
      // Mise à jour de la zone texte
      $("#texte-infoemission").html(
        "<span style='font-size: 1.5vh;'>A suivre, à " +
          heureEmissionSuivante +
          "h</span></br>" +
          dateEmissionSuivante
      );
    }

    // Réafficher le texte
    $("#texte-infoemission").show("fade", 500);
  });
}

// Machine d'états : Ecrans
function changerEcran(ecranDemande) {
  switch (ecranDemande) {
    // DEMANDE: Ecran endirect
    case "endirect":
      ecranActuel = "endirect";
      $("#mode-visualiseur").hide("fade", 500, function () {
        $("#mode-normal").show("fade", 500);
      });
      $("#titre-ecran").text("Radio Puissance Parcs"); // Changer le titre
      $("#ecran-endirect").show(); // Afficher/masquer les écrans
      $("#ecran-historique").hide();
      $("#ecran-emissions").hide();
      $("#ecran-programme").hide();
      $("#ecran-message").hide();
      $("#ecran-faq").hide();
      $("#ecran-aide").hide();
      $("#menu-navigation").hide("slide", 250); // Fermer le menu (s'il était ouvert)
      break;

    // DEMANDE: Ecran Historique
    case "historique":
      ecranActuel = "historique";
      $("#mode-visualiseur").hide("fade", 500, function () {
        $("#mode-normal").show("fade", 500);
      });

      // Vider, puis remplir la liste avec le tableau des derniers morceaux, et retour à la ligne à chaque fois
      $("#liste-historique-lecture").empty();
      historiqueMetas.forEach(function (element) {
        //$( "#liste-historique-lecture" ).append( "<p>" + element + "</p>" )
        $("#liste-historique-lecture").append(
          "<p><span style='opacity: 0.25;'>" +
            element[0] +
            "</span>    " +
            element[1] +
            "</p>"
        );
      });

      $("#titre-ecran").text("Historique des morceaux"); // Changer le titre
      $("#ecran-endirect").hide(); // Afficher/masquer les écrans
      $("#ecran-historique").show();
      $("#ecran-emissions").hide();
      $("#ecran-programme").hide();
      $("#ecran-message").hide();
      $("#ecran-faq").hide();
      $("#ecran-aide").hide();
      $("#menu-navigation").hide("slide", 250); // Fermer le menu (s'il était ouvert)
      break;

    // DEMANDE: Ecran Emissions
    case "emissions":
      ecranActuel = "emissions";
      $("#mode-visualiseur").hide("fade", 500, function () {
        $("#mode-normal").show("fade", 500);
      });
      $("#titre-ecran").text("Emissions"); // Changer le titre
      $("#ecran-endirect").hide(); // Afficher/masquer les écrans
      $("#ecran-historique").hide();
      $("#ecran-emissions").show();
      $("#ecran-programme").hide();
      $("#ecran-message").hide();
      $("#ecran-faq").hide();
      $("#ecran-aide").hide();
      $("#menu-navigation").hide("slide", 250); // Fermer le menu (s'il était ouvert)
      break;

    // DEMANDE: Ecran Grille des programmes
    case "programme":
      ecranActuel = "programme";
      $("#mode-visualiseur").hide("fade", 500, function () {
        $("#mode-normal").show("fade", 500);
      });
      construireTableauProgrammes(); // Construire dynamiquement la grille des programmes
      $("#titre-ecran").text("Grille des programmes"); // Changer le titre
      $("#ecran-endirect").hide(); // Afficher/masquer les écrans
      $("#ecran-historique").hide();
      $("#ecran-emissions").hide();
      $("#ecran-programme").show();
      $("#ecran-message").hide();
      $("#ecran-faq").hide();
      $("#ecran-aide").hide();
      $("#menu-navigation").hide("slide", 250); // Fermer le menu (s'il était ouvert)
      break;

    // DEMANDE: Ecran Message
    case "message":
      ecranActuel = "message";
      $("#mode-visualiseur").hide("fade", 500, function () {
        $("#mode-normal").show("fade", 500);
      });
      $("#titre-ecran").text("Message reçu"); // Changer le titre
      $("#ecran-endirect").hide(); // Afficher/masquer les écrans
      $("#ecran-historique").hide();
      $("#ecran-emissions").hide();
      $("#ecran-programme").hide();
      $("#ecran-message").show();
      $("#ecran-faq").hide();
      $("#ecran-aide").hide();
      $("#menu-navigation").hide("slide", 250); // Fermer le menu (s'il était ouvert)
      messageConsulte = true;
      break;

    // DEMANDE: Ecran FAQ
    case "faq":
      ecranActuel = "faq";
      $("#mode-visualiseur").hide("fade", 500, function () {
        $("#mode-normal").show("fade", 500);
      });
      $("#titre-ecran").text("Foire aux Questions"); // Changer le titre
      $("#ecran-endirect").hide(); // Afficher/masquer les écrans
      $("#ecran-historique").hide();
      $("#ecran-emissions").hide();
      $("#ecran-programme").hide();
      $("#ecran-message").hide();
      $("#ecran-faq").show();
      $("#ecran-aide").hide();
      $("#menu-navigation").hide("slide", 250); // Fermer le menu (s'il était ouvert)
      break;

    // DEMANDE: Ecran Aide
    case "aide":
      ecranActuel = "aide";
      $("#mode-visualiseur").hide("fade", 500, function () {
        $("#mode-normal").show("fade", 500);
      });
      $("#titre-ecran").text("Aide à l'écoute"); // Changer le titre
      $("#ecran-endirect").hide(); // Afficher/masquer les écrans
      $("#ecran-historique").hide();
      $("#ecran-emissions").hide();
      $("#ecran-programme").hide();
      $("#ecran-message").hide();
      $("#ecran-faq").hide();
      $("#ecran-aide").show();
      $("#menu-navigation").hide("slide", 250); // Fermer le menu (s'il était ouvert)
      break;

    // DEMANDE: Mode Visualiseur
    case "visualiseur":
      // Si l'écran est en mode portrait...
      if (window.innerHeight > window.innerWidth) {
        // Afficher un message d'alerte et ne rien faire
        alert("Orientation Paysage recommandée pour ce mode...");
      }
      ecranActuel = "visualiseur";

      // Passage en plein écran
      if (document.documentElement.requestFullscreen) {
        // Chromium, Firefox
        document.documentElement.requestFullscreen();
      } else if (document.documentElement.webkitRequestFullscreen) {
        // Safari
        document.documentElement.webkitRequestFullscreen();
      }

      // Adapter l'écran
      $("#mode-normal").hide("fade", 500, function () {
        $("#mode-visualiseur").show("fade", 500);
      });
      break;

    // CATCHALL
    default:
      console.log("Erreur: ecran inexistant !");
      break;
  }
}

// Construction dynamique de l'affichage de la grille des programmes
function construireTableauProgrammes() {
  // SYNTHETISER L'ARRAY D'ENTREE
  // Créer/Reset les variables
  var arrayHeuresDebutProgramme = Array(24).fill(false);
  var arraySyntheseProgrammes = [];

  // Boucler dans les jours
  for (var jourScanne = 0; jourScanne < 7; jourScanne++) {
    // Créer un tableau pour ce jour
    arraySyntheseProgrammes.push([]);

    // Boucler dans les heures
    for (var heureScannee = 0; heureScannee < 24; heureScannee++) {
      // Si l'heure précédente existe
      if (grilleprogrammes[jourScanne][heureScannee - 1]) {
        // Si le nom du programme à cette heure est identique à la précédente
        if (
          grilleprogrammes[jourScanne][heureScannee - 1] ===
          grilleprogrammes[jourScanne][heureScannee]
        ) {
          // Incrémenter son compteur (celui du dernier element de cet array)
          arraySyntheseProgrammes[jourScanne][
            arraySyntheseProgrammes[jourScanne].length - 1
          ][1]++;

          // Sinon, si le programme est différent
        } else {
          // Ajouter un nouvel élément dans l'array de Synthèse, avec le compte d'heures à 1, et enfin l'heure de début programme
          arraySyntheseProgrammes[jourScanne].push([
            grilleprogrammes[jourScanne][heureScannee],
            1,
            heureScannee,
          ]);

          // Marquer cette heure comme Début de programme dans l'array correspondant
          arrayHeuresDebutProgramme[heureScannee] = true;
        }

        // Sinon, si l'heure précédente n'existe pas...
      } else {
        // Ajouter un nouvel élément dans l'array de Synthèse, avec le compte d'heures à 1, et enfin l'heure de début programme
        arraySyntheseProgrammes[jourScanne].push([
          grilleprogrammes[jourScanne][heureScannee],
          1,
          heureScannee,
        ]);

        // Marquer cette heure comme Début de programme dans l'array correspondant
        arrayHeuresDebutProgramme[heureScannee] = true;
      }
    }
  }

  // CONSTRUCTION DU TABLEAU
  // Créer la variable de stockage du HTML du tableau
  var htmlConstructionTableau =
    '<tr style="opacity: 0.25; font-size: 3.0vh;"> <td></td> ';

  // Créer la première ligne: boucler dans les heures
  for (var heureScannee = 0; heureScannee < 24; heureScannee++) {
    // Si l'heure est marquée comme Début de programme
    if (arrayHeuresDebutProgramme[heureScannee]) {
      // L'ajouter à la ligne en affichée
      htmlConstructionTableau += "<td>" + heureScannee + "h</td>";

      // Sinon, si elle n'est pas une heure de Début de programme
    } else {
      // L'ajouter à la ligne en masquée
      htmlConstructionTableau +=
        '<td style="opacity: 0;">' + heureScannee + "h</td>";
    }
  }

  // Fermer la ligne
  htmlConstructionTableau += "</tr>";

  // Variable contenant les jours de la semaine
  var joursSemaine = [
    "Dimanche",
    "Lundi",
    "Mardi",
    "Mercredi",
    "Jeudi",
    "Vendredi",
    "Samedi",
  ];

  // Boucler dans les jours (lignes)
  for (var jourScanne = 0; jourScanne < 7; jourScanne++) {
    // Construire le début de la ligne
    htmlConstructionTableau +=
      '<tr> <td style=" opacity: 0.25;">' + joursSemaine[jourScanne] + "</td>";

    // Boucler dans les heures (colonnes)
    for (
      var index = 0;
      index < arraySyntheseProgrammes[jourScanne].length;
      index++
    ) {
      // Si il y a un élément à cet emplacement dans l'array de Synthèse
      if (arraySyntheseProgrammes[jourScanne][index]) {
        // DEBUG
        // console.log( "Debut emission: " + arraySyntheseProgrammes[ jourScanne ][ index ][ 2 ] + " | Duree emission: " + arraySyntheseProgrammes[ jourScanne ][ index ][ 1 ] + " | Fin emission: " + ( arraySyntheseProgrammes[ jourScanne ][ index ][ 1 ] + arraySyntheseProgrammes[ jourScanne ][ index ][ 2 ] ) )

        // Si le jour actuel correspond au jour scanné, ET si l'heure actuelle est comprise dans l'intervalle (heure début), (heure début + durée) du programme scanné
        if (
          jourScanne == dateActuelle.getDay() &&
          dateActuelle.getHours() >=
            arraySyntheseProgrammes[jourScanne][index][2] &&
          dateActuelle.getHours() <
            arraySyntheseProgrammes[jourScanne][index][1] +
              arraySyntheseProgrammes[jourScanne][index][2]
        ) {
          // Le mettre en forme comme "émission en cours" dans la grille
          htmlConstructionTableau +=
            '<td style="text-align: center; padding: 0.25vh; background: rgba( 255, 255, 255, 1.0); background-clip: content-box; color: Black; animation:clignotant 2.5s linear infinite;" colspan="' +
            arraySyntheseProgrammes[jourScanne][index][1] +
            '">' +
            arraySyntheseProgrammes[jourScanne][index][0] +
            "</td>";

          // Sinon...
        } else {
          // Selon le nom de l'émission dans la grille, mettre en forme différemment...
          switch (arraySyntheseProgrammes[jourScanne][index][0]) {
            case "MegaMix":
              htmlConstructionTableau +=
                '<td style="text-align: center; padding: 0.25vh;" colspan="' +
                arraySyntheseProgrammes[jourScanne][index][1] +
                '">' +
                arraySyntheseProgrammes[jourScanne][index][0] +
                "</td>";
              break;

            case "Le Live":
              htmlConstructionTableau +=
                '<td style="text-align: center; padding: 0.25vh; background: rgba( 255, 255, 255, 0.05); background-clip: content-box; color: DeepSkyBlue;" colspan="' +
                arraySyntheseProgrammes[jourScanne][index][1] +
                '">' +
                arraySyntheseProgrammes[jourScanne][index][0] +
                "</td>";
              break;

            case "Bonne Nuit les Puissants":
              htmlConstructionTableau +=
                '<td style="text-align: center; padding: 0.25vh;" colspan="' +
                arraySyntheseProgrammes[jourScanne][index][1] +
                '">' +
                arraySyntheseProgrammes[jourScanne][index][0] +
                "</td>";
              break;

            default:
              htmlConstructionTableau +=
                '<td style="text-align: center; padding: 0.25vh; background: rgba( 255, 255, 255, 0.1); background-clip: content-box;" colspan="' +
                arraySyntheseProgrammes[jourScanne][index][1] +
                '">' +
                arraySyntheseProgrammes[jourScanne][index][0] +
                "</td>";
              break;
          }
        }
      }
    }

    // Fermer la ligne
    htmlConstructionTableau += " </tr>";
  }

  // Ajouter ce contenu au tableau existant
  $("#tableau-grilleprogrammes").html(htmlConstructionTableau);
}

// Récupération des métadonnées du flux audio
function recuperationsMetas() {
  // GET pour récupérer le JSON
  $.getJSON(
    "https://radio.puissanceparcs.fr:8443/status-json.xsl",
    function (donnees) {
      // Si il y a bien déjà une ligne de metas, et que le texte est identique au nouveau meta, ne rien faire...
      if (
        historiqueMetas[0] &&
        historiqueMetas[0][1] === donnees["icestats"].source["title"]
      ) {
        // ... Mais si le texte est différent
      } else {
        // Pousser l'heure à laquelle on ajoute, ainsi que le nouveau meta dans le tableau
        historiqueMetas.unshift([
          dateActuelle.getHours() +
            ":" +
            ("0" + dateActuelle.getMinutes()).slice(-2),
          donnees["icestats"].source["title"],
        ]);

        // Ne garder que les 10 derniers éléments dans le tableau
        historiqueMetas = historiqueMetas.slice(0, 10);

        // Charger ce titre dans une nouvelle variable
        var metaMorceauActuel = historiqueMetas[0][1];

        // Changer le titre de la page
        document.title = metaMorceauActuel;

        // FONCTIONS DE DETECTION DANS LES METAS
        // Lancer une boucle dans le tableau des imagesCartons
        imagesCartons.forEach(function (element) {
          // Si la partie Artiste du titre figure dans cet élément (ce sous-array)
          if (element.includes(metaMorceauActuel.split(" - ")[0])) {
            // Alors afficher le carton avec l'image associée
            afficherCarton(element[1], 1500);
          }
        });

        // Si le meta parle des "réseaux sociaux"...
        if (
          metaMorceauActuel.includes("Suivez-nous sur les réseaux sociaux...")
        ) {
          // Afficher la notification flottante
          afficherNotificationFlottante(
            "Nos pages <a href='https://www.instagram.com/puissance_parcs/' target='_blank' style='color: DeepSkyBlue;'>Instagram</a>, <a href='https://www.facebook.com/PuissanceParcs/' target='_blank' style='color: DeepSkyBlue;'>Facebook</a>, et <a href='https://twitter.com/puissanceparcs' target='_blank' style='color: DeepSkyBlue;'>Twitter</a>...",
            15000
          );
        }

        // Si le meta parle du site...
        if (metaMorceauActuel.includes("Visitez PuissanceParcs.fr...")) {
          // Afficher la notification flottante
          afficherNotificationFlottante(
            "Notre site est <a href='https://www.puissanceparcs.fr' target='_blank' style='color: DeepSkyBlue;'>accessible ici</a> !",
            15000
          );
        }

        // Si le meta parle des canaux de contenus...
        if (
          metaMorceauActuel.includes("Retrouvez nos contenus sur nos canaux...")
        ) {
          // Afficher la notification flottante
          afficherNotificationFlottante(
            "Nos épisodes sur <a href='https://www.youtube.com/channel/UCTB393HAAg1Gpme5grD5kig' target='_blank' style='color: DeepSkyBlue;'>YouTube</a>, <a href='https://soundcloud.com/puissanceparcs' target='_blank' style='color: DeepSkyBlue;'>SoundCloud</a>, et <a href='https://twitch.tv/puissance_parcs' target='_blank' style='color: DeepSkyBlue;'>Twitch</a>...",
            15000
          );
        }

        // Si le meta parle de Discord...
        if (
          metaMorceauActuel.includes("Rejoignez la communauté sur Discord...")
        ) {
          // Afficher la notification flottante
          afficherNotificationFlottante(
            "Notre <a href='https://discord.gg/dqxKtkY8cu' target='_blank' style='color: DeepSkyBlue;'> Serveur Discord</a>",
            15000
          );
        }

        // Si le meta parle de soutien Utip...
        if (metaMorceauActuel.includes("Soutenez-nous sur Utip...")) {
          // Afficher la notification flottante
          afficherNotificationFlottante(
            "Pour nous aider: <a href='https://utip.io/puissanceparcs' target='_blank' style='color: DeepSkyBlue;'>Notre profil Utip</a>. Merci à tous !",
            15000
          );
        }

        // ECRAN EN DIRECT: MISE A JOUR DES TEXTES METAS
        // Enfin, mettre à jour les champs texte
        $("#compteur-auditeurs").html(
          donnees["icestats"].source["listeners"] +
            ' <i class="zmdi zmdi-accounts"></i>'
        );
        $("#metadonnees0").text(metaMorceauActuel);
        if (historiqueMetas[1]) {
          $("#metadonnees1").text(historiqueMetas[1][1]);
        } // Si il y a bien une seconde ligne de metas, alors l'écrire
        if (historiqueMetas[2]) {
          $("#metadonnees2").text(historiqueMetas[2][1]);
        } // Si il y a bien une troisième ligne de metas, alors l'écrire

        // ECRAN MODE VISUALISEUR: MISE A JOUR
        // Masquer l'arrière-plan...
        $("#visu-arriereplan").hide("fade", 2000, function () {
          // Lancer une boucle dans le tableau des imagesVisualisation
          imagesVisualisation.forEach(function (element) {
            // Si le texte figure dans cet élément...
            if (metaMorceauActuel.includes(element[0])) {
              // Alors changer la source de l'image
              $("#visu-arriereplan").attr("src", element[1]);

              // ... L'afficher
              $("#visu-arriereplan").show("fade", 2000);
            }
          });
        });

        // Masquer les textes
        $("#visu-morceau").hide("fade", 500);
        $("#visu-artiste").hide("fade", 500);
        $("#visu-parc").hide("fade", 500);
        $("#visu-logo").hide("fade", 500, function () {
          // ... Puis mettre à jour les champs texte ...
          $("#visu-artiste").text(metaMorceauActuel.split(" - ")[0]);
          $("#visu-morceau").text(
            metaMorceauActuel.split(" - ")[1].replace(/ *\([^)]*\) */g, "")
          ); // Retirer le bloc entre parenthèses (infos ride/parc)
          // Si un bloc parenthèses existe dans le meta
          if (metaMorceauActuel.split(" (")[1]) {
            $("#visu-parc").text(
              metaMorceauActuel.split(" (")[1].replace(/\(|\)/g, "")
            ); // Ne garder que le contenu du bloc entre parenthèses
          } else {
            $("#visu-parc").text("");
          }

          // ... réafficher le logo...
          $("#visu-logo").show(
            "drop",
            { direction: "right" },
            1500,
            function () {
              // ... puis les textes
              $("#visu-artiste").show("fade", 330, function () {
                $("#visu-morceau").show("fade", 330, function () {
                  $("#visu-parc").show("fade", 330);
                });
              });
            }
          );
        });
      }
    }
  );
}

// Récupération du message de notification depuis le serveur
function recuperationMessage() {
  $.get("message.txt", function (donnees) {
    // Si le contenu est vide
    if (donnees === "") {
      // Enregistrer le message
      messageActuel = donnees;

      // Cacher le bouton Message du menu
      $("#menu-message").hide();

      // Sinon, si le contenu n'est pas vide
    } else {
      // Si le message est différent du précédent
      if (messageActuel !== donnees) {
        // Reset l'état de lecture
        messageConsulte = false;

        // Enregistrer le message
        messageActuel = donnees;

        // Afficher le message dans le bon champ
        $("#ecran-message-contenu").text(messageActuel);

        // Afficher le bouton Message du menu
        $("#menu-message").show();
      }

      // Si le message n'a pas été consulté
      if (!messageConsulte) {
        // Afficher l'écran Message automatiquement
        changerEcran("message");
      }
    }
  });
}

// Afficher la notification flottante
function afficherNotificationFlottante(contenu, duree) {
  // Si on est bien dans le mode visualiseur...
  if (ecranActuel === "endirect") {
    // Changer le contenu de la notification
    $("#notification").html(contenu);

    // Afficher la notification
    $("#notification").show("puff", { percent: 80 }, 250, function () {
      // Attendre la duree spécifiee
      setTimeout(function () {
        // Cacher la notification
        $("#notification").hide("puff", { percent: 80 }, 250);
      }, duree);
    });
  }
}

// Affichage carton visuel (uniquement sur écran En Direct)
function afficherCarton(urlImage, dureeAffichage) {
  // Changer l'image
  $("#carton-visuel").attr("src", urlImage);

  // Si on est bien sur l'écran visualiseur...
  if (ecranActuel === "visualiseur") {
    // ...Alors afficher le carton
    $("#carton-visuel").show("blind", { direction: "right" }, 750, function () {
      // Attendre la durée indiquée
      setTimeout(function () {
        // Refermer le carton
        $("#carton-visuel").hide("blind", { direction: "left" }, 750);
      }, dureeAffichage);
    });
  }
}

// Mode Visualiseur: Affichage du top horaire
function afficherTopHoraireVisu() {
  // Masquer le bloc metas
  $("#visu-blocmetas").hide("fade", 500, function () {
    // Quand fini, afficher l'horloge
    $("#visu-tophoraire").show("fade", 500);

    // Attendre 6 secondes (le temps que l'anim carton logo se lance)
    setTimeout(function () {
      // Masquer l'horloge
      $("#visu-tophoraire").hide("fade", 500, function () {
        // Réafficher le bloc metas
        $("#visu-blocmetas").show("fade", 500);
      });
    }, 6000);
  });
}

// DETECTION AUTO
// Changement d'état de lecture du flux (Non fonctionnel)
//$( "#lecteur" ).on( "playing", function(){
//	console.log( "Lecture" )
//})

// FONCTIONS ONCLICK
// Affichage menu de navigation
$(document).on("click", "#bouton-menu", function () {
  $("#menu-navigation").toggle("slide", 250);
});

// Toggle des boutons dans le Mode Visualiseur
$(document).on("click", "", function () {
  // Si on est bien dans le mode visualiseur...
  if (ecranActuel === "visualiseur") {
    // Nettoyer le chrono en cours (si il y en a un)
    clearTimeout(chronoMasquageUI);

    // ... Alors afficher les boutons
    $("#bouton-fermer-visualiseur").show("slide", { direction: "up" }, 250);
    $("#bouton-pleinecran").show("slide", { direction: "up" }, 250);
    $("#barre-inferieure").show("slide", { direction: "down" }, 250);

    // Attendre 4 secondes...
    chronoMasquageUI = setTimeout(function () {
      // ... Puis les masquer de nouveau
      $("#bouton-fermer-visualiseur").hide("slide", { direction: "up" }, 250);
      $("#bouton-pleinecran").hide("slide", { direction: "up" }, 250);
      $("#barre-inferieure").hide("slide", { direction: "down" }, 250);
    }, 4000);
  }
});

// Fermeture mode Visualiseur
$(document).on("click", "#bouton-fermer-visualiseur", function () {
  // Arrêter les chronos pour cacher l'UI
  clearTimeout(chronoMasquageUI);

  // Basculer l'écran
  changerEcran("endirect");

  // Quitter le mode plein-écran
  var estEnPleinEcran =
    (document.fullscreenElement && document.fullscreenElement !== null) ||
    (document.webkitFullscreenElement &&
      document.webkitFullscreenElement !== null);

  if (estEnPleinEcran) {
    if (document.exitFullscreen) {
      // Chromium, Firefox
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      // Safari
      document.webkitExitFullscreen();
    }
  }

  // Par précaution, forcer le réaffichage des boutons (au cas où on ferme le visualiseur au mauvais moment)
  $("#bouton-fermer-visualiseur").show("slide", { direction: "up" }, 250);
  $("#bouton-pleinecran").show("slide", { direction: "up" }, 250);
  $("#barre-inferieure").show("slide", { direction: "down" }, 250);
});

// Activer-couper mode Plein-écran
$(document).on("click", "#bouton-pleinecran", function () {
  var estEnPleinEcran =
    (document.fullscreenElement && document.fullscreenElement !== null) ||
    (document.webkitFullscreenElement &&
      document.webkitFullscreenElement !== null);

  if (!estEnPleinEcran) {
    if (document.documentElement.requestFullscreen) {
      // Chromium, Firefox
      document.documentElement.requestFullscreen();
    } else if (document.documentElement.webkitRequestFullScreen) {
      // Safari
      document.documentElement.webkitRequestFullScreen();
    }
  } else {
    if (document.exitFullscreen) {
      // Chromium, Firefox
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      // Safari
      document.webkitExitFullscreen();
    }
  }
});

// Controle lecteur
$(document).on("click", "#bouton-controle", function () {
  // Si le flux est actuellement en pause...
  if ($("#lecteur")[0].paused) {
    // Mettre en lecture
    $("#lecteur").attr("src", "https://radio.puissanceparcs.fr:8443/radio");
    $("#lecteur")[0].play();
    $("#bouton-controle").removeClass("zmdi-play-circle");
    $("#bouton-controle").addClass("zmdi-pause-circle");

    // ... Sinon, si la lecture du flux est en cours
  } else {
    // Arrêter le flux et le déconnecter
    $("#lecteur")[0].pause();
    $("#lecteur").attr("src", "");
    $("#bouton-controle").removeClass("zmdi-pause-circle");
    $("#bouton-controle").addClass("zmdi-play-circle");
  }
});

// Fonction copier-coller sur clic du titre en cours de lecture
$(document).on(
  "click",
  "#metadonnees0,#visu-artiste,#visu-morceau,#visu-parc",
  function () {
    // Copier dans le presse-papiers
    navigator.clipboard.writeText(historiqueMetas[0][1]);

    // Afficher la notification
    afficherNotificationFlottante(
      "<i class='zmdi zmdi-copy'></i> Copié dans le presse-papiers",
      2000
    );
  }
);

// FIN DU SCRIPT
// Activation des intervalles de répétition
setInterval(recuperationMessage, 60000);
setInterval(recuperationsMetas, 10000);
setInterval(defilementRegulierInfos, 20000);
// Lancements automatiques
recuperationMessage();
recuperationsMetas();
defilementRegulierInfos();

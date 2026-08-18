document.addEventListener("DOMContentLoaded", () => {

  const screens = [...document.querySelectorAll(".screen")];
  const progress = document.getElementById("progressBar");
  const toast = document.getElementById("toast");

  let current = 0;
  let selected = null;


  /* =========================================================
     CHOIX
     ========================================================= */

  const choices = {

    pilat: {
      icon: "🌄",
      title: "Les crêtes du Pilat",

      confirm: "Vous avez choisi de prendre de la hauteur.",

      details: [
        "🥾 Randonnée",
        "🌄 Grand air",
        "❤️ Moment à deux"
      ],

      resultTitle: "C’est décidé.",

      body: `
        <p><strong>Vendredi 21 août → LES CRÊTES DU PILAT</strong></p>

        <ul>
          <li>🚗 Environ 1h de route depuis Lyon</li>
          <li>🥾 Environ 3h de randonnée</li>
          <li>🌄 De beaux panoramas</li>
          <li>💬 Beaucoup de temps pour discuter</li>
        </ul>

        <p>Je m’occupe du reste.</p>

        <p>Enfin… de la majorité du reste.</p>
      `
    },


    urbex: {
      icon: "🔦",
      title: "L’Urbex",

      confirm: "Vous avez choisi le dossier classifié.",

      details: [
        "🔦 Exploration",
        "📍 Lyon / alentours",
        "👀 Suspense"
      ],

      resultTitle: "Mission acceptée.",

      body: `
        <p><strong>Vendredi 21 août → URBEX</strong></p>

        <ul>
          <li>🔦 Exploration d’un lieu abandonné</li>
          <li>📍 Lieu à révéler</li>
          <li>📸 Quelques souvenirs à capturer</li>
          <li>👀 Une aventure potentiellement douteuse</li>
        </ul>

        <p>Le lieu sera bientôt déclassifié.</p>

        <p>
          Et promis, je vérifierai quand même qu’on ne va pas
          mourir dans un bâtiment abandonné.
        </p>
      `
    },


    secret: {
      icon: "☁️",
      title: "La tête dans les nuages",

      confirm: "Vous avez choisi une soirée à Confluence.",

      details: [
        "☁️ La tête dans les nuages",
        "🍽️ Restaurant mystère",
        "🏛️ Exposition"
      ],

      resultTitle: "Direction Confluence.",

      body: `
        <p><strong>Vendredi 21 août → CONFLUENCE</strong></p>

        <ul>
          <li>☁️ Activité « La tête dans les nuages »</li>
          <li>🍽️ Un restaurant mystère que j’aurai choisi</li>
          <li>🏛️ Une exposition au Musée des Confluences</li>
        </ul>

        <p>Pour l’exposition, on aura plusieurs possibilités.</p>

        <p>Et pour le restaurant…</p>

        <p class="italic">
          Eh bien, ça reste mon petit secret. 🤫
        </p>

        <p>
          Une soirée entre découverte, bonne nourriture
          et probablement quelques discussions beaucoup trop longues.
        </p>
      `
    },


    mystery: {
      icon: "🎬",
      title: "Sans plan",

      confirm: "Vous avez choisi de ne pas vraiment savoir ce qui va se passer.",

      details: [
        "🎬 Cinéma",
        "🌃 Balade dans Lyon",
        "🎲 Improvisation"
      ],

      resultTitle: "On verra bien.",

      body: `
        <p><strong>Vendredi 21 août → SANS PLAN</strong></p>

        <ul>
          <li>🎬 Une séance de cinéma à l’Odyssée</li>
          <li>🍿 Un film à choisir</li>
          <li>🌃 Une balade dans Lyon</li>
          <li>🎲 Et ensuite… on verra bien</li>
        </ul>

        <p>
          Aucun itinéraire précis.
          Aucun planning à respecter.
        </p>

        <p>
          On marche, on discute, on improvise,
          et on voit où la soirée nous emmène.
        </p>

        <p class="italic">
          Parce que parfois, le meilleur plan est celui
          qu’on n’avait pas prévu.
        </p>
      `
    }

  };


  /* =========================================================
     NAVIGATION
     ========================================================= */

  function go(n) {

    if (n < 0 || n >= screens.length) {
      return;
    }

    screens[current].classList.remove("active");

    current = n;

    screens[current].classList.add("active");

    const percentage =
        Math.max(
            8,
            (current / (screens.length - 1)) * 100
        );

    if (progress) {
      progress.style.width = `${percentage}%`;
    }

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }


  /* =========================================================
     TOAST
     ========================================================= */

  function showToast(text) {

    if (!toast) return;

    toast.textContent = text;
    toast.classList.add("show");

    setTimeout(() => {
      toast.classList.remove("show");
    }, 2300);
  }


  /* =========================================================
     BOUTONS NEXT
     ========================================================= */

  document.querySelectorAll(".next").forEach(button => {

    button.addEventListener("click", () => {

      go(current + 1);

    });

  });


  /* =========================================================
     BOUTONS REACTION
     ========================================================= */

  document.querySelectorAll(".react").forEach(button => {

    button.addEventListener("click", () => {

      showToast(button.dataset.reaction);

      setTimeout(() => {
        go(current + 1);
      }, 1700);

    });

  });


  /* =========================================================
     CHOIX D'UNE OPTION
     ========================================================= */

  document.querySelectorAll(".choice-card").forEach(card => {

    card.addEventListener("click", () => {

      selected = card.dataset.choice;

      document
          .querySelectorAll(".choice-card")
          .forEach(c => {
            c.classList.remove("selected");
          });

      card.classList.add("selected");

      const choice = choices[selected];

      if (!choice) {
        console.error("Choix inconnu :", selected);
        return;
      }

      const confirmIcon =
          document.getElementById("confirmIcon");

      const confirmTitle =
          document.getElementById("confirmTitle");

      const confirmText =
          document.getElementById("confirmText");

      const confirmDetails =
          document.getElementById("confirmDetails");


      if (confirmIcon) {
        confirmIcon.textContent = choice.icon;
      }

      if (confirmTitle) {
        confirmTitle.textContent = choice.title;
      }

      if (confirmText) {
        confirmText.textContent = choice.confirm;
      }

      if (confirmDetails) {
        confirmDetails.innerHTML =
            choice.details
                .map(detail => `<span>${detail}</span>`)
                .join("");
      }

      setTimeout(() => {
        go(7);
      }, 350);

    });

  });


  /* =========================================================
     RETOUR AU CHOIX
     ========================================================= */

  const backChoice =
      document.getElementById("backChoice");

  if (backChoice) {

    backChoice.addEventListener("click", () => {
      go(6);
    });

  }


  /* =========================================================
     VALIDATION
     ========================================================= */

  const validate =
      document.getElementById("validate");

  if (validate) {

    validate.addEventListener("click", () => {

      if (!selected) {
        return;
      }

      const choice = choices[selected];

      const resultIcon =
          document.getElementById("resultIcon");

      const resultTitle =
          document.getElementById("resultTitle");

      const resultBody =
          document.getElementById("resultBody");


      if (resultIcon) {
        resultIcon.textContent = choice.icon;
      }

      if (resultTitle) {
        resultTitle.textContent = choice.resultTitle;
      }

      if (resultBody) {
        resultBody.innerHTML = choice.body;
      }

      go(8);

      makeConfetti();

    });

  }


  /* =========================================================
     CONFETTIS
     ========================================================= */

  function makeConfetti() {

    const box =
        document.getElementById("confetti");

    if (!box) return;

    box.innerHTML = "";

    for (let i = 0; i < 70; i++) {

      const piece =
          document.createElement("i");

      piece.className = "piece";

      piece.style.left =
          Math.random() * 100 + "%";

      piece.style.animationDelay =
          Math.random() * 1.1 + "s";

      piece.style.transform =
          `rotate(${Math.random() * 180}deg)`;

      piece.style.opacity =
          0.65 + Math.random() * 0.35;

      box.appendChild(piece);

    }

  }

  /* =========================================================
   GALERIE PILAT
   ========================================================= */

  const showPilatPhotos =
      document.getElementById("showPilatPhotos");

  const pilatGallery =
      document.getElementById("pilatGallery");

  if (showPilatPhotos && pilatGallery) {

    showPilatPhotos.addEventListener("click", () => {

      const opened =
          pilatGallery.classList.toggle("open");

      if (opened) {

        showPilatPhotos.innerHTML =
            'Masquer les paysages 📸 <span>↑</span>';

      } else {

        showPilatPhotos.innerHTML =
            'Voir à quoi ça ressemble 📸 <span>↓</span>';

      }

    });

  }
});

document.querySelectorAll('.exhibition-toggle').forEach(button => {
  button.addEventListener('click', () => {
    const description = button.nextElementSibling;
    const isOpen = button.getAttribute('aria-expanded') === 'true';

    button.setAttribute('aria-expanded', !isOpen);
    description.classList.toggle('is-open', !isOpen);

    const plus = button.querySelector('span');
    if (plus) {
      plus.textContent = isOpen ? '+' : '−';
    }
  });
});
/******************************* Bloc Don *******************************/
// Sélectionne les éléments des DEUX blocs
const choixDivs = document.querySelectorAll('.formulaire-don .choix div, .bloc-don2 .choix div');
const montantBtns = document.querySelectorAll('.formulaire-don .montant button, .bloc-don2 .montant button');
const montantLibres = document.querySelectorAll('.montant-libre');
const fiscals = document.querySelectorAll('.fiscal');

let montantSelectionne = 130;
let modePaiement = "unefois";

// Initialisation des deux blocs
function initialiserBlocs() {
  // Active "Je donne une fois" dans les deux blocs
  document.querySelectorAll('.choix .choix1').forEach(div => {
    div.classList.add('active');
  });
  document.querySelectorAll('.choix .choix2').forEach(div => {
    div.classList.remove('active');
  });
  
  // Active 130€ dans les deux blocs
  document.querySelectorAll('.montant button:nth-child(2)').forEach(btn => {
    btn.classList.add('active');
  });
  document.querySelectorAll('.montant button:not(:nth-child(2))').forEach(btn => {
    btn.classList.remove('active');
  });
  
  // Vide les champs montant libre
  montantLibres.forEach(input => {
    input.value = "";
  });
  
  updateFiscal();
}

// Synchronise les boutons de montant entre les blocs
function synchroniserMontants(montantValue, modePaiementActuel) {
  const tousLesBoutonsMontant = document.querySelectorAll('.montant button');
  
  tousLesBoutonsMontant.forEach(btn => {
    // Trouve le bouton dans chaque bloc qui correspond au montant sélectionné
    if (parseInt(btn.textContent) === montantValue) {
      const bloc = btn.closest('.formulaire-don, .bloc-don2');
      const montantBtnsBloc = bloc.querySelectorAll('.montant button');
      
      // Active seulement le bon bouton dans ce bloc
      montantBtnsBloc.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      // Vide le montant libre dans ce bloc
      const montantLibreBloc = bloc.querySelector('.montant-libre');
      if (montantLibreBloc) {
        montantLibreBloc.value = "";
      }
    }
  });
}

// Gestion des choix (une fois / tous les mois)
choixDivs.forEach(div => {
  div.addEventListener('click', () => {
    // Trouve le bloc parent
    const bloc = div.closest('.formulaire-don, .bloc-don2');
    
    // Met à jour seulement dans le bloc cliqué
    const choixDansBloc = bloc.querySelectorAll('.choix div');
    choixDansBloc.forEach(d => d.classList.remove('active'));
    div.classList.add('active');

  const input = div.querySelector('input');
  modePaiement = input ? input.value : modePaiement;

    // Met à jour les boutons de montant selon le mode de paiement (dans TOUS les blocs)
    const tousLesBoutonsMontant = document.querySelectorAll('.montant button');
    if (modePaiement === "unefois") {
      // Réorganise tous les boutons pour "une fois"
      const montantsUneFois = [90, 130, 150, 200];
      tousLesBoutonsMontant.forEach((btn, index) => {
        const groupeIndex = index % 4; // 4 boutons par bloc
        btn.textContent = `${montantsUneFois[groupeIndex]} €`;
      });
      
      // Active 130€ partout
      synchroniserMontants(130, modePaiement);
      montantSelectionne = 130;
      
    } else {
      // Réorganise tous les boutons pour "tous les mois"
      const montantsMensuels = [10, 20, 30, 50];
      tousLesBoutonsMontant.forEach((btn, index) => {
        const groupeIndex = index % 4; // 4 boutons par bloc
        btn.textContent = `${montantsMensuels[groupeIndex]} €`;
      });
      
      // Active 10€ partout
      synchroniserMontants(10, modePaiement);
      montantSelectionne = 10;
    }

    updateFiscal();
  });
});

// Gestion des boutons de montant
montantBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const montantValue = parseInt(btn.textContent);
    montantSelectionne = montantValue;
    
    // Synchronise ce montant dans les DEUX blocs
    synchroniserMontants(montantValue, modePaiement);
    
    // Vide tous les champs montant libre
    montantLibres.forEach(input => {
      input.value = "";
    });
    
    updateFiscal();
  });
});

// Gestion des montants libres - SYNCHRONISATION COMPLÈTE
montantLibres.forEach(input => {
  input.addEventListener('input', () => {
    const val = parseFloat(input.value);
    montantSelectionne = isNaN(val) ? 0 : val;
    
    // Désactive tous les boutons de montant dans les deux blocs
    montantBtns.forEach(b => b.classList.remove('active'));
    
    // Synchronise le montant libre dans TOUS les autres blocs
    montantLibres.forEach(otherInput => {
      if (otherInput !== input) {
        otherInput.value = input.value;
      }
    });
    
    updateFiscal();
  });

  // Ajoute aussi l'événement 'change' pour plus de fiabilité
  input.addEventListener('change', () => {
    const val = parseFloat(input.value);
    montantSelectionne = isNaN(val) ? 0 : val;
    
    montantBtns.forEach(b => b.classList.remove('active'));
    
    // Synchronisation
    montantLibres.forEach(otherInput => {
      if (otherInput !== input) {
        otherInput.value = input.value;
      }
    });
    
    updateFiscal();
  });
});

// Met à jour l'affichage fiscal dans TOUS les blocs
function updateFiscal() {
  const deduction = Math.floor(montantSelectionne * 0.25); 
  fiscals.forEach(fiscal => {
    fiscal.textContent = `${deduction} €`;
  });
}

// Initialisation au chargement
document.addEventListener('DOMContentLoaded', () => {
  initialiserBlocs();
});


/******************************* Bloc engager *******************************/
const track = document.querySelector('.mouvement-carousel');
const blocks = document.querySelectorAll('.engager .block');
const prevBtn = document.querySelector('.prevBtn');
const nextBtn = document.querySelector('.nextBtn');

let index = 0;

function getVisibleCount() {
  const width = window.innerWidth;
  if (width <= 500) return 1;
  if (width <= 1080) return 2;
  return 3;
}

function updateCarousel() {
  const visibleCount = getVisibleCount();
  const gap = 60;
  const blockWidth = blocks[0].offsetWidth;
  const moveX = (blockWidth + gap) * index;
  track.style.transform = `translateX(-${moveX}px)`;

  prevBtn.classList.toggle('hidden', index === 0);
  nextBtn.classList.toggle('hidden', index >= blocks.length - visibleCount);
}

nextBtn.addEventListener('click', () => {
  const visibleCount = getVisibleCount();
  if (index < blocks.length - visibleCount) {
    index++;
    updateCarousel();
  }
});

prevBtn.addEventListener('click', () => {
  if (index > 0) {
    index--;
    updateCarousel();
  }
});

window.addEventListener('resize', updateCarousel);
updateCarousel();




/******************************* Bloc Question-frequente *******************************/

document.addEventListener("DOMContentLoaded", () => {
  const questions = document.querySelectorAll(".question-bloc");

  questions.forEach((bloc) => {
    const question = bloc.querySelector(".question");
    const reponse = bloc.querySelector(".reponse");
    const fleche = bloc.querySelector(".fleche");

    question.addEventListener("click", () => {
      reponse.classList.toggle("ouverte");
      fleche.classList.toggle("ouverte");
    });
  });
});
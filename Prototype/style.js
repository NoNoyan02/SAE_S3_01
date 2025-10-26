const choixDivs = document.querySelectorAll('.choix div');
const montantBtns = document.querySelectorAll('.montant button');
const montantLibre = document.querySelector('.montant-libre');
const fiscal = document.getElementById('fiscal');

let montantSelectionne = 130;
let modePaiement = "unefois";

choixDivs.forEach(div => {
  div.addEventListener('click', () => {
    choixDivs.forEach(d => d.classList.remove('active'));
    div.classList.add('active');

    modePaiement = div.querySelector('input').id;

    // ✅ Met à jour les boutons de montant selon le mode de paiement
    if (modePaiement === "unefois") {
      montantBtns[0].textContent = "90 €";
      montantBtns[1].textContent = "130 €";
      montantBtns[2].textContent = "150 €";
      montantBtns[3].textContent = "200 €";
    } else {
      montantBtns[0].textContent = "10 €";
      montantBtns[1].textContent = "20 €";
      montantBtns[2].textContent = "30 €";
      montantBtns[3].textContent = "50 €";
    }

    // ✅ Réinitialise le montant sélectionné à 130 € si “une fois”
    montantBtns.forEach(b => b.classList.remove('active'));
    if (modePaiement === "unefois") {
      montantSelectionne = 130;
      montantBtns[1].classList.add('active');
    } else {
      montantSelectionne = parseInt(montantBtns[0].textContent);
      montantBtns[0].classList.add('active');
    }

    updateFiscal();
  });
});

// --- Sélection d’un montant ---
montantBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    montantBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    montantLibre.value = "";
    montantSelectionne = parseInt(btn.textContent);
    updateFiscal();
  });
});

// --- Montant libre ---
montantLibre.addEventListener('input', () => {
  montantBtns.forEach(b => b.classList.remove('active'));
  const val = parseFloat(montantLibre.value);
  montantSelectionne = isNaN(val) ? 0 : val;
  updateFiscal();
});

// --- Calcul déduction fiscale ---
function updateFiscal() {
  const deduction = Math.floor(montantSelectionne * 0.25); 
  fiscal.textContent = `${deduction} €`;
}

// Init
updateFiscal();

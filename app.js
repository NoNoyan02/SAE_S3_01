(() => {
  const names = ["Claude","Sophie","Amine","Léa","Marc","Emma","Julien","Nora","Antoine","Maya"];
  const amounts = [5,10,15,20,25,50,75,100,150,200,500];
  const messages = [
    (n,a) => `Merci à ${n} pour son don ${a}€ !`,
    (n,a) => `${n} vient de donner ${a}€ — merci !`,
    (n,a) => `Don reçu : ${a}€ de la part de ${n}.`
  ];

  const tickerEl = document.getElementById('ticker');
  const donorText = document.getElementById('donorText');

  function nextDemo() {
    const name = names[Math.floor(Math.random()*names.length)];
    const amount = amounts[Math.floor(Math.random()*amounts.length)];
    const template = messages[Math.floor(Math.random()*messages.length)];
    return { text: template(name, amount), name, amount };
  }

  function updateTicker() {
    const { text } = nextDemo();

    donorText.style.opacity = 0;
    donorText.style.transform = 'translateY(-8px)';

    setTimeout(() => {
      donorText.innerHTML = text.replace(/(\d+)€/,'<span class="amount">$1€</span>');
      donorText.style.opacity = 1;
      donorText.style.transform = 'translateY(0)';
    }, 350);
  }

  const intervalMs = 3500;
  let intervalId = setInterval(updateTicker, intervalMs);

  tickerEl.addEventListener('mouseenter', () => clearInterval(intervalId));
  tickerEl.addEventListener('mouseleave', () => intervalId = setInterval(updateTicker, intervalMs));

  // start after small delay
  setTimeout(updateTicker, 600);
})();

// Section Donation

document.addEventListener("DOMContentLoaded", () => {
  const onceTab = document.getElementById("once-tab");
  const monthlyTab = document.getElementById("monthly-tab");
  const onceDonation = document.getElementById("once-donation");
  const monthlyDonation = document.getElementById("monthly-donation");
  const infoBox = document.getElementById("don-info");
  const deduction = document.getElementById("deduction");

  // --- Fonctions de calcul fiscal ---
  function calculerDeductionUnique(montant) {
    if (montant <= 1000) return montant * 0.75;
    const part75 = 1000 * 0.75;
    const part66 = (montant - 1000) * 0.66;
    return part75 + part66;
  }

  function calculerDeductionMensuelle(montant) {
    const annuel = montant * 12;
    const deductionTotale = calculerDeductionUnique(annuel);
    const mensuelApresDeduction = (annuel - deductionTotale) / 12;
    return mensuelApresDeduction;
  }

  // --- Réinitialise tout quand on change d’onglet ---
  function resetSelections() {
    document.querySelectorAll(".amount-don").forEach(b => b.classList.remove("active"));
    infoBox.style.display = "none";
    if (document.getElementById("custom-amount-input"))
      document.getElementById("custom-amount-input").value = "";
    if (document.getElementById("custom-amount-input-monthly"))
      document.getElementById("custom-amount-input-monthly").value = "";
  }

  // --- Gestion des onglets ---
  onceTab?.addEventListener("click", () => {
    onceTab.classList.add("active");
    monthlyTab?.classList.remove("active");
    onceDonation.style.display = "grid";
    monthlyDonation.style.display = "none";
    resetSelections();
  });

  monthlyTab?.addEventListener("click", () => {
    monthlyTab.classList.add("active");
    onceTab?.classList.remove("active");
    monthlyDonation.style.display = "grid";
    onceDonation.style.display = "none";
    resetSelections();
  });

  // --- Gestion des montants fixes (pour les deux types de dons) ---
  document.querySelectorAll(".amount-don").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".amount-don").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const montant = parseFloat(btn.dataset.amount);
      let montantDeduit;

      if (monthlyTab?.classList.contains("active")) {
        montantDeduit = calculerDeductionMensuelle(montant);
      } else {
        montantDeduit = calculerDeductionUnique(montant);
      }

      deduction.textContent = montantDeduit.toFixed(0);
      infoBox.style.display = "block";

      // vide les champs libres
      if (document.getElementById("custom-amount-input"))
        document.getElementById("custom-amount-input").value = "";
      if (document.getElementById("custom-amount-input-monthly"))
        document.getElementById("custom-amount-input-monthly").value = "";
    });
  });

  // --- Montant libre : Don unique ---
  const customInputUnique = document.getElementById("custom-amount-input");
  if (customInputUnique) {
    customInputUnique.addEventListener("input", () => {
      // désélectionne les boutons fixes
      document.querySelectorAll("#once-donation .amount-don").forEach(b => b.classList.remove("active"));

      const montant = parseFloat(customInputUnique.value);
      if (isNaN(montant) || montant <= 0) {
        infoBox.style.display = "none";
        return;
      }

      const montantDeduit = calculerDeductionUnique(montant);
      deduction.textContent = montantDeduit.toFixed(0);
      infoBox.style.display = "block";
    });
  }

  // --- Montant libre : Don mensuel ---
  const customInputMonthly = document.getElementById("custom-amount-input-monthly");
  if (customInputMonthly) {
    customInputMonthly.addEventListener("input", () => {
      // désélectionne les boutons fixes
      document.querySelectorAll("#monthly-donation .amount-don").forEach(b => b.classList.remove("active"));

      const montant = parseFloat(customInputMonthly.value);
      if (isNaN(montant) || montant <= 0) {
        infoBox.style.display = "none";
        return;
      }

      const montantDeduit = calculerDeductionMensuelle(montant);
      deduction.textContent = montantDeduit.toFixed(0);
      infoBox.style.display = "block";
    });
  }
});

// Section Mes coordonnées

// --- Auto-format de la date de naissance ---
const birthdateInput = document.getElementById("birthdate");

if (birthdateInput) {
  // Initialise le champ avec le format visible
  birthdateInput.value = "__/__/____";

  // Empêche la suppression du format de base
  birthdateInput.addEventListener("focus", () => {
    if (birthdateInput.value.trim() === "") {
      birthdateInput.value = "__/__/____";
    }
    setCaretToFirstUnderscore(birthdateInput);
  });

  birthdateInput.addEventListener("click", () => {
    setCaretToFirstUnderscore(birthdateInput);
  });

  // Gestion de la frappe
  birthdateInput.addEventListener("keydown", (e) => {
    const pos = birthdateInput.selectionStart;
    const val = birthdateInput.value.split("");

    // Navigation autorisée
    if (["ArrowLeft", "ArrowRight", "Tab"].includes(e.key)) return;

    // Suppression normale
    if (e.key === "Backspace") {
      e.preventDefault();
      for (let i = pos - 1; i >= 0; i--) {
        if (/\d/.test(val[i])) {
          val[i] = "_";
          birthdateInput.value = val.join("");
          setCaretPosition(birthdateInput, i);
          return;
        }
      }
    }

    // Suppression avant
    if (e.key === "Delete") {
      e.preventDefault();
      for (let i = pos; i < val.length; i++) {
        if (/\d/.test(val[i])) {
          val[i] = "_";
          birthdateInput.value = val.join("");
          setCaretPosition(birthdateInput, i);
          return;
        }
      }
    }

    // Blocage des lettres
    if (!/^[0-9]$/.test(e.key)) {
      e.preventDefault();
      return;
    }

    // Remplacement progressif des underscores par les chiffres
    e.preventDefault();
    for (let i = pos; i < val.length; i++) {
      if (val[i] === "_") {
        val[i] = e.key;
        birthdateInput.value = val.join("");
        moveToNextEditable(i);
        break;
      }
    }

    function moveToNextEditable(index) {
      for (let j = index + 1; j < val.length; j++) {
        if (val[j] === "_") {
          setCaretPosition(birthdateInput, j);
          return;
        }
      }
      setCaretPosition(birthdateInput, val.length);
    }
  });

  // fonctions utilitaires
  function setCaretPosition(elem, pos) {
    requestAnimationFrame(() => elem.setSelectionRange(pos, pos));
  }

  function setCaretToFirstUnderscore(elem) {
    const pos = elem.value.indexOf("_");
    if (pos !== -1) setCaretPosition(elem, pos);
  }
}

// === GESTION DES DONS ===

// Sélecteurs principaux
const onceTab = document.getElementById("once-tab");
const monthlyTab = document.getElementById("monthly-tab");
const onceDonation = document.getElementById("once-donation");
const monthlyDonation = document.getElementById("monthly-donation");
const customAmountInput = document.getElementById("custom-amount-input");
const customAmountInputMonthly = document.getElementById("custom-amount-input-monthly");
const donAmountDisplay = document.getElementById("don-amount-display");

// --- Changement de type de don (une fois / mensuel)
onceTab.addEventListener("click", () => {
  onceTab.classList.add("active");
  monthlyTab.classList.remove("active");
  onceDonation.style.display = "grid";
  monthlyDonation.style.display = "none";
});

monthlyTab.addEventListener("click", () => {
  monthlyTab.classList.add("active");
  onceTab.classList.remove("active");
  onceDonation.style.display = "none";
  monthlyDonation.style.display = "grid";
});

// --- Sélection d’un montant fixe
document.querySelectorAll(".amount-don").forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".amount-don").forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    // On met à jour le champ montant libre
    const amount = btn.dataset.amount;
    if (onceDonation.style.display !== "none") {
      customAmountInput.value = amount;
    } else {
      customAmountInputMonthly.value = amount;
    }

    // Mise à jour du bouton de validation
    updateDonationDisplay(amount);
  });
});

// --- Mise à jour automatique du montant dans le bouton
function updateDonationDisplay(amount) {
  if (donAmountDisplay) {
    donAmountDisplay.textContent = `${amount} €`;
  }
}

// --- Quand l'utilisateur saisit un montant libre
if (customAmountInput) {
  customAmountInput.addEventListener("input", (e) => {
    const value = e.target.value;
    updateDonationDisplay(value || 0);
  });
}
if (customAmountInputMonthly) {
  customAmountInputMonthly.addEventListener("input", (e) => {
    const value = e.target.value;
    updateDonationDisplay(value || 0);
  });
}



// === GESTION DES MOYENS DE PAIEMENT ===

const paymentOptions = document.querySelectorAll(".payment-option");
const virementBox = document.querySelector(".virement-box");

// Activation / désactivation des boutons de paiement
paymentOptions.forEach((option) => {
  option.addEventListener("click", () => {
    paymentOptions.forEach((btn) => btn.classList.remove("active"));
    option.classList.add("active");

    const method = option.dataset.method;

    // Afficher / masquer le bloc virement
    if (method === "virement") {
      virementBox.style.display = "block";
    } else {
      virementBox.style.display = "none";
    }
  });
});



// === VALIDATION DU DON ===

const validateButton = document.querySelector(".validate-donation");

validateButton.addEventListener("click", () => {
  const amount = donAmountDisplay.textContent;
  const activePayment = document.querySelector(".payment-option.active span").textContent;

  alert(`Merci pour votre don de ${amount} via ${activePayment} ❤️`);
});

// ===== Footer Accordéon =====
document.addEventListener('DOMContentLoaded', () => {
  const accordions = document.querySelectorAll('.don-footer .acc');
  if (!accordions.length) return;

  accordions.forEach(acc => {
    const header = acc.querySelector('.acc-header');

    header.addEventListener('click', () => {
      const isOpen = acc.classList.contains('open');

      // Ferme tous les autres
      accordions.forEach(a => {
        a.classList.remove('open');
        a.querySelector('.acc-header').setAttribute('aria-expanded', 'false');
      });

      // Ouvre uniquement celui cliqué (s’il n’était pas déjà ouvert)
      if (!isOpen) {
        acc.classList.add('open');
        header.setAttribute('aria-expanded', 'true');

        // ✅ Fait défiler la page jusqu’à l'accordéon ouvert
        setTimeout(() => {
          acc.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }, 100); // léger délai pour laisser l’animation d’ouverture se jouer
      }
    });
  });
});





















/******************************* Bloc Don *******************************/

const choixDivs = document.querySelectorAll('.formulaire-don-vertical .selecteur-choix div, .bloc-don2 .selecteur-choix div');
const montantBtns = document.querySelectorAll('.formulaire-don-vertical .selecteur-montant button, .bloc-don2 .selecteur-montant button');
const montantLibres = document.querySelectorAll('.montant-libre');
const fiscals = document.querySelectorAll('.fiscal');

let montantSelectionne = 130;
let modePaiement = "unefois";

function initialiserBlocs() {
  
  document.querySelectorAll('.selecteur-choix .choix1').forEach(div => {
    div.classList.add('active');
  });
  document.querySelectorAll('.selecteur-choix .choix2').forEach(div => {
    div.classList.remove('active');
  });
  
  
  document.querySelectorAll('.selecteur-montant button:nth-child(2)').forEach(btn => {
    btn.classList.add('active');
  });
  document.querySelectorAll('.selecteur-montant button:not(:nth-child(2))').forEach(btn => {
    btn.classList.remove('active');
  });
  
  
  montantLibres.forEach(input => {
    input.value = "";
  });
  
  updateFiscal();
}

function synchroniserMontants(montantValue, modePaiementActuel) {
  const tousLesBoutonsMontant = document.querySelectorAll('.selecteur-montant button');
  
  tousLesBoutonsMontant.forEach(btn => {
    
    if (parseInt(btn.textContent) === montantValue) {
      const bloc = btn.closest('.formulaire-don-vertical, .bloc-don2');
      const montantBtnsBloc = bloc.querySelectorAll('.selecteur-montant button');
      
      
      montantBtnsBloc.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      
      const montantLibreBloc = bloc.querySelector('.montant-libre');
      if (montantLibreBloc) {
        montantLibreBloc.value = "";
      }
    }
  });
}

choixDivs.forEach(div => {
  div.addEventListener('click', () => {
    
    const bloc = div.closest('.formulaire-don-vertical, .bloc-don2');
    
    
    const choixDansBloc = bloc.querySelectorAll('.selecteur-choix div');
    choixDansBloc.forEach(d => d.classList.remove('active'));
    div.classList.add('active');

  const input = div.querySelector('input');
  modePaiement = input ? input.value : modePaiement;

    
    const tousLesBoutonsMontant = document.querySelectorAll('.selecteur-montant button');
    if (modePaiement === "unefois") {
      
      const montantsUneFois = [90, 130, 150, 200];
      tousLesBoutonsMontant.forEach((btn, index) => {
        const groupeIndex = index % 4; 
        btn.textContent = `${montantsUneFois[groupeIndex]} €`;
      });
      
      
      synchroniserMontants(130, modePaiement);
      montantSelectionne = 130;
      
    } else {
      
      const montantsMensuels = [10, 20, 30, 50];
      tousLesBoutonsMontant.forEach((btn, index) => {
        const groupeIndex = index % 4; 
        btn.textContent = `${montantsMensuels[groupeIndex]} €`;
      });
      
      
      synchroniserMontants(10, modePaiement);
      montantSelectionne = 10;
    }

    updateFiscal();
  });
});

montantBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const montantValue = parseInt(btn.textContent);
    montantSelectionne = montantValue;
    
    
    synchroniserMontants(montantValue, modePaiement);
    
    
    montantLibres.forEach(input => {
      input.value = "";
    });
    
    updateFiscal();
  });
});

montantLibres.forEach(input => {
  input.addEventListener('input', () => {
    const val = parseFloat(input.value);
    montantSelectionne = isNaN(val) ? 0 : val;
    
    
    montantBtns.forEach(b => b.classList.remove('active'));
    
    
    montantLibres.forEach(otherInput => {
      if (otherInput !== input) {
        otherInput.value = input.value;
      }
    });
    
    updateFiscal();
  });

  
  input.addEventListener('change', () => {
    const val = parseFloat(input.value);
    montantSelectionne = isNaN(val) ? 0 : val;
    
    montantBtns.forEach(b => b.classList.remove('active'));
    
    
    montantLibres.forEach(otherInput => {
      if (otherInput !== input) {
        otherInput.value = input.value;
      }
    });
    
    updateFiscal();
  });
});


function updateFiscal() {
  const deduction = Math.floor(montantSelectionne * 0.25); 
  fiscals.forEach(fiscal => {
    fiscal.textContent = `${deduction} €`;
  });
}


document.addEventListener('DOMContentLoaded', () => {
  initialiserBlocs();
});

/******************************* Bloc stats *******************************/

class AnimateNumbers {
    constructor() {
        this.chiffresSections = document.querySelectorAll('.chiffres section');
        this.animated = false;
        this.init();
    }

    init() {
        
        this.chiffresSections.forEach(section => {
            const numberElement = section.querySelector('h3');
            const finalValue = numberElement.textContent;
            numberElement.setAttribute('data-final', finalValue);
            numberElement.textContent = '0';
        });

        
        this.observeSection();
    }

    observeSection() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.animated) {
                    this.animated = true;
                    this.animateAllNumbers();
                }
            });
        }, { threshold: 0.5 });

        const statsSection = document.querySelector('.stats');
        if (statsSection) {
            observer.observe(statsSection);
        }
    }

    animateAllNumbers() {
        this.chiffresSections.forEach((section) => {
            const numberElement = section.querySelector('h3');
            const finalValue = parseInt(numberElement.getAttribute('data-final').replace(/\s/g, ''));
            const duration = 2000; 

            this.animateNumber(numberElement, finalValue, duration);
        });
    }

    animateNumber(element, finalValue, duration) {
        const startTime = performance.now();
        const startValue = 0;

        const formatNumber = (num) => {
            return num.toLocaleString('fr-FR');
        };

        const updateNumber = (currentTime) => {
            const elapsedTime = currentTime - startTime;
            const progress = Math.min(elapsedTime / duration, 1);

            
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const currentValue = Math.floor(easeOutQuart * finalValue);

            element.textContent = formatNumber(currentValue);

            if (progress < 1) {
                requestAnimationFrame(updateNumber);
            } else {
                element.textContent = formatNumber(finalValue);
            }
        };

        requestAnimationFrame(updateNumber);
    }
}


document.addEventListener('DOMContentLoaded', () => {
    new AnimateNumbers();
});

/******************************* Bloc engager *******************************/

const track = document.querySelector('.mouvement-carrousel');
const blocs = document.querySelectorAll('.engager .sections-bloc');
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
  const blockWidth = blocs[0].offsetWidth;
  const moveX = (blockWidth + gap) * index;
  track.style.transform = `translateX(-${moveX}px)`;

  prevBtn.classList.toggle('hidden', index === 0);
  nextBtn.classList.toggle('hidden', index >= blocs.length - visibleCount);
}

nextBtn.addEventListener('click', () => {
  const visibleCount = getVisibleCount();
  if (index < blocs.length - visibleCount) {
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
  const questions = document.querySelectorAll(".section-question");

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
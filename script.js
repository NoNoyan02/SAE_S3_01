document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("inscription");
    document.getElementById("btnCompte").onclick = () => modal.style.display = "block";
    document.querySelector(".btn-close").onclick = () => modal.style.display = "none";

    document.getElementById("formAdmin").onsubmit = function(e) {
        e.preventDefault();
        let donnees = new FormData(this);

        fetch('verifier.php', { method: 'POST', body: donnees })
        .then(reponse => reponse.json())
        .then(data => {
            if (data.success) {
                localStorage.setItem('adminEmail', donnees.get('email'));
                window.location.href = "page-admin.html";
            } else {
                alert("Erreur d'identifiants !");
            }
        });
    };
});
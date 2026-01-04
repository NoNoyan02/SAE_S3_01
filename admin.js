document.addEventListener("DOMContentLoaded", () => {
    chargerDonnees();
    chargerSchema();

    document.getElementById("btnLogout").onclick = () => {
        const email = localStorage.getItem('adminEmail');
        fetch('admin-api.php', { method: 'POST', body: JSON.stringify({ action: 'logout', email: email }) })
        .then(() => window.location.href = "index.html");
    };
});

function chargerDonnees() {
    fetch('admin-api.php', { method: 'POST', body: JSON.stringify({ action: 'get_stats' }) })
    .then(res => res.json())
    .then(data => {
        document.getElementById('statAdmins').innerText = data.nbAdmins;
        document.getElementById('statUtilisateur').innerText = data.nbUsers;
        document.getElementById('statArgent').innerText = data.montantTotal + " €";

        // Admins
        const tAdmins = document.getElementById('bodyAdmins');
        tAdmins.innerHTML = "";
        data.listeAdmins.forEach(admin => {
            const enLigne = (admin.login === 't' || admin.login === true);
            tAdmins.innerHTML += `<tr><td>${admin.email}</td><td class="${enLigne ? 'status-online' : 'status-offline'}">${enLigne ? '🟢 En ligne' : '🔴 Hors ligne'}</td></tr>`;
        });

        // Dons
        const tDons = document.getElementById('bodyDons');
        tDons.innerHTML = "";
        data.listeDons.forEach(d => tDons.innerHTML += `<tr><td>${d.nomcomplet}</td><td class="montant-vert">+${d.montant} €</td></tr>`);

        // Membres
        const tMembres = document.getElementById('bodyMembres');
        tMembres.innerHTML = "";
        data.listeUsers.forEach(u => tMembres.innerHTML += `<tr><td>${u.nomcomplet}</td><td>${u.email}</td></tr>`);
    });
}

function chargerSchema() {
    fetch('admin-api.php', { method: 'POST', body: JSON.stringify({ action: 'get_schema' }) })
    .then(res => res.json())
    .then(data => {
        const div = document.getElementById('listeTables');
        div.innerHTML = "";
        for (const [table, cols] of Object.entries(data.schema)) {
            const btn = document.createElement("button");
            btn.className = "table-btn";
            btn.innerText = "📁 " + table;
            btn.onclick = () => {
                document.getElementById('detailsColonnes').innerHTML = `<strong>${table} :</strong><br>` + cols.map(c => `• ${c}`).join("<br>");
                document.getElementById('sqlInput').value = `SELECT * FROM ${table}`;
            };
            div.appendChild(btn);
        }
    });
}

function lancerSQL() {
    const q = document.getElementById('sqlInput').value;
    const div = document.getElementById('resultatSQL');
    div.innerText = "Chargement...";
    fetch('admin-api.php', { method: 'POST', body: JSON.stringify({ action: 'run_sql', query: q }) })
    .then(res => res.json())
    .then(d => {
        if(d.error) div.innerHTML = `<span style="color:#ff4444">${d.error}</span>`;
        else div.innerText = JSON.stringify(d.data, null, 2);
    });
}
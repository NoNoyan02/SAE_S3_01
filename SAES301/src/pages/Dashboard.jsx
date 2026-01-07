import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, Users, Handshake, Calendar, 
  BarChart3, LogOut, Plus, Search, 
  TrendingUp, Wallet, UserCheck, ShieldCheck, FileText, Edit, Trash2, X, Eye, Package, MapPin
} from 'lucide-react';

const Dashboard = () => {
  // 1. ÉTATS GÉNÉRALS
  const [activeTab, setActiveTab] = useState('analyse');
  const [searchQuery, setSearchQuery] = useState(""); 
  const [showBenevoleModal, setShowBenevoleModal] = useState(false); 
  const [showEventModal, setShowEventModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false); 
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  // États pour les filtres avancés
  const [filterVille, setFilterVille] = useState("");
  const [filterProfession, setFilterProfession] = useState("");
  const [filterDispo, setFilterDispo] = useState("");

  // États pour le calendrier
  const [currentDate, setCurrentDate] = useState(new Date(2026, 0, 1)); // Commence en Janvier 2026

  // ÉTATS POUR LES PARTENAIRES (ENTREPRISES)
  const [showEntrepriseModal, setShowEntrepriseModal] = useState(false);
  const [formEntreprise, setFormEntreprise] = useState({ 
    nom: '', contact: '', email: '', telephone: '' 
  });
  const [searchEnt, setSearchEnt] = useState(""); // Recherche locale Entreprises

  // ÉTATS POUR LES SUBVENTIONS
  const [showSubventionModal, setShowSubventionModal] = useState(false);
  const [formSubvention, setFormSubvention] = useState({ 
    nom: '', organisme: '', montant: '', status: 'Reçue' 
  });
  const [searchSub, setSearchSub] = useState(""); // Recherche locale Subventions

// 2. DONNÉES DES BÉNÉVOLES (LOCAL STORAGE)
  const [benevoles, setBenevoles] = useState(() => {
    const saved = localStorage.getItem('benevoles_data'); 
    return saved ? JSON.parse(saved) : [
      { id: 1, nom: "Davud", prenom: "Dupont", email: "david.dupontg@gmail.com", telephone: "0102030405", ville: "Paris", status: "actif", cotisation: "À jour", dispo: "Semaine" },
    ];
  });

  // 3. DONNÉES DES ÉVÉNEMENTS (LOCAL STORAGE) 
  const [events, setEvents] = useState(() => {
    const saved = localStorage.getItem('evenements_data'); 
    return saved ? JSON.parse(saved) : [
      { id: 1, type: "Mission", titre: "Collecte Alimentaire", date: "2024-05-20", lieu: "Super U Centre", budget: "200", status: "Planifié" },
      { id: 2, type: "Événement", titre: "Gala de charité", date: "2024-12-15", lieu: "Mairie", budget: "1500", status: "En préparation" }
    ];
  });

  // 4. DONNÉES DES PARTENAIRES (LOCAL STORAGE)
  const [partenaires, setPartenaires] = useState(() => {
  const saved = localStorage.getItem('partenaires_data');
  return saved ? JSON.parse(saved) : [
    { id: 1, type: 'Entreprise', nom: "Boulangerie Soleil", contact: "Jean Pain", email: "contact@soleil.fr", telephone: "0145223344", status: "Actif" }
  ];
});

// 4. DONNÉES DES SUBVENTIONS (LOCAL STORAGE)
const [subventions, setSubventions] = useState(() => {
  const saved = localStorage.getItem('subventions_data');
  return saved ? JSON.parse(saved) : [
    { id: 1, type: 'Subvention', nom: "Aide Mairie 2026", organisme: "Ville de Paris", montant: "5000", dateReception: "2026-01-05", status: "Reçue" }
  ];
});

  // SAUVEGARDE AUTOMATIQUE DANS LE NAVIGATEUR
  useEffect(() => {
    localStorage.setItem('benevoles_data', JSON.stringify(benevoles)); 
    localStorage.setItem('evenements_data', JSON.stringify(events));
    localStorage.setItem('partenaires_data', JSON.stringify(partenaires));
    localStorage.setItem('subventions_data', JSON.stringify(subventions));
  }, [benevoles, events, partenaires, subventions])

  // 3. LOGIQUE DE FILTRAGE (SÉCURISÉE)
  const getFilteredData = () => {
    const q = searchQuery.toLowerCase();
    if (activeTab === 'benevoles') {
    return benevoles.filter(b => {
      // Recherche textuelle (Nom, Prénom, Ville)
      const matchesSearch = 
        (b.nom || "").toLowerCase().includes(q) || 
        (b.prenom || "").toLowerCase().includes(q) || 
        (b.ville || "").toLowerCase().includes(q);

      // Filtres par menus déroulants
      const matchesVille = filterVille === "" || b.ville === filterVille;
      const matchesProfession = filterProfession === "" || b.profession === filterProfession;
      const matchesDispo = filterDispo === "" || b.dispo === filterDispo;

      return matchesSearch && matchesVille && matchesProfession && matchesDispo;
    });
  }
    if (activeTab === 'evenements') {
      // MODIFICATION : Filtre spécifique pour l'onglet événements (Titre ou Lieu)
      return events.filter(e => (e.titre || "").toLowerCase().includes(q) || (e.lieu || "").toLowerCase().includes(q));
    }
    return [];
  };

  const filteredData = getFilteredData(); 

  // 4. ÉTAT POUR LE FORMULAIRE
  const [selectedItem, setSelectedItem] = useState(null);

  // 4. ÉTAT POUR LE FORMULAIRE

  // Pour les bénévoles
  const [formBenevole, setFormBenevole] = useState({
    nom: '', prenom: '', email: '', telephone: '', ville: '', dateNaissance: '', profession: '', regime: '', sante: '', infos: '', dispo: 'Semaine', cotisation: 'À jour'
  });

  // Pour les événements / missions
  const [formEvent, setFormEvent] = useState({ 
  type: 'Événement', 
  titre: '', 
  dateDebut: '', 
  dateFin: '', 
  lieu: '', 
  budget: '', 
  materiel: '', 
  benevolesInscrits: '', 
  documents: '', 
  infos: '' 
});

  // 5. FONCTIONS DE GESTION
  const handleDelete = (id) => {
    if(!window.confirm("Supprimer cet élément ?")) return;
    if (activeTab === 'benevoles') setBenevoles(benevoles.filter(b => b.id !== id)); 
    if (activeTab === 'evenements') setEvents(events.filter(e => e.id !== id)); 
  };

  const openEdit = (item) => {
    setIsEditing(true);
    setCurrentId(item.id);
    if (activeTab === 'benevoles') { setFormBenevole({...item}); setShowBenevoleModal(true); } 
    if (activeTab === 'evenements') { setFormEvent({...item}); setShowEventModal(true); }
  };

  const openViewModal = (item) => {
    setSelectedItem(item);
    setShowViewModal(true);
  };

const handleBenevoleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      setBenevoles(benevoles.map(b => b.id === currentId ? { ...formBenevole, id: currentId, status: formBenevole.cotisation === 'À jour' ? 'actif' : 'retard' } : b));
    } else {
      setBenevoles([...benevoles, { ...formBenevole, id: Date.now(), status: formBenevole.cotisation === 'À jour' ? 'actif' : 'retard' }]);
    }
    closeModals();
  };

  // MODIF : Nouvelle fonction pour enregistrer une mission
  const handleEventSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      setEvents(events.map(ev => ev.id === currentId ? { ...formEvent, id: currentId } : ev));
    } else {
      setEvents([...events, { ...formEvent, id: Date.now() }]);
    }
    closeModals();
  };

  // Gestion des Entreprises
  const handleEntrepriseSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      setPartenaires(partenaires.map(p => p.id === currentId ? { ...formEntreprise, id: currentId } : p));
    } else {
      setPartenaires([...partenaires, { ...formEntreprise, id: Date.now() }]);
    }
    setShowEntrepriseModal(false);
    setIsEditing(false);
  };

  // Gestion des Subventions
  const handleSubventionSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      setSubventions(subventions.map(s => s.id === currentId ? { ...formSubvention, id: currentId } : s));
    } else {
      setSubventions([...subventions, { ...formSubvention, id: Date.now() }]);
    }
    setShowSubventionModal(false);
    setIsEditing(false);
  };

  const closeModals = () => {
    setShowBenevoleModal(false); setShowEventModal(false); setShowViewModal(false); setIsEditing(false);
    setFormBenevole({ nom: '', prenom: '', email: '', telephone: '', ville: '', dateNaissance: '', profession: '', regime: '', sante: '', infos: '', dispo: 'Semaine', cotisation: 'À jour' });
    setFormEvent({ titre: '', date: '', lieu: '', budget: '', materiel: '', benevolesInscrits: '', documents: '' });
  };

  const menuItems = [
    { id: 'tableau-de-bord', label: 'Tableau de bord', icon: <LayoutDashboard size={20} /> },
    { id: 'benevoles', label: 'Bénévoles', icon: <Users size={20} /> },
    { id: 'partenaires', label: 'Partenaires & Donateurs', icon: <Handshake size={20} /> },
    { id: 'evenements', label: 'Événements & Missions', icon: <Calendar size={20} /> },
    { id: 'analyse', label: 'Analyse & Stats', icon: <BarChart3 size={20} /> },
  ];

  return (
    <div className="dashboard-container">
      <style>{`
        .dashboard-container {
          display: flex;
          min-height: 100vh;
          font-family: 'Inter', system-ui, sans-serif;
          background-color: #F4F7F9;
          color: #2D2D2D;
        }

        .sidebar {
          width: 280px;
          background-color: #1A1C23;
          color: white;
          display: flex;
          flex-direction: column;
          position: fixed;
          height: 100%;
          box-shadow: 4px 0 10px rgba(0,0,0,0.1);
          z-index: 100;
        }

        .logo-section {
          padding: 30px;
          border-bottom: 1px solid #2D2D2D;
          font-size: 20px;
          font-weight: 900;
          letter-spacing: -1px;
          line-height: 1.2;
        }

        .logo-red { color: #ED1B24; }

        .nav-menu {
          flex: 1;
          padding: 20px 15px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .nav-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 14px 18px;
          border-radius: 12px;
          border: none;
          background: none;
          color: #A0AEC0;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          text-align: left;
          width: 100%;
        }

        .nav-item:hover { background-color: #2D2D2D; color: white; }
        .nav-item.active {
          background-color: #ED1B24;
          color: white;
          box-shadow: 0 4px 15px rgba(237, 27, 36, 0.3);
        }

        .sidebar-footer {
          padding: 20px;
          background-color: rgba(0,0,0,0.2);
          border-top: 1px solid #2D2D2D;
        }

        .user-info { display: flex; align-items: center; gap: 10px; margin-bottom: 15px; }
        .avatar {
          width: 35px;
          height: 35px;
          background: #4A5568;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          font-weight: bold;
        }

        .logout-btn {
          width: 100%;
          padding: 10px;
          background: transparent;
          border: 1px solid #2D2D2D;
          color: #E53E3E;
          border-radius: 8px;
          cursor: pointer;
          font-weight: bold;
          font-size: 11px;
          text-transform: uppercase;
        }

        .main-content {
          flex: 1;
          margin-left: 280px;
          padding: 40px;
        }

        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 40px;
          min-height: 60px;
        }

        .title-section h2 { font-size: 32px; font-weight: 900; margin: 0; text-transform: capitalize; }
        .title-section p { color: #718096; margin: 5px 0 0 0; font-size: 14px; }

        .header-actions { display: flex; gap: 15px; align-items: center; }
        .search-box { position: relative; }
        .search-input {
          padding: 12px 15px 12px 40px;
          border-radius: 12px;
          border: 1px solid #E2E8F0;
          width: 250px;
          outline: none;
          background: white;
        }

        .btn-add {
          background-color: #ED1B24;
          color: white;
          border: none;
          padding: 12px 25px;
          border-radius: 12px;
          font-weight: bold;
          display: flex;
          align-items: center;
          gap: 10px;
          cursor: pointer;
          box-shadow: 0 4px 15px rgba(237, 27, 36, 0.2);
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 25px;
          margin-bottom: 40px;
        }

        .stat-card {
          background: white;
          padding: 25px;
          border-radius: 24px;
          box-shadow: 0 4px 6px rgba(0,0,0,0.02);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .stat-value { font-size: 28px; font-weight: 900; margin: 5px 0; }
        .stat-label { font-size: 12px; color: #718096; text-transform: uppercase; font-weight: bold; }

        .analysis-section {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 30px;
        }

        .card {
          background: white;
          padding: 30px;
          border-radius: 32px;
          box-shadow: 0 4px 6px rgba(0,0,0,0.02);
        }

        .placeholder-chart {
          height: 350px;
          background: #F8FAFC;
          border: 2px dashed #E2E8F0;
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #A0AEC0;
          text-align: center;
          padding: 20px;
        }

        .activity-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 15px;
          background: #F8FAFC;
          border-radius: 15px;
          margin-bottom: 10px;
        }

        .table-container { background: white; border-radius: 24px; box-shadow: 0 4px 6px rgba(0,0,0,0.02); overflow: hidden; margin-top: 20px; }
        table { width: 100%; border-collapse: collapse; text-align: left; }
        th { background: #F8FAFC; padding: 15px 20px; font-size: 11px; text-transform: uppercase; color: #718096; letter-spacing: 1px; }
        td { padding: 15px 20px; border-top: 1px solid #F1F5F9; font-size: 14px; }
        .status-badge { padding: 5px 10px; border-radius: 20px; font-size: 11px; font-weight: bold; }
        .status-actif { background: #DEF7EC; color: #03543F; }
        .status-retard { background: #FDE8E8; color: #9B1C1C; }

        /* MODALE FORMULAIRE STYLE PHOTO */
        .modal-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.7); display: flex; align-items: center; justify-content: center; z-index: 1000; overflow-y: auto; padding: 20px; }
        .modal-card { background: white; padding: 30px; border-radius: 12px; width: 100%; max-width: 850px; position: relative; }
        .form-row { display: flex; gap: 20px; margin-bottom: 15px; }
        .form-group { flex: 1; display: flex; flex-direction: column; }
        .form-group label { font-size: 13px; font-weight: bold; color: #333; margin-bottom: 5px; }
        .form-group label span { color: #ED1B24; margin-left: 3px; }
        .form-group input, .form-group select, .form-group textarea { padding: 10px; border: 1px solid #D1D5DB; border-radius: 6px; font-size: 14px; outline: none; }
        .form-group textarea { height: 80px; resize: none; }
        .btn-container { display: flex; justify-content: flex-end; margin-top: 20px; }
        .btn-save { background: #2563EB; color: white; padding: 12px 35px; border: none; border-radius: 6px; font-weight: bold; cursor: pointer; transition: 0.2s; }
        .btn-save:hover { background: #1D4ED8; }

        /* DESIGN FICHE BÉNÉVOLE */
        .clickable-name { color: #2D2D2D; cursor: pointer; font-weight: bold; transition: color 0.2s; }
        .clickable-name:hover { color: #ED1B24; text-decoration: underline; }
        .info-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; margin-top: 20px; }
        .info-item { padding: 15px; background: #F8FAFC; border-radius: 8px; border: 1px solid #E2E8F0; }
        .info-label { font-size: 11px; text-transform: uppercase; color: #718096; font-weight: bold; margin-bottom: 5px; }
        .info-value { font-size: 15px; font-weight: 600; color: #1A1C23; }
        .full-width { grid-column: span 2; }
      `}</style>

      {/* MODALE : FORMULAIRE DYNAMIQUE POUR LES BÉNÉVOLES */}
      {showBenevoleModal && (
      <div className="modal-overlay">
        <div className="modal-card">
          <div style={{display:'flex', justifyContent:'space-between', marginBottom:20}}>
            <h2 style={{fontSize: 24, fontWeight: 700, margin:0}}>{isEditing ? "Modifier le membre" : "Ajouter un Bénévole"}</h2>
            <X onClick={closeModals} style={{cursor:'pointer', color:'#6B7280'}}/>
          </div>
          
          <form onSubmit={handleBenevoleSubmit}>
            <div className="form-row">
              <div className="form-group"><label>Nom <span>*</span></label><input type="text" required value={formBenevole.nom} onChange={e => setFormBenevole({...formBenevole, nom: e.target.value})} placeholder="Nom" /></div>
              <div className="form-group"><label>Prénom <span>*</span></label><input type="text" required value={formBenevole.prenom} onChange={e => setFormBenevole({...formBenevole, prenom: e.target.value})} placeholder="Prénom" /></div>
            </div>

            <div className="form-row">
              <div className="form-group"><label>Email <span>*</span></label><input type="email" required value={formBenevole.email} onChange={e => setFormBenevole({...formBenevole, email: e.target.value})} placeholder="exemple@mail.com" /></div>
              <div className="form-group"><label>Téléphone</label><input type="text" value={formBenevole.telephone} onChange={e => setFormBenevole({...formBenevole, telephone: e.target.value})} /></div>
            </div>

            <div className="form-row">
              <div className="form-group"><label>Ville</label><input type="text" value={formBenevole.ville} onChange={e => setFormBenevole({...formBenevole, ville: e.target.value})} /></div>
              <div className="form-group"><label>Date de naissance</label><input type="date" value={formBenevole.dateNaissance} onChange={e => setFormBenevole({...formBenevole, dateNaissance: e.target.value})} /></div>
            </div>

            <div className="form-row">
              <div className="form-group"><label>Profession</label><input type="text" value={formBenevole.profession} onChange={e => setFormBenevole({...formBenevole, profession: e.target.value})} /></div>
            </div>

            <div className="form-row">
              <div className="form-group"><label>Régime Alimentaire</label><input type="text" value={formBenevole.regime} onChange={e => setFormBenevole({...formBenevole, regime: e.target.value})} placeholder="Ex: Végétarien" /></div>
              <div className="form-group"><label>Restrictions Santé</label><input type="text" value={formBenevole.sante} onChange={e => setFormBenevole({...formBenevole, sante: e.target.value})} placeholder="Ex: Mal de dos" /></div>
            </div>

            <div className="form-row">
              <div className="form-group"><label>Champs Complémentaires</label><textarea value={formBenevole.infos} onChange={e => setFormBenevole({...formBenevole, infos: e.target.value})} placeholder="Saisissez ici des informations supplémentaires"></textarea></div>
            </div>

            <div className="form-row">
              <div className="form-group"><label>Cotisation <span>*</span></label><select value={formBenevole.cotisation} onChange={e => setFormBenevole({...formBenevole, cotisation: e.target.value})}><option>À jour</option><option>Échue</option></select></div>
              <div className="form-group"><label>Disponibilité <span>*</span></label><select value={formBenevole.dispo} onChange={e => setFormBenevole({...formBenevole, dispo: e.target.value})}><option>Semaine</option><option>Weekend</option><option>Libre</option></select></div>
            </div>

            <div className="btn-container">
              <button type="submit" className="btn-save">Enregistrer</button>
            </div>
          </form>
        </div>
      </div>
    )}

      {/* MODALE : FICHE DÉTAILLÉE LORS DU CLIQUE SUR LE NOM POUR LES BÉNÉVOLES */}
      {showViewModal && selectedItem && activeTab === 'benevoles' && (
      <div className="modal-overlay">
        <div className="modal-card">
          <div style={{display:'flex', justifyContent:'space-between', borderBottom:'1px solid #EEE', paddingBottom:15, marginBottom:10}}>
            <h2 style={{fontSize: 22, fontWeight: 800, color:'#1A1C23'}}>Fiche de membre : {selectedItem.prenom} {selectedItem.nom}</h2>
            <X onClick={closeModals} style={{cursor:'pointer', color:'#6B7280'}}/>
          </div>
          <div className="info-grid">
            <div className="info-item"><div className="info-label">Email</div><div className="info-value">{selectedItem.email}</div></div>
            <div className="info-item"><div className="info-label">Téléphone</div><div className="info-value">{selectedItem.telephone || "N/A"}</div></div>
            <div className="info-item"><div className="info-label">Ville</div><div className="info-value">{selectedItem.ville}</div></div>
            <div className="info-item"><div className="info-label">Date de Naissance</div><div className="info-value">{selectedItem.dateNaissance || "N/A"}</div></div>
            <div className="info-item"><div className="info-label">Profession</div><div className="info-value">{selectedItem.profession || "N/A"}</div></div>
            
            <div className="info-item"><div className="info-label">Disponibilité</div><div className="info-value">{selectedItem.dispo}</div></div>
            <div className="info-item"><div className="info-label">Statut Cotisation</div><div className={`status-badge status-${selectedItem.status}`} style={{display:'inline-block', marginTop:'5px'}}>{selectedItem.cotisation}</div></div>
            
            <div className="info-item"><div className="info-label">Régime Alimentaire</div><div className="info-value">{selectedItem.regime || "Aucun"}</div></div>
            <div className="info-item"><div className="info-label">Santé</div><div className="info-value">{selectedItem.sante || "RAS"}</div></div>
            <div className="info-item full-width"><div className="info-label">Notes / Infos Complémentaires</div><div className="info-value" style={{fontWeight:400}}>{selectedItem.infos || "Aucune note particulière."}</div></div>
          </div>
          <div className="btn-container">
            <button className="btn-save" onClick={closeModals}>Fermer la fiche</button>
          </div>
        </div>
      </div>
    )}

    {/* MODALE : FORMULAIRE DYNAMIQUE POUR LES ÉVÈNEMENTS */}
    {showEventModal && (
      <div className="modal-overlay">
        <div className="modal-card">
          <div style={{display:'flex', justifyContent:'space-between', marginBottom:20}}>
            <h2 style={{fontSize: 24, fontWeight: 700, margin:0}}>
              {isEditing ? "Modifier" : "Créer un nouvel élément"}
            </h2>
            <X onClick={closeModals} style={{cursor:'pointer', color:'#6B7280'}}/>
          </div>
          
          <form onSubmit={handleEventSubmit}>
            {/* MODIF : Choix entre Mission et Événement */}
            <div className="form-group" style={{marginBottom: 15}}>
              <label>Type d'élément <span>*</span></label>
              <select 
                value={formEvent.type || "Événement"} 
                onChange={e => setFormEvent({...formEvent, type: e.target.value})}
                style={{padding: '10px', borderRadius: '6px', border: '1px solid #D1D5DB'}}
              >
                <option value="Événement">Événement (Gala, fête, etc.)</option>
                <option value="Mission">Mission de terrain (Maraude, collecte...)</option>
              </select>
            </div>
            <div className="form-group">
              <label>Nom de l'élément <span>*</span></label>
              <input 
                type="text" 
                required 
                value={formEvent.titre} 
                onChange={e => setFormEvent({...formEvent, titre: e.target.value})} 
                placeholder="Ex: Collecte Hivernale" 
              />
            </div>

            {/* DATES DÉBUT ET FIN */}
            <div className="form-row">
              <div className="form-group">
                <label>Date de début <span>*</span></label>
                <input 
                  type="date" 
                  required 
                  value={formEvent.dateDebut} 
                  onChange={e => setFormEvent({...formEvent, dateDebut: e.target.value})} 
                />
              </div>
              <div className="form-group">
                <label>Date de fin <span>*</span></label>
                <input 
                  type="date" 
                  required 
                  value={formEvent.dateFin} 
                  onChange={e => setFormEvent({...formEvent, dateFin: e.target.value})} 
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group"><label>Lieu <span>*</span></label><input type="text" required value={formEvent.lieu} onChange={e => setFormEvent({...formEvent, lieu: e.target.value})} placeholder="Ex: Super U Centre" /></div>
              <div className="form-group"><label>Budget Prévisionnel (€)</label><input type="number" value={formEvent.budget} onChange={e => setFormEvent({...formEvent, budget: e.target.value})} placeholder="0" /></div>
            </div>

            <div className="form-row">
              <div className="form-group"><label>Logistique & Matériel</label><textarea value={formEvent.materiel} onChange={e => setFormEvent({...formEvent, materiel: e.target.value})} placeholder="Ex: Barnum, 2 tables, sonos..."></textarea></div>
            </div>

            <div className="form-row">
              <div className="form-group"><label>Bénévoles Inscrits</label><input type="text" value={formEvent.benevolesInscrits} onChange={e => setFormEvent({...formEvent, benevolesInscrits: e.target.value})} placeholder="Ex: Nadia, Thomas, Julie..." /></div>
              <div className="form-group">
            <label>Documents (Affiches, CR) <span>*PDF uniquement</span></label>
            <input 
              type="file" 
              accept=".pdf"
              style={{ padding: '8px', fontSize: '12px' }}
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  setFormEvent({...formEvent, documents: file.name}); // On stocke le nom du fichier
                }
              }} 
            />
            {formEvent.documents && (
              <span style={{ fontSize: '11px', color: '#2563EB', marginTop: '5px' }}>
                Fichier sélectionné : {formEvent.documents}
              </span>
            )}
          </div>
            </div>

            <div className="form-row">
              <div className="form-group"><label>Notes / Informations supplémentaires</label><textarea value={formEvent.infos} onChange={e => setFormEvent({...formEvent, infos: e.target.value})} placeholder="Précisions sur la mission..."></textarea></div>
            </div>

            <div className="btn-container">
              <button type="submit" className="btn-save">Enregistrer la mission</button>
            </div>
          </form>
        </div>
      </div>
    )}

    {/* MODALE : FICHE DÉTAILLÉE LORS DU CLIQUE SUR LE NOM POUR LES ÉVÈNEMENTS */}

    {showViewModal && selectedItem && activeTab === 'evenements' && (
  <div className="modal-overlay">
    <div className="modal-card">
      <div style={{
        display:'flex', 
        justifyContent:'space-between', 
        borderBottom: `4px solid ${selectedItem.type === 'Mission' ? '#2B6CB0' : '#D97706'}`, 
        paddingBottom:15, 
        marginBottom:10
      }}>
        <h2 style={{fontSize: 22, fontWeight: 800, color:'#1A1C23'}}>[{selectedItem.type === 'Mission' ? 'MISSION' : 'ÉVÉNEMENT'}] {selectedItem.titre}</h2>
        <X onClick={closeModals} style={{cursor:'pointer', color:'#6B7280'}}/>
      </div>
      <div className="info-grid">
        <div className="info-item"><div className="info-label">Période</div><div className="info-value">Du {selectedItem.dateDebut} au {selectedItem.dateFin}</div></div>
        <div className="info-item"><div className="info-label">Lieu</div><div className="info-value">{selectedItem.lieu}</div></div>
        <div className="info-item"><div className="info-label">Budget</div><div className="info-value">{selectedItem.budget ? `${selectedItem.budget} €` : "Non défini"}</div></div>
        <div className="info-item full-width">
          <div className="info-label">Documents joints</div>
          <div className="info-value" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <FileText size={18} color="#2563EB" />
            {selectedItem.documents ? (
              <span style={{ color: '#2563EB', fontWeight: 'bold' }}>{selectedItem.documents}</span>
            ) : (
              <span style={{ color: '#718096' }}>Aucun document PDF associé.</span>
            )}
          </div>
        </div>
      </div>
        
        <div className="info-item full-width"><div className="info-label">Logistique & Matériel</div><div className="info-value" style={{fontWeight:400}}>{selectedItem.materiel || "Rien à prévoir."}</div></div>
        
        <div className="info-item full-width"><div className="info-label">Bénévoles Mobilisés</div><div className="info-value">{selectedItem.benevolesInscrits || "Aucun bénévole inscrit."}</div></div>
        
        <div className="info-item full-width"><div className="info-label">Notes de mission</div><div className="info-value" style={{fontWeight:400}}>{selectedItem.infos || "Aucune note particulière."}</div></div>
      </div>
    </div>
)}

      {/* SIDEBAR */}
      <aside className="sidebar">
        <div className="logo-section">
          <span className="logo-red">LA CROIX ROUGE</span><br/>
          <span style={{fontSize: '14px', opacity: 0.7}}>ADMINISTRATION</span>
        </div>
        <nav className="nav-menu">
          {menuItems.map((item) => (
            <div key={item.id}>
              <button
                className={`nav-item ${(activeTab === item.id || (item.id === 'evenements' && activeTab === 'calendrier')) ? 'active' : ''}`}
                onClick={() => { 
                  setActiveTab(item.id); 
                  setSearchQuery(""); 
                }}
              >
          {item.icon}
          <span>{item.label}</span>
        </button>
      {/* SOUS-MENU ÉVÉNEMENTS */}
      {item.id === 'evenements' && (activeTab === 'evenements' || activeTab === 'calendrier') && (
        <div style={{ 
          paddingLeft: '54px', // Aligné sur le début du texte "Événements"
          display: 'flex', 
          flexDirection: 'column', 
          gap: '4px', 
          marginTop: '4px', 
          marginBottom: '10px'
        }}>
          <button 
            onClick={() => setActiveTab('evenements')}
            style={{ 
              background: 'none', 
              border: 'none', 
              color: activeTab === 'evenements' ? 'white' : '#A0AEC0', 
              fontSize: '13px', 
              cursor: 'pointer', 
              textAlign: 'left', 
              padding: '6px 0',
              fontWeight: activeTab === 'evenements' ? '700' : '500',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              transition: '0.2s'
            }}
          >
            <span style={{ color: activeTab === 'evenements' ? '#ED1B24' : 'transparent', fontSize: '18px' }}>•</span>
            Gestion des missions et événements
          </button>
          <button 
            onClick={() => setActiveTab('calendrier')}
            style={{ 
              background: 'none', 
              border: 'none', 
              color: activeTab === 'calendrier' ? 'white' : '#A0AEC0', 
              fontSize: '13px', 
              cursor: 'pointer', 
              textAlign: 'left', 
              padding: '6px 0',
              fontWeight: activeTab === 'calendrier' ? '700' : '500',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              transition: '0.2s'
            }}
          >
            <span style={{ color: activeTab === 'calendrier' ? '#ED1B24' : 'transparent', fontSize: '18px' }}>•</span>
            Planning
          </button>
        </div>
      )}
      </div>
    ))}
  </nav>
        <div className="sidebar-footer">
          <div className="user-info">
            <div className="avatar">AD</div>
            <div>
              <p style={{margin:0, fontSize:'13px', fontWeight:'bold'}}>Admin Bureau</p>
              <p style={{margin:0, fontSize:'10px', color:'#718096'}}>Accès Protégé</p>
            </div>
          </div>
          <button className="logout-btn"><LogOut size={14} style={{marginRight:8}}/> DÉCONNEXION</button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="main-content">
        <header className="header">
          <div className="title-section">
    <h2>
  {activeTab === 'calendrier'
    ? 'Planning'
    : activeTab === 'evenements'
      ? 'Gestion des évènements & missions'
      : activeTab.replace('-', ' ')
  }
</h2>
    <p>Gestion interne de l'association</p>
  </div>

  {/* On cache les actions si Analyse OU Calendrier */}
  {activeTab !== 'analyse' && activeTab !== 'calendrier' && activeTab !== 'partenaires' && (
    <div className="header-actions">
      <div className="search-box">
        <Search style={{position:'absolute', left:12, top:13, color:'#A0AEC0'}} size={18}/>
        <input 
          type="text" 
          className="search-input" 
          placeholder="Rechercher..." 
          value={searchQuery} 
          onChange={(e) => setSearchQuery(e.target.value)} 
        />
      </div>
      <button className="btn-add" onClick={() => { 
        setIsEditing(false); 
        if(activeTab === 'benevoles') setShowBenevoleModal(true);
        if(activeTab === 'evenements') setShowEventModal(true);
      }}>
        <Plus size={18}/> NOUVEAU
      </button>
    </div>
  )}
</header>

        {(activeTab === 'analyse' || activeTab === 'calendrier') ? (
  <div className="content-body">
    {/* On n'affiche les stats que sur l'onglet Analyse */}
    {activeTab === 'analyse' && (
      <div className="stats-grid">
        <div className="stat-card">
          <div><span className="stat-label">Bénévoles Actifs</span><p className="stat-value">{benevoles.length}</p></div>
          <UserCheck size={32} color="#ED1B24"/>
        </div>
        <div className="stat-card">
          <div><span className="stat-label">Événements</span><p className="stat-value">{events.length}</p></div>
          <Calendar size={32} color="#ED1B24"/>
        </div>
        <div className="stat-card">
          <div><span className="stat-label">Total des Dons</span><p className="stat-value">45 200€</p></div>
          <Wallet size={32} color="#ED1B24"/>
        </div>
        <div className="stat-card">
          <div><span className="stat-label">Admin Bureau</span><p className="stat-value">6</p></div>
          <ShieldCheck size={32} color="#ED1B24"/>
        </div>
      </div>
    )}
    

    {/* CONTENEUR DYNAMIQUE */}

    <div className={activeTab === 'analyse' ? "analysis-section" : ""}>
  
  <div className="card" style={{ 
    width: '100%',
    gridColumn: activeTab === 'calendrier' ? "span 2" : "auto",
    padding: activeTab === 'calendrier' ? '25px' : '30px' 
  }}>
    
    {/* Le titre "Analyse" n'apparaît QUE sur l'onglet analyse */}
    {activeTab === 'analyse' && (
      <div style={{display:'flex', justifyContent:'space-between', marginBottom:20}}>
        <h3 style={{margin:0, fontWeight:900, display:'flex', alignItems:'center'}}>
          <TrendingUp size={20} color="#ED1B24" style={{marginRight:10}}/> 
          Analyse des Flux & Graphs
        </h3>
        <button style={{border:'none', background:'#F4F7F9', padding:'5px 15px', borderRadius:20, fontSize:10, fontWeight:'bold', cursor:'pointer'}}>
          <FileText size={12} style={{marginRight:5}}/> EXPORT PDF
        </button>
      </div>
      )}
        
        {/* Affichage du Calendrier Global */}
        {activeTab === 'calendrier' ? (
          <div className="calendar-wrapper" style={{ background: 'white', borderRadius: '12px' }}>

            {/* NAVIGATION DU CALENDRIER */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <h4 style={{ margin: 0, fontSize: '18px', fontWeight: '800', textTransform: 'capitalize' }}>
              {currentDate.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}
            </h4>
            <div style={{ display: 'flex', gap: '5px' }}>
              <button onClick={() => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)))} style={{ padding: '5px 10px', borderRadius: '6px', border: '1px solid #E2E8F0', cursor: 'pointer', background: 'white' }}> &lt; </button>
              <button onClick={() => setCurrentDate(new Date())} style={{ padding: '5px 10px', borderRadius: '6px', border: '1px solid #E2E8F0', cursor: 'pointer', background: 'white', fontSize: '11px' }}> Aujourd'hui </button>
              <button onClick={() => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)))} style={{ padding: '5px 10px', borderRadius: '6px', border: '1px solid #E2E8F0', cursor: 'pointer', background: 'white' }}> &gt; </button>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '11px' }}>
              <div style={{ width: '8px', height: '8px', background: '#2B6CB0', borderRadius: '50%' }}></div> Mission
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '11px' }}>
              <div style={{ width: '8px', height: '8px', background: '#D97706', borderRadius: '50%' }}></div> Événement
            </div>
          </div>
        </div>

            {/* GRILLE DYNAMIQUE GOOGLE CALENDAR */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', backgroundColor: '#E2E8F0', gap: '1px', border: '1px solid #E2E8F0', borderRadius: '12px', overflow: 'hidden' }}>
          {['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'].map(d => (
            <div key={d} style={{ background: '#F8FAFC', padding: '10px', textAlign: 'center', fontSize: '11px', fontWeight: 'bold', color: '#64748B' }}>{d}</div>
          ))}

          {(() => {
            const year = currentDate.getFullYear();
            const month = currentDate.getMonth();
            const firstDay = new Date(year, month, 1).getDay();
            const offset = firstDay === 0 ? 6 : firstDay - 1;
            const days = [];

            for (let i = 0; i < 42; i++) {
              const d = new Date(year, month, i - offset + 1);
              const dStr = d.toISOString().split('T')[0];
              const isCur = d.getMonth() === month;

              days.push(
                <div key={i} style={{ minHeight: '100px', background: isCur ? 'white' : '#F1F5F9', padding: '5px', position: 'relative' }}>
                  <span style={{ fontSize: '11px', fontWeight: '700', color: isCur ? '#4A5568' : '#CBD5E0' }}>{d.getDate()}</span>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', marginTop: '5px' }}>
                    {events.filter(ev => dStr >= ev.dateDebut && dStr <= ev.dateFin).map(ev => {
                      const isStart = dStr === ev.dateDebut;
                      const isEnd = dStr === ev.dateFin;
                      const tooltipText = `📌 ${(ev.type || 'Elément').toUpperCase()}\n🏷️ ${ev.titre}\n📍 ${ev.lieu || 'N/A'}\n📅 Du ${ev.dateDebut} au ${ev.dateFin}`;

                        return (
                          <div 
                            key={ev.id} 
                            onClick={() => openViewModal(ev)} 
                            title={tooltipText}
                            style={{ 
                          fontSize: '9px', padding: '3px 6px', color: 'white', fontWeight: 'bold', cursor: 'pointer', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', display: 'block', minHeight: '16px',
                          background: ev.type === 'Mission' ? '#2B6CB0' : '#D97706',
                          borderRadius: isStart ? '4px 0 0 4px' : isEnd ? '0 4px 4px 0' : '0',
                          marginLeft: isStart ? '0' : '-9px',
                          marginRight: isEnd ? '0' : '-9px',
                          zIndex: 10, position: 'relative'
                            }}
                          >
                            {(isStart || d.getDay() === 1) && ev.titre}
                          </div>
                        );
                      })}
                    </div>
                    </div>
                  );
                }
                return days;
              })()}
            </div>
          </div>
        ) : activeTab === 'analyse' ? (
          <div className="placeholder-chart">
            <p>Remontée des données PHP pour graphiques dynamiques</p>
          </div>
        ): null}
  </div>
              {activeTab === 'analyse' && (
    <div className="card">
      <h3 style={{margin:'0 0 20px 0', fontWeight:900}}>Derniers Donateurs</h3>
      {[1, 2, 3, 4].map(i => (
        <div key={i} className="activity-item">
          <div style={{display:'flex', gap:10, alignItems:'center'}}>
            <div className="avatar" style={{background:'#ED1B24'}}>D</div>
            <span style={{fontSize:13, fontWeight:'bold'}}>Donateur #{i}</span>
          </div>
          <span style={{fontSize:12, fontWeight:'bold', color:'#48BB78'}}>+50€</span>
        </div>
                ))}
              </div>
              )}
            </div>
            
          </div>
) : activeTab === 'benevoles' ? (
  <>
    {activeTab === 'benevoles' && (
      <div style={{ 
        display: 'flex', 
        gap: '12px', 
        marginBottom: '20px', 
        background: 'white', 
        padding: '12px 20px', 
        borderRadius: '16px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.03)',
        alignItems: 'center',
        flexWrap: 'wrap'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#718096', fontSize: '13px', fontWeight: '600' }}>
          <Search size={14} /> Filtres :
        </div>

        {/* SELECT VILLE */}
        <select 
          value={filterVille} 
          onChange={(e) => setFilterVille(e.target.value)}
          style={{ padding: '6px 12px', borderRadius: '8px', border: '1px solid #E2E8F0', fontSize: '13px', outline: 'none', cursor: 'pointer' }}
        >
          <option value="">Toutes les villes</option>
          {[...new Set(benevoles.map(b => b.ville))].filter(Boolean).map(v => (
            <option key={v} value={v}>{v}</option>
          ))}
        </select>

        {/* SELECT PROFESSION */}
        <select 
          value={filterProfession} 
          onChange={(e) => setFilterProfession(e.target.value)}
          style={{ padding: '6px 12px', borderRadius: '8px', border: '1px solid #E2E8F0', fontSize: '13px', outline: 'none', cursor: 'pointer' }}
        >
          <option value="">Toutes les professions</option>
          {[...new Set(benevoles.map(b => b.profession))].filter(Boolean).map(p => (
            <option key={p} value={p}>{p}</option>
          ))}
        </select>

        {/* SELECT DISPO */}
        <select 
          value={filterDispo} 
          onChange={(e) => setFilterDispo(e.target.value)}
          style={{ padding: '6px 12px', borderRadius: '8px', border: '1px solid #E2E8F0', fontSize: '13px', outline: 'none', cursor: 'pointer' }}
        >
          <option value="">Toutes les dispos</option>
          <option value="Semaine">Semaine</option>
          <option value="Weekend">Weekend</option>
          <option value="Libre">Libre</option>
        </select>

        {/* BOUTON RÉINITIALISER */}
        {(filterVille || filterProfession || filterDispo) && (
          <button 
            onClick={() => { setFilterVille(""); setFilterProfession(""); setFilterDispo(""); }}
            style={{ background: 'none', border: 'none', color: '#ED1B24', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer', padding: '0 10px' }}
          >
            Réinitialiser
          </button>
        )}
      </div>
    )}
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Nom Prénom</th>
                    <th>Email / Téléphone</th>
                    <th>Ville</th>
                    <th>Cotisation</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {/* MODIF : Utilisation de filteredData (notre fonction de filtrage universelle) */}
                  {filteredData.map((b) => (
                    <tr key={b.id}>
                      <td className="clickable-name" onClick={() => openViewModal(b)}>{b.nom} {b.prenom}</td>
                      <td>
                        <div style={{fontSize:13}}>{b.email}</div>
                        <div style={{fontSize:11, color:'#A0AEC0'}}>{b.telephone}</div>
                      </td>
                      <td>{b.ville}</td>
                      <td><span className={`status-badge status-${b.status}`}>{b.cotisation}</span></td>
                      <td>
                        <div style={{display:'flex', gap:10}}>
                          <Edit size={16} onClick={() => openEdit(b)} style={{cursor:'pointer', color:'#A0AEC0'}}/>
                          <Trash2 size={16} onClick={() => handleDelete(b.id)} style={{cursor:'pointer', color:'#A0AEC0'}}/>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ) : activeTab === 'evenements' ? (
          /* MODIF : TABLEAU DÉDIÉ AUX ÉVÉNEMENTS */
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Nom</th>
                  <th>Date de début</th>
                  <th>Lieu</th>
                  <th>Budget</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((ev) => (
                  <tr key={ev.id}>
                    <td>{/* BADGE DYNAMIQUE */}
                      <span style={{
                        flexShrink: 0, 
                        padding: '2px 8px',
                        borderRadius: '12px',
                        fontSize: '10px',
                        fontWeight: 'bold',
                        textTransform: 'uppercase',
                        background: ev.type === 'Mission' ? '#DEF7EC' : '#E1EFFE', 
                        color: ev.type === 'Mission' ? '#03543F' : '#1E429F',
                        border: `1px solid ${ev.type === 'Mission' ? '#84E1BC' : '#A4CAFE'}`,
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        minWidth: '80px' // Largeur fixe pour que "MISSION" et "ÉVÉNEMENT" soient alignés
                      }}>
                        {ev.type ? ev.type.toUpperCase() : 'ÉVÉNEMENT'}
                      </span></td>
                    <td style= {{minWidth: '205px'}}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', width: '100%' }}></div>
                      <span 
                        className="clickable-name" onClick={() => openViewModal(ev)} style={{ fontWeight: '600', fontSize: '14px', color: '#1A1C23',cursor: 'pointer', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', flexGrow: 1, marginLeft: '10px' }}
                      >{ev.titre || "Sans titre"}
                      </span>
                    </td>
                    <td>{ev.dateDebut}</td>
                    <td>{ev.lieu}</td>
                    <td>{ev.budget} €</td>
                    <td>
                      <div style={{display:'flex', gap:10}}>
                        <Edit size={16} onClick={() => openEdit(ev)} style={{cursor:'pointer', color:'#A0AEC0'}}/>
                        <Trash2 size={16} onClick={() => handleDelete(ev.id)} style={{cursor:'pointer', color:'#A0AEC0'}}/>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) 
        : activeTab !== 'analyse' && activeTab !== 'calendrier' && activeTab !== 'benevoles' && activeTab !== 'evenements' && activeTab !== 'partenaires' && (
        <div className="placeholder-chart" style={{ height: 500 }}>
        <p>Interface de gestion pour le module {activeTab}<br/>Utilisez la recherche pour filtrer les résultats.</p>
  </div>
)}

        {activeTab === 'partenaires' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '25px', marginTop: '-20px' }}>
    
    {/* BLOC 1 : PARTENAIRES (ENTREPRISES) */}
    <div className="card">
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <h3 style={{ margin: 0, fontWeight: 900, display: 'flex', alignItems: 'center' }}>
          <Handshake size={20} color="#ED1B24" style={{ marginRight: 10 }} /> Partenaires Entreprises
        </h3>
        <div style={{ display: 'flex', gap: '15px' }}>
          {/* Barre de recherche locale pour les entreprises */}
          <div className="search-box">
            <Search style={{position:'absolute', left:12, top:10, color:'#A0AEC0'}} size={16}/>
            <input 
              type="text" 
              className="search-input" 
              style={{ width: '200px', padding: '8px 12px 8px 35px' }}
              placeholder="Rechercher entreprise..." 
              value={searchQuery} 
              onChange={(e) => setSearchQuery(e.target.value)} 
            />
          </div>
        <button className="btn-add" onClick={() => { setFormEntreprise({ nom: '', contact: '', email: '', telephone: '' }); 
            setIsEditing(false); setShowEntrepriseModal(true); }}>
          <Plus size={16}/> NOUVELLE ENTREPRISE
        </button>
      </div>
      </div>
      <div className="table-container" style={{ maxHeight: '300px', overflowY: 'auto' }}>
        <table>
          <thead>
            <tr>
              <th>Nom de l'entreprise</th>
              <th>Contact (Nom & Prénom)</th>
              <th>Email / Tel</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {partenaires.filter(p => p.nom.toLowerCase().includes(searchQuery.toLowerCase())).map(p => (
              <tr key={p.id}>
                <td className="clickable-name" onClick={() => openViewModal(p)}>{p.nom}</td>
                <td>{p.contact}</td>
                <td><div style={{fontSize:'12px'}}>{p.email}</div><div style={{fontSize:'10px', color:'#718096'}}>{p.telephone}</div></td>
                <td>
                  <div style={{ display: 'flex', gap: 10 }}>
                    <Edit size={16} onClick={() => { setFormEntreprise(p); setIsEditing(true); setCurrentId(p.id); setShowEntrepriseModal(true); }} style={{ cursor: 'pointer', color: '#A0AEC0' }} />
                    <Trash2 size={16} onClick={() => setPartenaires(partenaires.filter(x => x.id !== p.id))} style={{ cursor: 'pointer', color: '#A0AEC0' }} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>

    {/* BLOC 2 : SUBVENTIONS */}
    <div className="card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h3 style={{ margin: 0, fontWeight: 900, display: 'flex', alignItems: 'center' }}>
          <FileText size={20} color="#ED1B24" style={{ marginRight: 10 }} /> Subventions & Aides Publiques
        </h3>
        <div style={{ display: 'flex', gap: '15px' }}>
          {/* Barre de recherche locale pour les subventions */}
          <div className="search-box">
            <Search style={{position:'absolute', left:12, top:10, color:'#A0AEC0'}} size={16}/>
            <input 
              type="text" 
              className="search-input" 
              style={{ width: '200px', padding: '8px 12px 8px 35px' }}
              placeholder="Rechercher aide..." 
              value={searchQuery} 
              onChange={(e) => setSearchQuery(e.target.value)} 
            />
          </div>
        <button className="btn-add" onClick={() => { setFormSubvention({ nom: '', organisme: '', montant: '', status: 'Reçue' }); 
            setIsEditing(false); setShowSubventionModal(true); }}>
          <Plus size={16}/> NOUVELLE SUBVENTION
        </button>
      </div>
      </div>
      <div className="table-container" style={{ maxHeight: '300px', overflowY: 'auto' }}>
        <table>
          <thead>
            <tr>
              <th>Nom Subvention</th>
              <th>Organisme</th>
              <th>Montant</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {subventions.filter(s => s.nom.toLowerCase().includes(searchQuery.toLowerCase())).map(s => (
              <tr key={s.id}>
                <td className="clickable-name" onClick={() => openViewModal(s)}>{s.nom}</td>
                <td>{s.organisme}</td>
                <td style={{ fontWeight: 'bold', color: '#03543F' }}>{s.montant} €</td>
                <td>
                  <div style={{ display: 'flex', gap: 10 }}>
                    <Edit size={16} onClick={() => { setFormSubvention(s); setIsEditing(true); setCurrentId(s.id); setShowSubventionModal(true); }} style={{ cursor: 'pointer', color: '#A0AEC0' }} />
                    <Trash2 size={16} onClick={() => setSubventions(subventions.filter(x => x.id !== s.id))} style={{ cursor: 'pointer', color: '#A0AEC0' }} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>

    {/* MODALE ENTREPRISE */}
{showEntrepriseModal && (
  <div className="modal-overlay">
    <div className="modal-card">
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
        <h2 style={{ fontSize: 24, fontWeight: 700, margin: 0 }}>{isEditing ? "Modifier" : "Ajouter"} une Entreprise</h2>
        <X onClick={() => setShowEntrepriseModal(false)} style={{ cursor: 'pointer', color: '#6B7280' }} />
      </div>
      <form onSubmit={handleEntrepriseSubmit}>
        <div className="form-group"><label>Nom Entreprise *</label>
          <input type="text" required value={formEntreprise.nom} onChange={e => setFormEntreprise({...formEntreprise, nom: e.target.value})} />
        </div>
        <div className="form-group"><label>Contact (Nom & Prenom)</label>
          <input type="text" value={formEntreprise.contact} onChange={e => setFormEntreprise({...formEntreprise, contact: e.target.value})} />
        </div>
        <div className="form-row">
          <div className="form-group"><label>Email</label><input type="email" value={formEntreprise.email} onChange={e => setFormEntreprise({...formEntreprise, email: e.target.value})} /></div>
          <div className="form-group"><label>Tel</label><input type="text" value={formEntreprise.telephone} onChange={e => setFormEntreprise({...formEntreprise, telephone: e.target.value})} /></div>
        </div>
        <div className="btn-container"><button type="submit" className="btn-save">Enregistrer</button></div>
      </form>
    </div>
  </div>
)}

{/* MODALE SUBVENTION */}
{showSubventionModal && (
  <div className="modal-overlay">
    <div className="modal-card">
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
        <h2 style={{ fontSize: 24, fontWeight: 700, margin: 0 }}>{isEditing ? "Modifier" : "Ajouter"} une Subvention</h2>
        <X onClick={() => setShowSubventionModal(false)} style={{ cursor: 'pointer', color: '#6B7280' }} />
      </div>
      <form onSubmit={handleSubventionSubmit}>
        <div className="form-group"><label>Nom de l'aide *</label>
          <input type="text" required value={formSubvention.nom} onChange={e => setFormSubvention({...formSubvention, nom: e.target.value})} />
        </div>
        <div className="form-row">
          <div className="form-group"><label>Organisme</label><input type="text" value={formSubvention.organisme} onChange={e => setFormSubvention({...formSubvention, organisme: e.target.value})} /></div>
          <div className="form-group"><label>Montant (€)</label><input type="number" value={formSubvention.montant} onChange={e => setFormSubvention({...formSubvention, montant: e.target.value})} /></div>
        </div>
        <div className="btn-container"><button type="submit" className="btn-save">Enregistrer</button></div>
      </form>
    </div>
  </div>
)}

    {/* BLOC 3 : DONATEURS (Comme demandé dans le sujet) */}
    <div className="card">
      <h3 style={{ margin: '0 0 20px 0', fontWeight: 900 }}>Historique des Donateurs</h3>
      <p style={{ fontSize: '12px', color: '#718096', marginBottom: '15px' }}>Ce module permet de valoriser nos soutiens dans nos communications.</p>
      {[1, 2, 3, 4].map(i => (
        <div key={i} className="activity-item">
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <div className="avatar" style={{ background: '#ED1B24' }}>D</div>
            <div>
              <span style={{ fontSize: 13, fontWeight: 'bold' }}>Donateur Fidèle #{i}</span>
              <div style={{ fontSize: 11, color: '#718096' }}>Contribution annuelle : 200€</div>
            </div>
          </div>
          <button style={{ background: '#F4F7F9', border: 'none', padding: '5px 12px', borderRadius: '8px', fontSize: '10px', fontWeight: 'bold', cursor: 'pointer' }}>DÉTAILS</button>
        </div>
      ))}
    </div>
  </div>
)}
      </main>
    </div>
  );
};

export default Dashboard;
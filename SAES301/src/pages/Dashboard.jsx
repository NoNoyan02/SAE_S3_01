import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, Users, Handshake, Calendar, 
  BarChart3, LogOut, Plus, Search, 
  TrendingUp, Wallet, UserCheck, ShieldCheck, FileText, Edit, Trash2, X, Eye
} from 'lucide-react';

const Dashboard = () => {
  // 1. ÉTATS (DÉCLARÉS EN PREMIER POUR ÉVITER LES ERREURS)
  const [activeTab, setActiveTab] = useState('analyse');
  const [searchQuery, setSearchQuery] = useState(""); // État pour la recherche
  const [showModal, setShowModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false); 
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [selectedBenevole, setSelectedBenevole] = useState(null); 

  // 2. DONNÉES DES BÉNÉVOLES
const [benevoles, setBenevoles] = useState(() => {
    const saved = localStorage.getItem('benevoles_data');
    return saved ? JSON.parse(saved) : [
      { id: 1, nom: "Davud", prenom: "Dupont", email: "david.dupontg@gmail.com", telephone: "0102030405", ville: "Paris", dateNaissance: "1985-10-12", profession: "Ingénieur", regime: "Sans gluten", sante: "RAS", infos: "Ancien secouriste", dispo: "Semaine", cotisation: "À jour", status: "actif" },
      { id: 2, nom: "Marie", prenom: "Leroy", email: "m.leroy@mail.com", telephone: "0600000000", ville: "Lyon", dateNaissance: "1995-05-12", profession: "Étudiante", regime: "Végétarien", sante: "Allergie pollen", infos: "", dispo: "Weekend", cotisation: "Échue", status: "retard" },
    ];
  });

  useEffect(() => {
    localStorage.setItem('benevoles_data', JSON.stringify(benevoles));
  }, [benevoles]);

  // 3. LOGIQUE DE FILTRAGE (SÉCURISÉE)
  const filteredBenevoles = benevoles.filter((b) => {
    const q = searchQuery.toLowerCase();
    return (
      (b.nom || "").toLowerCase().includes(q) ||
      (b.prenom || "").toLowerCase().includes(q) ||
      (b.email || "").toLowerCase().includes(q) ||
      (b.ville || "").toLowerCase().includes(q)
    );
  });

  // 4. ÉTAT POUR LE FORMULAIRE
  const [formBenevole, setFormBenevole] = useState({
    nom: '', prenom: '', email: '', telephone: '', ville: '', dateNaissance: '', profession: '', regime: '', sante: '', infos: '', dispo: 'Semaine', cotisation: 'À jour'
  });

  // 5. FONCTIONS DE GESTION
  const deleteBenevole = (id) => {
    if(window.confirm("Voulez-vous vraiment supprimer ce membre ?")) {
      setBenevoles(benevoles.filter(b => b.id !== id));
    }
  };

  const openEditModal = (benevole) => {
    setIsEditing(true);
    setCurrentId(benevole.id);
    setFormBenevole({ ...benevole });
    setShowModal(true);
  };

  const openViewModal = (benevole) => {
    setSelectedBenevole(benevole);
    setShowViewModal(true);
  };

const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      // Mise à jour d'un existant
      const updatedList = benevoles.map(b => 
        b.id === currentId ? { 
          ...formBenevole, 
          id: currentId, 
          status: formBenevole.cotisation === 'À jour' ? 'actif' : 'retard' 
        } : b
      );
      setBenevoles(updatedList);
    } else {
      // Ajout d'un nouveau
      const newEntry = {
        ...formBenevole,
        id: Date.now(),
        status: formBenevole.cotisation === 'À jour' ? 'actif' : 'retard'
      };
      setBenevoles([...benevoles, newEntry]);
    }
    closeModal();
  };

  const closeModal = () => {
    setShowModal(false);
    setShowViewModal(false);
    setIsEditing(false);
    setFormBenevole({ nom: '', prenom: '', email: '', telephone: '', ville: '', dateNaissance: '', profession: '', regime: '', sante: '', infos: '', dispo: 'Semaine', cotisation: 'À jour' });
  };

  const menuItems = [
    { id: 'tableau-de-bord', label: 'Tableau de bord', icon: <LayoutDashboard size={20} /> },
    { id: 'benevoles', label: 'Bénévoles', icon: <Users size={20} /> },
    { id: 'partenaires', label: 'Partenaires', icon: <Handshake size={20} /> },
    { id: 'evenements', label: 'Événements', icon: <Calendar size={20} /> },
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

      {/* MODALE : FORMULAIRE DYNAMIQUE (D'APRÈS PHOTO) */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-card">
            <div style={{display:'flex', justifyContent:'space-between', marginBottom:20}}>
              <h2 style={{fontSize: 24, fontWeight: 700, margin:0}}>{isEditing ? "Modifier le membre" : "Ajouter un Bénévole"}</h2>
              <X onClick={closeModal} style={{cursor:'pointer', color:'#6B7280'}}/>
            </div>
            
            <form onSubmit={handleSubmit}>
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

      {/* MODALE : FICHE DÉTAILLÉE AVEC CORRECTIFS */}
      {showViewModal && selectedBenevole && (
        <div className="modal-overlay">
          <div className="modal-card">
            <div style={{display:'flex', justifyContent:'space-between', borderBottom:'1px solid #EEE', paddingBottom:15, marginBottom:10}}>
              <h2 style={{fontSize: 22, fontWeight: 800, color:'#1A1C23'}}>Fiche de membre : {selectedBenevole.prenom} {selectedBenevole.nom}</h2>
              <X onClick={closeModal} style={{cursor:'pointer', color:'#6B7280'}}/>
            </div>
            <div className="info-grid">
              <div className="info-item"><div className="info-label">Email</div><div className="info-value">{selectedBenevole.email}</div></div>
              <div className="info-item"><div className="info-label">Téléphone</div><div className="info-value">{selectedBenevole.telephone || "N/A"}</div></div>
              <div className="info-item"><div className="info-label">Ville</div><div className="info-value">{selectedBenevole.ville}</div></div>
              <div className="info-item"><div className="info-label">Date de Naissance</div><div className="info-value">{selectedBenevole.dateNaissance}</div></div>
              <div className="info-item"><div className="info-label">Profession</div><div className="info-value">{selectedBenevole.profession}</div></div>
              
              {/* DISPONIBILITÉ ET COTISATION AJOUTÉES */}
              <div className="info-item"><div className="info-label">Disponibilité</div><div className="info-value">{selectedBenevole.dispo}</div></div>
              <div className="info-item"><div className="info-label">Statut Cotisation</div><div className={`status-badge status-${selectedBenevole.status}`} style={{display:'inline-block', marginTop:'5px'}}>{selectedBenevole.cotisation}</div></div>
              
              <div className="info-item"><div className="info-label">Régime Alimentaire</div><div className="info-value">{selectedBenevole.regime || "Aucun"}</div></div>
              <div className="info-item"><div className="info-label">Santé</div><div className="info-value">{selectedBenevole.sante || "RAS"}</div></div>
              <div className="info-item full-width"><div className="info-label">Notes / Infos Complémentaires</div><div className="info-value" style={{fontWeight:400}}>{selectedBenevole.infos || "Aucune note particulière."}</div></div>
            </div>
            <div className="btn-container">
              <button className="btn-save" onClick={closeModal}>Fermer la fiche</button>
            </div>
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
            <button
              key={item.id}
              className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
              onClick={() => { setActiveTab(item.id); setSearchQuery(""); }}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
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
            <h2>{activeTab.replace('-', ' ')}</h2>
            <p>Gestion interne de l'association</p>
          </div>

          {activeTab !== 'analyse' && (
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
              <button className="btn-add" onClick={() => { setIsEditing(false); setShowModal(true); }}><Plus size={18}/> NOUVEAU</button>
            </div>
          )}
        </header>

        {activeTab === 'analyse' ? (
          <div className="content-body">
            <div className="stats-grid">
              <div className="stat-card">
                <div><span className="stat-label">Bénévoles Actifs</span><p className="stat-value">{benevoles.length}</p></div>
                <UserCheck size={32} color="#ED1B24"/>
              </div>
              <div className="stat-card">
                <div><span className="stat-label">Donateurs</span><p className="stat-value">842</p></div>
                <Users size={32} color="#ED1B24"/>
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

            <div className="analysis-section">
              <div className="card">
                <div style={{display:'flex', justifyContent:'space-between', marginBottom:20}}>
                  <h3 style={{margin:0, fontWeight:900}}>
                    <TrendingUp size={20} color="#ED1B24" style={{marginRight:10}}/> 
                    Analyse des Flux & Graphs
                  </h3>
                  <button style={{border:'none', background:'#F4F7F9', padding:'5px 15px', borderRadius:20, fontSize:10, fontWeight:'bold', cursor:'pointer'}}>
                    <FileText size={12} style={{marginRight:5}}/> EXPORT PDF
                  </button>
                </div>
                <div className="placeholder-chart">
                  <p>Remontée des données PHP pour graphiques dynamiques</p>
                </div>
              </div>
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
            </div>
          </div>
        ) : activeTab === 'benevoles' ? (
          /* TABLEAU DE GESTION DES BÉNÉVOLES AVEC FILTRAGE */
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
                {filteredBenevoles.map((b) => (
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
                        <Edit size={16} onClick={() => openEditModal(b)} style={{cursor:'pointer', color:'#A0AEC0'}}/>
                        <Trash2 size={16} onClick={() => deleteBenevole(b.id)} style={{cursor:'pointer', color:'#A0AEC0'}}/>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="placeholder-chart" style={{height:500}}>
            <p>Interface de gestion pour le module {activeTab}<br/>Utilisez la recherche pour filtrer les résultats.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
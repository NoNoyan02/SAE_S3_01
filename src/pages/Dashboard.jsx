import React, { useState, useEffect } from 'react';
import {
  LayoutDashboard, Users, Handshake, Calendar,
  BarChart3, LogOut, Plus, Search,
  TrendingUp, Wallet, UserCheck, ShieldCheck, FileText, Edit, Trash2, X, Eye, Package, MapPin,
  Undo2, Redo2, Bold, Italic, Underline, AlignLeft, AlignCenter, Outdent, Indent, List, ListOrdered,
  Omega, Smile, Image, PlaySquare, Link, MoreHorizontal, Maximize, Printer, AlignRight, ChevronDown, Type, Highlighter
} from 'lucide-react';
import StatCard from '../components/dashboard/StatCard';

const Dashboard = () => {
  // 1. ÉTATS GÉNÉRALS
  const [activeTab, setActiveTab] = useState('analyse');
  const [searchQuery, setSearchQuery] = useState("");
  const [showBenevoleModal, setShowBenevoleModal] = useState(false);
  const [showEventModal, setShowEventModal] = useState(false);
  const [showNewsletterModal, setShowNewsletterModal] = useState(false); // AJOUT
  const [showViewModal, setShowViewModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [stats, setStats] = useState(null); // STATS

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

  // FORMULAIRE NEWSLETTER
  const [formNewsletter, setFormNewsletter] = useState({
    email: '', acceptConditions: true, offre_entreprise: false
  });

  // ÉTATS POUR LES DONATEURS DE PARTENAIRES ET SUBVENTIONS
  // Données simulées basées sur le payload de Donation.jsx
  const [donateursData, setDonateursData] = useState([]);

  // ÉTATS POUR L'ÉDITEUR D'ARTICLE (RICH TEXT)
  const [showSpecialCharModal, setShowSpecialCharModal] = useState(false);
  const [showEmojiModal, setShowEmojiModal] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [imageModalTab, setImageModalTab] = useState('General'); // General, Advanced
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [mediaModalTab, setMediaModalTab] = useState('General'); // General, Embed, Advanced
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const [formArticle, setFormArticle] = useState({ titre: '', contenu: '', image: null });

  // 2. DONNÉES DES BÉNÉVOLES (VIA API)
  const [benevoles, setBenevoles] = useState([]);

  // 3. DONNÉES DES ÉVÉNEMENTS (VIA API) 
  const [events, setEvents] = useState([]);

  // 4. DONNÉES DES PARTENAIRES (VIA API)
  const [partenaires, setPartenaires] = useState([]);

  // 4. DONNÉES DES SUBVENTIONS (VIA API)
  // 4. DONNÉES DES SUBVENTIONS (VIA API)
  const [subventions, setSubventions] = useState([]);

  // Stats Admin
  const [nbAdmins, setNbAdmins] = useState(0);

  // NEWSLETTER
  const [newsletters, setNewsletters] = useState([]);

  // 5. GESTION DES UTILISATEURS (ADMIN)
  const [users, setUsers] = useState([]);

  // CHARGEMENT DES DONNÉES DEPUIS L'API
  const fetchData = async () => {
    try {
      const opts = { credentials: 'include' }; // IMPORTANT : Envoi du Cookie Session
      const [resBen, resEvt, resEnt, resSub, resDons, resAdmins, resNews, resUsers] = await Promise.all([
        fetch('http://localhost:8000/api/benevoles.php', opts).then(r => r.json()),
        fetch('http://localhost:8000/api/evenements.php', opts).then(r => r.json()),
        fetch('http://localhost:8000/api/entreprises.php', opts).then(r => r.json()),
        fetch('http://localhost:8000/api/subventions.php', opts).then(r => r.json()),
        fetch('http://localhost:8000/api/historique_dons.php', opts).then(r => r.json()),
        fetch('http://localhost:8000/api/admins.php', opts).then(r => r.json()),
        fetch('http://localhost:8000/api/newsletter.php', opts).then(r => r.json()),
        fetch('http://localhost:8000/api/users.php', opts).then(r => r.json())
      ]);
      setBenevoles((Array.isArray(resBen) ? resBen : []).map(b => ({
        ...b,
        dateNaissance: b.date_naissance,
        dispo: b.disponibilite,
        regime: b.regime_alimentaire,
        sante: b.restrictions_sante,
        infos: b.champs_complementaires
      })));

      setEvents((Array.isArray(resEvt) ? resEvt : []).map(e => ({
        ...e,
        type: e.type_element,
        titre: e.nom_element,
        dateDebut: e.date_debut ? e.date_debut.split(' ')[0] : '',
        dateFin: e.date_fin ? e.date_fin.split(' ')[0] : '',
        materiel: e.logistique_materiel,
        benevolesInscrits: e.benevoles_inscrits,
        documents: e.document_url,
        infos: e.notes
      })));

      setPartenaires((Array.isArray(resEnt) ? resEnt : []).map(p => ({
        ...p,
        nom: p.nom_entreprise,
        contact: p.contact_nom_prenom
      })));

      setSubventions((Array.isArray(resSub) ? resSub : []).map(s => ({
        ...s,
        nom: s.nom_aide
      })));

      setDonateursData((Array.isArray(resDons) ? resDons : []).map((d, index) => ({
        id: d.don_id || index,
        donor_number: d.donor_number || `DON-${d.don_id}`,
        civilite: d.civilite || '',
        prenom: d.prenom,
        nom: d.nom,
        email: d.email,
        telephone: d.telephone,
        adresse: d.adresse,
        code_postal: d.code_postal,
        ville: d.ville,
        pays: d.pays,
        montant: Number(d.montant),
        frequence: d.frequence,
        moyen_paiement: d.moyen_paiement,
        date_don: d.date_don
      })));

      if (resAdmins && resAdmins.nbAdmins) {
        setNbAdmins(resAdmins.nbAdmins);
      }

      // Gestion safe du retour newsletter
      setNewsletters(Array.isArray(resNews) ? resNews : []);

      // Gestion users
      // Correction: resUsers est déjà déstructuré du Promise.all plus haut
      setUsers(Array.isArray(resUsers) ? resUsers : []);


      // FETCH STATS
      const resStats = await fetch('http://localhost:8000/api/stats.php', { credentials: 'include' }).then(r => r.json());
      setStats(resStats);


    } catch (error) {
      console.error("Erreur chargement API:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // État pour le sens du tri (desc = plus gros dons en premier)
  const [sortOrder, setSortOrder] = useState('desc');

  // Fonction pour trier les données
  const sortedDonateurs = [...donateursData].sort((a, b) => {
    return sortOrder === 'desc' ? b.montant - a.montant : a.montant - b.montant;
  });

  // Calcul du total des dons
  const totalDons = donateursData.reduce((acc, curr) => acc + curr.montant, 0);

  const exportToCSV = () => {
    const headers = ["ID_Donateur", "Civilite", "Prenom", "Nom", "Email", "Tel", "Montant", "Frequence", "Date_Don", "Ville"];
    const rows = donateursData.map(d => [
      d.donor_number, d.civilite, d.prenom, d.nom, d.email, d.telephone, d.montant, d.frequence, d.date_don, d.ville
    ]);

    const csvContent = "data:text/csv;charset=utf-8,"
      + headers.join(",") + "\n"
      + rows.map(e => e.join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "historique_donateurs_croix_rouge.csv");
    document.body.appendChild(link);
    link.click();
  };

  // SAUVEGARDE AUTOMATIQUE DANS LE NAVIGATEUR (DÉSACTIVÉ POUR API)
  // useEffect(() => {
  //   localStorage.setItem('benevoles_data', JSON.stringify(benevoles)); 
  //   localStorage.setItem('evenements_data', JSON.stringify(events));
  //   localStorage.setItem('partenaires_data', JSON.stringify(partenaires));
  //   localStorage.setItem('subventions_data', JSON.stringify(subventions));
  // }, [benevoles, events, partenaires, subventions])

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
  // 5. FONCTIONS DE GESTION
  const handleDelete = async (id, type) => {
    if (!window.confirm("Supprimer cet élément ?")) return;

    let url = "";
    if (type === 'benevoles') url = `http://localhost:8000/api/benevoles.php?id=${id}`;
    if (type === 'evenements') url = `http://localhost:8000/api/evenements.php?id=${id}`;
    if (type === 'entreprises') url = `http://localhost:8000/api/entreprises.php?id=${id}`;
    if (type === 'entreprises') url = `http://localhost:8000/api/entreprises.php?id=${id}`;
    if (type === 'subventions') url = `http://localhost:8000/api/subventions.php?id=${id}`;
    if (type === 'subventions') url = `http://localhost:8000/api/subventions.php?id=${id}`;
    if (type === 'newsletter') url = `http://localhost:8000/api/newsletter.php?id=${id}`;
    // Pas de suppression user pour l'instant via dashboard classique

    if (url) {
      await fetch(url, { method: 'DELETE' });
      fetchData(); // Rafraichir
    }
  };

  const openEdit = (item) => {
    setIsEditing(true);
    setCurrentId(item.id);
    if (activeTab === 'benevoles') { setFormBenevole({ ...item }); setShowBenevoleModal(true); }
    if (activeTab === 'evenements') { setFormEvent({ ...item }); setShowEventModal(true); }
    if (activeTab === 'communication-newsletters') {
      setFormNewsletter({
        ...item,
        acceptConditions: item.accepte_conditions == 1,
        offre_entreprise: item.offre_entreprise == 1
      });
      setShowNewsletterModal(true);
    }
  };

  const openViewModal = (item) => {
    setSelectedItem(item);
    setShowViewModal(true);
  };

  const handleBenevoleSubmit = async (e) => {
    e.preventDefault();
    await fetch('http://localhost:8000/api/benevoles.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formBenevole)
    });
    fetchData();
    closeModals();
  };

  // MODIF : Nouvelle fonction pour enregistrer une mission
  const handleEventSubmit = async (e) => {
    e.preventDefault();
    await fetch('http://localhost:8000/api/evenements.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formEvent)
    });
    fetchData();
    closeModals();
  };

  // Gestion des Entreprises - CORRIGÉ
  const handleEntrepriseSubmit = async (e) => {
    e.preventDefault();
    await fetch('http://localhost:8000/api/entreprises.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formEntreprise)
    });
    fetchData(); // Reload API
    setShowEntrepriseModal(false);
    setIsEditing(false);
  };

  // Gestion des Subventions - CORRIGÉ
  const handleSubventionSubmit = async (e) => {
    e.preventDefault();
    await fetch('http://localhost:8000/api/subventions.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formSubvention)
    });
    fetchData();
    setShowSubventionModal(false);
    setIsEditing(false);
  };

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    await fetch('http://localhost:8000/api/newsletter.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...formNewsletter,
        id: isEditing ? currentId : null,
        acceptConditions: formNewsletter.acceptConditions,
        acceptEntreprise: formNewsletter.offre_entreprise // map backend expected
      })
    });
    fetchData();
    setShowNewsletterModal(false);
    setIsEditing(false);
    setIsEditing(false);
  };

  // GESTION RÔLES UTILISATEURS
  const handleRoleUpdate = async (userId, newRoleId) => {
    if (!window.confirm("Voulez-vous modifier les droits de cet utilisateur ?")) return;

    try {
      const res = await fetch('http://localhost:8000/api/users.php', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: userId, role_id: newRoleId }),
        credentials: 'include'
      });
      const data = await res.json();
      if (data.error) {
        alert("Erreur: " + data.error);
      } else {
        alert("Rôle mis à jour !");
        fetchData();
      }
    } catch (e) {
      alert("Erreur serveur");
    }
  };


  // Constante pour l'article
  const applyFormat = (tag) => {
    const textarea = document.getElementById('article-content');
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    const selectedText = text.substring(start, end);

    // Exemple simple : entoure le texte de balises (ex: **gras**)
    const before = text.substring(0, start);
    const after = text.substring(end);

    const newText = `${before}${tag}${selectedText}${tag}${after}`;

    // Mise à jour de l'état (assurez-vous d'avoir un état pour le contenu)
    setFormArticle({ ...formArticle, contenu: newText });
  };

  const toolbarButtonStyle = {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '5px 8px',
    borderRadius: '4px',
    color: '#4A5568',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'background 0.2s'
  };

  const selectStyle = {
    padding: '4px 8px',
    borderRadius: '4px',
    border: '1px solid #E2E8F0',
    fontSize: '12px',
    color: '#4A5568',
    cursor: 'pointer',
    outline: 'none'
  };

  const colorInputStyle = {
    width: '30px',
    height: '30px',
    padding: '0',
    border: 'none',
    background: 'none',
    cursor: 'pointer'
  };

  const separatorStyle = {
    width: '1px',
    height: '24px',
    background: '#E2E8F0',
    margin: '0 5px'
  };

  const moreMenuStyle = {
    position: 'absolute',
    top: '100%',
    right: '0',
    marginTop: '5px',
    background: 'white',
    border: '1px solid #E2E8F0',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    zIndex: 10,
    width: '150px',
    display: 'flex',
    flexDirection: 'column',
    padding: '5px'
  };

  const menuItemStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '10px',
    border: 'none',
    background: 'none',
    width: '100%',
    textAlign: 'left',
    fontSize: '13px',
    cursor: 'pointer',
    color: '#4A5568',
    borderRadius: '4px'
  };

  // Toggle Plein Écran
  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.getElementById('article-content-editor').requestFullscreen();
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  // --- LOGIQUE POUR L'ÉDITEUR RICHE ---
  // Fonction pour exécuter une commande en forçant le focus
  const handleToolbarAction = (command, value = null) => {
    const editor = document.getElementById('article-content-editor');
    if (editor) {
      editor.focus();
      document.execCommand(command, false, value);
    }
  };

  // Sauvegarde de la sélection pour ne pas perdre la position du curseur
  const [savedSelection, setSavedSelection] = useState(null);

  const saveSelection = () => {
    const sel = window.getSelection();
    if (sel.rangeCount > 0) return sel.getRangeAt(0);
    return null;
  };

  const restoreSelection = (range) => {
    if (range) {
      const sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
    }
  };

  const handleOpenModal = (setModal, e) => {
    if (e) e.preventDefault(); // Empêche la perte de focus
    const range = saveSelection();
    setSavedSelection(range);
    setModal(true);
  };

  const handleInsert = (html, setModal) => {
    setModal(false);
    document.getElementById('article-content-editor').focus();
    restoreSelection(savedSelection);
    document.execCommand('insertHTML', false, html);
  };

  // Listes pour les modales
  const specialChars = ['©', '®', '™', '€', '£', '¥', '§', '¶', '†', '‡', '•', '—', '–', '≠', '≤', '≥', '∞', 'µ', 'α', 'β', 'π', 'Ω'];
  const emojis = ['😀', '😂', '😍', '🤔', '😭', '😎', '👍', '👎', '🎉', '🔥', '❤️', '✅', '❌', '⚠️', '⭐', '💡', '📅', '📍', '✉️', '📞'];

  // AUTH CHECK
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      window.location.href = '/';
    } else {
      const user = JSON.parse(storedUser);
      setUserRole(user.role || 'Collaborateur');
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    window.location.href = '/';
  };

  const closeModals = () => {
    setShowBenevoleModal(false); setShowEventModal(false); setShowViewModal(false); setIsEditing(false); setShowNewsletterModal(false);
    setFormBenevole({ nom: '', prenom: '', email: '', telephone: '', ville: '', dateNaissance: '', profession: '', regime: '', sante: '', infos: '', dispo: 'Semaine', cotisation: 'À jour' });
    setFormEvent({ titre: '', date: '', lieu: '', budget: '', materiel: '', benevolesInscrits: '', documents: '' });
    setFormNewsletter({ email: '', acceptConditions: true, offre_entreprise: false });
  };

  const allMenuItems = [
    { id: 'tableau-de-bord', label: 'Tableau de bord', icon: <LayoutDashboard size={20} />, roles: ['Admin', 'Collaborateur'] },
    { id: 'benevoles', label: 'Bénévoles', icon: <Users size={20} />, roles: ['Admin'] },
    { id: 'partenaires', label: 'Partenaires & Donateurs', icon: <Handshake size={20} />, roles: ['Admin'] },
    { id: 'evenements', label: 'Événements & Missions', icon: <Calendar size={20} />, roles: ['Admin', 'Collaborateur'] },
    { id: 'communication', label: 'Communication & Contenus', icon: <Package size={20} />, roles: ['Admin'] },
    { id: 'analyse', label: 'Analyse & Stats', icon: <BarChart3 size={20} />, roles: ['Admin'] },
    { id: 'users', label: 'Utilisateurs & Droits', icon: <ShieldCheck size={20} />, roles: ['Admin'] },
  ];

  const menuItems = allMenuItems.filter(item => userRole === 'Admin' || (item.roles && item.roles.includes(userRole)));

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

        /* Calendar Styles */
        .calendar-grid {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          background-color: #E2E8F0;
          gap: 1px;
          border: 1px solid #E2E8F0;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }
        .calendar-header-cell {
          background: #F8FAFC;
          padding: 12px 10px;
          text-align: center;
          font-size: 12px;
          font-weight: 700;
          color: #64748B;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .calendar-day-cell {
          min-height: 110px;
          background: white;
          padding: 8px;
          position: relative;
          transition: background-color 0.2s;
        }
        .calendar-day-cell:hover {
          background: #FAFAFA;
        }
        .calendar-day-today {
          background: #FFFBEB !important;
        }
        .calendar-day-number {
          font-size: 13px;
          font-weight: 600;
          color: #4A5568;
          margin-bottom: 6px;
          display: block;
        }
        .calendar-day-other-month {
            background-color: #F8FAFC !important;
        }
        .calendar-event-chip {
          font-size: 10px;
          padding: 4px 8px;
          color: white;
          font-weight: 600;
          cursor: pointer;
          border-radius: 4px;
          margin-bottom: 3px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          display: block;
          box-shadow: 0 1px 2px rgba(0,0,0,0.1);
          transition: transform 0.1s;
        }
        .calendar-event-chip:hover {
          transform: translateY(-1px);
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
        
        .clickable-name { color: #2563EB; font-weight: bold; cursor: pointer; text-decoration: underline; }
        .clickable-name:hover { color: #1D4ED8; }

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
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
              <h2 style={{ fontSize: 24, fontWeight: 700, margin: 0 }}>{isEditing ? "Modifier le membre" : "Ajouter un Bénévole"}</h2>
              <X onClick={closeModals} style={{ cursor: 'pointer', color: '#6B7280' }} />
            </div>

            <form onSubmit={handleBenevoleSubmit}>
              <div className="form-row">
                <div className="form-group"><label>Nom <span>*</span></label><input type="text" required value={formBenevole.nom} onChange={e => setFormBenevole({ ...formBenevole, nom: e.target.value })} placeholder="Nom" /></div>
                <div className="form-group"><label>Prénom <span>*</span></label><input type="text" required value={formBenevole.prenom} onChange={e => setFormBenevole({ ...formBenevole, prenom: e.target.value })} placeholder="Prénom" /></div>
              </div>

              <div className="form-row">
                <div className="form-group"><label>Email <span>*</span></label><input type="email" required value={formBenevole.email} onChange={e => setFormBenevole({ ...formBenevole, email: e.target.value })} placeholder="exemple@mail.com" /></div>
                <div className="form-group"><label>Téléphone <span>*</span></label><input type="text" value={formBenevole.telephone} onChange={e => setFormBenevole({ ...formBenevole, telephone: e.target.value })} /></div>
              </div>

              <div className="form-row">
                <div className="form-group"><label>Ville <span>*</span></label><input type="text" value={formBenevole.ville} onChange={e => setFormBenevole({ ...formBenevole, ville: e.target.value })} /></div>
                <div className="form-group"><label>Date de naissance <span>*</span></label><input type="date" value={formBenevole.dateNaissance} onChange={e => setFormBenevole({ ...formBenevole, dateNaissance: e.target.value })} /></div>
              </div>

              <div className="form-row">
                <div className="form-group"><label>Profession <span>*</span></label><input type="text" value={formBenevole.profession} onChange={e => setFormBenevole({ ...formBenevole, profession: e.target.value })} /></div>
              </div>

              <div className="form-row">
                <div className="form-group"><label>Régime Alimentaire</label><input type="text" value={formBenevole.regime} onChange={e => setFormBenevole({ ...formBenevole, regime: e.target.value })} placeholder="Ex: Végétarien" /></div>
                <div className="form-group"><label>Restrictions Santé</label><input type="text" value={formBenevole.sante} onChange={e => setFormBenevole({ ...formBenevole, sante: e.target.value })} placeholder="Ex: Mal de dos" /></div>
              </div>

              <div className="form-row">
                <div className="form-group"><label>Champs Complémentaires</label><textarea value={formBenevole.infos} onChange={e => setFormBenevole({ ...formBenevole, infos: e.target.value })} placeholder="Saisissez ici des informations supplémentaires"></textarea></div>
              </div>

              <div className="form-row">
                <div className="form-group"><label>Cotisation <span>*</span></label><select value={formBenevole.cotisation} onChange={e => setFormBenevole({ ...formBenevole, cotisation: e.target.value })}><option>À jour</option><option>Échue</option></select></div>
                <div className="form-group"><label>Disponibilité <span>*</span></label><select value={formBenevole.dispo} onChange={e => setFormBenevole({ ...formBenevole, dispo: e.target.value })}><option>Semaine</option><option>Weekend</option><option>Libre</option></select></div>
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
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #EEE', paddingBottom: 15, marginBottom: 10 }}>
              <h2 style={{ fontSize: 22, fontWeight: 800, color: '#1A1C23' }}>Fiche de membre : {selectedItem.prenom} {selectedItem.nom}</h2>
              <X onClick={closeModals} style={{ cursor: 'pointer', color: '#6B7280' }} />
            </div>
            <div className="info-grid">
              <div className="info-item"><div className="info-label">Email</div><div className="info-value">{selectedItem.email}</div></div>
              <div className="info-item"><div className="info-label">Téléphone</div><div className="info-value">{selectedItem.telephone || "N/A"}</div></div>
              <div className="info-item"><div className="info-label">Ville</div><div className="info-value">{selectedItem.ville}</div></div>
              <div className="info-item"><div className="info-label">Date de Naissance</div><div className="info-value">{selectedItem.dateNaissance || "N/A"}</div></div>
              <div className="info-item"><div className="info-label">Profession</div><div className="info-value">{selectedItem.profession || "N/A"}</div></div>

              <div className="info-item"><div className="info-label">Disponibilité</div><div className="info-value">{selectedItem.dispo}</div></div>
              <div className="info-item"><div className="info-label">Statut Cotisation</div><div className={`status-badge status-${selectedItem.status}`} style={{ display: 'inline-block', marginTop: '5px' }}>{selectedItem.cotisation}</div></div>

              <div className="info-item"><div className="info-label">Régime Alimentaire</div><div className="info-value">{selectedItem.regime || "Aucun"}</div></div>
              <div className="info-item"><div className="info-label">Santé</div><div className="info-value">{selectedItem.sante || "RAS"}</div></div>
              <div className="info-item full-width"><div className="info-label">Notes / Infos Complémentaires</div><div className="info-value" style={{ fontWeight: 400 }}>{selectedItem.infos || "Aucune note particulière."}</div></div>
            </div>
            <div style={{ marginTop: 30, paddingTop: 20, borderTop: '1px solid #E2E8F0', display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
              {/* BOUTON MODIFIER ADAPTÉ AUX BÉNÉVOLES */}
              <button className="btn-secondary" onClick={() => {
                setShowViewModal(false); // On ferme la vue lecture
                setFormBenevole(selectedItem); // On pré-remplit le formulaire avec les infos de la fiche
                setIsEditing(true); // On passe en mode édition
                setCurrentId(selectedItem.id); // On garde l'ID pour la mise à jour
                setShowBenevoleModal(true); // On ouvre le formulaire de saisie des bénévoles
              }}>
                <Edit size={14} style={{ marginRight: 8 }} /> MODIFIER LA FICHE
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODALE : FORMULAIRE DYNAMIQUE POUR LES ÉVÈNEMENTS */}
      {showEventModal && (
        <div className="modal-overlay">
          <div className="modal-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
              <h2 style={{ fontSize: 24, fontWeight: 700, margin: 0 }}>
                {isEditing ? "Modifier" : "Créer un nouvel élément"}
              </h2>
              <X onClick={closeModals} style={{ cursor: 'pointer', color: '#6B7280' }} />
            </div>

            <form onSubmit={handleEventSubmit}>
              {/* MODIF : Choix entre Mission et Événement */}
              <div className="form-group" style={{ marginBottom: 15 }}>
                <label>Type d'élément <span>*</span></label>
                <select
                  value={formEvent.type || "Événement"}
                  onChange={e => setFormEvent({ ...formEvent, type: e.target.value })}
                  style={{ padding: '10px', borderRadius: '6px', border: '1px solid #D1D5DB' }}
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
                  onChange={e => setFormEvent({ ...formEvent, titre: e.target.value })}
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
                    onChange={e => setFormEvent({ ...formEvent, dateDebut: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Date de fin <span>*</span></label>
                  <input
                    type="date"
                    required
                    value={formEvent.dateFin}
                    onChange={e => setFormEvent({ ...formEvent, dateFin: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group"><label>Lieu <span>*</span></label><input type="text" required value={formEvent.lieu} onChange={e => setFormEvent({ ...formEvent, lieu: e.target.value })} placeholder="Ex: Super U Centre" /></div>
                <div className="form-group"><label>Budget Prévisionnel (€) <span>*</span></label><input type="number" value={formEvent.budget} onChange={e => setFormEvent({ ...formEvent, budget: e.target.value })} placeholder="0" /></div>
              </div>

              <div className="form-row">
                <div className="form-group"><label>Logistique & Matériel <span>*</span></label><textarea value={formEvent.materiel} onChange={e => setFormEvent({ ...formEvent, materiel: e.target.value })} placeholder="Ex: Barnum, 2 tables, sonos..."></textarea></div>
              </div>

              <div className="form-row">
                <div className="form-group"><label>Bénévoles Inscrits <span>*</span></label><input type="text" value={formEvent.benevolesInscrits} onChange={e => setFormEvent({ ...formEvent, benevolesInscrits: e.target.value })} placeholder="Ex: Nadia, Thomas, Julie..." /></div>
                <div className="form-group">
                  <label>Documents (Affiches, CR) <span>*PDF uniquement</span></label>
                  <input
                    type="file"
                    accept=".pdf"
                    style={{ padding: '8px', fontSize: '12px' }}
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        setFormEvent({ ...formEvent, documents: file.name }); // On stocke le nom du fichier
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
                <div className="form-group"><label>Notes / Informations supplémentaires</label><textarea value={formEvent.infos} onChange={e => setFormEvent({ ...formEvent, infos: e.target.value })} placeholder="Précisions sur la mission..."></textarea></div>
              </div>

              <div className="btn-container">
                <button type="submit" className="btn-save">Enregistrer la mission</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODALE : FICHE DÉTAILLÉE POUR LES ÉVÈNEMENTS */}
      {showViewModal && selectedItem && activeTab === 'evenements' && (
        <div className="modal-overlay">
          <div className="modal-card">
            {/* HEADER DE LA MODALE */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              borderBottom: `4px solid ${selectedItem.type === 'Mission' ? '#2B6CB0' : '#D97706'}`,
              paddingBottom: 15,
              marginBottom: 10
            }}>
              <h2 style={{ fontSize: 22, fontWeight: 800, color: '#1A1C23' }}>
                [{selectedItem.type === 'Mission' ? 'MISSION' : 'ÉVÉNEMENT'}] {selectedItem.titre}
              </h2>
              <X onClick={closeModals} style={{ cursor: 'pointer', color: '#6B7280' }} />
            </div>

            {/* CONTENU DES INFOS */}
            <div className="info-grid">
              <div className="info-item"><div className="info-label">Période</div><div className="info-value">Du {selectedItem.dateDebut ? new Date(selectedItem.dateDebut).toLocaleDateString('fr-FR') : 'N/A'} au {selectedItem.dateFin ? new Date(selectedItem.dateFin).toLocaleDateString('fr-FR') : 'N/A'}</div></div>
              <div className="info-item"><div className="info-label">Lieu</div><div className="info-value">{selectedItem.lieu}</div></div>
              <div className="info-item"><div className="info-label">Budget</div><div className="info-value">{selectedItem.budget ? `${selectedItem.budget} €` : "Non défini"}</div></div>

              <div className="info-item full-width">
                <div className="info-label">Documents joints</div>
                <div className="info-value" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <FileText size={18} color="#2563EB" />
                  <span style={{ color: selectedItem.documents ? '#2563EB' : '#718096', fontWeight: 'bold' }}>
                    {selectedItem.documents || "Aucun document PDF associé."}
                  </span>
                </div>
              </div>

              <div className="info-item full-width"><div className="info-label">Logistique & Matériel</div><div className="info-value">{selectedItem.materiel || "Rien à prévoir."}</div></div>
              <div className="info-item full-width"><div className="info-label">Bénévoles Mobilisés</div><div className="info-value">{selectedItem.benevolesInscrits || "Aucun bénévole inscrit."}</div></div>
              <div className="info-item full-width"><div className="info-label">Notes de mission</div><div className="info-value">{selectedItem.infos || "Aucune note particulière."}</div></div>
            </div>

            {/* FOOTER : BOUTON MODIFIER */}
            <div style={{ marginTop: 30, paddingTop: 20, borderTop: '1px solid #E2E8F0', display: 'flex', justifyContent: 'flex-end' }}>
              <button className="btn-secondary" onClick={() => {
                setShowViewModal(false);
                setFormEvent(selectedItem);
                setIsEditing(true);
                setCurrentId(selectedItem.id);
                setShowEventModal(true);
              }}>
                <Edit size={14} style={{ marginRight: 8 }} /> MODIFIER LA FICHE
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODALE : FICHE DÉTAILLÉE POUR NEWSLETTER */}
      {showViewModal && selectedItem && activeTab === 'communication-newsletters' && (
        <div className="modal-overlay">
          <div className="modal-card" style={{ maxWidth: '500px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #EEE', paddingBottom: 15, marginBottom: 10 }}>
              <h2 style={{ fontSize: 22, fontWeight: 800 }}>Détails Abonné</h2>
              <X onClick={closeModals} style={{ cursor: 'pointer', color: '#6B7280' }} />
            </div>
            <div className="info-grid" style={{ gridTemplateColumns: '1fr' }}>
              <div className="info-item"><div className="info-label">Email</div><div className="info-value">{selectedItem.email}</div></div>
              <div className="info-item"><div className="info-label">Date Inscription</div><div className="info-value">{new Date(selectedItem.date_inscription).toLocaleDateString()}</div></div>
              <div className="info-item"><div className="info-label">Conditions Générales</div><div className="info-value">{selectedItem.accepte_conditions == 1 ? "Acceptées ✅" : "Refusées ❌"}</div></div>
              <div className="info-item"><div className="info-label">Offres Entreprises</div><div className="info-value">{selectedItem.offre_entreprise == 1 ? "Oui ✅" : "Non ❌"}</div></div>
            </div>
            <div style={{ marginTop: 30, display: 'flex', justifyContent: 'flex-end' }}>
              <button className="btn-secondary" onClick={() => {
                setShowViewModal(false);
                setFormNewsletter({
                  ...selectedItem,
                  acceptConditions: selectedItem.accepte_conditions == 1,
                  offre_entreprise: selectedItem.offre_entreprise == 1
                });
                setIsEditing(true);
                setCurrentId(selectedItem.id);
                setShowNewsletterModal(true);
              }}>
                <Edit size={14} style={{ marginRight: 8 }} /> MODIFIER
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODALE : ÉDITION NEWSLETTER */}
      {showNewsletterModal && (
        <div className="modal-overlay">
          <div className="modal-card" style={{ maxWidth: '600px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
              <h2 style={{ fontSize: 24, fontWeight: 700 }}>{isEditing ? "Modifier l'abonné" : "Nouvel abonné"}</h2>
              <X onClick={closeModals} style={{ cursor: 'pointer', color: '#6B7280' }} />
            </div>
            <form onSubmit={handleNewsletterSubmit}>
              <div className="form-group"><label>Email <span>*</span></label><input type="email" required value={formNewsletter.email} onChange={e => setFormNewsletter({ ...formNewsletter, email: e.target.value })} /></div>
              <div className="form-row" style={{ marginTop: 20 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <input type="checkbox" checked={formNewsletter.acceptConditions} onChange={e => setFormNewsletter({ ...formNewsletter, acceptConditions: e.target.checked })} />
                  <label>Accepte les conditions</label>
                </div>
              </div>
              <div className="form-row">
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <input type="checkbox" checked={formNewsletter.offre_entreprise} onChange={e => setFormNewsletter({ ...formNewsletter, offre_entreprise: e.target.checked })} />
                  <label>Souhaite offres entreprises</label>
                </div>
              </div>
              <div className="btn-container">
                <button type="submit" className="btn-save">Enregistrer</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* SIDEBAR */}
      <aside className="sidebar">
        <div className="logo-section">
          <span className="logo-red">LA CROIX ROUGE</span><br />
          <span style={{ fontSize: '14px', opacity: 0.7 }}>ADMINISTRATION</span>
        </div>
        <nav className="nav-menu">
          {menuItems.map((item) => (
            <div key={item.id}>
              <button
                className={`nav-item ${(activeTab === item.id || (item.id === 'evenements' && activeTab === 'calendrier') || (item.id === 'communication' && activeTab.startsWith('communication-'))) ? 'active' : ''}`}
                onClick={() => {
                  setActiveTab(item.id);
                  setSearchQuery("");
                }}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>

              {/* SOUS-MENU COMMUNICATION */}
              {item.id === 'communication' && (activeTab === 'communication' || activeTab.startsWith('communication-')) && (
                <div style={{
                  paddingLeft: '54px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px',
                  marginTop: '4px',
                  marginBottom: '10px'
                }}>
                  <button
                    onClick={() => setActiveTab('communication-articles')}
                    style={{
                      background: 'none', border: 'none',
                      color: activeTab === 'communication-articles' ? 'white' : '#A0AEC0',
                      fontSize: '13px', cursor: 'pointer', textAlign: 'left', padding: '6px 0',
                      fontWeight: activeTab === 'communication-articles' ? '700' : '500',
                      display: 'flex', alignItems: 'center', gap: '8px', transition: '0.2s'
                    }}
                  >
                    <span style={{ color: activeTab === 'communication-articles' ? '#ED1B24' : 'transparent', fontSize: '18px' }}>•</span>
                    Articles
                  </button>
                  <button
                    onClick={() => setActiveTab('communication-newsletters')}
                    style={{
                      background: 'none', border: 'none',
                      color: activeTab === 'communication-newsletters' ? 'white' : '#A0AEC0',
                      fontSize: '13px', cursor: 'pointer', textAlign: 'left', padding: '6px 0',
                      fontWeight: activeTab === 'communication-newsletters' ? '700' : '500',
                      display: 'flex', alignItems: 'center', gap: '8px', transition: '0.2s'
                    }}
                  >
                    <span style={{ color: activeTab === 'communication-newsletters' ? '#ED1B24' : 'transparent', fontSize: '18px' }}>•</span>
                    Newsletters
                  </button>
                </div>
              )}

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
              <p style={{ margin: 0, fontSize: '13px', fontWeight: 'bold' }}>Admin Bureau</p>
              <p style={{ margin: 0, fontSize: '10px', color: '#718096' }}>Accès Protégé</p>
            </div>
          </div>
          <button className="logout-btn" onClick={handleLogout}><LogOut size={14} style={{ marginRight: 8 }} /> DÉCONNEXION</button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="main-content">
        <header className="header">
          <div className="title-section">
            <h2 style={{ margin: 0, fontSize: '28px', fontWeight: '800', fontFamily: 'Outfit, sans-serif', textTransform: 'uppercase', letterSpacing: '1px' }}>
              {activeTab === 'calendrier'
                ? 'Planning'
                : activeTab === 'evenements'
                  ? 'Gestion des évènements & missions'
                  : activeTab === 'partenaires'
                    ? 'Partenaires & Donateurs'
                    : activeTab.replace('-', ' ')
              }
            </h2>
            <p className="subtitle">
              {
                {
                  'benevoles': 'Gestion des membres et des effectifs',
                  'evenements': 'Planification des missions et activités',
                  'calendrier': 'Vue d\'ensemble du planning',
                  'partenaires': 'Suivi des relations et dons',
                  'subventions': 'Suivi des subventions et aides',
                  'communication': 'Outils de communication',
                  'communication-articles': 'Rédaction de contenu',
                  'communication-newsletters': 'Gestion des abonnés',
                  'analyse': 'Statistiques et rapports',
                  'users': 'Administration des accès',
                  'tableau-de-bord': 'Votre espace personnel'
                }[activeTab] || 'Gestion interne de l\'association'
              }
            </p>
          </div>

          {/* On cache les actions si Analyse OU Calendrier */}
          {activeTab !== 'analyse' && activeTab !== 'calendrier' && activeTab !== 'partenaires' && (
            <div className="header-actions">
              <div className="search-box">
                <Search style={{ position: 'absolute', left: 12, top: 13, color: '#A0AEC0' }} size={18} />
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
                if (activeTab === 'benevoles') setShowBenevoleModal(true);
                if (activeTab === 'evenements') setShowEventModal(true);
              }}>
                <Plus size={18} /> NOUVEAU
              </button>
            </div>
          )}
        </header>

        {(activeTab === 'analyse' || activeTab === 'calendrier') ? (
          <div className="content-body">
            {/* On n'affiche les stats que sur l'onglet Analyse */}
            {activeTab === 'analyse' && (
              <div className="stats-grid">
                <StatCard label="Bénévoles Actifs" value={benevoles.length} icon={UserCheck} />
                <StatCard label="Événements" value={events.length} icon={Calendar} />
                <StatCard label="Total des Dons" value={`${totalDons.toLocaleString()} €`} icon={Wallet} />
                <StatCard label="Admin Bureau" value={nbAdmins} icon={ShieldCheck} />
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
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
                    <h3 style={{ margin: 0, fontWeight: 900, display: 'flex', alignItems: 'center' }}>
                      <TrendingUp size={20} color="#ED1B24" style={{ marginRight: 10 }} />
                      Analyse des Flux & Graphs
                    </h3>
                    <button style={{ border: 'none', background: '#F4F7F9', padding: '5px 15px', borderRadius: 20, fontSize: 10, fontWeight: 'bold', cursor: 'pointer' }}>
                      <FileText size={12} style={{ marginRight: 5 }} /> EXPORT PDF
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
                    <div className="calendar-grid">
                      {['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'].map(d => (
                        <div key={d} className="calendar-header-cell">{d}</div>
                      ))}

                      {(() => {
                        const year = currentDate.getFullYear();
                        const month = currentDate.getMonth();
                        const firstDay = new Date(year, month, 1).getDay();
                        const offset = firstDay === 0 ? 6 : firstDay - 1;
                        const today = new Date();
                        const days = [];

                        for (let i = 0; i < 42; i++) {
                          const d = new Date(year, month, i - offset + 1);
                          const dStr = d.toISOString().split('T')[0];
                          const isCurMonth = d.getMonth() === month;
                          const isToday = d.getDate() === today.getDate() && d.getMonth() === today.getMonth() && d.getFullYear() === today.getFullYear();

                          days.push(
                            <div key={i} className={`calendar-day-cell ${isToday ? 'calendar-day-today' : ''} ${!isCurMonth ? 'calendar-day-other-month' : ''}`}>
                              <span className="calendar-day-number">{d.getDate()}</span>
                              <div style={{ display: 'flex', flexDirection: 'column' }}>
                                {events.filter(ev => dStr >= ev.dateDebut && dStr <= ev.dateFin).map(ev => {
                                  const isStart = dStr === ev.dateDebut;
                                  const isEnd = dStr === ev.dateFin;
                                  const tooltipText = `📌 ${(ev.type || 'Elément').toUpperCase()}\n🏷️ ${ev.titre}\n📍 ${ev.lieu || 'N/A'}\n📅 Du ${ev.dateDebut} au ${ev.dateFin}`;
                                  const color = ev.type === 'Mission' ? '#2B6CB0' : '#D97706';

                                  return (
                                    <div
                                      key={ev.id}
                                      onClick={() => openViewModal(ev)}
                                      title={tooltipText}
                                      className="calendar-event-chip"
                                      style={{
                                        background: color,
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

                  <div style={{ display: 'grid', gap: '20px' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
                      <div className="card">
                        <h4 style={{ margin: '0 0 10px 0', color: '#718096' }}>Donateurs vs Users</h4>
                        <div style={{ display: 'flex', alignItems: 'flex-end', gap: '10px', height: '100px' }}>
                          <div style={{
                            flex: 1,
                            background: '#ED1B24',
                            height: `${(stats?.donateurs_count / (Math.max(stats?.donateurs_count, stats?.users_count) || 1)) * 100}%`,
                            borderRadius: '4px 4px 0 0',
                            display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold'
                          }}>{stats?.donateurs_count}</div>
                          <div style={{
                            flex: 1,
                            background: '#2D3748',
                            height: `${(stats?.users_count / (Math.max(stats?.donateurs_count, stats?.users_count) || 1)) * 100}%`,
                            borderRadius: '4px 4px 0 0',
                            display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold'
                          }}>{stats?.users_count}</div>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', marginTop: '5px', fontWeight: 'bold' }}>
                          <span style={{ color: '#ED1B24' }}>Donateurs</span>
                          <span style={{ color: '#2D3748' }}>Utilisateurs</span>
                        </div>
                      </div>

                      <div className="card">
                        <h4 style={{ margin: '0 0 10px 0', color: '#718096' }}>Missions & Événements</h4>
                        <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', height: '100%' }}>
                          <div style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: '24px', fontWeight: '900', color: '#38A169' }}>{stats?.events_stats?.passed_events || 0}</div>
                            <div style={{ fontSize: '11px', color: '#718096' }}>Terminés</div>
                          </div>
                          <div style={{ width: '1px', height: '40px', background: '#E2E8F0' }}></div>
                          <div style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: '24px', fontWeight: '900', color: '#D69E2E' }}>{stats?.events_stats?.future_events || 0}</div>
                            <div style={{ fontSize: '11px', color: '#718096' }}>À venir</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* 2. DONS HEBDOMADAIRES */}
                    <div className="card">
                      <h4 style={{ margin: '0 0 20px 0', color: '#718096' }}>Dons Hebdomadaires (Dernières 12 semaines)</h4>
                      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', height: '150px' }}>
                        {stats?.weekly_donations?.map((w, i) => (
                          <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
                            <div
                              style={{
                                height: `${Math.min((w.total / 2000) * 100, 100)}%`,
                                width: '12px',
                                backgroundColor: '#3182CE',
                                borderRadius: '4px 4px 0 0',
                                marginBottom: '5px'
                              }}
                              title={`${w.total} €`}
                            ></div>
                            <span style={{ fontSize: '9px', color: '#A0AEC0' }}>{w.semaine.split('-')[1]}</span>
                          </div>
                        ))}
                        {(!stats?.weekly_donations || stats.weekly_donations.length === 0) && <p style={{ width: '100%', textAlign: 'center', color: '#A0AEC0', fontStyle: 'italic' }}>Pas de données récentes</p>}
                      </div>
                    </div>

                    {/* 3. DONS MENSUELS (EXISTANT) */}
                    <div className="card">
                      <h4 style={{ margin: '0 0 0 0', color: '#718096' }}>Dons Mensuels (Année en cours)</h4>
                      <div className="chart-container" style={{ height: '200px', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', paddingTop: '20px' }}>
                        {/* Calcul des données par mois */}
                        {(() => {
                          const months = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sep', 'Oct', 'Nov', 'Déc'];
                          const currentYear = new Date().getFullYear();

                          // Initialiser les totaux par mois
                          const monthlyTotals = new Array(12).fill(0);

                          donateursData.forEach(d => {
                            const date = new Date(d.date_don);
                            if (!isNaN(date.getMonth())) {
                              monthlyTotals[date.getMonth()] += d.montant;
                            }
                          });

                          const maxVal = Math.max(...monthlyTotals, 1); // Eviter division par 0

                          return monthlyTotals.map((total, index) => (
                            <div key={index} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
                              <div
                                className="bar"
                                style={{
                                  height: `${(total / maxVal) * 150}px`,
                                  width: '12px',
                                  backgroundColor: total > 0 ? '#ED1B24' : '#E2E8F0',
                                  borderRadius: '4px 4px 0 0',
                                  transition: 'height 0.5s ease'
                                }}
                                title={`${total} €`}
                              ></div>
                              <span style={{ fontSize: '10px', color: '#718096', marginTop: '10px' }}>{months[index]}</span>
                            </div>
                          ));
                        })()}
                      </div>
                    </div>
                  </div>


                ) : null}
              </div>
              {activeTab === 'analyse' && (
                <div className="card">
                  <h3 style={{ margin: '0 0 20px 0', fontSize: '24px', fontWeight: 800, fontFamily: 'Outfit, sans-serif' }}>Derniers Donateurs</h3>
                  {[...donateursData].sort((a, b) => new Date(b.date_don) - new Date(a.date_don)).slice(0, 4).map(d => (
                    <div key={d.id} className="activity-item">
                      <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                        <div className="avatar" style={{ background: '#ED1B24' }}>{d.prenom.charAt(0)}{d.nom.charAt(0)}</div>
                        <span style={{ fontSize: 13, fontWeight: 'bold' }}>{d.prenom} {d.nom}</span>
                      </div>
                      <span style={{ fontSize: 12, fontWeight: 'bold', color: '#48BB78' }}>+{d.montant}€</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div >
        ) : activeTab === 'communication-newsletters' ? (
          <div className="card">
            <h3 style={{ margin: '0 0 20px 0', fontSize: '24px', fontWeight: 900, fontFamily: 'Outfit, sans-serif' }}>Abonnés Newsletter ({newsletters.length})</h3>
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Email</th>
                    <th>Date Inscription</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {newsletters.map((n, i) => (
                    <tr key={i}>
                      <td className="clickable-name" onClick={() => openViewModal(n)}>{n.email}</td>
                      <td>{new Date(n.date_inscription).toLocaleDateString()}</td>
                      <td>
                        <div style={{ display: 'flex', gap: '8px' }}>
                          <button className="btn-icon" onClick={() => openEdit(n)}><Edit size={16} /></button>
                          <button className="btn-icon delete" onClick={() => handleDelete(n.id, 'newsletter')}><Trash2 size={16} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
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
                        <div style={{ fontSize: 13 }}>{b.email}</div>
                        <div style={{ fontSize: 11, color: '#A0AEC0' }}>{b.telephone}</div>
                      </td>
                      <td>{b.ville}</td>
                      <td><span className={`status-badge status-${b.status}`}>{b.cotisation}</span></td>
                      <td>
                        <div style={{ display: 'flex', gap: 10 }}>
                          <Edit size={16} onClick={() => openEdit(b)} style={{ cursor: 'pointer', color: '#A0AEC0' }} />
                          <Trash2 size={16} onClick={() => handleDelete(b.id, 'benevoles')} style={{ cursor: 'pointer', color: '#A0AEC0' }} />
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
                    <td style={{ minWidth: '205px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', width: '100%' }}></div>
                      <span
                        className="clickable-name" onClick={() => openViewModal(ev)} style={{ fontWeight: '600', fontSize: '14px', color: '#1A1C23', cursor: 'pointer', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', flexGrow: 1, marginLeft: '10px' }}
                      >{ev.titre || "Sans titre"}
                      </span>
                    </td>
                    <td>{ev.dateDebut ? new Date(ev.dateDebut).toLocaleDateString('fr-FR') : '-'}</td>
                    <td>{ev.lieu}</td>
                    <td>{ev.budget} €</td>
                    <td>
                      <div style={{ display: 'flex', gap: 10 }}>
                        <Edit size={16} onClick={() => openEdit(ev)} style={{ cursor: 'pointer', color: '#A0AEC0' }} />
                        <Trash2 size={16} onClick={() => handleDelete(ev.id, 'evenements')} style={{ cursor: 'pointer', color: '#A0AEC0' }} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
          : activeTab === 'tableau-de-bord' ? (
            <div style={{ display: 'grid', gap: '30px' }}>
              <div className="card">
                <h3 style={{ fontWeight: 800, color: '#2D3748', marginBottom: '10px', fontSize: '24px', fontFamily: 'Outfit, sans-serif' }}>Bienvenue sur votre Espace Donateur</h3>
                <p style={{ color: '#718096' }}>Retrouvez ici l'historique de vos dons et téléchargez vos reçus fiscaux.</p>
              </div>

              <div className="card">
                <h3 style={{ marginBottom: '20px', fontWeight: 900, fontSize: '24px', fontFamily: 'Outfit, sans-serif' }}>Historique de vos dons</h3>
                <div className="table-container">
                  <table>
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Montant</th>
                        <th>Moyen de Paiement</th>
                        <th>Reçu Fiscal</th>
                      </tr>
                    </thead>
                    <tbody>
                      {donateursData.length > 0 ? donateursData.map(d => (
                        <tr key={d.id}>
                          <td>{new Date(d.date_don).toLocaleDateString()}</td>
                          <td style={{ fontWeight: 'bold', color: '#38A169' }}>{d.montant} €</td>
                          <td>{d.moyen_paiement}</td>
                          <td>
                            <button
                              onClick={() => window.open(`http://localhost:8000/api/receipt.php?id=${d.id}`, '_blank')}
                              style={{
                                background: '#ED1B24', color: 'white', border: 'none', padding: '8px 15px',
                                borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', fontSize: '12px',
                                display: 'flex', alignItems: 'center', gap: '5px'
                              }}
                            >
                              <Printer size={14} /> Télécharger Reçu
                            </button>
                          </td>
                        </tr>
                      )) : (
                        <tr><td colSpan="4" style={{ textAlign: 'center', padding: '20px' }}>Aucun don enregistré pour le moment.</td></tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )
            : activeTab !== 'analyse' && activeTab !== 'calendrier' && activeTab !== 'benevoles' && activeTab !== 'evenements' && activeTab !== 'partenaires' && activeTab !== 'communication' && activeTab !== 'communication-articles' && activeTab !== 'communication-newsletters' && activeTab !== 'users' && (
              <div className="placeholder-chart" style={{ height: 500 }}>
                <p>Interface de gestion pour le module {activeTab}<br />Utilisez la recherche pour filtrer les résultats.</p>
              </div>
            )
        }

        {
          activeTab === 'partenaires' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>

              {/* BLOC 1 : PARTENAIRES (ENTREPRISES) */}
              <div className="card">
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                  <h3 style={{ margin: 0, fontSize: '24px', fontWeight: 800, fontFamily: 'Outfit, sans-serif', display: 'flex', alignItems: 'center' }}>
                    <Handshake size={28} color="#ED1B24" style={{ marginRight: 10 }} /> Partenaires Entreprises
                  </h3>
                  <div style={{ display: 'flex', gap: '15px' }}>
                    {/* Barre de recherche locale pour les entreprises */}
                    <div className="search-box">
                      <Search style={{ position: 'absolute', left: 12, top: 10, color: '#A0AEC0' }} size={16} />
                      <input
                        type="text"
                        className="search-input"
                        style={{ width: '200px', padding: '8px 12px 8px 35px' }}
                        placeholder="Rechercher entreprise..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                    <button className="btn-add" onClick={() => {
                      setFormEntreprise({ nom: '', contact: '', email: '', telephone: '' });
                      setIsEditing(false); setShowEntrepriseModal(true);
                    }}>
                      <Plus size={16} /> NOUVELLE ENTREPRISE
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
                          <td className="clickable-name" onClick={() => openViewModal({ ...p, viewType: 'entreprise' })}>{p.nom}</td>
                          <td>{p.contact}</td>
                          <td><div style={{ fontSize: '12px' }}>{p.email}</div><div style={{ fontSize: '10px', color: '#718096' }}>{p.telephone}</div></td>
                          <td>
                            <div style={{ display: 'flex', gap: 10 }}>
                              <Edit size={16} onClick={() => { setFormEntreprise(p); setIsEditing(true); setCurrentId(p.id); setShowEntrepriseModal(true); }} style={{ cursor: 'pointer', color: '#A0AEC0' }} />
                              <Trash2 size={16} onClick={() => handleDelete(p.id, 'entreprises')} style={{ cursor: 'pointer', color: '#A0AEC0' }} />
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
                  <h3 style={{ margin: 0, fontSize: '24px', fontWeight: 800, fontFamily: 'Outfit, sans-serif', display: 'flex', alignItems: 'center' }}>
                    <FileText size={28} color="#ED1B24" style={{ marginRight: 10 }} /> Subventions
                  </h3>
                  <div style={{ display: 'flex', gap: '15px' }}>
                    {/* Barre de recherche locale pour les subventions */}
                    <div className="search-box">
                      <Search style={{ position: 'absolute', left: 12, top: 10, color: '#A0AEC0' }} size={16} />
                      <input
                        type="text"
                        className="search-input"
                        style={{ width: '200px', padding: '8px 12px 8px 35px' }}
                        placeholder="Rechercher aide..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                    <button className="btn-add" onClick={() => {
                      setFormSubvention({ nom: '', organisme: '', montant: '', status: 'Reçue' });
                      setIsEditing(false); setShowSubventionModal(true);
                    }}>
                      <Plus size={16} /> NOUVELLE SUBVENTION
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
                          <td className="clickable-name" onClick={() => openViewModal({ ...s, viewType: 'subvention' })}>{s.nom}</td>
                          <td>{s.organisme}</td>
                          <td style={{ fontWeight: 'bold', color: '#03543F' }}>{s.montant} €</td>
                          <td>
                            <div style={{ display: 'flex', gap: 10 }}>
                              <Edit size={16} onClick={() => { setFormSubvention(s); setIsEditing(true); setCurrentId(s.id); setShowSubventionModal(true); }} style={{ cursor: 'pointer', color: '#A0AEC0' }} />
                              <Trash2 size={16} onClick={() => handleDelete(s.id, 'subventions')} style={{ cursor: 'pointer', color: '#A0AEC0' }} />
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* BLOC 3 : HISTORIQUE DES DONATEURS */}
              <div className="card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                  <h3 style={{ margin: 0, fontSize: '24px', fontWeight: 800, fontFamily: 'Outfit, sans-serif' }}>Historique des Donateurs</h3>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button className="btn-secondary" onClick={exportToCSV} style={{ display: 'flex', alignItems: 'center', gap: '5px', fontWeight: 'bold', border: '1px solid #E2E8F0', background: 'white', padding: '8px 15px', borderRadius: '8px', cursor: 'pointer' }}>
                      <FileText size={16} /> EXPORTER CSV
                    </button>
                    <button style={{ display: 'flex', alignItems: 'center', gap: '5px', fontWeight: 'bold', background: '#ED1B24', color: 'white', border: 'none', padding: '8px 15px', borderRadius: '8px', cursor: 'pointer' }} onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}>
                      <TrendingUp size={16} /> TRIER PAR MONTANT ({sortOrder === 'asc' ? 'MIN' : 'MAX'})
                    </button>
                  </div>
                </div>

                <p style={{ color: '#718096', marginBottom: '20px', fontSize: '14px' }}>
                  Suivi des contributions pour les bilans financiers et rapports à la mairie.
                </p>

                <div className="table-container" style={{ maxHeight: '400px', overflowY: 'auto' }}>
                  <table>
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Donateur</th>
                        <th>Ville</th>
                        <th>Montant</th>
                        <th>Fréquence</th>
                        <th>Paiement</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sortedDonateurs.map((d) => (
                        <tr key={d.id}>
                          <td>{new Date(d.date_don).toLocaleDateString()}</td>
                          <td>
                            <div className="clickable-name" onClick={() => openViewModal({ ...d, viewType: 'donateur' })}>
                              {d.civilite} {d.prenom} {d.nom}
                            </div>
                            <div style={{ fontSize: '11px', color: '#718096' }}>{d.email}</div>
                          </td>
                          <td>{d.ville || '-'}</td>
                          <td style={{ fontWeight: 'bold', color: '#2F855A' }}>{d.montant} €</td>
                          <td><span className="status-badge status-actif">{d.frequence}</span></td>
                          <td>{d.moyen_paiement}</td>
                          <td>
                            <button className="btn-icon" onClick={() => window.open(`http://localhost:8000/api/receipt.php?id=${d.id}`, '_blank')}>
                              <Printer size={16} color="#718096" />
                            </button>
                          </td>
                        </tr>
                      ))}
                      {sortedDonateurs.length === 0 && (
                        <tr><td colSpan="7" style={{ textAlign: 'center', padding: '30px', color: '#A0AEC0' }}>Aucun don enregistré pour le moment.</td></tr>
                      )}
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
                        <input type="text" required value={formEntreprise.nom} onChange={e => setFormEntreprise({ ...formEntreprise, nom: e.target.value })} />
                      </div>
                      <div className="form-group"><label>Contact (Nom & Prenom) <span>*</span></label>
                        <input type="text" value={formEntreprise.contact} onChange={e => setFormEntreprise({ ...formEntreprise, contact: e.target.value })} />
                      </div>
                      <div className="form-row">
                        <div className="form-group"><label>Email <span>*</span></label><input type="email" value={formEntreprise.email} onChange={e => setFormEntreprise({ ...formEntreprise, email: e.target.value })} /></div>
                        <div className="form-group"><label>Tel <span>*</span></label><input type="text" value={formEntreprise.telephone} onChange={e => setFormEntreprise({ ...formEntreprise, telephone: e.target.value })} /></div>
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
                        <input type="text" required value={formSubvention.nom} onChange={e => setFormSubvention({ ...formSubvention, nom: e.target.value })} />
                      </div>
                      <div className="form-row">
                        <div className="form-group"><label>Organisme <span>*</span></label><input type="text" value={formSubvention.organisme} onChange={e => setFormSubvention({ ...formSubvention, organisme: e.target.value })} /></div>
                        <div className="form-group"><label>Montant (€) <span>*</span></label><input type="number" value={formSubvention.montant} onChange={e => setFormSubvention({ ...formSubvention, montant: e.target.value })} /></div>
                      </div>
                      <div className="btn-container"><button type="submit" className="btn-save">Enregistrer</button></div>
                    </form>
                  </div>
                </div>
              )}

              {/* MODALE DE CONSULTATION DÉDIÉE (ENTREPRISE VS SUBVENTION) */}
              {showViewModal && selectedItem && (
                <div className="modal-overlay">
                  <div className="modal-card view-modal">
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 25 }}>
                      <h2 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: 10 }}>
                        {selectedItem.viewType === 'entreprise' ? (
                          <><Handshake color="#ED1B24" /> Fiche Entreprise</>
                        ) : (
                          <><FileText color="#ED1B24" /> Détails Subvention</>
                        )}
                      </h2>
                      <X onClick={() => setShowViewModal(false)} style={{ cursor: 'pointer' }} />
                    </div>

                    <div className="view-content" style={{ display: 'grid', gap: '20px' }}>
                      {/* EN-TÊTE COMMUN MAIS ADAPTÉ */}
                      <div style={{ background: '#F8FAFC', padding: '15px', borderRadius: '8px', borderLeft: '4px solid #ED1B24' }}>
                        <label style={{ fontSize: '11px', color: '#718096', textTransform: 'uppercase' }}>
                          {selectedItem.viewType === 'entreprise' ? "Nom Entreprise" : "Nom de l'aide"}
                        </label>
                        <div style={{ fontSize: '20px', fontWeight: '800' }}>{selectedItem.nom}</div>
                      </div>

                      {/* AFFICHAGE CONDITIONNEL SELON TES SCREENS */}
                      {selectedItem.viewType === 'entreprise' ? (
                        /* CONTENU SCREEN 1 : ENTREPRISE */
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                          <div className="info-box" style={{ gridColumn: 'span 2' }}>
                            <label style={{ fontSize: '11px', color: '#718096', fontWeight: 'bold' }}>Contact (Nom & Prénom)</label>
                            <p style={{ margin: '5px 0 0 0', fontWeight: '600' }}>{selectedItem.contact || 'Non renseigné'}</p>
                          </div>
                          <div className="info-box">
                            <label style={{ fontSize: '11px', color: '#718096', fontWeight: 'bold' }}>Email</label>
                            <p style={{ margin: '5px 0 0 0', fontWeight: '600' }}>{selectedItem.email || 'Non renseigné'}</p>
                          </div>
                          <div className="info-box">
                            <label style={{ fontSize: '11px', color: '#718096', fontWeight: 'bold' }}>Tel</label>
                            <p style={{ margin: '5px 0 0 0', fontWeight: '600' }}>{selectedItem.telephone || 'Non renseigné'}</p>
                          </div>
                        </div>
                      ) : (
                        /* CONTENU SCREEN 2 : SUBVENTION */
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                          <div className="info-box">
                            <label style={{ fontSize: '11px', color: '#718096', fontWeight: 'bold' }}>Organisme</label>
                            <p style={{ margin: '5px 0 0 0', fontWeight: '600' }}>{selectedItem.organisme || 'Non renseigné'}</p>
                          </div>
                          <div className="info-box">
                            <label style={{ fontSize: '11px', color: '#718096', fontWeight: 'bold' }}>Montant (€)</label>
                            <p style={{ margin: '5px 0 0 0', color: '#2F855A', fontWeight: '800', fontSize: '18px' }}>
                              {selectedItem.montant} €
                            </p>
                          </div>
                        </div>
                      )}

                      {/* MODALE DÉDIÉE DONATEURS AVEC DONOR NUMBER ET DATE */}
                      {showViewModal && selectedItem && selectedItem.viewType === 'donateur' && (
                        <div className="modal-overlay">
                          <div className="modal-card">
                            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #EEE', paddingBottom: 15, marginBottom: 20 }}>
                              <div>
                                <h2 style={{ fontSize: 22, fontWeight: 800, color: '#1A1C23', margin: 0 }}>
                                  Fiche Donateur : {selectedItem.civilite} {selectedItem.prenom} {selectedItem.nom}
                                </h2>
                                <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginTop: '5px' }}>
                                  <span style={{
                                    fontSize: '11px',
                                    background: '#E2E8F0',
                                    color: '#4A5568',
                                    padding: '2px 8px',
                                    borderRadius: '12px',
                                    fontWeight: 'bold'
                                  }}>
                                    ID REF : {selectedItem.donor_number || 'Génération...'}
                                  </span>
                                  <span style={{ fontSize: '12px', color: '#718096' }}>
                                    Don effectué le : <strong>{selectedItem.date_don || "Date inconnue"}</strong>
                                  </span>
                                </div>
                              </div>
                              <X onClick={() => setShowViewModal(false)} style={{ cursor: 'pointer', color: '#6B7280' }} />
                            </div>

                            <div className="info-grid">
                              {/* Ligne Date et ID */}
                              <div className="info-item" style={{ borderLeft: '4px solid #ED1B24' }}>
                                <div className="info-label">Date & Heure du don</div>
                                <div className="info-value" style={{ color: '#1A1C23', fontWeight: 'bold' }}>
                                  {selectedItem.date_don || "Non spécifiée"}
                                </div>
                              </div>

                              <div className="info-item">
                                <div className="info-label">Numéro Donateur (SQL)</div>
                                <div className="info-value" style={{ fontWeight: 'bold' }}>{selectedItem.donor_number || "Automatique"}</div>
                              </div>

                              <div className="info-item" style={{ background: '#F0FFF4', borderColor: '#68D391' }}>
                                <div className="info-label" style={{ color: '#2F855A' }}>Montant & Fréquence</div>
                                <div className="info-value" style={{ color: '#2F855A', fontWeight: 'bold' }}>
                                  {selectedItem.montant} € ({selectedItem.frequence === 'monthly' ? 'Mensuel' : 'Ponctuel'})
                                </div>
                              </div>

                              <div className="info-item">
                                <div className="info-label">Moyen de Paiement</div>
                                <div className="info-value" style={{ textTransform: 'uppercase' }}>{selectedItem.moyen_paiement}</div>
                              </div>

                              <div className="info-item full-width">
                                <div className="info-label">Adresse de facturation</div>
                                <div className="info-value">
                                  {selectedItem.adresse} {selectedItem.complement_adresse && `- ${selectedItem.complement_adresse}`}<br />
                                  {selectedItem.code_postal} {selectedItem.ville} ({selectedItem.pays})
                                </div>
                              </div>

                              <div className="info-item">
                                <div className="info-label">Email de contact</div>
                                <div className="info-value">{selectedItem.email}</div>
                              </div>

                              <div className="info-item">
                                <div className="info-label">Téléphone</div>
                                <div className="info-value">{selectedItem.telephone || "N/A"}</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                      {/* BOUTON MODIFIER EN BAS À DROITE */}
                      <div style={{ marginTop: '15px', display: 'flex', justifyContent: 'flex-end' }}>
                        <button className="btn-secondary" onClick={() => {
                          setShowViewModal(false);
                          if (selectedItem.viewType === 'entreprise') {
                            setFormEntreprise(selectedItem);
                            setShowEntrepriseModal(true);
                          } else {
                            setFormSubvention(selectedItem);
                            setShowSubventionModal(true);
                          }
                          setIsEditing(true);
                          setCurrentId(selectedItem.id);
                        }}>
                          <Edit size={14} style={{ marginRight: 8 }} /> MODIFIER LA FICHE
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                  <h3 style={{ margin: 0, fontWeight: 900 }}>Historique des Donateurs</h3>

                  <div style={{ display: 'flex', gap: '10px' }}>
                    {/* BOUTON EXPORT CSV */}
                    <button
                      onClick={exportToCSV}
                      style={{
                        background: '#F4F7F9', border: '1px solid #E2E8F0', padding: '8px 15px',
                        borderRadius: '8px', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer',
                        display: 'flex', alignItems: 'center', gap: '8px'
                      }}
                    >
                      <FileText size={14} /> EXPORTER CSV
                    </button>

                    {/* BOUTON FILTRE MONTANT */}
                    <button
                      onClick={() => setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc')}
                      style={{
                        background: '#ED1B24', color: 'white', border: 'none', padding: '8px 15px',
                        borderRadius: '8px', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer',
                        display: 'flex', alignItems: 'center', gap: '8px'
                      }}
                    >
                      <TrendingUp size={14} style={{ transform: sortOrder === 'asc' ? 'rotate(180deg)' : 'none' }} />
                      TRIER PAR MONTANT ({sortOrder === 'desc' ? 'MAX' : 'MIN'})
                    </button>
                  </div>
                </div>

                <p style={{ fontSize: '12px', color: '#718096', marginBottom: '15px' }}>
                  Suivi des contributions pour les bilans financiers et rapports à la mairie.
                </p>

                {/* UTILISATION DES DONNÉES TRIÉES */}
                {sortedDonateurs.map((donateur) => (
                  <div key={donateur.id} className="activity-item">
                    <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                      <div className="avatar" style={{ background: '#ED1B24' }}>D</div>
                      <div>
                        <span style={{ fontSize: 13, fontWeight: 'bold' }}>{donateur.prenom} {donateur.nom}</span>
                        <div style={{ fontSize: 11, color: '#718096' }}>Don de {donateur.montant}€ - {donateur.date_don}</div>
                      </div>
                    </div>
                    <button
                      className="btn-details"
                      onClick={() => openViewModal({ ...donateur, viewType: 'donateur' })}
                      style={{ background: '#F4F7F9', border: 'none', padding: '5px 12px', borderRadius: '8px', fontSize: '10px', fontWeight: 'bold', cursor: 'pointer' }}
                    >
                      DÉTAILS
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )
        }
        {/* LIGNE 1584: FIN DU BLOC PRÉCÉDENT */}

        {
          activeTab === 'communication-articles' && (
            <div className="card" style={{ marginTop: '-20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 25, borderBottom: '1px solid #EEE', paddingBottom: 15 }}>
                <FileText color="#ED1B24" />
                <h3 style={{ margin: 0, fontSize: '24px', fontWeight: 800, fontFamily: 'Outfit, sans-serif' }}>Créer un nouvel article</h3>
              </div>

              <form style={{ display: 'grid', gap: '20px' }}>
                <div className="form-group">
                  <label style={{ fontWeight: 'bold' }}>Titre de l'article *</label>
                  <input type="text" placeholder="Entrez le titre de l'article..." required />
                  <span style={{ fontSize: '11px', color: '#718096' }}>Maximum 200 caractères</span>
                </div>

                <div className="form-group">
                  <label style={{ fontWeight: 'bold' }}>Image de l'article *</label>
                  <input type="file" accept="image/*" style={{ padding: '8px', fontSize: '12px' }} required />
                  <span style={{ fontSize: '11px', color: '#718096' }}>Sélectionnez un fichier (jpg, png, gif)</span>
                </div>

                <div className="form-group">
                  <label style={{ fontWeight: 'bold' }}>Contributeurs</label>
                  <input type="text" placeholder="Prénom1, Prénom2..." />
                  <span style={{ fontSize: '11px', color: '#718096' }}>Séparez les prénoms par des virgules.</span>
                </div>

                <div className="form-group">
                  <label style={{ fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: 8 }}>
                    <Edit size={14} /> Contenu de l'article *
                  </label>

                  {/* BARRE D'OUTILS COMPLÈTE */}
                  <div style={{
                    background: '#F8FAFC', border: '1px solid #D1D5DB', borderBottom: 'none',
                    padding: '8px 12px', borderRadius: '6px 6px 0 0', display: 'flex',
                    alignItems: 'center', gap: '10px', flexWrap: 'wrap'
                  }}>

                    {/* Undo / Redo */}
                    <div style={{ display: 'flex', gap: '5px' }}>
                      <button type="button" onMouseDown={e => e.preventDefault()} onClick={() => handleToolbarAction('undo')} style={toolbarButtonStyle} title="Annuler"><Undo2 size={16} /></button>
                      <button type="button" onMouseDown={e => e.preventDefault()} onClick={() => handleToolbarAction('redo')} style={toolbarButtonStyle} title="Rétablir"><Redo2 size={16} /></button>
                    </div>

                    <div style={separatorStyle}></div>

                    {/* Sélecteurs de Texte */}
                    <select onMouseDown={e => e.preventDefault()} onChange={(e) => handleToolbarAction('formatBlock', e.target.value)} style={selectStyle}>
                      <option value="p">Paragraphe</option>
                      <option value="h1">Titre 1</option>
                      <option value="h2">Titre 2</option>
                    </select>

                    <select onMouseDown={e => e.preventDefault()} onChange={(e) => handleToolbarAction('fontName', e.target.value)} style={selectStyle}>
                      <option value="Albert Sans">Albert Sans</option>
                      <option value="Arial">Arial</option>
                    </select>

                    <select onMouseDown={e => e.preventDefault()} onChange={(e) => handleToolbarAction('fontSize', e.target.value)} style={selectStyle}>
                      <option value="3">14px</option>
                      <option value="5">18px</option>
                      <option value="7">36px</option>
                    </select>

                    <div style={separatorStyle}></div>

                    {/* Style de caractères */}
                    <div style={{ display: 'flex', gap: '2px' }}>
                      <button type="button" onMouseDown={e => e.preventDefault()} onClick={() => handleToolbarAction('bold')} style={toolbarButtonStyle}><Bold size={16} /></button>
                      <button type="button" onMouseDown={e => e.preventDefault()} onClick={() => handleToolbarAction('italic')} style={toolbarButtonStyle}><Italic size={16} /></button>
                      <button type="button" onMouseDown={e => e.preventDefault()} onClick={() => handleToolbarAction('underline')} style={toolbarButtonStyle}><Underline size={16} /></button>
                    </div>

                    <div style={separatorStyle}></div>

                    {/* Alignement & Tabulation */}
                    <div style={{ display: 'flex', gap: '2px' }}>
                      <button type="button" onMouseDown={e => e.preventDefault()} onClick={() => handleToolbarAction('justifyLeft')} style={toolbarButtonStyle}><AlignLeft size={16} /></button>
                      <button type="button" onMouseDown={e => e.preventDefault()} onClick={() => handleToolbarAction('justifyCenter')} style={toolbarButtonStyle}><AlignCenter size={16} /></button>
                      <button type="button" onMouseDown={e => e.preventDefault()} onClick={() => handleToolbarAction('justifyRight')} style={toolbarButtonStyle}><AlignRight size={16} /></button>
                      <button type="button" onMouseDown={e => e.preventDefault()} onClick={() => handleToolbarAction('outdent')} style={toolbarButtonStyle}><Outdent size={16} /></button>
                      <button type="button" onMouseDown={e => e.preventDefault()} onClick={() => handleToolbarAction('indent')} style={toolbarButtonStyle}><Indent size={16} /></button>
                    </div>

                    <div style={separatorStyle}></div>

                    {/* Listes */}
                    <div style={{ display: 'flex', gap: '2px' }}>
                      <button type="button" onMouseDown={e => e.preventDefault()} onClick={() => handleToolbarAction('insertUnorderedList')} style={toolbarButtonStyle}><List size={16} /></button>
                      <button type="button" onMouseDown={e => e.preventDefault()} onClick={() => handleToolbarAction('insertOrderedList')} style={toolbarButtonStyle}><ListOrdered size={16} /></button>
                    </div>

                    <div style={separatorStyle}></div>

                    {/* Couleurs (Custom UI) */}
                    <div style={{ display: 'flex', gap: '2px', alignItems: 'center' }}>
                      {/* Text Color */}
                      <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                        <button type="button" onMouseDown={e => e.preventDefault()} onClick={() => document.getElementById('foreColorInput').click()} style={{ ...toolbarButtonStyle, padding: '2px 4px', flexDirection: 'column', gap: 0 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
                            <Type size={14} color="#000" />
                            <ChevronDown size={10} color="#4A5568" />
                          </div>
                          <div style={{ width: '100%', height: '3px', background: 'red', marginTop: '2px' }} id="foreColorIndicator"></div>
                        </button>
                        <input
                          id="foreColorInput"
                          type="color"
                          onMouseDown={e => e.preventDefault()}
                          onChange={(e) => {
                            handleToolbarAction('foreColor', e.target.value);
                            document.getElementById('foreColorIndicator').style.background = e.target.value;
                          }}
                          style={{ position: 'absolute', opacity: 0, width: '100%', height: '100%', cursor: 'pointer', left: 0, top: 0 }}
                        />
                      </div>

                      {/* Highlight Color */}
                      <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                        <button type="button" onMouseDown={e => e.preventDefault()} onClick={() => document.getElementById('hiliteColorInput').click()} style={{ ...toolbarButtonStyle, padding: '2px 4px', flexDirection: 'column', gap: 0 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
                            <Highlighter size={14} color="#000" />
                            <ChevronDown size={10} color="#4A5568" />
                          </div>
                          <div style={{ width: '100%', height: '3px', background: 'black', marginTop: '2px' }} id="hiliteColorIndicator"></div>
                        </button>
                        <input
                          id="hiliteColorInput"
                          type="color"
                          onMouseDown={e => e.preventDefault()}
                          onChange={(e) => {
                            handleToolbarAction('hiliteColor', e.target.value);
                            document.getElementById('hiliteColorIndicator').style.background = e.target.value;
                          }}
                          style={{ position: 'absolute', opacity: 0, width: '100%', height: '100%', cursor: 'pointer', left: 0, top: 0 }}
                        />
                      </div>
                    </div>

                    <div style={separatorStyle}></div>

                    {/* Médias & Spéciaux */}
                    <button type="button" onMouseDown={e => e.preventDefault()} onClick={(e) => handleOpenModal(setShowSpecialCharModal, e)} style={toolbarButtonStyle}><Omega size={16} /></button>
                    <button type="button" onMouseDown={e => e.preventDefault()} onClick={(e) => handleOpenModal(setShowEmojiModal, e)} style={toolbarButtonStyle}><Smile size={16} /></button>
                    <button type="button" onMouseDown={e => e.preventDefault()} onClick={(e) => handleOpenModal(setShowImageModal, e)} style={toolbarButtonStyle}><Image size={16} /></button>
                    <button type="button" onMouseDown={e => e.preventDefault()} onClick={(e) => handleOpenModal(setShowVideoModal, e)} style={toolbarButtonStyle}><PlaySquare size={16} /></button>
                    <button type="button" onMouseDown={e => e.preventDefault()} onClick={(e) => handleOpenModal(setShowLinkModal, e)} style={toolbarButtonStyle}><Link size={16} /></button>

                    {/* Menu Plus */}
                    <div style={{ position: 'relative' }}>
                      <button type="button" onMouseDown={e => e.preventDefault()} onClick={() => setShowMoreMenu(!showMoreMenu)} style={{ ...toolbarButtonStyle, background: '#BFDBFE' }}>
                        <MoreHorizontal size={16} />
                      </button>
                      {showMoreMenu && (
                        <div style={moreMenuStyle}>
                          <button type="button" onClick={toggleFullScreen} style={menuItemStyle}><Maximize size={14} /> Plein écran</button>
                          <button type="button" onClick={() => window.open('/preview-article', '_blank')} style={menuItemStyle}><Eye size={14} /> Prévisualiser</button>
                          <button type="button" onClick={() => window.print()} style={menuItemStyle}><Printer size={14} /> Imprimer</button>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* ZONE D'ÉCRITURE RICHE (L'ÉLÉMENT QUI MANQUAIT) */}
                  <div
                    id="article-content-editor"
                    contentEditable="true"
                    onInput={(e) => setFormArticle({ ...formArticle, contenu: e.currentTarget.innerHTML })}
                    style={{
                      minHeight: '400px',
                      border: '1px solid #D1D5DB',
                      borderRadius: '0 0 12px 12px',
                      padding: '20px',
                      background: 'white',
                      outline: 'none',
                      overflowY: 'auto'
                    }}
                  ></div>
                </div>

                {/* BOUTONS D'ACTION (PUBLIER, PRÉVISUALISER, RÉINITIALISER) */}
                <div style={{ display: 'flex', gap: '15px', marginTop: '20px' }}>
                  <button type="submit" className="btn-save" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <Package size={18} /> Publier l'article
                  </button>

                  <button
                    type="button"
                    onClick={() => window.open('/preview-article', '_blank')}
                    style={{ background: '#6366F1', color: 'white', border: 'none', padding: '12px 25px', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 }}
                  >
                    <Eye size={18} /> Prévisualiser
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      if (window.confirm("Voulez-vous vraiment tout effacer ?")) {
                        document.getElementById('article-content-editor').innerHTML = "";
                      }
                    }}
                    style={{ background: '#FDBA74', color: '#92400E', border: 'none', padding: '12px 25px', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 }}
                  >
                    <Trash2 size={18} /> Réinitialiser
                  </button>
                </div>
              </form>
            </div>
          )
        }

        {/* MODALES EDITEUR */}
        {
          showSpecialCharModal && (
            <div className="modal-overlay" onClick={() => setShowSpecialCharModal(false)}>
              <div className="modal-card" style={{ width: '300px', padding: '15px' }} onClick={e => e.stopPropagation()}>
                <h4 style={{ margin: '0 0 10px 0' }}>Caractères Spéciaux</h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '5px' }}>
                  {specialChars.map(char => (
                    <button key={char} onClick={() => handleInsert(char, setShowSpecialCharModal)} style={{ padding: '8px', border: '1px solid #E2E8F0', background: 'white', cursor: 'pointer', borderRadius: '4px' }}>
                      {char}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )
        }

        {
          showEmojiModal && (
            <div className="modal-overlay" onClick={() => setShowEmojiModal(false)}>
              <div className="modal-card" style={{ width: '300px', padding: '15px' }} onClick={e => e.stopPropagation()}>
                <h4 style={{ margin: '0 0 10px 0' }}>Emojis</h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '5px' }}>
                  {emojis.map(emoji => (
                    <button key={emoji} onClick={() => handleInsert(emoji, setShowEmojiModal)} style={{ padding: '8px', border: '1px solid #E2E8F0', background: 'white', cursor: 'pointer', borderRadius: '4px', fontSize: '18px' }}>
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )
        }

        {
          showImageModal && (
            <div className="modal-overlay" onClick={() => setShowImageModal(false)}>
              <div className="modal-card" style={{ width: '500px', padding: '0', overflow: 'hidden' }} onClick={e => e.stopPropagation()}>
                <div style={{ padding: '15px 20px', borderBottom: '1px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h4 style={{ margin: 0 }}>Insert/Edit Image</h4>
                  <X size={18} style={{ cursor: 'pointer' }} onClick={() => setShowImageModal(false)} />
                </div>

                <div style={{ display: 'flex', borderBottom: '1px solid #E2E8F0', padding: '0 20px' }}>
                  <button
                    onClick={() => setImageModalTab('General')}
                    style={{ padding: '10px 0', marginRight: '20px', background: 'none', border: 'none', borderBottom: imageModalTab === 'General' ? '2px solid #3B82F6' : 'none', color: imageModalTab === 'General' ? '#3B82F6' : '#64748B', fontWeight: 'bold', cursor: 'pointer' }}
                  >General</button>
                  <button
                    onClick={() => setImageModalTab('Advanced')}
                    style={{ padding: '10px 0', background: 'none', border: 'none', borderBottom: imageModalTab === 'Advanced' ? '2px solid #3B82F6' : 'none', color: imageModalTab === 'Advanced' ? '#3B82F6' : '#64748B', fontWeight: 'bold', cursor: 'pointer' }}
                  >Advanced</button>
                </div>

                <form onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.target);
                  const src = formData.get('src');
                  const alt = formData.get('alt');
                  const title = formData.get('title');
                  const width = formData.get('width');
                  const height = formData.get('height');
                  const className = formData.get('class');
                  const vSpace = formData.get('vspace');
                  const hSpace = formData.get('hspace');
                  const border = formData.get('border');
                  const borderStyle = formData.get('borderStyle');

                  let style = "";
                  if (width) style += `width: ${width}px; `;
                  if (height) style += `height: ${height}px; `;
                  if (vSpace) style += `margin-top: ${vSpace}px; margin-bottom: ${vSpace}px; `;
                  if (hSpace) style += `margin-left: ${hSpace}px; margin-right: ${hSpace}px; `;
                  if (border && borderStyle) style += `border: ${border}px ${borderStyle} #000; `;

                  const html = `<img src="${src}" alt="${alt}" title="${title}" class="${className}" style="${style}" />`;
                  handleInsert(html, setShowImageModal);
                }} style={{ padding: '20px' }}>

                  {imageModalTab === 'General' && (
                    <>
                      <div className="form-group">
                        <label>Source</label>
                        <input name="src" type="url" className="form-control" style={{ width: '100%' }} required />
                      </div>
                      <div className="form-group">
                        <label>Alternative description</label>
                        <input name="alt" type="text" className="form-control" style={{ width: '100%' }} />
                      </div>
                      <div className="form-group">
                        <label>Image title</label>
                        <input name="title" type="text" className="form-control" style={{ width: '100%' }} />
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto', gap: '10px', alignItems: 'end' }}>
                        <div className="form-group">
                          <label>Width</label>
                          <input name="width" type="number" className="form-control" style={{ width: '100%' }} />
                        </div>
                        <div className="form-group">
                          <label>Height</label>
                          <input name="height" type="number" className="form-control" style={{ width: '100%' }} />
                        </div>
                        <div style={{ paddingBottom: '10px' }}>🔒</div>
                      </div>
                      <div className="form-group">
                        <label>Class</label>
                        <select name="class" className="form-control" style={{ width: '100%' }}>
                          <option value="img-responsive">Image responsive</option>
                          <option value="img-centered">Image centrée</option>
                          <option value="img-left">Image flottante à gauche</option>
                          <option value="img-right">Image flottante à droite</option>
                          <option value="img-full">Image pleine largeur</option>
                        </select>
                      </div>
                    </>
                  )}

                  {imageModalTab === 'Advanced' && (
                    <>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                        <div className="form-group">
                          <label>Vertical space</label>
                          <input name="vspace" type="number" className="form-control" style={{ width: '100%' }} />
                        </div>
                        <div className="form-group">
                          <label>Horizontal space</label>
                          <input name="hspace" type="number" className="form-control" style={{ width: '100%' }} />
                        </div>
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                        <div className="form-group">
                          <label>Border width</label>
                          <input name="border" type="number" className="form-control" style={{ width: '100%' }} />
                        </div>
                        <div className="form-group">
                          <label>Border style</label>
                          <select name="borderStyle" className="form-control" style={{ width: '100%' }}>
                            <option value="">Select...</option>
                            <option value="solid">Solid</option>
                            <option value="dotted">Dotted</option>
                            <option value="dashed">Dashed</option>
                            <option value="double">Double</option>
                          </select>
                        </div>
                      </div>
                    </>
                  )}

                  <div className="btn-container" style={{ marginTop: '20px', justifyContent: 'flex-end', gap: '10px' }}>
                    <button type="button" onClick={() => setShowImageModal(false)} style={{ background: '#F1F5F9', color: '#64748B', padding: '8px 16px', borderRadius: '6px', border: 'none', fontWeight: 'bold', cursor: 'pointer' }}>Cancel</button>
                    <button type="submit" className="btn-save" style={{ padding: '8px 20px' }}>Save</button>
                  </div>
                </form>
              </div>
            </div>
          )
        }

        {
          showVideoModal && (
            <div className="modal-overlay" onClick={() => setShowVideoModal(false)}>
              <div className="modal-card" style={{ width: '500px', padding: '0', overflow: 'hidden' }} onClick={e => e.stopPropagation()}>
                <div style={{ padding: '15px 20px', borderBottom: '1px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h4 style={{ margin: 0 }}>Insert/Edit Media</h4>
                  <X size={18} style={{ cursor: 'pointer' }} onClick={() => setShowVideoModal(false)} />
                </div>

                <div style={{ display: 'flex', borderBottom: '1px solid #E2E8F0', padding: '0 20px' }}>
                  <button onClick={() => setMediaModalTab('General')} style={{ padding: '10px 0', marginRight: '20px', background: 'none', border: 'none', borderBottom: mediaModalTab === 'General' ? '2px solid #3B82F6' : 'none', color: mediaModalTab === 'General' ? '#3B82F6' : '#64748B', fontWeight: 'bold', cursor: 'pointer' }}>General</button>
                  <button onClick={() => setMediaModalTab('Embed')} style={{ padding: '10px 0', marginRight: '20px', background: 'none', border: 'none', borderBottom: mediaModalTab === 'Embed' ? '2px solid #3B82F6' : 'none', color: mediaModalTab === 'Embed' ? '#3B82F6' : '#64748B', fontWeight: 'bold', cursor: 'pointer' }}>Embed</button>
                  <button onClick={() => setMediaModalTab('Advanced')} style={{ padding: '10px 0', background: 'none', border: 'none', borderBottom: mediaModalTab === 'Advanced' ? '2px solid #3B82F6' : 'none', color: mediaModalTab === 'Advanced' ? '#3B82F6' : '#64748B', fontWeight: 'bold', cursor: 'pointer' }}>Advanced</button>
                </div>

                <form onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.target);
                  let html = "";

                  if (mediaModalTab === 'Embed') {
                    html = formData.get('embedCode');
                  } else {
                    const src = formData.get('src');
                    const width = formData.get('width');
                    const height = formData.get('height');
                    const poster = formData.get('poster');

                    let style = "";
                    if (width) style += `width: ${width}px; `;
                    if (height) style += `height: ${height}px; `;

                    html = `<video src="${src}" poster="${poster}" style="${style}" controls></video>`;
                  }
                  handleInsert(html, setShowVideoModal);
                }} style={{ padding: '20px' }}>

                  {mediaModalTab === 'General' && (
                    <>
                      <div className="form-group"><label>Source</label><input name="src" type="url" className="form-control" style={{ width: '100%' }} /></div>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto', gap: '10px', alignItems: 'end' }}>
                        <div className="form-group"><label>Width</label><input name="width" type="number" className="form-control" style={{ width: '100%' }} /></div>
                        <div className="form-group"><label>Height</label><input name="height" type="number" className="form-control" style={{ width: '100%' }} /></div>
                        <div style={{ paddingBottom: '10px' }}>🔒</div>
                      </div>
                    </>
                  )}

                  {mediaModalTab === 'Embed' && (
                    <div className="form-group">
                      <label>Paste your embed code below:</label>
                      <textarea name="embedCode" className="form-control" style={{ width: '100%', height: '100px' }}></textarea>
                    </div>
                  )}

                  {mediaModalTab === 'Advanced' && (
                    <>
                      <div className="form-group"><label>Alternative source URL</label><input name="altSource" type="url" className="form-control" style={{ width: '100%' }} /></div>
                      <div className="form-group"><label>Media poster (Image URL)</label><input name="poster" type="url" className="form-control" style={{ width: '100%' }} /></div>
                    </>
                  )}

                  <div className="btn-container" style={{ marginTop: '20px', justifyContent: 'flex-end', gap: '10px' }}>
                    <button type="button" onClick={() => setShowVideoModal(false)} style={{ background: '#F1F5F9', color: '#64748B', padding: '8px 16px', borderRadius: '6px', border: 'none', fontWeight: 'bold', cursor: 'pointer' }}>Cancel</button>
                    <button type="submit" className="btn-save" style={{ padding: '8px 20px' }}>Save</button>
                  </div>
                </form>
              </div>
            </div>
          )
        }

        {
          showViewModal && selectedItem && selectedItem.viewType === 'donateur' && (
            <div className="modal-overlay">
              <div className="modal-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #EEE', paddingBottom: 15, marginBottom: 20 }}>
                  <div>
                    <h2 style={{ fontSize: 22, fontWeight: 800, color: '#1A1C23', margin: 0 }}>
                      Fiche Donateur : {selectedItem.civilite} {selectedItem.prenom} {selectedItem.nom}
                    </h2>
                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginTop: '5px' }}>
                      <span style={{
                        fontSize: '11px',
                        background: '#E2E8F0',
                        color: '#4A5568',
                        padding: '2px 8px',
                        borderRadius: '12px',
                        fontWeight: 'bold'
                      }}>
                        ID REF : {selectedItem.donor_number || 'Génération...'}
                      </span>
                      <span style={{ fontSize: '12px', color: '#718096' }}>
                        Don effectué le : <strong>{selectedItem.date_don || "Date inconnue"}</strong>
                      </span>
                    </div>
                  </div>
                  <X onClick={() => setShowViewModal(false)} style={{ cursor: 'pointer', color: '#6B7280' }} />
                </div>

                <div className="info-grid">
                  {/* Ligne Date et ID */}
                  <div className="info-item" style={{ borderLeft: '4px solid #ED1B24' }}>
                    <div className="info-label">Date & Heure du don</div>
                    <div className="info-value" style={{ color: '#1A1C23', fontWeight: 'bold' }}>
                      {selectedItem.date_don || "Non spécifiée"}
                    </div>
                  </div>

                  <div className="info-item">
                    <div className="info-label">Numéro Donateur (SQL)</div>
                    <div className="info-value" style={{ fontWeight: 'bold' }}>{selectedItem.donor_number || "Automatique"}</div>
                  </div>

                  <div className="info-item" style={{ background: '#F0FFF4', borderColor: '#68D391' }}>
                    <div className="info-label" style={{ color: '#2F855A' }}>Montant & Fréquence</div>
                    <div className="info-value" style={{ color: '#2F855A', fontWeight: 'bold' }}>
                      {selectedItem.montant} € ({selectedItem.frequence === 'monthly' ? 'Mensuel' : 'Ponctuel'})
                    </div>
                  </div>

                  <div className="info-item">
                    <div className="info-label">Moyen de Paiement</div>
                    <div className="info-value" style={{ textTransform: 'uppercase' }}>{selectedItem.moyen_paiement}</div>
                  </div>

                  <div className="info-item full-width">
                    <div className="info-label">Adresse de facturation</div>
                    <div className="info-value">
                      {selectedItem.adresse ? (
                        <>
                          {selectedItem.adresse} {selectedItem.complement_adresse && `- ${selectedItem.complement_adresse}`}<br />
                          {[selectedItem.code_postal, selectedItem.ville, selectedItem.pays].filter(Boolean).join(' ')}
                        </>

                      ) : (
                        <span style={{ fontStyle: 'italic', color: '#A0AEC0' }}>Aucune adresse renseignée</span>
                      )}
                    </div>
                  </div>

                  <div className="info-item">
                    <div className="info-label">Email de contact</div>
                    <div className="info-value">{selectedItem.email}</div>
                  </div>

                  <div className="info-item">
                    <div className="info-label">Téléphone</div>
                    <div className="info-value">{selectedItem.telephone || "N/A"}</div>
                  </div>
                </div>
              </div>
            </div>
          )
        }

        {
          showLinkModal && (
            <div className="modal-overlay" onClick={() => setShowLinkModal(false)}>
              <div className="modal-card" style={{ width: '400px', padding: '0', overflow: 'hidden' }} onClick={e => e.stopPropagation()}>
                <div style={{ padding: '15px 20px', borderBottom: '1px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h4 style={{ margin: 0 }}>Insert/Edit Link</h4>
                  <X size={18} style={{ cursor: 'pointer' }} onClick={() => setShowLinkModal(false)} />
                </div>
                <form onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.target);
                  const url = formData.get('linkUrl');
                  const text = formData.get('linkText');
                  const title = formData.get('linkTitle');
                  const target = formData.get('linkTarget');

                  const targetAttr = target === '_blank' ? 'target="_blank"' : '';
                  const titleAttr = title ? `title="${title}"` : '';

                  const html = `<a href="${url}" ${targetAttr} ${titleAttr} style="color: blue; text-decoration: underline;">${text || url}</a>`;
                  handleInsert(html, setShowLinkModal);
                }} style={{ padding: '20px' }}>
                  <div className="form-group">
                    <label>URL</label>
                    <input name="linkUrl" type="url" className="form-control" style={{ width: '100%' }} required />
                  </div>
                  <div className="form-group">
                    <label>Text to display</label>
                    <input name="linkText" type="text" className="form-control" style={{ width: '100%' }} />
                  </div>
                  <div className="form-group">
                    <label>Title</label>
                    <input name="linkTitle" type="text" className="form-control" style={{ width: '100%' }} />
                  </div>
                  <div className="form-group">
                    <label>Open link in...</label>
                    <select name="linkTarget" className="form-control" style={{ width: '100%' }}>
                      <option value="_self">Current window</option>
                      <option value="_blank">New window</option>
                    </select>
                  </div>
                  <div className="btn-container" style={{ marginTop: '20px', justifyContent: 'flex-end', gap: '10px' }}>
                    <button type="button" onClick={() => setShowLinkModal(false)} style={{ background: '#F1F5F9', color: '#64748B', padding: '8px 16px', borderRadius: '6px', border: 'none', fontWeight: 'bold', cursor: 'pointer' }}>Cancel</button>
                    <button type="submit" className="btn-save" style={{ padding: '8px 20px' }}>Save</button>
                  </div>
                </form>
              </div>
            </div>
          )
        }
        {/* DEBUT ONGLET USERS */}
        {activeTab === 'users' && (
          <div>
            <div className="title-section">
              <h2>Gestion des Utilisateurs</h2>
              <p>Gérez les accès et les rôles de vos collaborateurs.</p>
            </div>

            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Nom Complet</th>
                    <th>Email</th>
                    <th>Téléphone</th>
                    <th>Rôle Actuel</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(u => (
                    <tr key={u.id}>
                      <td>
                        <div style={{ fontWeight: 'bold' }}>{u.full_name}</div>
                        <div style={{ fontSize: '12px', color: '#718096' }}>Inscrit le {new Date(u.created_at).toLocaleDateString()}</div>
                      </td>
                      <td>{u.email}</td>
                      <td>{u.phone || '-'}</td>
                      <td>
                        <span className={`status-badge ${u.role_id == 1 ? 'status-actif' : 'status-retard'}`} style={{ background: u.role_id == 1 ? '#C6F6D5' : '#E2E8F0', color: u.role_id == 1 ? '#22543D' : '#4A5568' }}>
                          {u.role_name || (u.role_id == 1 ? 'Admin' : 'Donateur')}
                        </span>
                      </td>
                      <td>
                        {u.role_id == 1 ? (
                          <button className="action-btn" onClick={() => handleRoleUpdate(u.id, 3)} style={{ color: 'orange', border: '1px solid orange', padding: '5px 10px', borderRadius: '5px', background: 'white', cursor: 'pointer' }}>
                            Retirer Droits Admin
                          </button>
                        ) : (
                          <button className="action-btn" onClick={() => handleRoleUpdate(u.id, 1)} style={{ color: 'green', border: '1px solid green', padding: '5px 10px', borderRadius: '5px', background: 'white', cursor: 'pointer' }}>
                            Passer Admin
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                  {users.length === 0 && (
                    <tr><td colSpan="5" style={{ textAlign: 'center', padding: '30px' }}>Aucun utilisateur trouvé.</td></tr>
                  )}
                </tbody>
              </table>
            </div>

            <div style={{ marginTop: '30px', padding: '20px', background: '#FFFAF0', border: '1px solid #FBD38D', borderRadius: '8px', color: '#744210' }}>
              <strong>Note de sécurité :</strong> Seuls les Administrateurs peuvent accéder à cette page.
              Attention, donner les droits Admin à un utilisateur lui donne accès à tout le Dashboard.
            </div>
          </div>
        )}
      </main >
    </div >
  );
};

export default Dashboard;
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '@/api/axios';

const ArticleDetail = () => {
    const { id } = useParams();
    const [article, setArticle] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchArticle = async () => {
            try {
                const response = await api.get(`/articles.php?id=${id}`);
                setArticle(response.data);
            } catch (err) {
                console.error("Erreur lors de la récupération de l'article", err);
                setError("Impossible de charger l'article.");
            } finally {
                setLoading(false);
            }
        };

        fetchArticle();
    }, [id]);

    if (loading) return (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '50px' }}>
            Chargement...
        </div>
    );

    if (error || !article) return (
        <div style={{ textAlign: 'center', padding: '50px' }}>
            <h2>Oups !</h2>
            <p>{error || "Article introuvable."}</p>
            <Link to="/" style={{ color: '#E3001B', textDecoration: 'underline' }}>Retour à l'accueil</Link>
        </div>
    );

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '40px 20px', fontFamily: 'Inter, sans-serif' }}>
            <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#666', textDecoration: 'none', marginBottom: '20px' }}>
                &larr; Retour
            </Link>

            <header style={{ marginBottom: '30px' }}>
                <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', lineHeight: '1.2', marginBottom: '16px', color: '#1A202C' }}>
                    {article.title}
                </h1>
                <div style={{ display: 'flex', gap: '16px', color: '#718096', fontSize: '0.9rem' }}>
                    <span>Publié le {new Date(article.created_at).toLocaleDateString()}</span>
                    <span>•</span>
                    <span>Par {article.author}</span>
                </div>
            </header>

            {article.image_url && (
                <div style={{ width: '100%', maxHeight: '500px', overflow: 'hidden', borderRadius: '12px', marginBottom: '40px' }}>
                    <img
                        src={article.image_url}
                        alt={article.title}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                </div>
            )}

            <div
                className="article-content"
                style={{ lineHeight: '1.8', color: '#2D3748', fontSize: '1.1rem' }}
                dangerouslySetInnerHTML={{ __html: article.content }}
            />
        </div>
    );
};

export default ArticleDetail;

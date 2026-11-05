'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

type Counts = {
  projects: number;
  projectsPublished: number;
  team: number;
  articles: number;
  documents: number;
  messages: number;
  newMessages: number;
  failedNotifications: number;
};

const initial: Counts = {
  projects: 0,
  projectsPublished: 0,
  team: 0,
  articles: 0,
  documents: 0,
  messages: 0,
  newMessages: 0,
  failedNotifications: 0,
};

export default function DashboardPage() {
  const [counts, setCounts] = useState<Counts>(initial);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const [projects, published, team, articles, documents, messages, newMessages, failed] = await Promise.all([
        supabase.from('projects').select('id', { count: 'exact', head: true }),
        supabase.from('projects').select('id', { count: 'exact', head: true }).eq('published', true),
        supabase.from('team').select('id', { count: 'exact', head: true }),
        supabase.from('articles').select('id', { count: 'exact', head: true }),
        supabase.from('documents').select('id', { count: 'exact', head: true }),
        supabase.from('contact_requests').select('id', { count: 'exact', head: true }),
        supabase.from('contact_requests').select('id', { count: 'exact', head: true }).eq('status', 'nouveau'),
        supabase
          .from('contact_requests')
          .select('id', { count: 'exact', head: true })
          .eq('notification_status', 'failed'),
      ]);

      const firstError = [projects, team, articles, documents, messages].find((item) => item.error)?.error;
      if (firstError) setError(firstError.message);

      setCounts({
        projects: projects.count ?? 0,
        projectsPublished: published.count ?? 0,
        team: team.count ?? 0,
        articles: articles.count ?? 0,
        documents: documents.count ?? 0,
        messages: messages.count ?? 0,
        newMessages: newMessages.count ?? 0,
        failedNotifications: failed.count ?? 0,
      });
    })();
  }, []);

  return (
    <>
      <div className="admin-head">
        <div>
          <h1>Tableau de bord</h1>
          <p>Vue d’ensemble du contenu publié et des demandes reçues.</p>
        </div>
        <div className="actions">
          <Link href="/admin/projets" className="btn btn-sm">
            Gérer les projets
          </Link>
          <Link href="/admin/messages" className="btn btn-sm btn-ghost">
            Voir les messages
          </Link>
        </div>
      </div>

      {error ? (
        <p className="form-status" data-tone="error">
          {error}
        </p>
      ) : null}

      <div className="stat-cards">
        <div className="stat-card">
          <strong>{counts.projects}</strong>
          <span>Projets ({counts.projectsPublished} publiés)</span>
        </div>
        <div className="stat-card">
          <strong>{counts.team}</strong>
          <span>Membres de l’équipe</span>
        </div>
        <div className="stat-card">
          <strong>{counts.articles}</strong>
          <span>Actualités</span>
        </div>
        <div className="stat-card">
          <strong>{counts.documents}</strong>
          <span>Documents</span>
        </div>
        <div className="stat-card">
          <strong>{counts.messages}</strong>
          <span>Messages reçus ({counts.newMessages} nouveaux)</span>
        </div>
      </div>

      {counts.failedNotifications > 0 ? (
        <p className="form-status" data-tone="error">
          {counts.failedNotifications} message(s) n’ont pas pu être notifiés par e-mail. Vérifiez les secrets
          <code> RESEND_API_KEY </code> et <code>NOTIFICATION_FROM</code> de la fonction <code>contact-submit</code>.
        </p>
      ) : null}

      <div className="card card-pad" style={{ marginTop: '1.2rem' }}>
        <h2 style={{ fontSize: '1.25rem', marginBottom: '0.8rem' }}>Raccourcis</h2>
        <div className="actions">
          <Link href="/admin/projets" className="btn btn-sm btn-ghost">
            Ajouter un projet
          </Link>
          <Link href="/admin/articles" className="btn btn-sm btn-ghost">
            Publier une actualité
          </Link>
          <Link href="/admin/reglages" className="btn btn-sm btn-ghost">
            Modifier la page d’accueil
          </Link>
          <Link href="/admin/reglages#contact" className="btn btn-sm btn-ghost">
            Coordonnées & messages
          </Link>
        </div>
      </div>
    </>
  );
}

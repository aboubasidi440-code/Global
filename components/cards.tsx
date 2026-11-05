'use client';

import Link from 'next/link';
import { bilingual, href, translator, type Locale } from '@/lib/i18n';
import type { Project, TeamMember } from '@/lib/data';
import { mediaUrl, useSignedUrls } from '@/lib/media';
import { excerpt, initials } from '@/lib/format';
import { ArrowRight } from './Icon';

export function ProjectCard({ project, locale }: { project: Project; locale: Locale }) {
  const t = translator(locale);
  const images = project.image_urls ?? [];
  const urls = useSignedUrls([images[0] ?? null]);
  const cover = mediaUrl(urls, images[0] ?? null);
  const title = bilingual(project, 'title', locale);
  const category = bilingual(project, 'category', locale);

  return (
    <Link href={href(locale, `/projets/${project.id}`)} className="project-card">
      <div className="project-media">
        {cover ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={cover} alt={title} loading="lazy" />
        ) : (
          <span className="project-media-fallback">{initials(title) || 'GS'}</span>
        )}
      </div>
      <div className="project-body">
        <div className="project-meta">
          {category ? <span>{category}</span> : null}
          {project.location ? <span>{project.location}</span> : null}
          {project.year ? <span>{project.year}</span> : null}
        </div>
        <h3>{title}</h3>
        <p>{excerpt(bilingual(project, 'description', locale), 120)}</p>
        <span className="link-arrow">
          {t('cta.read')} <ArrowRight />
        </span>
      </div>
    </Link>
  );
}

export function TeamCard({ member, locale }: { member: TeamMember; locale: Locale }) {
  const urls = useSignedUrls([member.photo_url]);
  const photo = mediaUrl(urls, member.photo_url);
  const position = bilingual(member, 'position', locale);
  const bio = bilingual(member, 'bio', locale);

  return (
    <article className="team-card">
      <div className="team-photo">
        {photo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={photo} alt={member.name} loading="lazy" />
        ) : (
          <span>{initials(member.name)}</span>
        )}
      </div>
      <div className="card-body">
        {position ? <span className="role">{position}</span> : null}
        <h3>{member.name}</h3>
        {bio ? <p>{bio}</p> : null}
      </div>
    </article>
  );
}

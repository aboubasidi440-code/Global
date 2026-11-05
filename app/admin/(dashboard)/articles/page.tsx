'use client';

import CollectionManager from '@/components/admin/CollectionManager';
import { ARTICLES } from '@/lib/admin/collections';

export default function AdminArticlesPage() {
  return <CollectionManager collection={ARTICLES} />;
}

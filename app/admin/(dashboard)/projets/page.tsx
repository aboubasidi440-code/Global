'use client';

import CollectionManager from '@/components/admin/CollectionManager';
import { PROJECTS } from '@/lib/admin/collections';

export default function AdminProjectsPage() {
  return <CollectionManager collection={PROJECTS} />;
}

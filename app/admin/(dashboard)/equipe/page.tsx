'use client';

import CollectionManager from '@/components/admin/CollectionManager';
import { TEAM } from '@/lib/admin/collections';

export default function AdminTeamPage() {
  return <CollectionManager collection={TEAM} />;
}

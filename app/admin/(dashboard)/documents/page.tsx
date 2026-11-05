'use client';

import CollectionManager from '@/components/admin/CollectionManager';
import { DOCUMENTS } from '@/lib/admin/collections';

export default function AdminDocumentsPage() {
  return <CollectionManager collection={DOCUMENTS} />;
}

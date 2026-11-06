import assert from 'node:assert/strict';
import test from 'node:test';
import { bilingual, href, isLocale, switchLocalePath, translator } from '../lib/i18n.ts';

test('isLocale accepts only supported locales', () => {
  assert.equal(isLocale('fr'), true);
  assert.equal(isLocale('en'), true);
  assert.equal(isLocale('de'), false);
  assert.equal(isLocale(undefined), false);
});

test('href builds localized public paths', () => {
  assert.equal(href('fr'), '/fr');
  assert.equal(href('en', '/projets'), '/en/projets');
  assert.equal(href('fr', 'contact?service=energie'), '/fr/contact?service=energie');
});

test('switchLocalePath changes only the locale segment and keeps the current page', () => {
  assert.equal(switchLocalePath('/fr', 'en'), '/en');
  assert.equal(switchLocalePath('/en/projets', 'fr'), '/fr/projets');
  assert.equal(switchLocalePath('/fr/projets/123', 'en'), '/en/projets/123');
  assert.equal(switchLocalePath('/en/contact?service=energie', 'fr'), '/fr/contact?service=energie');
});

test('bilingual falls back to French when English is missing', () => {
  const row = { title: 'Forage', title_en: null };
  assert.equal(bilingual(row, 'title', 'en'), 'Forage');
  assert.equal(bilingual({ title: 'Forage', title_en: 'Borehole' }, 'title', 'en'), 'Borehole');
});

test('translator interpolates variables in both languages', () => {
  assert.equal(translator('fr')('home.eyebrow', { year: '2017' }), 'Niger · Depuis 2017');
  assert.equal(translator('en')('home.eyebrow', { year: '2017' }), 'Niger · Since 2017');
});

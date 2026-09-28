import { User } from '~local/types';

// Staff of the lighting operator, shared across every city it manages. Latvian
// and Swedish names reflect the two field teams; ids are referenced by USER_EVENTS.
export const USERS: User[] = [
  { id: 1, name: 'Līga Ozola', status: 'active', enabled: true, locked: false },
  { id: 2, name: 'Dmitrijs Ivanovs', status: 'active', enabled: true, locked: false },
  { id: 3, name: 'Anna Lindqvist', status: 'active', enabled: true, locked: false },
  { id: 4, name: 'Mārtiņš Kalniņš', status: 'active', enabled: true, locked: false },
  { id: 5, name: 'Erik Johansson', status: 'active', enabled: true, locked: false },
  { id: 6, name: 'Ilze Bērziņa', status: 'active', enabled: true, locked: false },
  { id: 7, name: 'Sara Holm', status: 'active', enabled: true, locked: false },
  { id: 8, name: 'Johan Nilsson', status: 'active', enabled: true, locked: true },
  { id: 9, name: 'Andris Vītols', status: 'active', enabled: true, locked: false },
  { id: 10, name: 'Karin Ekström', status: 'active', enabled: true, locked: false },
  { id: 11, name: 'Jānis Liepiņš', status: 'deactivated', enabled: false, locked: false },
  { id: 12, name: 'Oskar Lundgren', status: 'active', enabled: true, locked: false },
  { id: 13, name: 'Elīna Pūce', status: 'active', enabled: true, locked: false },
  { id: 14, name: 'Maja Sandberg', status: 'invited', enabled: true, locked: false },
  { id: 15, name: 'Emma Karlsson', status: 'active', enabled: true, locked: false },
  { id: 16, name: 'Olga Petrova', status: 'active', enabled: true, locked: true },
  { id: 17, name: 'Raimonds Zariņš', status: 'active', enabled: true, locked: false },
  { id: 18, name: 'Viktor Andersson', status: 'deactivated', enabled: false, locked: false },
  { id: 19, name: 'Linnea Bergström', status: 'invited', enabled: true, locked: false },
  { id: 20, name: 'Aleksandrs Kozlovs', status: 'active', enabled: true, locked: false },
];

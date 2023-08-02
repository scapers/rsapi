import { Rotations } from '../api/runescape/runescape.api';

test(`ROTS Rotation`, async () => {
  const date = new Date();
  date.setDate(date.getDate() + 1);
  const r = Rotations.rots(date);
  expect(r.daysUntilNext > 0);
});

test(`Araxxor Rotation`, async () => {
  const date = new Date();
  date.setDate(date.getDate() + 6);
  const r = Rotations.araxxor(date);
  expect(r.daysUntilNext > 0);
});

test(`Rago Rotation`, async () => {
  const date = new Date();
  date.setDate(date.getDate() + 6);
  const r = Rotations.vorago(date);
  expect(r.daysUntilNext > 0);
});

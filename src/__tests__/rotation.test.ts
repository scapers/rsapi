import { Rotations } from '../api/runescape/runescape.api';

test(`ROTS Rotation`, async () => {
    let date = new Date();
    date.setDate(date.getDate() + 1);
    const r = Rotations.rots(date);
    console.log('rots', r.rotation)
    expect(r.daysUntilNext > 0);
});

test(`Araxxor Rotation`, async () => {
    let date = new Date();
    date.setDate(date.getDate() + 6);
    const r = Rotations.araxxor(date);
    console.log(r.rotation.closed);
    expect(r.daysUntilNext > 0);
});

test(`Rago Rotation`, async () => {
    let date = new Date();
    date.setDate(date.getDate() + 6);
    const r = Rotations.vorago(date);
    expect(r.daysUntilNext > 0);
});
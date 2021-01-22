import {Rotation} from './rotations.models';

// TODO: move to rotationDays function instead of internal ones, they're the same?
const rotationDays = (interval, count, offset, forDate = new Date()) => {
    return {
        rotation: Math.floor((((Math.floor(Math.floor(forDate.getTime() / 1000) / (24 * 60 * 60))) - count) % (interval * count.length)) / interval),
        daysUntilNext: interval - ((Math.floor((forDate.getTime() / 1000) / (24 * 60 * 60))) + count) % (interval * count) % interval
    }
}

export const rots = (forDate: Date = new Date()): Rotation => {
    if (!forDate) forDate = new Date();
    const names = {
        A: 'Ahrim',
        D: 'Dharok',
        G: 'Guthan',
        K: 'Karil',
        T: 'Torag',
        V: 'Verac'
    };
    const rotsRotations = [
        [[names.D, names.T, names.V], [names.K, names.A, names.G]],
        [[names.K, names.T, names.G], [names.A, names.D, names.V]],
        [[names.K, names.G, names.V], [names.A, names.T, names.D]],
        [[names.G, names.T, names.V], [names.K, names.A, names.D]],
        [[names.K, names.T, names.V], [names.A, names.G, names.D]],
        [[names.A, names.G, names.D], [names.K, names.T, names.V]],
        [[names.K, names.A, names.D], [names.G, names.T, names.V]],
        [[names.A, names.T, names.D], [names.K, names.G, names.V]],
        [[names.A, names.D, names.V], [names.K, names.T, names.G]],
        [[names.K, names.A, names.G], [names.T, names.D, names.V]],
        [[names.A, names.T, names.G], [names.K, names.D, names.V]],
        [[names.A, names.G, names.V], [names.K, names.T, names.D]],
        [[names.K, names.A, names.T], [names.G, names.D, names.V]],
        [[names.K, names.A, names.V], [names.D, names.T, names.G]],
        [[names.A, names.T, names.V], [names.K, names.D, names.G]],
        [[names.K, names.D, names.G], [names.A, names.T, names.V]],
        [[names.D, names.T, names.G], [names.K, names.A, names.V]],
        [[names.G, names.D, names.V], [names.K, names.A, names.T]],
        [[names.K, names.T, names.D], [names.A, names.G, names.V]],
        [[names.K, names.D, names.V], [names.A, names.T, names.G]]
    ];

    const currentRotation = (Math.floor((forDate.getTime() / 1000) / (24 * 60 * 60)) % 20);
    const westSide = rotsRotations[currentRotation][0].join(' - ');
    const eastSide = rotsRotations[currentRotation][1].join(' - ');
    return {
        rotation: {
            west: westSide,
            east: eastSide
        },
        daysUntilNext: 1,
    } as Rotation;
}

export const araxxor = (forDate: Date = new Date()): Rotation => {
    // const {rotation, daysUntilNext} = rotationDays(4, 3, 3, forDate);

    const paths = [{location: 'top', characteristic: 'Minions'},
        {location: 'middle', characteristic: 'Acid'},
        {location: 'bottom', characteristic: 'Darkness'}];
    const rotation = Math.floor((((Math.floor(Math.floor(forDate.getTime() / 1000) / (24 * 60 * 60))) + 3) % (4 * paths.length)) / 4);
    const daysUntilNext = 4 - ((Math.floor((forDate.getTime() / 1000) / (24 * 60 * 60))) + 3) % (4 * paths.length) % 4;

    return {
        rotation: {
            open: paths.filter(p => p !== paths[rotation]),
            closed: paths[rotation],
        },
        daysUntilNext
    } as Rotation;
}

export const vorago = (forDate: Date = new Date()): Rotation => {
    const rotations = {
        C: {
            normal: 'Ceiling Collapse',
            hard: {
                phase10: 'Team Split - Green Bomb',
                phase11: 'Team Split - Vitalis',
                unlock: 'Torso of Omens'
            }
        },
        S: {
            normal: 'Scopulus',
            hard: {
                phase10: 'Purple Bomb - Team Split',
                phase11: 'Purple Bomb - Vitalis',
                unlock: 'Helm of Omens'
            }
        },
        V: {
            normal: 'Vitalis',
            hard: {
                phase10: 'Vitalis - Purple Bomb',
                phase11: 'Vitalis - Bleeds',
                unlock: 'Legs of Omens'
            }
        },
        G: {
            normal: 'Green Bomb',
            hard: {
                phase10: 'Green Bomb - Vitalis',
                phase11: 'Team Split - Purple Bomb',
                unlock: 'Boots of Omens'
            }
        },
        T: {
            normal: 'Team Split',
            hard: {
                phase10: 'Team Split - Team Split',
                phase11: 'Team Split - Purple Bomb',
                unlock: 'Maul of Omens'
            }
        },
        E: {
            normal: 'The End',
            hard: {
                phase10: 'Purple Bomb - Bleeds',
                phase11: 'Purple Bomb - Vitalis',
                unlock: 'Gloves of Omens'
            }
        }
    };

    const voragoRotations = [
        rotations.C,
        rotations.S,
        rotations.V,
        rotations.G,
        rotations.T,
        rotations.E
    ];

    // const {rotation, daysUntilNext} = rotationDays(7, 6, 6, forDate);
    const rotation = Math.floor((((Math.floor(Math.floor(forDate.getTime() / 1000) / (24 * 60 * 60))) - 6) % (7 * 6)) / 7);
    const daysUntilNext = 7 - ((Math.floor((forDate.getTime() / 1000) / (24 * 60 * 60))) - 6) % (7 * voragoRotations.length) % 7;

    return {
        rotation: voragoRotations[rotation],
        daysUntilNext
    } as Rotation;
}
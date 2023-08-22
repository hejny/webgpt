import { PlotFunction } from './WorkInProgress';

// ==========================[ Sphere ]============================
export const plotSphere: PlotFunction = (t, u, v) => {
    const x = Math.cos(u) * Math.sin(v);
    const y = Math.sin(u) * Math.sin(v);
    const z = Math.cos(v);
    return [x, y, z];
};
plotSphere.range = [0, Math.PI * 2];

// ==========================[ Torus ]============================
export const plotTorus: PlotFunction = (t, u, v) => {
    const x = (2 + Math.cos(v)) * Math.cos(u);
    const y = (2 + Math.cos(v)) * Math.sin(u);
    const z = Math.sin(v);
    return [x, y, z];
};
plotTorus.range = [0, Math.PI * 2];

// ==========================[ Waves ]============================
export const plotWaves: PlotFunction = (t, u, v) => {
    const x = u;
    const y = v;
    const z = Math.sin(u * 2 + t / 30) / 2 + Math.cos(v * 2 + t / 30) / 2;
    return [x, y, z];
};
plotWaves.range = [-3, 3];

// ==========================[ Hyperbolic Paraboloid ]============================
export const plotHyperbolicParaboloid: PlotFunction = (t, u, v) => {
    const x = u;
    const y = v;
    const z = u * v;
    return [x, y, z];
};
plotHyperbolicParaboloid.range = [-10, 10];

/* Utility helpers for geographic work – no external deps */
export type LatLng = [number, number];

/** Ray‑casting algorithm; returns true if point is inside polygon */
export function pointInPolygon(point: LatLng, polygon: LatLng[]): boolean {
  const [x, y] = point;
  let inside = false;
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const [xi, yi] = polygon[i];
    const [xj, yj] = polygon[j];
    const intersect = yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;
    if (intersect) inside = !inside;
  }
  return inside;
}

/** Centroid of an axis‑aligned bounding box */
export function centerOfBounds(nw: LatLng, se: LatLng): LatLng {
  return [(nw[0] + se[0]) / 2, (nw[1] + se[1]) / 2];
}

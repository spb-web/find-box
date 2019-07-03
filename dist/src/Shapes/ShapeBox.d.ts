/**
 *       1
 *   _________
 *   |        |
 * 0 |  box   |  2
 *   |        |
 *   ----------
 *       3
 */
export default class Box {
    points: [number, number, number, number];
    constructor(points: [number, number, number, number]);
    readonly width: number;
    readonly height: number;
    getCenter(accuracy?: number): {
        x: number;
        y: number;
    };
}
//# sourceMappingURL=ShapeBox.d.ts.map
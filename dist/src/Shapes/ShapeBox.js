"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 *       1
 *   _________
 *   |        |
 * 0 |  box   |  2
 *   |        |
 *   ----------
 *       3
 */
class Box {
    constructor(points) {
        this.points = points;
    }
    get width() {
        return this.points[2] - this.points[0];
    }
    get height() {
        return this.points[1] - this.points[3];
    }
    getCenter(accuracy = 1) {
        return {
            x: this.points[0] + (1 + (0.5 - Math.random()) * (1 - accuracy)) * (this.width / 2),
            y: this.points[1] + (1 + (0.5 - Math.random()) * (1 - accuracy)) * (this.height / 2),
        };
    }
}
exports.default = Box;

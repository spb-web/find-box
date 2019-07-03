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
  points: [number, number, number, number]

  constructor(points:[number, number, number, number]) {
    this.points = points
  }

  get width() {
    return this.points[2] - this.points[0]
  }

  get height() {
    return this.points[1] - this.points[3]
  }

  getCenter(accuracy = 1) {
    return {
      x: this.points[0] + (1 + (0.5 - Math.random()) * (1 - accuracy)) * (this.width / 2) ,
      y: this.points[1] + (1 + (0.5 - Math.random()) * (1 - accuracy)) * (this.height / 2) ,
    }
  }
}
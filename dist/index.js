"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('app-module-path').addPath(__dirname);
const opencv4nodejs_1 = __importDefault(require("opencv4nodejs"));
const ShapeBox_1 = __importDefault(require("src/Shapes/ShapeBox"));
class CvTemplate {
    constructor(image) {
        this.image = image;
    }
}
class CvTemplateManager {
    constructor() {
        // Тут хралятся шаблоны
        this.templates = new Map();
    }
    /**
     * Создание нового шаблона поиска
     */
    create(tempalteInfo) {
        let images = [];
        if (Array.isArray(tempalteInfo.filesName)) {
            images = tempalteInfo.filesName.map((fileName) => opencv4nodejs_1.default.imread(fileName));
        }
        else {
            images = [opencv4nodejs_1.default.imread(tempalteInfo.filesName)];
        }
        this.templates.set(tempalteInfo.name, images);
    }
    getTemplate(name) {
        const images = this.templates.get(name);
        if (!Array.isArray(images)) {
            throw new Error(`Not find template by name ${name}`);
        }
        return images;
    }
    setCanvas() {
    }
    /**
     * Поиск шаблонов на холсте
     */
    async findTemplate(name, canvas, cvAlgorithm = 3) {
        const templateImages = this.getTemplate(name);
        for (let templateImageIndex = 0; templateImageIndex < templateImages.length; templateImageIndex += 1) {
            const result = await canvas.matchTemplateAsync(templateImages[templateImageIndex], cvAlgorithm);
            const { maxLoc, maxVal } = await opencv4nodejs_1.default.minMaxLocAsync(result);
            if (maxVal > 0.9) {
                return new ShapeBox_1.default([
                    maxLoc.x,
                    maxLoc.y,
                    maxLoc.x + templateImages[templateImageIndex].cols,
                    maxLoc.y + templateImages[templateImageIndex].rows,
                ]);
            }
        }
        return null;
    }
}
const cvTemplateManager = new CvTemplateManager();
cvTemplateManager.create({
    name: 'button',
    filesName: './button.png'
});
const canvas = opencv4nodejs_1.default.imread('./canvas.png');
cvTemplateManager.findTemplate('button', canvas).then(shapeBox => console.log(shapeBox));

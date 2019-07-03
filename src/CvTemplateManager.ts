
import cv from 'opencv4nodejs'
import ShapeBox from 'src/Shapes/ShapeBox'

export default class CvTemplateManager {
  // Тут хралятся шаблоны
  readonly templates: Map<string,cv.Mat[]> = new Map()
  
  /**
   * Создание нового шаблона поиска
   */
  create(tempalteInfo:{name:string, filesName:string|string[]}) {
    let images:cv.Mat[] = []

    if (Array.isArray(tempalteInfo.filesName)) {
      images = tempalteInfo.filesName.map((fileName) => cv.imread(fileName))
    } else {
      images = [ cv.imread(tempalteInfo.filesName) ]
    }

    this.templates.set(tempalteInfo.name, images)
  }

  getTemplate(name:string) {
    const images = this.templates.get(name)

    if (!Array.isArray(images)) {
      throw new Error(`Not find template by name ${name}`)
    }

    return images
  }

  /**
   * Поиск шаблонов на холсте
   */
  async findTemplate(name:string, canvas:cv.Mat, cvAlgorithm = 3):Promise<ShapeBox|null> {
    const templateImages = this.getTemplate(name)

    for (let templateImageIndex = 0; templateImageIndex < templateImages.length; templateImageIndex += 1) {
      const result = await canvas.matchTemplateAsync(templateImages[templateImageIndex], cvAlgorithm)

      const { maxLoc, maxVal } = await cv.minMaxLocAsync(result)

      if (maxVal > 0.85) {
        return new ShapeBox([
          maxLoc.x,
          maxLoc.y,
          maxLoc.x + templateImages[templateImageIndex].cols,
          maxLoc.y + templateImages[templateImageIndex].rows,
        ])
      }
    }

    return null
  }
}
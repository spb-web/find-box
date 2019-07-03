import { imread } from 'opencv4nodejs'
import {CvTemplateManager} from 'index'

const cvTemplateManager = new CvTemplateManager()

cvTemplateManager.create({
  name: 'button',
  filesName: './button.png'
})

const canvas = imread('./canvas.png')

cvTemplateManager.findTemplate('button', canvas).then(shapeBox => console.log(shapeBox))
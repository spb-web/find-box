sudo apt-get install cmake
```
const cvTemplateManager = new CvTemplateManager()

cvTemplateManager.create({
  name: 'button',
  filesName: './button.png'
})

const canvas = cv.imread('./canvas.png')

cvTemplateManager.findTemplate('button', canvas).then(shapeBox => console.log(shapeBox))
```
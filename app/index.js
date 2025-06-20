const ShellSpawn = require('./lib/ShellSpawn')
const ShellExec = require('./lib/ShellExec')
const GetFiles = require('./lib/GetFiles')

const path = require('path')
const fs = require('fs')

// convert a.tif -thumbnail 64x64^ -gravity center -extent 64x64 b.ico

let main = async function () {
  let files = GetFiles()
  for (let i = 0; i < files.length; i++) {
    let file = files[i]
    
    let filename = path.basename(file)
    let dirname = path.dirname(file)
    let filenameNoExt = path.parse(filename).name
    let ext = path.extname(filename).toLowerCase()

    if (ext === '.svg') {
      console.log(`Skipping ${file} as it is already a SVG`)
      continue
    }

    const supportedExtensions = [".png", ".jpg", ".jpeg", ".bmp", ".gif", ".tiff", ".webp"];

    if (supportedExtensions.indexOf(ext) === -1) {
      console.log(`Skipping ${file} as it is not a supported image format`)
      continue
    }

    await ShellExec(`cp "${file}" /tmp/input.${ext}`)
    file = `/tmp/input${ext}`

    let isJPG = false
    let isAVIF = false

    dirname = '/output/'
    await ShellExec(`/root/.cargo/bin/vtracer --input "${file}" --output "${path.resolve(dirname, filenameNoExt + ".svg")}"`)
    // convert -gravity center "c.png" -flatten -fuzz 1% -trim +repage -resize 64x64 -extent 64x64 "b.ico"
  }
}

main()
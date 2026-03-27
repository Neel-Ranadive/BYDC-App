const sharp = require('sharp');
const fs = require('fs');
const path = require('path');
const { rgbToLab, labToPh } = require('./colorUtils');

async function processImage(imagePath) {
  try {
    // Read and resize image to small size for processing
    const buffer = fs.readFileSync(imagePath);
    const img = sharp(buffer);
    const metadata = await img.metadata();
    const small = await img.resize(64, 64, { fit: 'inside' }).raw().toBuffer({ resolveWithObject: true });
    const { data, info } = small; // data is raw RGB(A)
    const channels = info.channels;
    let r = 0, g = 0, b = 0, count = 0;
    for (let i = 0; i < data.length; i += channels) {
      r += data[i];
      g += data[i + 1];
      b += data[i + 2];
      count++;
    }
    const avgR = Math.round(r / count);
    const avgG = Math.round(g / count);
    const avgB = Math.round(b / count);

    console.log(`Average RGB: ${avgR}, ${avgG}, ${avgB}`);

    const lab = rgbToLab(avgR, avgG, avgB);
    console.log(`Lab: L=${lab.L.toFixed(2)}, a=${lab.a.toFixed(2)}, b=${lab.b.toFixed(2)}`);

    const ph = labToPh(lab);
    console.log(`Estimated pH: ${ph}`);

    return { avgRgb: [avgR, avgG, avgB], lab, ph };
  } catch (e) {
    console.error('Error processing image:', e);
    throw e;
  }
}

// Main execution
if (require.main === module) {
  const imagePath = process.argv[2];
  if (!imagePath) {
    console.log('Usage: node main.js <image_path>');
    process.exit(1);
  }
  processImage(imagePath).then(() => {
    console.log('Processing complete.');
  }).catch(err => {
    console.error('Failed:', err);
    process.exit(1);
  });
}

module.exports = { processImage };
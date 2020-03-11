const router = require('express').Router();
const vision = require('@google-cloud/vision');

router.get('/faces', async (req, res) => {
    res.send('hello world');

const client = new vision.ImageAnnotatorClient({
    keyFilename: './vision.json'
});
const fileName = 'https://www.sciencenewsforstudents.org/wp-content/uploads/2019/11/860_main_beauty.png';
const [result] = await client.faceDetection(fileName);
const faces = result.faceAnnotations;
console.log('Faces:');
faces.forEach((face, i) => {
  console.log(`  Face #${i + 1}:`);
  console.log(`    Joy: ${face.joyLikelihood}`);
  console.log(`    Anger: ${face.angerLikelihood}`);
  console.log(`    Sorrow: ${face.sorrowLikelihood}`);
  console.log(`    Surprise: ${face.surpriseLikelihood}`);
});
});


module.exports = router;
/* eslint-disable camelcase */
/* eslint-disable no-return-assign */
/* eslint-disable no-prototype-builtins */
const router = require('express').Router();
const Clarifai = require('clarifai');

const init = new Clarifai.App({ apiKey: process.env.API_KEY });

// note: this function is to check wheather yhe data return is empty or not
let checkIfEmpty;
function isEmpty(obj) {
  // eslint-disable-next-line no-restricted-syntax
  for (const prop in obj) {
    // eslint-disable-next-line no-prototype-builtins
    // eslint-disable-next-line no-return-assign
    if (obj.hasOwnProperty(prop)) return checkIfEmpty = false;
  }
  return checkIfEmpty = true;
}
// general error message when an analysis fails
const error_msg = 'something went wrong while trying to process your image';
router.post('/demographics', async (req, res) => {
// The ‘Demographics’ model analyzes images and returns information on age, gender,
// and multicultural appearance for each detected face based on facial characteristics.
// This model is great for anyone building an app that relies on demographic information
// to understand users.
  const {
    image,
  } = req.body;
  const analyze = await init.models.predict('c0c0ac362b03416da06ab3fa36fb58e3', image);
  if (analyze) {
    try {
      const result = analyze.outputs[0].data;
      // performing a check wheather the data returned is empty
      isEmpty(result);
      if (checkIfEmpty === false) {
        try {
          // incase you wanna add a bounty box, uncomment this
          // const bounding_box = result.regions[0].region_info.bounding_box;
          const concept_based_data = result.regions[0].data.concepts;
          const face_based_data = result.regions[0].data.face;
          const age_appearance = face_based_data;
          const gender_appearance = face_based_data;
          const multicultural_appearance = face_based_data;
          // filtering data by header req
          const query = req.query.appearance;
          if (query === 'age') res.status(200).send(age_appearance);
          if (query === 'gender') res.status(200).send(gender_appearance);
          if (query === 'culture')res.status(200).send(multicultural_appearance);
          if (!query) res.status(200).send(concept_based_data);
          if (query !== 'age' || 'gender' || 'culture') res.status(400).send('something is wrong with you\'re params');
        } catch (err) {
          res.status(401).send('Something went wrong somewhere');
        }
      }
      if (checkIfEmpty === true) return res.status(401).send('The image uploaded could not be analyzed, maybe because it\'s not a demographic image based ');
    } catch (err) {
      res.status(400).send('sorryt could\'nt process your request');
    }
  } else {
    res.status(401).send(error_msg);
  }
});

// The ‘Face Detection’ model returns probability scores on the likelihood that the image contains
// human faces and coordinate locations of where those faces appear with a bounding box.
// This model is great for anyone building an app that monitors or detects human activity.

router.post('/face-detection', async (req, res) => {
  const {
    image,
  } = req.body;
  const analyze = await init.models.predict('a403429f2ddf4b49b307e318f00e528b', image);
  if (analyze) {
    try {
      const result = analyze.outputs[0].data;
      // call the isEmpty function to check the data
      isEmpty(result);
      if (checkIfEmpty === true) return res.status(401).send('The image uploaded could not be analyzed, maybe because it\'s has no face to be detected in it ');
      if (checkIfEmpty === false) return res.status(200).send(result.regions);
    } catch (err) {
      res.status(40).send('can\'t analize your image now try again');
    }
  } else {
    res.status(401).send(error_msg);
  }
});

// The ‘Food’ model recognizes more than 1,000 food items in images down to the ingredient level.
// This model is great for anyone building a health and wellness related app.
router.post('/food', async (req, res) => {
  const {
    image,
  } = req.body;
  const analyze = await init.models.predict('bd367be194cf45149e75f01d59f77ba7', image);
  if (analyze) {
    try {
      const result = analyze.outputs[0].data;
      // call the isEmpty function to check the data
      isEmpty(result);
      if (checkIfEmpty === true) return res.status(401).send('The image uploaded could not be analyzed, maybe because no food could be detected in it ');
      if (checkIfEmpty === false) return res.status(200).send(result.concepts);
    } catch (err) {
      res.status(40).send('can\'t analize your image now try again');
    }
  } else {
    res.status(401).send(error_msg);
  }
});

module.exports = router;

// The ‘General’ model recognizes over 11,000 different concepts including objects, themes, moods,
// and more, with outputs in 23 different languages. This model is a great all-purpose solution for
// most visual recognition needs.
router.post('/general', async (req, res) => {
  const {
    image,
  } = req.body;
  const analyze = await init.models.predict('aaa03c23b3724a16a56b629203edc62c', image);
  if (analyze) {
    try {
      const result = analyze.outputs[0].data;
      // call the isEmpty function to check the data
      isEmpty(result);
      if (checkIfEmpty === true) return res.status(401).send('The image uploaded could not be analyzed, maybe because it as no image detected in it ');
      if (checkIfEmpty === false) return res.status(200).send(result.concepts);
    } catch (err) {
      res.status(40).send('can\'t analize your image now try again');
    }
  } else {
    res.status(401).send(error_msg);
  }
});

// This model returns probability scores on the likelihood that an image contains concepts such as
// gore, drugs, explicit nudity, or suggestive nudity.
router.post('/moderation', async (req, res) => {
  const {
    image,
  } = req.body;
  const analyze = await init.models.predict('d16f390eb32cad478c7ae150069bd2c6', image);
  if (analyze) {
    try {
      const result = analyze.outputs[0].data;
      // call the isEmpty function to check the data
      isEmpty(result);
      if (checkIfEmpty === true) return res.status(401).send('The image uploaded could not be analyzed, maybe because it as no image detected in it ');
      if (checkIfEmpty === false) return res.status(200).send(result.concepts);
    } catch (err) {
      res.status(40).send('can\'t analize your image now try again');
    }
  } else {
    res.status(401).send(error_msg);
  }
});

// The ‘Apparel Detection’ model recognizes fashion-related concepts. Use this model to detect
// items of clothing shown on social media feeds or other fashion media.
router.post('/apparel', async (req, res) => {
  const {
    image,
  } = req.body;
  const analyze = await init.models.predict('72c523807f93e18b431676fb9a58e6ad', image);
  if (analyze) {
    try {
      const result = analyze.outputs[0].data;
      // call the isEmpty function to check the data
      isEmpty(result);
      if (checkIfEmpty === true) return res.status(401).send('The image uploaded could not be analyzed, maybe because it as no apparel content detected in it ');
      if (checkIfEmpty === false) return res.status(200).send(result.regions);
    } catch (err) {
      res.status(40).send('can\'t analize your image now try again');
    }
  } else {
    res.status(401).send(error_msg);
  }
});

// The ‘Celebrity’ model analyzes images and returns probability scores on the
// likelihood that the media contains the face(s) of over 10,000 recognized celebrities.
// items of clothing shown on social media feeds or other fashion media.
router.post('/celebrity', async (req, res) => {
  const {
    image,
  } = req.body;
  const analyze = await init.models.predict('e466caa0619f444ab97497640cefc4dc', image);
  if (analyze) {
    try {
      const result = analyze.outputs[0].data;
      // call the isEmpty function to check the data
      isEmpty(result);
      if (checkIfEmpty === true) return res.status(401).send('The image uploaded could not be analyzed, maybe because it as no apparel content detected in it ');
      if (checkIfEmpty === false) return res.status(200).send(result);
    } catch (err) {
      res.status(40).send('can\'t analize your image now try again');
    }
  } else {
    res.status(401).send(error_msg);
  }
});

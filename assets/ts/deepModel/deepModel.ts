import * as tf from '@tensorflow/tfjs'
import * as fileS from 'react-native-fs'
async function preprocessImage(photoUri: string | null) {
	if (!photoUri) {
		throw 'ERROR: photoURI is null!';
	}
	const model = await tf.loadLayersModel('/dl_model/model.json')
	const img = new Image()
	img.src = photoUri
	await img.decode();
    const tensor = tf.browser.fromPixels(img)
        .resizeNearestNeighbor([50, 50]) // Resize to match your model's input size
        .toFloat()
        .div(255) // Normalize between 0 and 1
    return tensor;
}

export async function runDeepModel(photoUri: string | null) {
    if (!photoUri) {
        throw 'ERROR: photoURI is null!';
    }

    await tf.ready(); // Ensure TensorFlow.js is ready

	const model = await tf.loadLayersModel("file:///assets/ts/deepModel/model.json");
    const photoData = await preprocessImage(photoUri);
    const prediction = model.predict(photoData);
    console.log(prediction);

    return 'robbery';
}

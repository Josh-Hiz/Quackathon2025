import * as tf from '@tensorflow/tfjs';

async function preprocessImage(photoUri: string | null): Promise<tf.Tensor> {
    if (!photoUri) {
        throw new Error('ERROR: photoURI is null!');
    }

    const img = new Image();
    img.src = photoUri;
    
    // Wait for the image to load before proceeding
    const imageLoaded = new Promise<HTMLImageElement>((resolve, reject) => {
        img.onload = () => resolve(img);
        img.onerror = reject;
    });

    const imageElement = await imageLoaded;

    // Convert the image to a tensor and extract pixel data
    const imageTensor = tf.browser.fromPixels(imageElement);
    
    // Convert to grayscale by averaging the color channels (mean of R, G, B channels)
    let tensor = imageTensor.mean(2) // This converts the image to grayscale
        .expandDims(2)  // Add a new dimension for the single-channel image
        .resizeNearestNeighbor([50, 50]) // Resize to match model input size
        .toFloat()  // Convert to float
        .div(255.0); // Normalize to [0, 1] range

    return tensor;
}

export async function runDeepModel(photoUri: string | null): Promise<string> {
    if (!photoUri) {
        throw new Error('ERROR: photoURI is null!');
    }
    
    try {
        await tf.ready();
        console.log('TensorFlow.js is ready');

        // Preprocess the image
        const inputTensor = await preprocessImage(photoUri);
        
        // Load the model (adjust path as needed)
        const model = await tf.loadLayersModel('https://raw.githubusercontent.com/Josh-Hiz/modelrepo/refs/heads/main/model.json');
        console.log('Model loaded successfully');
        
        // Make prediction
        const prediction = model.predict(inputTensor) as tf.Tensor;
        
        // Convert prediction to readable format
        const predictionData = await prediction.data();
        const elem = Math.max(...predictionData)
        const predictedClass = ['Fighting', 'Shoplifting', 'Abuse', 'Arrest', 'Shooting', 'Robbery', 'Explosion'][elem] // Adjust threshold as needed
        
        // Clean up tensors to avoid memory leaks
        tf.dispose([inputTensor, prediction]);
        
        return predictedClass;
    } catch (error) {
        console.error('Error running model:', error);
        throw error;
    }
}
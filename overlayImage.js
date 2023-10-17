// overlay.js

// Function to overlay the selected image on the generated image
export function overlayGeneratedImage(overlayImage) {
    const generatedImage = document.getElementById('output-image');

    // Ensure the images have the same dimensions
    overlayImage.width = generatedImage.width;
    overlayImage.height = generatedImage.height;

    // Create a canvas for overlaying
    const overlayCanvas = document.createElement('canvas');
    overlayCanvas.width = generatedImage.width;
    overlayCanvas.height = generatedImage.height;

    const overlayContext = overlayCanvas.getContext('2d');

    // Draw the generated image on the canvas
    overlayContext.drawImage(generatedImage, 0, 0, generatedImage.width, generatedImage.height);

    // Draw the overlay image on top of the generated image
    overlayContext.drawImage(overlayImage, 0, 0, overlayImage.width, overlayImage.height);

    // Replace the generated image with the overlayed image
    generatedImage.src = overlayCanvas.toDataURL('image/png');
}

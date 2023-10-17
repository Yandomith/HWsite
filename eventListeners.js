import { generateImage } from './imageGeneration';

export function addEventListeners() {
    const inputFields = document.querySelectorAll('.form-control');
    inputFields.forEach((inputField) => {
        inputField.addEventListener('input', generateImage);
    });

    document.getElementById('download-button').addEventListener('click', function () {
        const image = document.getElementById('output-image').src;
        const link = document.createElement('a');
        link.href = image;
        link.download = 'generated_image.png';
        link.click();
    });
}

// Function to generate the custom size image with customization
function generateImage() {
    const text = document.getElementById('text-input').value;

    const imageWidth = 2480; // Set to A4 width in millimeters
    const imageHeight = 3508; // Set to A4 height in millimeters

    const topMargin = parseInt(document.getElementById('top-margin').value);
    const bottomMargin = parseInt(document.getElementById('bottom-margin').value);
    const leftMargin = parseInt(document.getElementById('left-margin').value);
    const rightMargin = parseInt(document.getElementById('right-margin').value);
    const textSize = parseInt(document.getElementById('text-size').value);
    const textColor = document.getElementById('text-color').value;
    const lineSpacing = parseInt(document.getElementById('line-spacing').value);
    const backgroundSelect = document.getElementById('background-select');
    const selectedBackground = backgroundSelect.value; // Get the selected background image

    if (text.trim() !== '') {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.width = imageWidth;
        canvas.height = imageHeight;

        // Set background color to white
        context.fillStyle = '#FFFFFF';
        context.fillRect(0, 0, canvas.width, canvas.height);

        // Draw selected background image if provided
        if (selectedBackground) {
            const backgroundImage = new Image();
            backgroundImage.src = selectedBackground; // Use the selected background image URL
            backgroundImage.onload = function () {
                backgroundImage.width = canvas.width;
                backgroundImage.height = canvas.height;
                context.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);

                drawText();
            };
        } else {
            drawText();
        }

        function drawText() {
            context.fillStyle = textColor; // Text color
            context.font = textSize + 'px Arial'; // Font size and style
            context.textBaseline = 'top'; // Start text from the top

            // Calculate available vertical space between top and bottom margins
            const availableHeight = canvas.height - topMargin - bottomMargin;

            // Calculate available width between left and right margins
            const availableWidth = canvas.width - leftMargin - rightMargin;

            // Split text into lines and handle wrapping
            const lines = [];
            const words = text.split(' ');
            let currentLine = '';

            for (let i = 0; i < words.length; i++) {
                const testLine = currentLine + words[i] + ' ';
                const testWidth = context.measureText(testLine).width;

                if (testWidth > availableWidth && i > 0) {
                    lines.push(currentLine.trim());
                    currentLine = words[i] + ' ';
                } else {
                    currentLine = testLine;
                }
            }

            lines.push(currentLine.trim());

            // Calculate vertical position to align text to the top
            let y = topMargin;

            // Draw text line by line with line spacing and word wrapping
            lines.forEach((line) => {
                // Draw the line and apply line spacing
                context.fillText(line, leftMargin, y);

                // Move to the next line
                y += textSize + lineSpacing;
            });

            // Convert canvas to image
            const image = canvas.toDataURL('image/png');

            // Display the generated image
            const outputImage = document.getElementById('output-image');
            outputImage.src = image;
        }
    } else {
        alert('Please enter text to generate an image.');
    }
}

// Add event listeners to all input fields for real-time updates
const inputFields = document.querySelectorAll('.form-control');
inputFields.forEach((inputField) => {
    inputField.addEventListener('input', generateImage);
});


// Add event listener to the "Download Image" button
document.getElementById('download-button').addEventListener('click', function () {
    const image = document.getElementById('output-image').src;
    const link = document.createElement('a');
    link.href = image;
    link.download = 'generated_image.png';
    link.click();
});


// Call the initial image generation
generateImage();
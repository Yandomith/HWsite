// Function to generate the custom size image with customization
document.getElementById('generate-image').addEventListener('click', function () {
    const text = document.getElementById('text-input').value;
    const imageWidth = parseInt(document.getElementById('image-width').value);
    const imageHeight = parseInt(document.getElementById('image-height').value);
    const topMargin = parseInt(document.getElementById('top-margin').value);
    const bottomMargin = parseInt(document.getElementById('bottom-margin').value);
    const leftMargin = parseInt(document.getElementById('left-margin').value);
    const rightMargin = parseInt(document.getElementById('right-margin').value);
    const textSize = parseInt(document.getElementById('text-size').value);
    const textColor = document.getElementById('text-color').value;
    const lineSpacing = parseInt(document.getElementById('line-spacing').value);
    const backgroundImageInput = document.getElementById('background-image');
    const backgroundImageFile = backgroundImageInput.files[0];

    if (text.trim() !== '') {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.width = imageWidth;
        canvas.height = imageHeight;

        // Set background color to white
        context.fillStyle = '#FFFFFF';
        context.fillRect(0, 0, canvas.width, canvas.height);

        // Draw background image if provided
        if (backgroundImageFile) {
            const backgroundImage = new Image();
            backgroundImage.src = URL.createObjectURL(backgroundImageFile);
            backgroundImage.onload = function () {
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

            // Show the download button
            document.getElementById('download-image').style.display = 'block';

            // Add event listener to the download button
            document.getElementById('download-image').addEventListener('click', function () {
                const link = document.createElement('a');
                link.href = image;
                link.download = 'generated_image.png';
                link.click();
            });
        }
    } else {
        alert('Please enter text to generate an image.');
    }
});

export function generateImage() {
    const text = document.getElementById('text-input').value;
    const imageWidth = 2480; // A4 width in millimeters
    const imageHeight = 3508; // A4 height in millimeters
    const textOpacity = parseFloat(document.getElementById('text-opacity').value);
    const topMargin = parseInt(document.getElementById('top-margin').value);
    const bottomMargin = parseInt(document.getElementById('bottom-margin').value);
    const leftMargin = parseInt(document.getElementById('left-margin').value);
    const rightMargin = parseInt(document.getElementById('right-margin').value);
    const textSize = parseInt(document.getElementById('text-size').value);
    const textColor = document.getElementById('text-color').value;
    const lineSpacing = parseInt(document.getElementById('line-spacing').value);
    const backgroundSelect = document.getElementById('background-select');
    const selectedBackground = backgroundSelect.value;
    const fontSelect = document.getElementById('font-select');
    const selectedFont = fontSelect.value;
    
    if (text.trim() !== '') {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.width = imageWidth;
        canvas.height = imageHeight;

        context.fillStyle = '#FFFFFF';
        context.fillRect(0, 0, canvas.width, canvas.height);

        if (selectedBackground) {
            const backgroundImage = new Image();
            backgroundImage.src = selectedBackground;
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
            context.globalAlpha = textOpacity;
            context.fillStyle = textColor;
            context.font = textSize + 'px ' + selectedFont; // Update the font setting based on user selection
            context.textBaseline = 'top';

            const availableHeight = canvas.height - topMargin - bottomMargin;
            const availableWidth = canvas.width - leftMargin - rightMargin;

            const lines = [];
            const paragraphs = text.split('\n');

            paragraphs.forEach((paragraph) => {
                const words = paragraph.split(' ');
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
            });

            let y = topMargin;

            lines.forEach((line) => {
                context.fillText(line, leftMargin, y);
                y += textSize + lineSpacing;
            });

            const image = canvas.toDataURL('image/png');
            const outputImage = document.getElementById('output-image');
            outputImage.src = image;
        }
    } else {
        alert('Please enter text to generate an image.');
    }
}
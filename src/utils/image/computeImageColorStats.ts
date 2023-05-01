// Import the Image and Color classes
import { Color } from '../color/Color';
import { Image } from './Image';

/**
 * Define an interface for the image color statistics
 */
export interface IImageColorStats {
    // The average color of the image as a Color object
    averageColor: Color;

    // The lightest color of the image as a Color object
    lightestColor: Color;

    // The darkest color of the image as a Color object
    darkestColor: Color;

    // The most frequent color of the image as a Color object
    mostFrequentColor: Color;

    // The least frequent color of the image as a Color object
    leastFrequentColor: Color;
}

/**
 * Define a function to compute the image color statistics
 */
export function computeImageColorStats(image: Image): IImageColorStats {
    // Declare variables to store the statistics
    let averageColor: Color;
    let lightestColor: Color;
    let darkestColor: Color;
    let mostFrequentColor: Color;
    let leastFrequentColor: Color;

    // Declare variables to store the intermediate values
    let totalRed = 0;
    let totalGreen = 0;
    let totalBlue = 0;
    let totalAlpha = 0;
    let maxLuminance = -Infinity;
    let minLuminance = Infinity;
    let colorFrequencyMap = new Map<string, number>();
    let maxFrequency = -Infinity;
    let minFrequency = Infinity;

    // Loop through all the pixels of the image and calculate the intermediate values
    for (let i = 0; i < image.size.y; i++) {
        for (let j = 0; j < image.size.x; j++) {
            // Get the color of the pixel as a Color object
            const color = image.getPixel({ x: j, y: i });

            // Add the red, green, blue and alpha values to the total values
            totalRed += color.red;
            totalGreen += color.green;
            totalBlue += color.blue;
            totalAlpha += color.alpha;

            // Calculate the luminance of the color using a formula from https://en.wikipedia.org/wiki/Relative_luminance
            const luminance = 0.2126 * color.red + 0.7152 * color.green + 0.0722 * color.blue;

            // Update the max and min luminance and the corresponding colors
            if (luminance > maxLuminance) {
                maxLuminance = luminance;
                lightestColor = color;
            }
            if (luminance < minLuminance) {
                minLuminance = luminance;
                darkestColor = color;
            }

            // Convert the color to a hex string for easier comparison
            const hex = color.toHex();

            // Update the frequency map for the color
            if (colorFrequencyMap.has(hex)) {
                // Increment the frequency by one if the color already exists in the map
                const frequency = colorFrequencyMap.get(hex)! + 1;
                colorFrequencyMap.set(hex, frequency);
            } else {
                // Set the frequency to one if the color is new to the map
                colorFrequencyMap.set(hex, 1);
            }
        }
    }

    // Calculate the average color by dividing the total values by the number of pixels
    const pixelCount = image.size.x * image.size.y;
    averageColor = new Color(
        Math.round(totalRed / pixelCount),
        Math.round(totalGreen / pixelCount),
        Math.round(totalBlue / pixelCount),
        totalAlpha / pixelCount,
    );

    // Loop through the frequency map and find the most and least frequent colors
    for (let [hex, frequency] of colorFrequencyMap.entries()) {
        // Update the max and min frequency and the corresponding colors
        if (frequency > maxFrequency) {
            maxFrequency = frequency;
            mostFrequentColor = Color.fromHex(hex);
        }
        if (frequency < minFrequency) {
            minFrequency = frequency;
            leastFrequentColor = Color.fromHex(hex);
        }
    }

    // Return an object with the statistics as properties
    return {
        averageColor,
        lightestColor: lightestColor!,
        darkestColor: darkestColor!,
        mostFrequentColor: mostFrequentColor!,
        leastFrequentColor: leastFrequentColor!,
    };
}

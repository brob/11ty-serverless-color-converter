const { EleventyServerlessBundlerPlugin } = require("@11ty/eleventy");
// Require the package we just installed
const convert = require('color-convert');
module.exports = function (eleventyConfig) {

  eleventyConfig.addPlugin(EleventyServerlessBundlerPlugin, {
    name: "color", // The serverless function name from your permalink object
    functionsDir: "./netlify/functions/",
  });

  eleventyConfig.addFilter("convert", function (color, type) {
    // Our conversion targets
    const colorSpaces = [
      "rgb", "hsl", "hex", "lch"
    ]
    // Map over the conversion targets and convert
    // based on the type and color provided
    // Full details on how this package work can be found
    // here: https://www.npmjs.com/package/color-convert
    const conversions = colorSpaces.map(space => {
      // Since we can't convert a hex to a hex
      // We protect with this boolean value
      const doWrite = type != space
      // Create the conversion value if doWrite is true
      const conversion = doWrite ? convert[type][space](color.toLowerCase()) : ''
      // Return a list item with the text we want to show on the frontend
      // And then join the map we're in
      return doWrite ? `<li>
        ${space}: <code>${conversion}</code>
        </li>
    ` : ''
    }).join('')

    // Return an unordered list (or whatever markup you want)
    return `<ul>
        ${conversions}
      </ul>`
  });
};
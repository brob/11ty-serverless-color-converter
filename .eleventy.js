const { EleventyServerlessBundlerPlugin } = require("@11ty/eleventy");
const convert = require('color-convert');
module.exports = function(eleventyConfig) {

  eleventyConfig.addPlugin(EleventyServerlessBundlerPlugin, {
    name: "color", // The serverless function name from your permalink object
    functionsDir: "./netlify/functions/",
  });

  const colorSpaces = [
      "rgb", "hsl", "hex", "lch"
  ]
  eleventyConfig.addFilter("convert", function(color,type) { 

      const conversions = colorSpaces.map(space => {
        const doWrite = type != space
        const conversion = doWrite ? convert[type][space](color.toLowerCase()) : ''
        return doWrite ? `<li>
        ${space}: <code>${conversion}</code>
        </li>
    ` : ''}).join('')
      
      
      return `<ul>
        ${conversions}
      </ul>`
    });

};
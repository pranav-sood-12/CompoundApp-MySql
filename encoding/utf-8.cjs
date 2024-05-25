const fs = require('fs');
const iconv = require('iconv-lite');

// Define the path to the input file and output file
const inputFilePath = './compound.csv';
const outputFilePath = './encoded-compound.csv';

// Read the file
fs.readFile(inputFilePath, (err, data) => {
  if (err) throw err;

  // Convert the buffer to a string with the correct encoding using iconv-lite
  const content = iconv.decode(data, 'win1252'); // Use 'win1252' for Windows-1252 encoding

  // Write the string to a new file with UTF-8 encoding
  fs.writeFile(outputFilePath, content, 'utf8', (err) => {
    if (err) throw err;
    console.log('The file has been saved with UTF-8 encoding!');
  });
});

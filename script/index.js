
const fs = require('fs');
const http = require('http');

let lengthOfFiles = {};
let ip = '';

http.get({'host': 'api.ipify.org', 'port': 80, 'path': '/'}, function(resp) {
    resp.on('data', function(ipa) {
      ip = ipa;
    });
  });

  
fs.readdir('/home/data', (error, content) => {
    if (error) throw error;
    const files = content.filter((file) => file.includes('.txt'));
    files.forEach((file) => {
        fs.readFile('/home/data/' +file, (error, content) => {
            if (error) throw error;
            lengthOfFiles[file] = content.toString().split(' ').length;
        });
    })

    setTimeout(() => {
        const counts = Object.values(lengthOfFiles);
        const sum = counts.reduce((val, acc) => val + acc, 0);
        let maxCount = Math.max(...counts);
        let fileName = Object.keys(lengthOfFiles).find(key => lengthOfFiles[key] === maxCount);
        let filesInfo = '';
        for (const key in lengthOfFiles) {
            filesInfo = filesInfo + `${key}: ${lengthOfFiles[key]}\n`
        }
        let resultContent = `All the files and their respective word counts are: \n${filesInfo} \nFile with the maximum word count is ${fileName} with the word count: ${maxCount} \nTotal sum of word counts of all the files in the directory is: ${sum} \nIP Address of the Machine is: ${ip}`;
        fs.mkdir('/home/output', { recursive: true }, (err) => {
            if (err) throw err;
            setTimeout(() => {
                fs.writeFile('/home/output/result.txt', resultContent, (err) => { if (err) { throw err; }; });
            }, 300);
            console.log('Result.txt File Content:', resultContent);
        });
    }, 900);
});


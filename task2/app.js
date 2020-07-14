var XLSX = require("xlsx");
const fs = require("fs")
var workbook = XLSX.readFile("sample.xlsx");
var sheet_name_list = workbook.SheetNames;
var xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
let allBlocks = [];
let blocklist = [];
let blockname = 'BLOCK-1';
xlData.forEach(element => {
  let temp = {};
  Object.keys(element).forEach(e => {
    if (e.includes("BLOCK")) {
      if (element[e].includes("BLOCK")) {
       if (blocklist.indexOf(element[e]) === -1) {
        blocklist.push(element[e]);
      }
        blockname = element[e]
      } else {
        temp["block"] = blockname;
        temp["blockname"] = element[e];
        temp["data"] = { ...element };
        delete temp.data[e];
        if (blocklist.indexOf(e) === -1) {
          blocklist.push(e);
        }
       
      }
    }
  });
  allBlocks.push(temp);
});
let finalData = [];
blocklist.forEach(data => {
  let temp = allBlocks.filter(e => e.block == data);
  let obj = {};
  obj["name"] = data;
  obj["data"] = {};
  temp.forEach(record => {
    obj.data[record.blockname] = record.data;
  });
  finalData.push(obj);
});

fs.writeFileSync("outputdata.json",JSON.stringify(finalData,0,4),(err)=>{
    if(err){
        console.log(err)
    }
    console.log("Data exported")
})
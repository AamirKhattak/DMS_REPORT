import data from "./json/dms_data";
import dmsRptExcelHelpers from "./helper-dms-excel-report";

//-----------------------------------------
let startDate = "2022-09-01";
let endDate = "2022-10-10";

const departments = [
  "CSR",
  "Commercial",
  "Communication",
  "Corporate Affairs",
  "Exploration (TDL)",
  "Finance & Accounts",
  "HR",
  "MD Secretariat",
  "Plants & Process",
  "SCM",
  "Systems",
  "Administration",
  "Drilling Cementation Services",
  "Drilling Fluid Services",
  "Drilling Operations",
  "Drilling Stimulation Services",
  "HSEQ",
  "Legal Services",
];
const months = [
  "",
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function getUnique(arr, property) {
  let unique = [];

  arr.forEach((row) => {
    let curr = row[property];
    if (!unique.includes(curr)) {
      unique.push(curr);
    }
  });
  return unique;
}
let DB_DATA = data;

console.log(DB_DATA);

excel(DB_DATA);

//*************************REPORT FORMTING */

function excel(DB_DATA) {
  // Require library
  var xl = require("excel4node");

  // Create a new instance of a Workbook class
  var wb = new xl.Workbook();

  // Add Worksheets to the workbook
  var ws = wb.addWorksheet("DMS Report");
  // var ws2 = wb.addWorksheet('Sheet 2');

  // Create a reusable style
  var style = wb.createStyle({
    font: {
      color: "#000000",
      size: 12,
    },
    numberFormat: "$#,##0.00; ($#,##0.00); -",
  });

  var deptStyle = wb.createStyle({
    font: {
      color: "#000000",
      size: 14,
      bold: true,
    },
  });

  var headerStyle = wb.createStyle({
    font: {
      color: "#000000",
      size: 14,
      bold: true,
    },
    alignment: {
      // §18.8.1
      horizontal: "center",
    },
  });
  //---------------------------------------------

  ws.column(1).setWidth(25);
  ws.column(2).setWidth(25);

  // Set value of cell A1 to 100 as a number type styled with paramaters of style
  ws.cell(1, 1, 1, 5, true)
    .string("Document Management System(DMS)")
    .style(headerStyle);

  ws.cell(2, 1, 2, 5, true)
    .string(`Usage Report from ${startDate} to ${endDate}`)
    .style(headerStyle);

  ws.cell(4, 1).string("Department").style(deptStyle);

  /*printing months*/
  const db_months = getUnique(DB_DATA, "MONTH").sort((a, b) => a - b);

  console.log(db_months);
  const MSExcelColumns = [
    "",
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
  ];

  let r = 1; //row
  let c = 1; //col

  r = 5;
  c = 3;

  let monthCols = [];//dmsRptExcelHelpers.writeMonths(ws, db_months, months, r, c);
  // display month names
  db_months.forEach((row) => {
    ws.cell(r, c).string(months[row]);
    monthCols[months[row]] = c;
    c++;
  });

  //Month header, all the months would be below it
  ws.cell(4, 3, 4, c - 1, true)
    .string("Month")
    .style(headerStyle);

  r = 4; //row
  c = 1; //col

  let prevDept = { name: "", startRow: 4 };
  let prevSubSec = "";
  let isDeptWithoutSubSections = false;
  DB_DATA.forEach((row, currIdx) => {
    // prevDept.name !== "" => to not display total at start of printing
    // prevDept.name !== row.DEPARTMENT => when not new department
    // currIdx === (DB_DATA.length - 1 => to display total for last department
    if ((prevDept.name !== "" && prevDept.name !== row.DEPARTMENT && !isDeptWithoutSubSections) || currIdx === (DB_DATA.length - 1)) {
      //calculate total of each department
      r = r + 1;
      c = 2;
      ws.cell(r, c).string("Total");

      ws.cell(r, c + 1).formula(`sum(C${prevDept.startRow}:C${r - 1} )`);

      for (let i = 0; i < Object.keys(monthCols).length; i++) {
        c = c + 1;
        let currKey = Object.keys(monthCols)[i];
        // console.log(monthCols[currKey])
        let currECol = MSExcelColumns[monthCols[currKey]];

        ws.cell(r, c).formula(
          `sum(${currECol}${prevDept.startRow}:${currECol}${r - 1} )`
        );
      }
    }
    if (prevDept.name !== row.DEPARTMENT) {
      //write dept name to excel

      r = r + 2;
      c = 1;

      prevDept.startRow = r;

      isDeptWithoutSubSections = row.SUBSECTION === row.DEPARTMENT;


      ws.cell(r, c).string(row.DEPARTMENT).style(deptStyle);
      ws.cell(r, ++c).string(
        isDeptWithoutSubSections ? "Total" : row.SUBSECTION
      );

      //TODO
      //fill zero count for every month
      for (let i = 0; i < Object.keys(monthCols).length; i++) {
        let currKey = Object.keys(monthCols)[i];
        // console.log(monthCols[currKey])
        ws.cell(r, monthCols[currKey]).number(0);
      }
    } else if (prevSubSec !== row.SUBSECTION) {
      c = 2;
      r++;

      ws.cell(r, c).string(row.SUBSECTION);

      //TODO
      //fill zero count for every month
      for (let i = 0; i < Object.keys(monthCols).length; i++) {
        let currKey = Object.keys(monthCols)[i];
        // console.log(monthCols[currKey])
        ws.cell(r, monthCols[currKey]).number(0);
      }
    }

    // ws.cell(r,++c).number(row.DOC_COUNT);
    // ws.cell(r,++c).string(row.MONTHNAME);
    ws.cell(r, monthCols[row.MONTHNAME]).number(row.DOC_COUNT);

    prevDept.name = row.DEPARTMENT;
    prevSubSec = row.SUBSECTION;
  });

  //get unique departments that have some data uploaded by users
  const deptWithData = getUnique(DB_DATA, "DEPARTMENT");

  //find departments with null data
  let deptWithZeroUploads = [];
  departments.forEach((dept) => {
    for (let i = 0; i < deptWithData.length; i++) {
      if (dept === deptWithData[i]) {
        break;
      } else if (i === deptWithData.length - 1) {
        deptWithZeroUploads.push(dept);
      }
    }
  });

  console.log(deptWithData);
  console.log("deptWithZeroUploads", deptWithZeroUploads);
  c = 1;
  r = r + 2;
  ws.cell(r, c)
    .string("Departments with ZERO uploads.")
    .style(
      wb.createStyle({
        font: {
          color: "red",
          size: 14,
          bold: true,
        },
      })
    );
  r++;
  deptWithZeroUploads.forEach((dept) => {
    ws.cell(r, c).string(dept).style(deptStyle);
    r++;
  });

  wb.write(
    `pdfs/DMS Usage Report ${startDate} to ${endDate} - ${new Date().getTime()}.xlsx`
  );
}

// function pdf (data) {
//   var fonts = {
//     Roboto: {
//       normal: 'fonts/Roboto-Regular.ttf',
//       bold: 'fonts/Roboto-Medium.ttf',
//       italics: 'fonts/Roboto-Italic.ttf',
//       bolditalics: 'fonts/Roboto-MediumItalic.ttf'
//     }
//   };

//   var PdfPrinter = require('pdfmake');
//   var printer = new PdfPrinter(fonts);
//   var fs = require('fs');

//   let formattedData = [];

//   for(i=0; i<(data.length-1); i+2){
//     let curr = data[i];
//     let curr_next = data[i+1];
//     formattedData.push([`${curr.DEPARTMENT}, ${curr.DOC_COUNT}, ${curr_next.DOC_COUNT}`])
//   }

//   console.log(formattedData);
//   var docDefinition = {
//     content: [
//       {text: 'Document Management System(DMS)', style: 'header'},
//       {text: 'Usage Report June & June 2021', style: 'subheader'},
//       {
//         table: {
// 				body: [
// 					['Department', 'Month', 'Month'],
//           ]
// 			}
//     }
//     ],
//     styles: {
//       header: {
//         fontSize: 18,
//         bold: true,
//         margin: [0, 0, 0, 10],
//         alignment: 'center'
//       },
//       subheader: {
//         fontSize: 16,
//         bold: true,
//         margin: [0, 10, 0, 5],
//         alignment: 'center'
//       }
//     }
//   };

//   var pdfDoc = printer.createPdfKitDocument(docDefinition);
//   pdfDoc.pipe(fs.createWriteStream('pdfs/basics.pdf'));
//   pdfDoc.end();
// }


const writeMonths= (ws, db_months, months, r, c,) => {
    // write months to excel sheet
    // sideeffects:
    // save reference to month columns i.e Jan: B5, Feb: C5 etc
    // updates current column count
    let indexMonthCols = [];
    db_months.forEach((row) => {
        ws.cell(r, c).string(months[row]);
        indexMonthCols[months[row]] = c;
        c++;
      });
    return {indexMonthCols, c};
}


export default {writeMonths}
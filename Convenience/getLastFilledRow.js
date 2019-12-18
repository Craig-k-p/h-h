/** UPDATED 9.28.18 21:1
	getLastFilledRow( sheet_reference, column_letter_string )
		get the maximum rows in the sheet and get all the values in those rows
		loop from the last row until there is a row without an empty string
		return the last row
		*/


function getLastFilledRow(ss, column) {
  
  // Get the max number of rows in sheet
  // Get the cell values using the last_row variable
  
  var last_row = ss.getMaxRows();
  var values = ss.getRange(column + "1:" + column + last_row).getValues();

  // Loop until a row doesn't match an empty string
  
  for (; values[last_row - 1] == "" && last_row > 0; last_row--) {}
  
//  Logger.log( 'Last Row > getLastFilledRow > last_row = ' + last_row.toString() )
  
  return last_row
}

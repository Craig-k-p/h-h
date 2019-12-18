/** UPDATED: 9.30.18 18:36
    UNIVERSAL
    findRowHeadings( spreadsheet, heading_column_as_string, start_row )
        Find row strings
        match with row number
        put into a dictionary hash
        return the dictionary - i.e. ("row heading" : 1)
 */


function findRowHeadings( ss, heading_column, start_row, UPPERCASE  ) {
  
  var logg = true
  if (logg == true) Logger.log('fRH: -----Function findRowHeadings( logg, ss, heading_column, start_row )-----')
  
  // Get the last row with a value
  if (logg == true) Logger.log('fRH: Getting the last filled row...')
  var last_row = getLastFilledRow( ss, heading_column ).toString()
  if (logg == true) Logger.log('fRH: Done. Found to be ' + last_row)
  
  // Get the headings and store them as a list
  // Create the dictionary that will be used next
  if (logg == true) Logger.log('fRH: Getting the row headings from the start row to the last row and creating empty dictionary.')
  var headings = ss.getRange( heading_column + start_row.toString() + ':' + heading_column + last_row ).getDisplayValues()
  var headings_hash = { }
  if (logg == true) Logger.log('fRH: Done. Headings found as ' + headings)  
  

  if (UPPERCASE == true){
    // Loop through the headings and assign their column values
    if (logg == true) Logger.log('fRH: Filling dictionary with UPPERCASE headings and row numbers...')
    for ( n = 0; n < headings.length; n++ )   headings_hash[ headings[n].toString().toUpperCase() ] = n + start_row 
    if (logg == true) Logger.log('fRH: Done.')
  }

  else{
    // Loop through the headings and assign their column values
    if (logg == true) Logger.log('fRH: Filling dictionary with headings and row numbers...')
    for ( n = 0; n < headings.length; n++ )   headings_hash[ headings[n] ] = n + start_row 
    if (logg == true) Logger.log('fRH: Done.')
  }

  if (logg == true) Logger.log('nD: ----EXITING Function nameDoc()----')
  return headings_hash
  
}

/** UPDATED: 9.29.18 18:50   
    UNIVERSAL
    findColumnHeadings( spreadsheet, heading_row_as_string )
        Find heading strings
        match with column number
        put into a dictionary hash
        return the dictionary - i.e. ("column heading" : 1)
        */


function findColumnHeadings( ss, heading_row  ) {
  // Get the headings and store them as a list
  // Create the dictionary that will be used next
  
  var logg = true
  if (logg == true) Logger.log('findColHeads: -----function findColumnHeadings( logg, ss, heading_row )-----')
  
  if (logg == true) Logger.log('findColHeads: Getting headings...')
  var headings = ss.getRange( 'A' + heading_row + ':' + heading_row ).getValues()
  if (logg == true) Logger.log('findColHeads: Done. Got: ' + headings[0].toString() )
  if (logg == true) Logger.log('findColHeads: Number of heading boxes: '   + headings[0].length.toString() )
  
  if (logg == true) Logger.log('findColHeads: Creating headings_hash...')
  var headings_hash = { }
  if (logg == true) Logger.log('findColHeads: Done.')
  

  // Loop through the headings and assign their column values
  if (logg == true) Logger.log('findColHeads: Filling headaings_hash...')
  for ( n = 0; n < headings[0].length; n++ ) {

    // If there is no value in the box.. skip it
    if (logg == true) Logger.log('findColHeads: (loop) Checking for value..')
    if (headings[0][n] == '') {
      if (logg == true) Logger.log('findColHeads: (loop) No value found. Skipping component ' + (n+1).toString())
      continue
    }

    if (logg == true) Logger.log('findColHeads: (loop) Value found. Adding component ' + (n+1).toString())
    headings_hash[ headings[0][n] ] = n + 1  
  }

  if (logg == true) Logger.log('findColHeads: Col of "Name/Company" heading: ' + headings_hash['Name/Company'].toString() )


  if (logg == true) Logger.log('findColHeads: ----EXITING Function findColumnHeadings()----')
  
  return headings_hash
}

/**   UPDATED 12/8/18 19:19
      UNIVERSAL

"Functions to help the user quickly edit the spreadsheet"

    editAssist( spreadsheet, section )
        Add empty but formatted lines underneath edited rows
        
    findFormat( spreadsheet, section )
        Find the default format of the sheet section
       return information
 */

function editAssist(e, ss, section_heading) {
  
  Logger.log('editAssist: -----Function editAssist( {0}, \n\t{1}, \n\t{2} )-----'.format(e.range.getRow(), ss, section_heading))
  
  if (e.range.getColumn() == 1){
    
    var unit_cost_col = 'H'
    var price_col     = 'I'
    var qty_col       = 'G'
    
    var logg = true
    // Get the number of rows in the spreadsheet
    var last_row = ss.getMaxRows()
    if (logg == true) Logger.log('editAssist: The last row of the spreadsheet is {0}'.format(last_row))
    
    // Get the values in these rows
    var values = ss.getRange("A1:" + "A" + last_row).getValues()
    if (logg == true) Logger.log('editAssist: Column A row values are: {0}'.format(values))
    
    // Find the section to check/edit
    var section_start = null
    var section_end   = null
    var row = 0
    if (logg == true) Logger.log('editAssist: Created section_start, section_end, and row variables')
    
    // Loop thru column A values to find the start and end of the section
    if (logg == true) Logger.log('editAssist: Beginning while loop to find section bounds...')
    while ( (section_start == null) || (section_end == null) ){
      
      if (section_start == null){
        // if the value matches the section heading
        if (values[ row ] == section_heading){
          if (logg == true) Logger.log('editAssist: Section heading found on row {0}!'.format(row + 1))
          var section_start = row + 2
          if (logg == true) Logger.log('editAssist: section_start set to {0}'.format(section_start))
          }
      }
  
      if (section_end == null){
        // If the end value is found
        if (values[ row ] == 'end {0}'.format(section_heading)){
          if (logg == true) Logger.log('editAssist: Section end found on row {0}!'.format(row + 1))
          var section_end = row
          if (logg == true) Logger.log('editAssist: section_end set to {0}'.format(section_end))
        }
      }
      row = row + 1
    }
    
    // Return false if the edit was out of range
    if ((e.range.getRow() < section_start) || (e.range.getRow() > section_end) ) {
      if (logg == true) Logger.log('editAssist: The edit was out of range (row {0})'.format(e.range.getRow()))
      return false
    }
    
    else if (e.range.getRow() == section_end ){
      
      if (logg == true) Logger.log('editAssist: Edited row appears to be the last row')
      
      var new_row = section_end + 1
      
      // Insert a new row at the end
      ss.insertRowAfter( section_end )
      if (logg == true) Logger.log('editAssist: New row inserted in position {0}'.format(new_row))
      
      // Copy the row above the new row and paste it's format below
      ss.getRange( '{0}:{0}'.format( section_end ) )
        .copyTo( ss.getRange( '{0}:{0}'.format( new_row )), {formatOnly:true} )
      
      if (logg == true) Logger.log('editAssist: The new row was given the format of the above row')
      
      if ( section_heading == 'Labour'){
        if (logg == true) Logger.log('editAssist: Returning true...')
        return true
      }
      else {
        // Put the proper formulas in the new row
        ss.getRange( '{0}{1}'.format(unit_cost_col, new_row) )
          .setValue( '={0}{2}/{1}{2}'.format( price_col, qty_col, new_row  ) )
        
        ss.getRange( '{0}{1}'.format(price_col, new_row) )
          .setValue( '={0}{2}*{1}{2}'.format( unit_cost_col, qty_col, new_row  ) )
        if (logg == true) Logger.log('editAssist: The new row was given formulas for the unit cost and price columns')
        
        if (logg == true) Logger.log('editAssist: Returning true...')
        return true
      }
    }
    
    else {
      if (logg == true) Logger.log('editAssist: It does not look like the user needs a new row')
      return false
    }
  }
  else if (logg == true) Logger.log('editAssist: Edit not in column A. It does not look like the user needs a new row')
}

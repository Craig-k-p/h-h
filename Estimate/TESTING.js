  var ss = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Estimate')
  
  var notes_test = 'NOTES'
  var notes_col  = 'A'
  var unit_cost_col  = 'H'
  var price_col      = 'I'
  var qty_col        = 'G'
  var entry_sections = ['Materials', 'Labour']
  var rows_to_check  = {}
  var rows_to_check.materials = []
  var rows_to_check.labour = []
  
  
  var logg = true
  // Get the number of rows/columns in the spreadsheet
  var last_row = ss.getMaxRows()
  var last_col = ss.getMaxColumns()
  if (logg == true) Logger.log('cleanup: The last row and col of the spreadsheet is {0} and {1}'.format(last_row, last_col))
  
  // Get the values in these rows
  var values = ss.getRange("A1:" + "A" + last_row).getValues()
  
  // Set the flag
  var check_these = false
  var section = 'Materials'

  // Loop through the rows 
  for (r = 10; r < last_row; r++ ){

    if (ss.getRange( r-1, 1 ).getValue() == entry_sections[0] || ss.getRange( r-1, 1 ).getValue() == entry_sections[1]){
      check_these = true
      if (logg == true) Logger.log('cleanup: check_these set to true')
    }
    else if (ss.getRange( r, 1 ).getValue() == 'end '+entry_sections[0] || ss.getRange( r, 1 ).getValue() == 'end '+entry_sections[1]){
      check_these = false
      if (logg == true) Logger.log('cleanup: check_these set to false')
    }

    if (check_these == true && section == 'Materials' ){
      rows_to_check.materials.push( r )
      if (logg == true) Logger.log('cleanup: Pushed row {0} to rows_to_check.materials'.format(r))
    }
    else if (check_these == true && section == 'Labour'){
      rows_to_check.labour.push( r )
      if (logg == true) Logger.log('cleanup: Pushed row {0} to rows_to_check.labour'.format(r))
    }
  }
  Logger.log(rows_to_check)
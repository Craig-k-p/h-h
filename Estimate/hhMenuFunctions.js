/**  UPDATED 1/2/19 20:40
      ESTIMATE
    
    finalFormat()
    sendToOffice()
    sendToClient()
    
    get the range of rows
    get the section rows
    search thru each row for an empty material and total cost box
    
    
    
*/

function cleanup() {
  Logger.log('cleanup: -----Function cleanup()-----')

  var logg = true
  var info_cells = [ ['name', 'A11', '(NAME HERE)'],
  ['phone', 'A12', '1112223333'],
  ['address line 1', 'C11', '(LINE 1)'],
  ['address line 2', 'C12', '(LINE 2)'],
  ['project', 'E11', '(Bathroom?)'],
  ['email','G11', '(EMAIL@EMAIL.COM)'],
  ['email 2', 'G12', '(EMAIL_2@EMAIL_2.COM)']
  ]

  var row_values = [ ]
  var rows_deleted = 0
  var empty_client_cells_str = ''
  var count_empty_client_cells = 0

  // Set default column variables
  var unit_cost_col = 8
  var price_col     = 9

  // Create variable for the default entry sections to check for empty rows and an empty list for the rows that are found
  var entry_sections = ['Materials', 'Labour']
  var rows_to_check = [ ]

  // Used to determine if the cell must be tested or not
  var check_this = false

  // Get the Estimate sheet to edit
  var ss = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Estimate')
  
  
  // Get the number of rows and columns in the spreadsheet
  var num_rows = ss.getMaxRows()
  var num_cols = ss.getMaxColumns()
  if (logg == true) Logger.log('cleanup: The last row of the spreadsheet is {0}'.format(num_rows))
  if (logg == true) Logger.log('cleanup: The last column of the spreadsheet is {0}'.format(num_cols))
  

  // Search thru the rows starting on row 10 to save time
  // r must be less than the last row
  // r increments by one
  for (r = 10; r < num_rows; r++ ){

    // If the row above the current row is a section title...
    if (ss.getRange( r-1, 1 ).getValue() == entry_sections[0] || ss.getRange( r-1, 1 ).getValue() == entry_sections[1]){
      check_this = true
      if (logg == true) Logger.log('cleanup: Row heading found - check_this set to true')
    }
    // If the row is an end section label...
    else if ( (ss.getRange( r, 1 ).getValue() == 'end '+entry_sections[0]) || (ss.getRange( r, 1 ).getValue() == 'end '+entry_sections[1]) )  {
      check_this = false
      if (logg == true) Logger.log('cleanup: Row end label found - check_this set to false')
    }

    // If check_this is true...
    if (check_this == true){
      // Push the current row to the list of rows to check
      rows_to_check.push( r )
      if (logg == true) Logger.log('cleanup: Pushed row {0} to rows_to_check'.format(r))
    }
  }
  if (logg == true) Logger.log(rows_to_check)


  // getValues() would have acheived similar, but the separation of the rows is a problem.  Workaround:
  // i starts at the last value of rows_to_check
  // i is greater than or equal to 0
  // i increments down by one
  for (i = rows_to_check.length - 1; i >= 0; i-- ){

    // Check the first cell of the row.  If it is empty, delete it
    if (logg == true) Logger.log('cleanup: Checking row {0}'.format(rows_to_check[i]))
    if (logg == true) Logger.log('cleanup: Got value {0}'.format(ss.getRange(rows_to_check[i], 1).getValue()))
    if (ss.getRange(rows_to_check[i], 1).getValue() === ''){
      ss.deleteRow( rows_to_check[i] )
      if (logg == true) Logger.log('cleanup: Row {0} deleted'.format(rows_to_check[i]))
      rows_deleted = rows_deleted + 1
    }
  }

  // Check the notes box for any notes.  If not delete the default.
  var num_cols = ss.getMaxRows()
  var notes_cell = ss.getRange( num_cols-5, 1 )
  if (logg == true) Logger.log('cleanup: Checking notes cell... got {0}.'.format(notes_cell.getA1Notation() ))
  if ( notes_cell.getValue() == 'Notes:\n\nPress [control] + [enter] to make a new line within one big box' ){
    notes_cell.clearContent()
    if (logg == true) Logger.log('cleanup: Found notes were not entered.  Cell cleared.')
  }

  // Check the customer information cells for entries
  for (i = 0; i < info_cells.length; i++){
    if (ss.getRange( info_cells[i][1] ).getValue() === info_cells[i][2] || ss.getRange( info_cells[i][1] ).getValue() == '' ){

      if (logg == true) Logger.log('cleanup: Found empty client cell')

      if (count_empty_client_cells > 0){
        empty_client_cells_str = empty_client_cells_str + '\n\t-{0}'.format(info_cells[i][0])
        count_empty_client_cells = count_empty_client_cells + 1
      }
      else{
        empty_client_cells_str = ':\n\t-' + info_cells[i][0]
        count_empty_client_cells = count_empty_client_cells + 1
      }
    }
  }

  if (ss.getRange( info_cells[1][1] ).getValue() === info_cells[1][2] ){
    ss.getRange( info_cells[1][1] ).clear()
  }


  var msg = '*{0} rows have been deleted by Cleanup\n*Found {1} empty/unchanged client cell(s){2}'.format(rows_deleted, count_empty_client_cells, empty_client_cells_str)

  messageAlert( msg )

}



function sendToOffice() {
  
}

function sendToClient() {
  
}


function createInvoice(){
  Logger.log('createInvoice: -----Function createInvoice()-----')

  var logg = true
  
  var s = '<a href="{0}"><h1>Please wait for script to finish...</h1></a>'.format(invoice_url, client)
  SpreadsheetApp.getUi().showModalDialog(HtmlService.createHtmlOutput(s), 'Creating Invoice')
  
  if (logg == true) Logger.log('createInvoice: Creating an invoice from the spreadsheet...')
  if (logg == true) Logger.log('createInvoice: Creating variables for the function..')

  var invoice_folder = DriveApp.getFolderById( getDefault('invoice folder id', 'files') )
  var invoice_template = DriveApp.getFileByUrl( getDefault('invoice url', 'files') )
  var invoice_file = invoice_template.makeCopy( invoice_folder )
  var invoice_url = invoice_file.getUrl()

  if (logg == true) Logger.log('createInvoice: Created invoice variables and made a copy of the invoice')

  var estimate_ss = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Estimate')
  var invoice_ss  = SpreadsheetApp.openByUrl( invoice_url )

  var estimate_ss  // get the variables using getDefault('default', true)
  // var phone  = estimate_ss.getRange( getDefault('phone', false) ).getValue()
  var client = estimate_ss.getRange( getDefault('client', 'estimate') ).getValue()
  var addr1  = estimate_ss.getRange( getDefault('address line 1', 'estimate') ).getValue()
  var addr2  = estimate_ss.getRange( getDefault('address line 2', 'estimate') ).getValue()
  var project= estimate_ss.getRange( getDefault('project', 'estimate') ).getValue()
  var email  = estimate_ss.getRange( getDefault('email', 'estimate') ).getValue()

  // invoice_ss.getRange( getDefault('phone', true) ).setValue( phone )
  invoice_ss.getRange( getDefault('client', 'invoice') ).setValue( client )
  invoice_ss.getRange( getDefault('address line 1', 'invoice') ).setValue( addr1 )
  invoice_ss.getRange( getDefault('address line 2', 'invoice') ).setValue( addr2 )
  invoice_ss.getRange( getDefault('project', 'invoice') ).setValue( project )
  invoice_ss.getRange( getDefault('email', 'invoice') ).setValue( email )

  var s = '<a href="{0}" target="_blank"><h1>Click here to go to {1}\'s new Invoice</h1></a>'.format(invoice_url, client)
  SpreadsheetApp.getUi().showModalDialog(HtmlService.createHtmlOutput(s), 'Invoice Created')

  // if (logg == true) Logger.log('createInvoice: ')

}

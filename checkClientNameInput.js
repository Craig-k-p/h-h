// To open other spreadsheets, OnEdit() must be an installed trigger.
// Edit > Current Project's Triggers > (OnEdit - From SpreadSheet - OnEdit)

function checkClientNameInput( logg, invoice, e ) {
  if (logg = true) Logger.log('ncCNI: -----Function checkClientNameInput( logg, invoice, e )-----')
  
  // This is the event object passed from the original OnEdit() call
  if (logg = true) Logger.log('cCNI: Getting the event location...')
  var event_A1 = e.range.getA1Notation()
  if (logg = true) Logger.log('cCNI: Done.')
  
  // If the event object happened at A11 (client name box)..
  if ( event_A1 == 'A11' ) {
    if (logg = true) Logger.log('cCNI: New client entry detected at ' + event_A1)
    
    // Get the client name
    if (logg = true) Logger.log('cCNI: Getting the entered client name...')
    client = invoice.getRange( event_A1 ).getValue()
    if (logg = true) Logger.log('cCNI: Done. Client name is ' + client)
    
    
    
    // Open the data document in the background and then get the first collumn of values
    // This requires an installed trigger to be active - See top of document
    if (logg = true) Logger.log('cCNI: Retrieving resource (step 1/3)...')
    var data_doc = SpreadsheetApp.openByUrl('https://docs.google.com/spreadsheets/d/1LuWvnbQii9gh_0PDYcWGkvGp_Hsn4XRzPpJCPWwInJY/edit#gid=798032061')
    if (logg = true) Logger.log('cCNI: Done.')
    if (logg = true) Logger.log('cCNI: Retrieving data (step 2/3)...')
    var clients_sheet = data_doc.getSheetByName('Sheet2')
    var clients_data = data_doc.getSheetByName('Sheet2').getRange('A2:A').getValues()
    if (logg = true) Logger.log('cCNI: Done.')
    if (logg = true) Logger.log('cCNI: Retrieving other data (step 3/3)...')
    var clients_data_other = data_doc.getSheetByName('Sheet2').getRange('B2:B').getValues()
    if (logg = true) Logger.log('cCNI: Done.')
    
    if (logg = true) Logger.log('cCNI: ' + clients_data)
    if (logg = true) Logger.log('cCNI: datatype of "data" has been found to be: ' + typeof(clients_data[18][0].toString()) )
    
    // Set a flag to check if client data was found
    if (logg = true) Logger.log('cCNI: Setting "client found" flag...')
    var client_data_found = false
    if (logg = true) Logger.log('cCNI: Done.')
    
    // Loop through client names to find client data if it is available
    if (logg = true) Logger.log('cCNI: Looping through data to find client...')
    
    for (frmr_client = 0; frmr_client < clients_data.length; frmr_client++) {
      if (logg = true) Logger.log('cCNI: (loop %s) Found client ' + clients_data[ frmr_client ][0].toString(), frmr_client)
      if ( client == clients_data[ frmr_client ][0].toString() ) {
        var client_data_row = frmr_client
        if (logg = true) Logger.log('cCNI: ' + client + ' found on line ' + frmr_client.toString() )
        var client_data_found = true
        break
      }
      //if (logg = true) Logger.log('cCNI: end')
    }
    
    
    if (client_data_found == true){
      if (logg = true) Logger.log('cCNI: --Client info found--')

      // Get client's information and put it into the spreadsheet
      if (logg = true) Logger.log('cCNI: Proceeding to find and fill client data...')
      getClientData( logg, clients_sheet, client_data_row, client_data_row )


    } 
    else{
      if (logg = true) Logger.log('cCNI: --Client info NOT found--')
    }

  }
    
  else {
    if (logg = true) Logger.log('cCNI: No lookup required for box A11. Event location: ' + event_A1 )
  }
  if (logg = true) Logger.log('cCNI: ----EXITING Function checkClientNameInput()----')
}




function getClientData( logg, clients_sheet, client_data_row, heading_row ){

  if (logg = true) Logger.log('gCD: -----function getClientData( logg, clients_sheet, client_data_row, heading_row )-----')
  
  // Find the column headings for client data
  // This will allow for sorting the data
  if (logg = true) Logger.log('gCD: Setting heading_row to 1 and looking for headings...')
  var heading_row = 1
  var headings_hash = findColumnHeadings( logg, clients_sheet, heading_row )
  if (logg = true) Logger.log('gCD: Done. Headings found.')

  if (logg = true) Logger.log('gCD: Assigning Name/Company...')
  if (logg = true) Logger.log('gCD: Column is ' + headings_hash['Name/Company'].toString())
  headings_hash['Name/Company'] = clients_sheet.getRange( numToLetter( headings_hash['Name/Company'] ).toString() + client_data_row.toString())
  headings_hash['Name/Company'] = headings_hash['Name/Company'].getValue().toString()
  if (logg = true) Logger.log('gCD: Done.  Assigned as %s', headings_hash["Name/Company"])
  



if (logg = true) Logger.log('gCD: ----EXITING Function getClientData()----')
}






/** UPDATED 10/1/18 20:41
    ESTIMATE
    searchLeute( client_name_string )
      open ssleute sheet
      get the row headings (names) and search through them for client_name+_string
      get the column headings (data) to get client data or fill new client data
      return hash( client_hash, ssleute_sheet_reference, names_hash, headings_hash )
      */



function searchLeute( client ) {
  
  var logg = true
  if (logg == true) Logger.log('sL: ----- Function searchLeute( logg, name )-----')
  
  // Make an upper case version of client for comparison reasons
  var client_upper = client.toUpperCase()

  // Get ssleute and open it
  // Get the names
  if (logg == true) Logger.log('sL: Getting and opening ssleute...')
  var ssleute = DriveApp.getFileById( '1LuWvnbQii9gh_0PDYcWGkvGp_Hsn4XRzPpJCPWwInJY' )
  var ssleute = SpreadsheetApp.open( ssleute )
  if (logg == true) Logger.log('sL: Done. ssleute has been opened.')
  
  // Get the proper sheet and names from the sheet
  if (logg == true) Logger.log('sL: Getting names...')
  var ssleute = ssleute.getSheetByName( 'Sheet2' )
  var names   = findRowHeadings( ssleute, 'A', 2, true )
  if (logg == true) Logger.log('sL: Done. Names found: ' + names)
  
  // Get the headings to reference client data
  if (logg == true) Logger.log('sL: Getting ssleute headings to reference client data...')
  var headings = findColumnHeadings( ssleute, 1, 1 )
  if (logg == true) Logger.log('sL: Done. Headings found: ' + headings)
  
  // Check if client is in the list of names
  if (logg == true) Logger.log('sL: Checking if client ' + client + ' is in the list of names...')
  if ( names.hasOwnProperty(client_upper) ) {
    
    if (logg == true) Logger.log('sL: Done. Client found.')
    
    // Assign client data to variables
    if (logg == true) Logger.log('sL: Assigning client data to variables...')
    var client_row = names[client_upper]
    var email = ssleute.getRange( client_row , headings['Email']          ).getValue()
    var addr1 = ssleute.getRange( client_row , headings['Address Line 1'] ).getValue()
    var addr2 = ssleute.getRange( client_row , headings['Address Line 2'] ).getValue()
    var phone = ssleute.getRange( client_row , headings['Telephone']      ).getValue()
    if (logg == true) Logger.log('sL: Done.')
    
    // Warn when some data is missing
    if (logg == true) Logger.log('sL: Looking for empty strings to replace with "no record"...')
    if (email == '') {
      var email = 'no record'
    }
    if (addr1 == '') {
      var addr1 = 'no record'
    }
    if (addr2 == '') {
      var addr2 = 'no record'
    }
    if (phone == '') {
      var phone = 'no record'
    }
    if (logg == true) Logger.log('sL: Done.')
    
    Logger.log(client)
    
    // Create a dictionary for the client with the found data
    if (logg == true) Logger.log('sL: Creating dictionary of client info...')
    // var client = { name: ssleute.getRange( names[client_upper], headings['Name/Company'] ).getValue(), 
    //               email: email, addr1: addr1, addr2: addr2, phone: phone, row: client_row }
    // if (logg == true) Logger.log('sL: Done.')
    
    if (logg == true) Logger.log('sL: Returning client dictionary and...')
    if (logg == true) Logger.log('sL: ---- EXITING function searchLeute()----')
    // Logger.log(' \n\n')
    // Logger.log(client.email)
    return {found:true,
            client:{ name: ssleute.getRange( names[client_upper], headings['Name/Company'] ).getValue(), 
                    email: email, addr1: addr1, addr2: addr2, phone: phone, row: client_row },
            ssleute:ssleute, 
            names:null, 
            headings:headings}
  }
  // If no client was found
  else {

    // Return the new client hash
    if (logg == true) Logger.log('sL: Client  not found.  Creating data structure for new entry...')
    var client = {name: client, email: 'not recorded', phone: 'not recorded', addr1: 'not recorded', addr2: 'not recorded'}
    if (logg == true) Logger.log('sL: Done.')
    
    var data = {found:false, client:client, ssleute:ssleute, names:names, headings:headings}

    if (logg == true) Logger.log('sL: Returning: ' + data.toString() + '\n\
        ---- EXITING function searchLeute()----')
    return data
  }
}

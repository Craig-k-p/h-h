/** UPDATED 10/2/18 6:45
    ESTIMATE
    fillClientInfo( event_reference, estimate_sheet_reference, info_sheet_reference )
      Assign data cell locations
      Check location of event
      Search for client
      Fill client data if found
        Ask to add client if not found
      Add data to client as it is added
        Ask if data overwrites existing data
      
To open other spreadsheets, OnEdit() must be an installed trigger.
Edit > Current Project's Triggers > (OnEdit - From SpreadSheet - OnEdit)
*/


function fillClientInfo( e, estimate, info ) {
  
  var logg = true
  if (logg == true) Logger.log('fCI: -----Function fillClientInfo( logg, e, estimate, info )-----')
  
  // Assign client, email, addr1, addr2, and phone_cell locations in the "Estimate" sheet
  if (logg == true) Logger.log('fCI: Setting client info locations for "Estimate" sheet')
  var name_cell = 'A11'
  var email_cell = 'A12'
  var addr1_cell = 'C11'
  var addr2_cell = 'C12'
  var phone_cell = 'G11'
  if (logg == true) Logger.log('fCI: Setting client data cell locations for "Estimate" sheet...')
    
  // Get A1 notation of the event's location (user edit location)
  if (logg == true) Logger.log('fCI: Getting event location...')
  var event_A1 = e.range.getA1Notation()
  if (logg == true) Logger.log('fCI: Done. Location was ' + event_A1)
  Logger.log( event_A1 )
  Logger.log( email_cell )
  

  // Proceed to check what client data if any was changed or added
  // Check to see if the name cell was edited
  if (logg == true) Logger.log('fCI: Checking which client cell was edited...')
  if (event_A1 == name_cell){
  
    if (logg == true) Logger.log('fCI: Done. Client name cell was edited.')
    
    //Get the client's name
    if (logg == true) Logger.log('fCI: Assigning client...')
    var name = estimate.getRange( name_cell ).getValue()
    if (logg == true) Logger.log('fCI: Done. Assigned as ' + name)

    
    // Find the client and their information
    if (logg == true) Logger.log('fCI: Beginning search for client info...')
    var leute = searchLeute( name )
    if (logg == true) Logger.log('fCI: Finished searching for client info.')
    
    // If no client was found, ask if the inputed name should be added to the list of clients
    if (logg == true) Logger.log('fCI: Checking if client info was found...')
    if (leute.found == false){
      
      if (logg == true) Logger.log('fCI: Done. No info found.')
      
      // Ask the user if they want to add this client to the database
      if (logg == true) Logger.log('fCI: Asking user if they want to add the new client to the database...')
      var response = confirmAlert( 'Client Data Not Found',
           'Would you like to add ' + leute.client.name + ' and their information to the list of clients?\n\
            If their name is spelt wrong or not capitilized please click "no" and fix.' )
      if (logg == true) Logger.log('fCI: Done. Response was ' + response.toString())
      
      // If the response was in the affirmative
      if (logg == true) Logger.log('fCI: Checking if response was yes...')
      if (response == true){
        
        if (logg == true) Logger.log('fCI: Done. Response was yes!')
        
        if (logg == true) Logger.log('fCI: Creating new row to add customer...')
        var rowLast = leute.ssleute.getLastRow()
        leute.ssleute.insertRowAfter(rowLast)
        if (logg == true) Logger.log('fCI: Done.')
        
        var d = new Date()
        // Add values to the client record
        leute.ssleute.getRange( rowLast+1, leute.headings['Name/Company']   ).setValue( leute.client.name )
        leute.ssleute.getRange( rowLast+1, leute.headings['Email']          ).setValue( leute.client.email )
        leute.ssleute.getRange( rowLast+1, leute.headings['Telephone']      ).setValue( leute.client.phone )
        leute.ssleute.getRange( rowLast+1, leute.headings['Address Line 1'] ).setValue( leute.client.addr1 )
        leute.ssleute.getRange( rowLast+1, leute.headings['Address Line 2'] ).setValue( leute.client.addr2 )
        leute.ssleute.getRange( rowLast+1, leute.headings['Date Added']     ).setValue( (d.getMonth()+1).toString() + '/' + d.getDate().toString() + '/' + d.getFullYear().toString() )
          }

      else {
        if (logg == true) Logger.log('fCI: Response was no.  No client will be added to the database.')
      }
    }

    else if ( leute.found == true ){
    
      // Fill cells with client data
      if (logg == true) Logger.log('fCI: Filling client data to "Info" sheet...')
      estimate.getRange( name_cell   ).setValue(   leute.client.name   )
      estimate.getRange( email_cell  ).setValue(   leute.client.email   )
      estimate.getRange( addr1_cell  ).setValue(   leute.client.addr1   )
      estimate.getRange( addr2_cell  ).setValue(   leute.client.addr2   )
      estimate.getRange( phone_cell  ).setValue(   leute.client.phone   )
      if (logg == true) Logger.log('fCI: Done.')
      }

    else {
      if (logg == true) Logger.log('fCI: ------ERROR!------     leute.found is neither false nor true!')
      }
  }
  
  
  // If other information was changed either add it to a new client entry or update an existing client.
  else if ( event_A1 == email_cell ) {

    //Get the client's name
    if (logg == true) Logger.log('fCI: Done.  Email cell was edited. Assigning client...')
    var name = estimate.getRange( name_cell ).getValue()
    if (logg == true) Logger.log('fCI: Done. Assigned as ' + name)

    
    // Find the client and their information
    if (logg == true) Logger.log('fCI: Beginning search for client data...')
    var leute = searchLeute( name )

    if (logg == true) Logger.log('fCI: Checking if client data was found...')
    if ( leute.found == true ){

      if (logg == true) Logger.log('fCI: Client data was found. Getting current email on record...')
      if ( leute.client.email == 'not recorded' || leute.client.email == '' ) leute.ssleute
        .getRange( leute.client.row, leute.headings['Email'] )
        .setValue( e.value )
          

      else{
        var answer = confirmAlert( 'Replace Data', 'Would you like to update ' + leute.client.name + '\'s email from ' + leute.client.email + ' to\
           ' + e.value + '?  The old email cannot be recovered.' )
        if ( answer == true ) leute.ssleute
          .getRange( leute.client.row, leute.headings['Email'] )
          .setValue( e.value )
        else if ( answer == false ) if (logg == true) Logger.log('fCI: Client email update was declined by the user.')
      }
      }

    else if ( leute.found == false ) messageAlert( 'The record for ' + name + ' was not found and the email will not be recorded.\
      You may want to check that a client name has been recorded in the proper cell (A11).  Changing this cell\'s location will break the script Craig wrote.  If this \
      message keeps appearing improperly, please make a copy of the spreadsheet (File --> Make a copy) and text Craig the client name on the spreadsheet.' )

      }


  // If address cell was changed...
  else if ( event_A1 == addr1_cell ) {

    //Get the client's name
    if (logg == true) Logger.log('fCI: Done.  Address Line 1 cell was edited. Assigning client...')
    var name = estimate.getRange( name_cell ).getValue()
    if (logg == true) Logger.log('fCI: Done. Assigned as ' + name)

    
    // Find the client and their information
    if (logg == true) Logger.log('fCI: Beginning search for client data...')
    var leute = searchLeute( name )

    if (logg == true) Logger.log('fCI: Checking if client data was found...')
    if ( leute.found == true ){

      if (logg == true) Logger.log('fCI: Client data was found. Getting current address line 1 on record...')
      if ( leute.client.addr1 == 'not recorded' || leute.client.addr1 == '' ) leute.ssleute
        .getRange( leute.client.row, leute.headings['Address Line 1'] )
        .setValue( e.value )
          

      else{
        var answer = confirmAlert( 'Replace Data', 'Would you like to update ' + leute.client.name + '\'s address line 1 from ' + leute.client.addr1 + ' to\
           ' + e.value + '?  The old address cannot be recovered.' )
        if ( answer == true ) leute.ssleute
          .getRange( leute.client.row, leute.headings['Address Line 1'] )
          .setValue( e.value )
        else if ( answer == false ) if (logg == true) Logger.log('fCI: Client address line 1 update was declined by the user.')
        }
      }


    else if ( leute.found == false ) messageAlert( 'The record for ' + name + ' was not found and the address will not be recorded.\
      You may want to check that a client name has been recorded in the proper cell (A11).  Changing this cell\'s location will break the script Craig wrote.  If this \
      message keeps appearing improperly, please make a copy of the spreadsheet (File --> Make a copy) and text Craig the client name on the spreadsheet.' )

      }


  // If next address cell was changed..
  else if ( event_A1 == addr2_cell ){

    //Get the client's name
    if (logg == true) Logger.log('fCI: Done.  Address Line 2 cell was edited. Assigning client...')
    var name = estimate.getRange( name_cell ).getValue()
    if (logg == true) Logger.log('fCI: Done. Assigned as ' + name)

    
    // Find the client and their information
    if (logg == true) Logger.log('fCI: Beginning search for client data...')
    var leute = searchLeute( name )

    if (logg == true) Logger.log('fCI: Checking if client data was found...')
    if ( leute.found == true ){

      if (logg == true) Logger.log('fCI: Client data was found. Getting current email on record...')
      if ( leute.client.addr2 == 'not recorded' || leute.client.addr2 == '' ) leute.ssleute
        .getRange( leute.client.row, leute.headings['Address Line 2'] )
        .setValue( e.value )
          

      else{
        var answer = confirmAlert( 'Replace Data', 'Would you like to update ' + leute.client.name + '\'s address line 2 from ' + leute.client.addr2 + ' to\
           ' + e.value + '?  The old address cannot be recovered.' )
        if ( answer == true ) leute.ssleute
          .getRange( leute.client.row, leute.headings['Address Line 2'] )
          .setValue( e.value )
        else if ( answer == false ) if (logg == true) Logger.log('fCI: Client address line 2 update was declined by the user.')
      }
      }


    else if ( leute.found == false ) messageAlert( 'The record for ' + name + ' was not found and the address will not be recorded.\
      You may want to check that a client name has been recorded in the proper cell (A11).  Changing this cell\'s location will break the script Craig wrote.  If this \
      message keeps appearing improperly, please make a copy of the spreadsheet (File --> Make a copy) and text Craig the client name on the spreadsheet.' )

      }

  // If phone number cell was changed..
  else if ( event_A1 == phone_cell ) {

    //Get the client's name
    if (logg == true) Logger.log('fCI: Done.  Phone number cell was edited. Assigning client...')
    var name = estimate.getRange( name_cell ).getValue()
    if (logg == true) Logger.log('fCI: Done. Assigned as ' + name)

    
    // Find the client and their information
    if (logg == true) Logger.log('fCI: Beginning search for client data...')
    var leute = searchLeute( name )

    if (logg == true) Logger.log('fCI: Checking if client data was found...')
    if ( leute.found == true ){

      if (logg == true) Logger.log('fCI: Client data was found. Getting current phone number on record...')
      if ( leute.client.phone == 'not recorded' || leute.client.phone == '' ) leute.ssleute
        .getRange( leute.client.row, leute.headings['Telephone'] )
        .setValue( e.value )
          

      else{
        var answer = confirmAlert( 'Replace Data', 'Would you like to update ' + leute.client.name + '\'s phone number from ' + leute.client.phone + ' to\
           ' + e.value + '?  The old number cannot be recovered.' )
        if ( answer == true ) leute.ssleute
          .getRange( leute.client.row, leute.headings['Telephone'] )
          .setValue( e.value )
        else if ( answer == false ) if (logg == true) Logger.log('fCI: Client phone number update was declined by the user.')
      }
      }


    else if ( leute.found == false ) messageAlert( 'The record for ' + name + ' was not found and the phone number will not be recorded.\
      You may want to check that a client name has been recorded in the proper cell (A11).  Changing this cell\'s location will break the script Craig wrote.  If this \
      message keeps appearing improperly, please make a copy of the spreadsheet (File --> Make a copy) and text Craig the client name on the spreadsheet.' )

      }

  else {
    if (logg == true) Logger.log('fCI: No client data was entered.')
  }
  
  if (logg == true) Logger.log('fCI: ----EXITING Function fillClientInfo()----')
}

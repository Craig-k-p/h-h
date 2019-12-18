/** UPDATED 9.29.18 18:40
    ESTIMATE
    nameDoc( file_sheet_reference, info_sheet_reference )
      Assign name location
      Create a date object to get the date
      Check that the name cell has been updated from the original setting
      Get info from document for the name
      Put the name together
      Change document name
    */



function nameDoc( file, info ) {
  
  var logg = true
  if (logg == true) Logger.log('nD: -----Function nameDoc( file, info, d )-----')
  
  // Assign the name cell location
  if (logg == true) Logger.log('nD: Setting name cell location and creating Date() object...')
  var name_cell = 'B1'
  var d = new Date()
  if (logg == true) Logger.log('nD: Done.  Location was set as ' + name_cell)
  
  // Check that the name cell has been changed from the default value
  if (logg == true) Logger.log('nD: Checking if customer name has been filled...')
  if ( info.getRange(name_cell).getValue() != '(NAME HERE)'){
    
    if (logg == true) Logger.log('nD: Done.  Name has been filled as ' + info.getRange(name_cell).getValue())
    
    // Set project cell location and create the months dictionary
    if (logg == true) Logger.log('nD: Setting project_cell and creating months dictionary...')
    var project_cell = 'B5'  
    var months = { 0:'Jan',
                   1:'Feb',
                   2:'Mar',
                   3:'Apr',
                   4:'May',
                   5:'June',
                   6:'July',
                   7:'Aug',
                   8:'Sep',
                   9:'Oct',
                   10:'Nov',
                   11:'Dec' }
    if (logg == true) Logger.log('nD: Done. Project_cell set as ' + project_cell)
    
    // Get the year, project name, and assign a string with a single space to variable s
    if (logg == true) Logger.log('nD: Assigning year, project, name and s variables...')    
    var year    =  d.getFullYear()
    var project =  info.getRange( project_cell ).getDisplayValue()
    var name    =  info.getRange( name_cell    ).getDisplayValue()
    var s       =  ' '
    if (logg == true) Logger.log('nD: Done. Set as ' + year + ', ' + project + ', ' + name + ', and ' + s + '.')
    
    // Get the date and month
    if (logg == true) Logger.log('nD: Assinging date and month variables...')
    var date  = d.getDate()
    var month = months[ d.getMonth() ]
    if (logg == true) Logger.log('nD: Done.  Assigned as ' + date.toString() + ' and ' + month.toString())
    
    // Put together the document name
    if (logg == true) Logger.log('nD: Assigning doc_name...')
    var doc_name = name + s + project + s + year + s + month + s + date
    if (logg == true) Logger.log('nD: Done. doc_name assigned as ' + doc_name)
    
    // Rename the document
    if (logg == true) Logger.log('nD: Renaming document...')    
    SpreadsheetApp.getActive().rename( doc_name )
    if (logg == true) Logger.log('nD: Done.')
  }
  if (logg == true) Logger.log('nD: ----EXITING Function nameDoc()----')
}


/** UPDATED 12.28.18 16:36
    ESTIMATE
    dateSubmitted( estimate_sheet_reference, info_sheet_reference )
      Create a date object
      Get the date from that and create a string in format m/d/y
      Fill the date in specified cells
      */



function dateSubmitted( estimate, info ) {
  
  var logg = true
  if (logg == true) Logger.log('dS: -----Function dateSubmitted( estimate, info )-----')
  
  // Cell locations for date and submitted markers                        
  if (logg == true) Logger.log('dS: Assigning date and submitted cell locations...')
  var date_cell      = 'B7'
  var submitted_cell = 'D8'
  if (logg == true) Logger.log('dS: Done. Got ' + date_cell + ' and ' + submitted_cell)
  
  if (logg == true) Logger.log('dS: Checking date cell to see if any changes need to be made...')
  if ( estimate.getRange(submitted_cell).getDisplayValue() == '' ) {
    
    if (logg == true) Logger.log('dS: Date cell is empty.  Changes will be made....')
    
    // Get a reference to the cells that need to be edited
    if (logg == true) Logger.log('dS: Getting date and submitted cell references...')
    var date_cell = info.getRange( date_cell )
    var submitted_cell = estimate.getRange( submitted_cell )
    if (logg == true) Logger.log('dS: Done.')
    
    // Create a Date object and get the day, month, and year into a string
    if (logg == true) Logger.log('dS: Creating Date() object and creating a date string from its information...')
    var d = new Date()    
    var date_str = ( d.getMonth() + 1 ).toString() + '/' + d.getDate().toString() + '/' + d.getFullYear().toString()
    if (logg == true) Logger.log('dS: Done. Got ' + date_str)
    
    // Set the date_cell and submitted cell values accordingly
    if (logg == true) Logger.log('dS: Setting date and submitted cell values...')
    date_cell.setValue( date_str )
    submitted_cell.setValue( 'Submitted on ' + date_str ) 
    if (logg == true) Logger.log('dS: Done.')
    }
  
  else if (logg == true) Logger.log('dS: No changes necessary.')
  
  if (logg == true) Logger.log('dS: ----EXITING function dateSubmitted()----')
}


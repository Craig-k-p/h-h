/** UPDATED 10/1/18 20:36
    UNIVERSAL
    confirmAlert( title, warning )
      Create a yes/no popup
      Ask if user wants to add client to database
      Return user input as true or false

    messageAlert( title, warning )
      Create a popup with a message and title
      */


function confirmAlert( title, warning ) {
  
  var logg = true
  if (logg = true) Logger.log('cAC: -----Function confirmAlert( title, warning )-----')
  if (logg = true) Logger.log('cAC: received (' + title + ', ' + warning + ')')
         
  // Get the UI reference    
  if (logg = true) Logger.log('cAC: Creating UI reference...')
  var ui = SpreadsheetApp.getUi()
  if (logg = true) Logger.log('cAC: Done.')
  
  // Create a dialogue box with yes/no buttons
  if (logg = true) Logger.log('cAC: Creating dialogue for user input...')
  var result = ui.alert( title, warning, ui.ButtonSet.YES_NO);
  if (logg = true) Logger.log('cAC: Done. Got ' + result.toString())

  // Process the user's response.
  if (result == ui.Button.YES) {
    if (logg = true) Logger.log('pA: Returning: true \n    ---- EXITING function promptAlert()----')
    return true
  } 
  
  else {
    if (logg = true) Logger.log('pA: Returning: false\n    ---- EXITING function promptAlert()----')
    return false
  }
}


function messageAlert( warning ){

  var logg = true
  if (logg = true) Logger.log('pA: -----Function promptAlert( title, message )-----')
  if (logg = true) Logger.log('pA: received (' + warning + ')')
         
  // Get the UI reference    
  if (logg = true) Logger.log('pA: Creating UI reference...')
  var ui = SpreadsheetApp.getUi()
  if (logg = true) Logger.log('pA: Done.')
  
  // Create a dialogue box with yes/no buttons
  if (logg = true) Logger.log('pA: Creating dialogue for user input...')
  var click = ui.alert( warning)
  if (logg = true) Logger.log('pA: ---- EXITING function promptAlert()----')


}
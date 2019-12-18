/** UPDATED 9.29.18 18:28
    ESTIMATE
    main( event_object )
      get sheet references
      call nameDoc()
      call dateSubmitted()
      call fillClientInfo()
      */


function main(e) {
  
  //To transfer to real-time testing, update:
  //  ssleute sheet ID
  //  Double check cell locations
  
  // Get document and sheets for future reference
  // Create Date object
  var file = SpreadsheetApp.getActive()
  var info     = SpreadsheetApp.getActiveSpreadsheet().getSheetByName( 'Info' )
  var estimate = SpreadsheetApp.getActiveSpreadsheet().getSheetByName( 'Estimate' )
  
  
  // Name document based on filled information
  nameDoc( file, info )

  // Add "Submitted" date
  dateSubmitted( estimate, info )
  
  // Check if client info is available
  // If not, add it
  fillClientInfo( e, estimate, info )
  
  
}

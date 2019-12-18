/** UPDATED 1.2.19 12:02
    INVOICE
    main( event_object )
      create file and sheet references
      call checkClientNameInput
      call nameDoc
      call dateSubmitted
      */

function main(e) {
  
  // Get document and sheets for future reference
  // Create Date object
  var file = SpreadsheetApp.getActive()
  // var info    = SpreadsheetApp.getActiveSpreadsheet().getSheetByName( 'Info' )
  var invoice = SpreadsheetApp.getActiveSpreadsheet().getSheetByName( 'Invoice' )

  
  // Get client's name if Name cell is edited
  // Fill client info if available
  checkClientNameInput( invoice, e ) 
  
  // Name document based on filled information
  nameDoc( e, invoice )
  
  // Add "Submitted" date
  dateSubmitted( invoice )
  
}
/** UPDATED 1.2.19 12:45
    INVOICE
    dateSubmitted( invoice_sheet_reference )
      Create a date object
      Get the date from that and create a string in format m/d/y
      Fill the date in the default cell
      */


function dateSubmitted( invoice ) {
  
  Logger.log('dateSubmitted: -----Function dateSubmitted( [invoice - {0}] )-----'.format(invoice.getName()))
  var logg = true
  
  var submitted_cell = invoice.getRange( getDefault('submitted', 'invoice' ) )
  
  if (logg = true) Logger.log('dateSubmitted: Checking if the submitted cell is empty..')
  if ( submitted_cell.getValue() == '' ) {
    
    if (logg = true) Logger.log('dateSubmitted: Cell was empty.  Creating date object.')
    var d = new Date()
  
    var date_str = ( d.getMonth() + 1 ).toString() + '/' + d.getDate().toString() + '/' + d.getFullYear().toString()
    
    submitted_cell.setValue( 'Submitted on ' + date_str )
    if (logg = true) Logger.log('dateSubmitted: Submitted cell date changed to {1}.'.format(date_str))
    }
  else {if (logg = true) Logger.log('dateSubmitted: No change necessary')}
  if (logg = true) Logger.log('dateSubmitted: ----EXITING function dateSubmitted()----')
}

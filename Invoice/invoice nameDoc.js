/** UPDATED 1.2.19 8:18
    INVOICE
    nameDoc( event, info_sheet )
      Assign invc number and name cell locations
      get various details from invoice for naming
      create the name string
      */



function nameDoc( e, invoice ) {
  
  Logger.log('nameDoc: -----nameDoc( [e - {0}], [invoice - {2}]-----'.format(e.range, invoice))
  var logg = true
  
  var test_list = new Array()
  test_list.push(getDefault('client', 'invoice'))
  test_list.push(getDefault('invoice number', 'invoice'))

  if (logg = true) Logger.log('nameDoc: Checking if edit was in client or invoice number cell...')
  if ( e.range.getA1Notation === test_list[0] || e.range.getA1Notation === test_list[1] ){
    
    if (logg = true) Logger.log('nameDoc: It was.  Creating Date object...')
    var d = new Date()
    
    if (logg = true) Logger.log('nameDoc: Creating month dictionary...')
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
    
    if (logg = true) Logger.log('nameDoc: Getting string values for the new name...')
    var year   = '20' + invoice.getRange( getDefault( 'invoice number', 'invoice' ) ).getDisplayValue().substr( 3, 5 )
    var number = '#'  + invoice.getRange( getDefault( 'invoice number', 'invoice' ) ).getDisplayValue().substr( 0, 2 )
    var name   =        invoice.getRange( getDefault( 'client', 'invoice'         ) ).getDisplayValue()
    var s      = ' '
    
    var date  = d.getDate()
    var month = months[ d.getMonth() ]
    
    var doc_name = year + s + number + s + name + s + month + s + date
    
    if (logg = true) Logger.log('nameDoc: Got {0} as the document name.  Renaming...'.format(doc_name))
     
    SpreadsheetApp.getActive().rename( doc_name )
  }
  else {if (logg = true) Logger.log('nameDoc: Edit was out of range')}
  
  if (logg = true) Logger.log('nameDoc: ----EXITING Function nameDoc()----') 
}

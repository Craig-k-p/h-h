function nameDoc( logg, file, info, d ) {
  
  if (logg = true) Logger.log('nD: -----Function nameDoc( logg, file, info, d )-----')

  if (logg = true) Logger.log('nD: Setting invoice_number_cell and name_cell locations...')
  var invoice_number_cell = 'B5'
  var name_cell = 'B1'
  if (logg = true) Logger.log('nD:  Done. Set as ' + name_cell + ' and ' + invoice_number_cell)
  
  if (logg = true) Logger.log('nD: Creating month dictionary...')
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
  if (logg = true) Logger.log('nD: Done.')
  
  if (logg = true) Logger.log('nD: Getting formatting for cell data (line 25)...')
  var year   = '20' + info.getRange( invoice_number_cell ).getDisplayValue().substr( 3, 5 )
  var number = '#'  + info.getRange( invoice_number_cell ).getDisplayValue().substr( 0, 2 )
  var name   =        info.getRange( name_cell           ).getDisplayValue()
  var s      = ' '
  if (logg = true) Logger.log('nD: Done.')
  
  if (logg = true) Logger.log('nD: Getting date...')
  var date  = d.getDate()
  var month = months[ d.getMonth() ]
  if (logg = true) Logger.log('nD: Done. Got year: ' + year + '    number: ' + number + name)
  
  if (logg = true) Logger.log('nD: Joining and setting the document name...')
  var doc_name = year + s + number + s + name + s + month + s + date
  SpreadsheetApp.getActive().rename( doc_name )
  if (logg = true) Logger.log('nD: Done. Renamed as ' + doc_name)
  
  
  if (logg = true) Logger.log('cCNI: ----EXITING Function nameDoc()----') 
}
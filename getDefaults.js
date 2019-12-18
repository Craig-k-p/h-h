/*  UPDATED 1/2/19 19:04

    getDefault()
      Return the default values for spreadsheet templates of the latest version and the file system in Drive

*/

function getDefault(name, key) {

  Logger.log('getDefault:  -----getDefault( [name - {0}], [key - {1}] )------'.format(name, key))
  var logg = true
  
  // Defaults for ESTIMATES
  if (key === 'estimate'){
    var defaults = {}
    // defaults.['unit cost col']  = 'H'
    defaults.['price col']      = 'I'
    defaults.['qty col']        = 'G'
    // defaults.['materials col']  = 'A'
    defaults['client']         = 'A11'
    defaults['address line 1'] = 'C11'
    defaults['address line 2'] = 'C12'
    defaults['phone']          = 'A12'
    defaults['project']        = 'E11'
    defaults['email']          = 'G11'
    defaults['email 2']        = 'G12'
    defaults['notes']          = -6
    if (logg == true) Logger.log('getDefault: defaults hash created for ESTIMATE - {0}'.format(defaults))
  }

  // Defaults for INVOICES
  else if (key === 'invoice'){
    var defaults = {}
    // defaults.['price col']      = 'I'
    // defaults.['qty col']        = 'G'
    // defaults.['materials col']  = 'A'
    // defaults.['phone']          = null
    // defaults.['email 2']        = null
    defaults['invoice number'] = 'G11'
    defaults['client']         = 'A11'
    defaults['address line 1'] = 'C11'
    defaults['address line 2'] = 'C12'
    defaults['project']        = 'E11'
    defaults['email']          = 'A12'
    defaults['notes']          = -7
    defaults['submitted']      = 'D8'
    if (logg == true) Logger.log('getDefault: defaults hash created for INVOICE - {0}'.format(defaults))
  }

  else if (key === 'files'){
    var defaults = {}
    defaults['invoice url']  = 'https://docs.google.com/spreadsheets/d/1WH_jMIxZAGqPmve-_R4IWM5Id8G0U0Usox21IeQPzuQ/edit#gid=790763898'
    defaults['invoice folder id'] = '0B4yUIQ2jyYeENUhqdFU5aHFaU1k'
  }
  
  if (name !== null){
    var r = defaults[name]
    if (logg == true) Logger.log('getDefault: Returning {0}'.format(r))
  }
  else if (name === null){
    return Object.keys(defaults)
  }

  return r
  
}

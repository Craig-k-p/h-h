/** UPDATED 1.13.19.20.15
    duplicateSections( destination_sheet, copy_from_sheet )
      Copy materials or labour from the estimate to the new Invoice or from the
      Invoice sheet to the Breakdown sheet.
      */


function duplicateSections(destination_sheet, copy_sheet, receive_sheet){
    
    var logg = true

    // In the Invoice file..
    // Copy from the Invoice sheet to the Breakdown sheet for audits
    if (destination_sheet === 'Breakdown'){
      if (logg = true) Logger.log('duplicateSections: Duplicating for Breakdown')
    }

    else if (destination_sheet === 'Invoice'){
      if (logg = true) Logger.log('duplicateSections: Duplicating for a new Invoice')
    }
}


function getItems(sheet, section){
  var logg = true

  var last_row = ss.getMaxRows()
  var values = sheet.getRange("A1:" + "A" + last_row).getValues()
  var data = []
  var section_start = null
  var section_end   = null
  var row = 0
  if (logg == true) Logger.log('editAssist: Created section_start, section_end, and row variables')
  
  // Loop thru column A values to find the start and end of the section
  if (logg == true) Logger.log('editAssist: Beginning while loop to find section bounds...')
  while ( (section_start === null) || (section_end === null) ){
    
    // If the section heading is found, assign that row to the section_start variable
    if (section_start === null){
      if (values[ row ] == section){
        if (logg == true) Logger.log('editAssist: Section heading found on row {0}!'.format(row + 1))
        var section_start = row + 2
        if (logg == true) Logger.log('editAssist: section_start set to {0}'.format(section_start))
        }
    }

    // It the section has started and not ended, get the items with their
    // corresponting values
    else if (section_start !== null && section_end === null){
      data.push( 
        sheet.getRange( 'A{1}'.format(row) ).getValue()
        // sheet.getRange( '{0}{1}'.format(getDefault('qty col', 'estimate'), row) ).getValue(),
        // sheet.getRange( '{0}{1}'.format(getDefault('price col')))
         )
    }

    if (section_end == null){
      // If the end value is found
      if (values[ row ] == 'end {0}'.format(section)){
        if (logg == true) Logger.log('editAssist: Section end found on row {0}!'.format(row + 1))
        var section_end = row
        if (logg == true) Logger.log('editAssist: section_end set to {0}'.format(section_end))
      }
    }
    row = row + 1
  }
}
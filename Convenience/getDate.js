/** UPDATED 9.28.18 20:55
	UNIVERSAL
	getDate()
		return the date in format m/d/y
		*/


function getDate( ) {
  
  var logg = true
  if (logg = true) Logger.log('gD: -----Function getDate( logg )-----')
  
  // Get the date
  if (logg = true) Logger.log('gD: Creating Date object and creating a string in format: m/d/y')
  var d = new Date()
  var date   = ( d.getMonth() + 1 ).toString() + '/' + d.getDate().toString() + '/' + d.getFullYear().toString()
  if (logg = true) Logger.log('gD: Done. Got: ' + date)
  
  if (logg = true) Logger.log('gD: returning: ' + date + '\n\n     ----EXITING function getDate()----')
  
  return date
}

/** UPDATED: 9.29.18 18:16
	UNIVERSAL
	numToLetter( integer_1_thru_26 )
		return the respective letter position of the integer
		ie input(3) -> output(c)
		if out of range return null
		*/


function numToLetter( num ){

	var letters = 'abcdefghijklmnopqrstuvwxyz'

	if ( 0 < num < 27 ){
		return letters.charAt( num - 1 )
	}
	else return null
}
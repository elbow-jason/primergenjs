
// generate a pseudo random sequence
var genRandomSeq = function(seqLength) {
	var dnaBases = ["A", "T", "G", "C"];
	var ampSeqPlus = "";
	for (i = 0; i < seqLength; i++) {
		ampSeqPlus = ampSeqPlus + dnaBases[Math.floor(Math.random() * dnaBases.length) ];
	}
	return ampSeqPlus;
};


//returns the compliment of the param 'sequence' as sequence is presented. i.e. 
//	sequence = "ATTTTAGCGATCCC"
//	returns  = "TAAAATCGCTAGGG"

var genComplement = function(sequence) {
	var compliment = "";
	var decoder = { 
		"T": "A",
		"A": "T",
		"C": "G",
		"G": "C"
	};
	for (i = 0; i < sequence.length; i++) {
		compliment += decoder[sequence[i]];
	}
	return compliment;
};






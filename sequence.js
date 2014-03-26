
//function to generate a pseudo random DNA sequence (non-degenerate bases)
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
// f_seq is for "forward sequence"
var genComplement = function(f_seq) {
	var compliment = "";
	var decoder = { 
		"T": "A",
		"A": "T",
		"C": "G",
		"G": "C"
	};
	for (i = 0; i < f_seq.length; i++) {
		compliment += decoder[f_seq[i]];
	}
	return compliment;
};

//function that validates sequence integrity
	//only A,G,T, and C bases => true
	//bases other than A,G,T, or C => false
var seqIntegrityCheck = function (sequence) {
	var checker = 0;
	checker = sequence.search(/[~ATGC]/);
	if (checker === 0) {return true;}
	else {return false;}
};




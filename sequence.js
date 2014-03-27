
var sequence = {};





//it is necessary to determine which pole of the DNA...
//sequence is to the left and which is to the right...
//the default is 5'-DNAHERE-3'.
//if not oriented properly..
// primers won't function for PCR
/*" By convention, if the base sequence of a single strand of DNA is given,
 the left end of the sequence is 5' end, while the right end of the
  sequence is the 3' end."
AND
"All known DNA replication systems require a free 3' hydroxyl group
 before synthesis can be initiated"
*/

//returns substring from beginning of seq (in 5'-to-3' format)
//Forward primer is oriented the same as original sequence.
sequence.genPrimer = function(primerStart, primerLength, forward) {
	if (forward){
		return sequence.actual.substring(primerStart, primerStart+primerLength);
	}
	else {
		return sequence.genComplement(sequence.actual.substring(sequence.actual.length-primerStart, sequence.actual.length - (primerStart+primerLength)));	
	}
//gets substring from end of seq then returns complement in (3'-to-5' format)
//Reverse primer must be oriented 5'-to-3' prior to chemical evaluation
};

//function to generate a pseudo random DNA sequence (non-degenerate bases)
sequence.genRandomSeq = function(seqLength) {
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
sequence.genComplement = function(f_seq) {
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
sequence.seqIntegrityCheck = function (sequence) {
	var checker = 0;
	checker = sequence.search(/[~ATGC]/);
	if (checker === 0) {return true;}
	else {return false;}
};



seqLength = 64;
// later, this will be user input via form field or accession number.
sequence.actual = sequence.genRandomSeq(seqLength);
sequence.forwardPrimer = sequence.genPrimer(0, 18, true);
sequence.reversePrimer = sequence.genPrimer(0, 21, false);

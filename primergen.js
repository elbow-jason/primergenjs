
var primergen = {};

//it is necessary to determine which pole of the DNA...
//sequence is to the left and which is to the right...
//the default is 5'-DNAHERE-3'.
//if not oriented properly..
// primers won't function for PCR
/*" By convention, if the base sequence of a single strand of DNA is given,
 the left end of the primergen is 5' end, while the right end of the
  primergen is the 3' end."
AND
"All known DNA replication systems require a free 3' hydroxyl group
 before synthesis can be initiated"
*/

//returns substring from beginning of seq (in 5'-to-3' format)
//Forward primer is oriented the same as original primergen.
primergen.genPrimer = function(primerStart, primerLength, forward) {
	if (forward){
		return primergen.sequence.substring(primerStart, primerStart + primerLength);
	}
	else {
		return primergen.genComplement(primergen.sequence.substring(primergen.sequence.length-primerStart, primergen.sequence.length - (primerStart+primerLength)));	
	}
//gets substring from end of seq then returns complement in (3'-to-5' format)
//Reverse primer must be oriented 5'-to-3' prior to chemical evaluation
};

//function to generate a pseudo random DNA primergen (non-degenerate bases)
primergen.genRandomSeq = function(seqLength) {
	var dnaBases = ["A", "T", "G", "C"];
	var ampSeqPlus = "";
	for (i = 0; i < seqLength; i++) {
		ampSeqPlus = ampSeqPlus + dnaBases[Math.floor(Math.random() * dnaBases.length) ];
	}
	return ampSeqPlus;
};

//returns the compliment of the param 'primergen' as primergen is presented. i.e. 
//	passed   = "ATTTTAGCGATCCC"
//	returned = "TAAAATCGCTAGGG"
// f_seq is for "forward sequence"
primergen.genComplement = function(f_seq) {
	var complement = "";
	var decoder = { 
		"T": "A",
		"A": "T",
		"C": "G",
		"G": "C"
	};
	for (i = 0; i < f_seq.length; i++) {
		complement += decoder[f_seq[i]];
	}
	return complement;
};

//function that validates primergen integrity
	//only A,G,T, and C bases => true
	//bases other than A,G,T, or C => false
primergen.seqIntegrityCheck = function (seq) {
	var checker = 0;
	checker = seq.search(/[~ATGC]/);
	if (checker === 0) {
		return true;
	}
	else 
		{
			return false;
		}
};

// finds GC content of primergen
//should return a number between 0 and 1.
// e.g. given "GGCC" => 1.0
      //given "GATC" => 0.5
      //given "CCCC" => 1.0
      //given "AATC" => 0.25
primergen.calcGCContent = function(seq, sumG, sumC) {
  return (sumG + sumC) / seq.length
    };




//R is the ideal gas constant and is equal to 1.987 cal / (K * mole).
//the difference between degrees Kelvin and Celsius is 273.15 degrees.


//Calculate the melting temp of oligos (read: primers) in Celcius
primergen.calcMeltingTempCelsius = function() {
	var R = 1.987;
	var meltingTemp = enthalpy / (entropy + idealGasConst * log(concentration_Primers)) -273.15;
//invMonovalentTemp = ();
//invDivalentTemp = ();
};


primergen.baseCount = function(seq, nucleotide) {
	return seq.split(nucleotide).length - 1
};






var calcWallaceTemp = function(seq) {};
















seqLength = 64;
// later, this will be user input via form field or accession number.
primergen.sequence = primergen.genRandomSeq(seqLength);
primergen.forwardPrimer = {};
primergen.forwardPrimer.sequence = primergen.genPrimer(0, 18, true);
primergen.reversePrimer = {};
primergen.reversePrimer.sequence = primergen.genPrimer(0, 21, false);


primergen.sumA = primergen.baseCount(primergen.sequence, "A");
primergen.sumT = primergen.baseCount(primergen.sequence, "T");
primergen.sumG = primergen.baseCount(primergen.sequence, "G");
primergen.sumC = primergen.baseCount(primergen.sequence, "C");
primergen.gcContent = primergen.calcGCContent(primergen.sequence, primergen.sumG, primergen.sumC);




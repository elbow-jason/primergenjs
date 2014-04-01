var $pg =  $pg || {};

//it is necessary to determine which pole of the DNA...
//sequence is to the left and which is to the right...
//the default is 5'-DNAHERE-3'.
//if not oriented properly..
// primers won't function for PCR
/*" By convention, if the base sequence of a single strand of DNA is given,
 the left end of the this is 5' end, while the right end of the
  this is the 3' end."
AND
"All known DNA replication systems require a free 3' hydroxyl group
 before synthesis can be initiated"
*/

//returns the complement of the param 'this' as this is presented. i.e. 
//  passed   = "ATTTTAGCGATCCC"

// f_seq is for "forward sequence"
$pg.genComplement = function(seq) {
  var complement = "";
  var decoder = { 
    "T": "A",
    "A": "T",
    "C": "G",
    "G": "C"
  };
  for (var i = 0; i < seq.length; i++) {
    complement += decoder[seq[i]];
  }
  return complement;
};


//returns substring from beginning of seq (in 5'-to-3' format)
//Forward primer is oriented the same as original this.
//if param 'forward' is true(default), primer is generated directly from sequence
//if param 'forward' is false, primer is generated as a reverse primer
$pg.genPrimer = function(seq , primerStart, primerLength, isForward) {
  isForward = isForward ? true : false;
  if (isForward){
    console.log("forwardPrimer generated");
    return seq.substring(primerStart, primerStart + primerLength);
  }
  else {
    console.log("reversePrimer generated");
    var primer = seq.substring(seq.length-primerStart, seq.length - (primerStart+primerLength))
    //gets substring from end of seq then returns complement in (3'-to-5' format)
    
    primer = $pg.genComplement(primer);
    //Reverse primer must be oriented 5'-to-3' prior to chemical evaluation
    return $pg.seqReverse(primer);
  }
};
//returnes the reverse of a sequence 
//(turns 3'-to-5' around to show 5'-to-3')
// used to turn reverse 
$pg.seqReverse = function(seq) {
  return seq.split("").reverse().join("");
};

//function to generate a pseudo random DNA primergen (non-degenerate bases)
$pg.genRandomSeq = function(seqLength) {
  var dnaBases = ["A", "T", "G", "C"];
  var ampSeqPlus = "";
  for (var i = 0; i < seqLength; i++) {
    ampSeqPlus = ampSeqPlus + dnaBases[Math.floor(Math.random() * dnaBases.length) ];
    }
  return ampSeqPlus;
};


$pg.Sequence = function(sequence, orientation) {
  this.sequence = sequence;
  this.seqLength = sequence.length;
  // orientation refers to the sequence being oriented in a 5'-to-3' fashion
  // by default, all functions should return 5'-to-3' sequences by default except,
  // of course, the seqReverse() function.
  this.orientation = orientation;

  //function that validates this integrity
  //only A,G,T, and C bases => true
  //bases other than A,G,T, or C => false
  this.seqIntegrityCheck = function () {
    var checker = 0;
    checker = this.sequence.search(/[~ATGC]/);
    if (checker === 0) {
      return true;
    }
    else 
      {
        return false;
      }
  };
  this.integrity = this.seqIntegrityCheck();

  //counts bases... returns number of bases.
  this.baseCount = function(seq, nucleotide) {
    return seq.split(nucleotide).length - 1;
  };

  this.sumA = this.baseCount(this.sequence, "A");
  this.sumT = this.baseCount(this.sequence, "T");
  this.sumG = this.baseCount(this.sequence, "G");
  this.sumC = this.baseCount(this.sequence, "C");

  // finds GC content of this
  //should return a number between 0 and 1.
  // e.g. given "GGCC" => 1.0
        //given "GATC" => 0.5
        //given "CCCC" => 1.0
        //given "AATC" => 0.25
  this.calcGCContent = function(seq, sumG, sumC) {
    return (sumG + sumC) / seq.length;
      };
  this.gcContent = this.calcGCContent(this.sequence, this.sumG, this.sumC);
};

$pg.Chemistry = function() {
  //R is the ideal gas constant and is equal to 1.987 cal / (K * mole).
  //the difference between degrees Kelvin and Celsius is 273.15 degrees.
  //Calculate the melting temp of oligos (read: primers) in Celcius
  this.calcMeltingTempCelsius = function() {
    var IDEALGASCONST = 1.987;
    var enthalpy;
    var concentration_Primers;
    var entropy;
    var meltingTemp = enthalpy / (entropy + IDEALGASCONST * log(concentration_Primers)) -273.15;
    return meltingTemp;
    };
  this.invMonovalentTemp = function() {};
  this.invDivalentTemp = function() {};
  this.calcWallaceTemp = function() {};
};





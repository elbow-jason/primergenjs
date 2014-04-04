//$pg.Sequence function tests follow

describe("Sequence.seqIntegrityCheck", function() {
  var sequence;

  beforeEach(function() {
    sequence = new $pg.Sequence('AGCT', true);
  });

  it("returns true for valid sequences", function() {
    expect(sequence.seqIntegrityCheck()).toBe(true);
  });

  it("returns false for invalid sequences", function() {
    sequence.sequence = "B";
    expect(sequence.seqIntegrityCheck()).toBe(false);
  });
});



//.baseCount
describe("Sequence.baseCount", function() {
  var sequence;

  beforeEach(function() {
    sequence = new $pg.Sequence('AAAGGGGCCCCCTTTTTT', true);
  });

  it("returns the number of given bases in a given sequence", function() {
    expect(sequence.baseCount(sequence.sequence, 'A')).toBe(3);
    expect(sequence.baseCount(sequence.sequence, 'G')).toBe(4);
    expect(sequence.baseCount(sequence.sequence, 'C')).toBe(5);
    expect(sequence.baseCount(sequence.sequence, 'T')).toBe(6);
    expect(sequence.baseCount(sequence.sequence, 'E')).toBe(0);
  });
});


  // finds GC content of this
  //should return a number between 0 and 1.
  // e.g. given "GGCC" => 1.0
        //given "GATC" => 0.5
        //given "CCCC" => 1.0
        //given "AATC" => 0.25
  
describe("Sequence.calcGCContent", function() {
var sequence;

it("returns the number of given bases in a given sequence", function() {
  sequence = new $pg.Sequence('GGCC', true);
  expect(sequence.calcGCContent(sequence.sequence, sequence.sumG, sequence.sumC)).toBe(1.0);
  sequence = new $pg.Sequence('GATC', true);
  expect(sequence.calcGCContent(sequence.sequence, sequence.sumG, sequence.sumC)).toBe(0.5);
  sequence = new $pg.Sequence('CCCC', true);
  expect(sequence.calcGCContent(sequence.sequence, sequence.sumG, sequence.sumC)).toBe(1.0);
  sequence = new $pg.Sequence('AATC', true);
  expect(sequence.calcGCContent(sequence.sequence, sequence.sumG, sequence.sumC)).toBe(0.25);
  sequence = new $pg.Sequence('AATT', true);
  expect(sequence.calcGCContent(sequence.sequence, sequence.sumG, sequence.sumC)).toBe(0.0);

  });
});

describe(".getNNPairs", function() {

it("returns an carray of pairs of bases found in a given sequence", function() {
    expect($pg.getNNPairs('ATGC')).toEqual(['AT','TG','GC']);
    expect($pg.getNNPairs('A')).toBe(false);
  });
});

//$pg helpers/library follows
  //returns the complement of the param 'this' as this is presented. i.e. 
  //  passed in = "ATTTTAGCGATCCC"
  //  returned =  "TAAAATCGCTAGGG"
  //  
  // f_seq is for "forward sequence"
describe(".genComplement", function() {

  it("returns complement for given sequences", function() {
    expect($pg.genComplement('ATTTTAGCGATCCC')).toBe('TAAAATCGCTAGGG');
  });

});


  //returns the complement of the param 'this' as this is presented. i.e. 
  //  passed in = "ATTTTAGCGATCCC"
  //  returned =  "CCCTAGCGATTTTA"
  //  
  // f_seq is for "forward sequence"
describe(".seqReverse", function() {

  it("returns the reverse of a given sequence", function() {
    expect($pg.seqReverse('ATTTTAGCGATCCC')).toBe('CCCTAGCGATTTTA');
  });

});



describe(".genPrimer", function() {
  var longSequence = "ATAGCATTTTTTCCCCCCCGGGGGGGAAAAACCCCCTCGACGATA";
  var primerLength = 7;

  it("returns the forward primer from the beginning region of a given sequence ", function() {
    expect($pg.genPrimer(longSequence, 0, primerLength, true)).toBe('ATAGCAT');
    expect($pg.genPrimer(longSequence, 0, primerLength, true)).toBe('ATAGCAT');
    expect($pg.genPrimer(longSequence, 2, primerLength, true)).toBe('AGCATTT');
  });
  
  it("returns the reverse primer from the ending region of a given sequence ", function() {
    expect($pg.genPrimer(longSequence, 0, primerLength, false)).toBe('TATCGTC');
  });

});

describe(".genRandomSeq", function() {

  it("returns a pseudorandom sequence of A's, T's, G's and C's of a specified length", function() {
    expect($pg.genRandomSeq(10)).toMatch(/[ATGC]*/);
    expect($pg.genRandomSeq(10).length).toBe(10);
  });
});




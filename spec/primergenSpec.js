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
describe("Sequence#seqIntegrityCheck", function() {
  var sequence;

  beforeEach(function() {
    sequence = new Sequence('AGCT', true);
  });

  it("returns true for valid sequences", function() {
    expect(sequence.seqIntegrityCheck()).toBe(true);
  });

  it("returns false for invalid sequences", function() {
    sequence.sequence = "B";
    expect(sequence.seqIntegrityCheck()).toBe(false);
  });
});


var genRandomSeq = function(seqLength) {
	var dnaBases = ["A", "T", "G", "C"];
	var ampSeqPlus = "";
	for (i = 0; i < 64; i++) {
		ampSeqPlus = ampSeqPlus + dnaBases[Math.floor(Math.random() * dnaBases.length) ];
	}
	return ampSeqPlus;
};



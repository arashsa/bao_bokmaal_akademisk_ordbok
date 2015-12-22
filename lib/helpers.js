returnExampleWithTags = function (academicWord, example) {
    var returnExample = '<p>"';
    var cWords = example.split(' ');

    for (var i = 0; i < cWords.length; i++) {
        // if current word
        if (cWords[i].toLowerCase().replace(/[.,-\/#!$%\^&\*;:{}=\-_`~()\n]/g,"") === academicWord) {
            returnExample += '<a href="http://www.nob-ordbok.uio.no/perl/ordbok.cgi?OPP=+' + cWords[i] +
                '&ant_bokmaal=5&ant_nynorsk=5&bokmaal=+&ordbok=bokmaal" target="_blank">';

            returnExample += '<span class="red-text text-lighten-2">' + cWords[i] + '</span></a> '
        } else {
            returnExample += cWords[i] + ' ';
        }
    }

    // remove last space
    returnExample = returnExample.substring(0, returnExample.length - 1);
    returnExample += '"</p>';

    return returnExample;
};

showExampleModal = function (word, examples) {
    Session.set('removed', false);

    // To show feedback buttons
    Session.setPersistent('feedback', true);
    // To show current example sentence
    Session.setPersistent('first', true);

    var returnExample = Math.floor((Math.random() * examples.length));
    Session.setPersistent('word', [word, returnExample]);
    var returnSentence = returnExampleWithTags(word, examples[returnExample]);

    if (examples[0]) {
        MaterializeModal.display({
            bodyTemplate: 'examples',
            title: word,
            example: returnSentence
        });
    }
};
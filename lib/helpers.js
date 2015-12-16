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

getAcademicColorScheme = function (text) {
    // Returns a text with color scheme for academic texts

    Session.set('text', '<p>');
    var formattedText = '';
    var textAsList = text.split(' ');
    console.log(textAsList);
    var red = '<span class="red-text text-lighten-2">';
    var orange = '<span class="orange-text text-lighten-2">';
    var yellow = '<span class="lime-text text-lighten-1">';
    var green = '<span class="green-text text-lighten-1">';
    var endSpan = '</span>';

    for (var i = 0; i < textAsList.length; i++) {
        formattedText = '';
        var cWord = textAsList[i];
        var oWord = List.findOne({word: textAsList[i].toLowerCase().replace(/[.,-\/#!?$%\^&\*;:{}=\-_`~()\n]/g,"")});

        if (oWord) {
            var cIndex = oWord.nr;
            if (cIndex < 180)
                formattedText += '<a href="#" id="example">' + red + cWord + endSpan + ' </a>';
            else if (cIndex < 360)
                formattedText += '<a href="#" id="example">' + orange + cWord + endSpan + ' </a>';
            else if (cIndex < 540)
                formattedText += '<a href="#" id="example">' + yellow + cWord + endSpan + ' </a>';
            else if (cIndex < List.find().count())
                formattedText += '<a href="#" id="example">' + green + cWord + endSpan + ' </a>';
        } else {
            formattedText += cWord + ' ';
        }

        Session.set('text', Session.get('text') + formattedText)
    }
    Session.set('text', Session.get('text') + '</p>');
    return formattedText;
};
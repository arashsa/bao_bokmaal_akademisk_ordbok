Meteor.methods({
    'getColors': function (text) {
        // Returns a text with color scheme for academic texts

        var formattedText = '<p>';
        var textAsList = text.split(' ');

        // Adding newline to text
        for (var i = 0; i < textAsList.length; i++) {
            var numberOfLineBreaks = (textAsList[i].match(/\n/g) || []);
            if (numberOfLineBreaks.length > 0) {
                var tagsNr = numberOfLineBreaks.length;
                var tags = '';

                for (var j = 0; j < tagsNr; j++) {
                    tags += '<br>'
                }
                var words = textAsList[i].replace('\n', ' ').split(' ');
                if (words.length > 1)
                    textAsList[i] = words[0] + tags + words[1];
            }
        }

        var red = '<span class="red-text text-darken-4">';
        var orange = '<span class="orange-text text-darken-4">';
        var yellow = '<span class="lime-text text-darken-4">';
        var green = '<span class="green-text text-darken-4">';
        var endSpan = '</span>';
        var aHref = '<a href="#" id="example">';

        for (i = 0; i < textAsList.length; i++) {
            var cWord = textAsList[i];

            // trying to get the forms first
            var oWord = Forms.findOne({form: textAsList[i].toLowerCase().replace(/[.,-\/#!?$%\^&\*;:{}=\-_`~()\n]/g, "")});

            if (oWord) {
                oWord = List.findOne({word: oWord.main});
            } else {
                oWord = List.findOne({word: textAsList[i].toLowerCase().replace(/[.,-\/#!?$%\^&\*;:{}=\-_`~()\n]/g, "")});
            }

            if (oWord) {
                var cIndex = oWord.nr;
                if (cIndex < 180)
                    formattedText += aHref + red + cWord + endSpan + ' </a>';
                else if (cIndex < 360)
                    formattedText += aHref + orange + cWord + endSpan + ' </a>';
                else if (cIndex < 540)
                    formattedText += aHref + yellow + cWord + endSpan + ' </a>';
                else
                    formattedText += aHref + green + cWord + endSpan + ' </a>';
            } else {
                formattedText += cWord + ' ';
            }
        }

        formattedText += '</p>';
        return formattedText;
    }

});
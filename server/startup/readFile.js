// TODO: comment out after testing
// To reset list
//List.remove({});
//Remove.remove({});
//Removed.remove({});
//console.log("Deleted Collections and restarted project");

var data_from_list = List.find().count();

// If lists is empty, reads NAV file and fills the collection
// Fills in from file nav.txt in private folder
// Fills in examples from file nav_examples in private folder
if (data_from_list === 0) {
    console.log('Filling in NAV...');
    var nav = Assets.getText('nav.txt');
    var line = nav.replace(/\n/g, ' ').split(' ');

    var count = 1;
    for (var i = 0; i < line.length; i+=3) {
        List.insert({
            nr: count,
            word: line[i],
            tag: line[i+1],
            freq: line[i+2],
            examples: []
        });
        count += 1;
    }
    console.log("Academic list read from file...");

    var examples = Assets.getText('nav_examples.txt').split('\n');
    var current_word = '';
    for (i = 0; i < examples.length; i++) {
        // the actual word
        if (examples[i].indexOf('$') === 0) {
            current_word = examples[i].replace('$ ', '');
        } else {
            // add examples if actual word is in our Collection
            if (List.findOne({word: current_word})) {
                var current_example = List.findOne({word: current_word}).examples;
                current_example.push(examples[i]);
                List.update({word: current_word}, {$set: {examples: current_example}})
            }
        }
    }
    console.log("Examples read from file...");
}

var formsCount = Forms.find().count();

// Fill in forms
if (formsCount === 0) {
    console.log('Filling in forms...');
    var forms = Assets.getText('akademisk.ff.txt');
    var lines = forms.split('\n');

    // Go through each line
    for (i = 0; i < lines.length; i++) {

        // Get all forms
        var currLine = lines[i].split(' ');

        // If there are forms
        if (currLine[1].length > 0) {
            // Go through all forms and add to database
            for (var j = 1; j < currLine.length; j++) {
                if (currLine[j] != currLine[0]) {
                    Forms.insert({
                        form: currLine[j],
                        main: currLine[0]
                    })
                }
            }
        }
    }

}

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
}

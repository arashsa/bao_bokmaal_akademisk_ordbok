data_from_list = List.find().count();

// If lists is empty, reads NAV file and fills the collection
if (data_from_list === 0) {
    console.log('Filling in NAV...');
    var test = Assets.getText('nav.txt');
    var line = test.replace(/\n/g, ' ').split(' ');

    var count = 1;
    for (var i = 0; i < line.length; i+=3) {
        List.insert({
            nr: count,
            word: line[i],
            tag: line[i+1],
            freq: line[i+2]
        });
        count += 1;
    }
}
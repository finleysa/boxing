var casper = require('casper').create();

casper.start('https://clear.titleboxingclub.com/', function() {
    this.echo(this.getTitle());
});

casper.thenOpen('http://phantomjs.org', function() {
    this.echo(this.getTitle());
});

casper.run();

//access.js

module.exports.saveBook = function(db, title, author, text, callback) {
	db.collection('text').save({title:title, author:author, text:text}, callback);
};

module.exports.findBookByTitleCached = function(db, redis, title, callback) {
    // Check cache
    redis.get(title, function(err, reply) {
		if (err)
			callback(null);
		else if (reply) //Book exists in cache
			callback(JSON.parse(reply));
		else {
            //Book doesn't exist in cache - we need to query the main database
            const collection = db.collection('text');
        
            collection.find({title: title}).toArray(function(err, result){
                if (err) {
                    throw err;
                }
                if (result === undefined || result.length == 0) {
                    callback(result);
                }
                else {
                    redis.set(title, JSON.stringify(result), function() {
                        callback(result);
                    });
                }
            });
		}
	});
};
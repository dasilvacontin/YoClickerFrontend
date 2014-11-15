/**
 * callback is called with (err, obj)
 */
exports.getJSON = function(url, cb)
{
	http.get(url, function (res)
	{
		// Backend server might be down
		if (res.statusCode != 200) return cb(new Error(500));

		var body = '';
		res.on('data', function (chunk) {
			body += chunk;
		});
		res.on('end', function () {
			var obj = {};
			try {
				obj = JSON.parse(body);
			} catch (e) {
				// Backend server might have crashed during our request
				cb(new Error(500));
			}
			cb(null, obj);
		});
	});
}
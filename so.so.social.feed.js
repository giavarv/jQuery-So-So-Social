/******************************************************
	* jQuery plug-in
	* So So Social Activity Feed
	* Services accessed: Facebook, Delicious, Twitter, Last.FM, Flickr
	* Developed by J.P. Given (http://johnpatrickgiven.com)
	* Useage: anyone so long as credit is left alone
******************************************************/

var ACTIVITY_ARRAY = new Array();
var TWITTER_FINISHED = 0;
var FACEBOOK_FINISHED = 0;
var FLICKR_FINISHED = 0;
var LASTFM_FINISHED = 0;
var DELICIOUS_FINISHED = 0;
var TUMBLR_FINISHED = 0;
var WORDPRESS_FINISHED = 0;
var CONTAINER = null;
var COUNT = 0;

(function($) {
	$.fn.soSoSocial = function(callback) {
		
		CONTAINER = $(this);
		
		
		/************************************************************************************
			* Repeated code is not ideal
			* However in this case you want multiple jQuery get's
		************************************************************************************/
		
		
		// Twitter
		if (TWITTER_RSS != "") {
			$.getJSON("http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20xml%20where%20url%3D%22"+encodeURIComponent(TWITTER_RSS)+"%22&format=json&callback=?", function(d) {
				//grab ever rss item from the json result request
				$(d.query.results.rss.channel.item).each(function() {
					//if set up to be infinite or the limit is not reached, keep grabbing items
					var title = this.title;
					var link = this.link;
					var description = this.description;
					var pubDate = this.pubDate;
					pubDate = pubDate.replace(/\,/g,'');
					
					var status = title.replace(/((https?|s?ftp|ssh)\:\/\/[^"\s\<\>]*[^.,;'">\:\s\<\>\)\]\!])/g, function(url) {
						return '<a href="'+url+'">'+url+'</a>';
					}).replace(/\B@([_a-z0-9]+)/ig, function(reply) {
						return  reply.charAt(0)+'<a href="http://twitter.com/'+reply.substring(1)+'">'+reply.substring(1)+'</a>';
					});
					
					//Remove twitter username from front of status.
					status = '@' + status;
					status = status.replace(/\B@([_a-z0-9]+):/ig, "");
					
					//append to the div
					ACTIVITY_ARRAY[COUNT] = new Array();
					ACTIVITY_ARRAY[COUNT][0] = '<li style="background: url(http://farm5.static.flickr.com/4057/4494661441_c03e3fe766_o.png) no-repeat left center;">' + status + ' <a href="' + link + '" target="_blank">#</a>';
					ACTIVITY_ARRAY[COUNT][1] = relative_time(pubDate);
					ACTIVITY_ARRAY[COUNT][2] = get_delta(pubDate);
					COUNT++;
				});
				
				TWITTER_FINISHED = 1;
				
			});
			
		} else { //if not on twitter set it to done.
			TWITTER_FINISHED = 1;
		}
		
		//LastFM
		if (LASTFM_RSS != '') {
			$.getJSON("http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20xml%20where%20url%3D%22"+encodeURIComponent(LASTFM_RSS)+"%22&format=json&callback=?", function(d) {
				//grab ever rss item from the json result request
				$(d.query.results.rss.channel.item).each(function() {
					//if set up to be infinite or the limit is not reached, keep grabbing items
					var title = this.title;
					var link = this.link;
					var description = this.description;
					var pubDate = this.pubDate;
					pubDate = pubDate.replace(/\,/g,'');
					
					//append to the div
					ACTIVITY_ARRAY[COUNT] = new Array();
					ACTIVITY_ARRAY[COUNT][0] = '<li style="background: url(http://farm5.static.flickr.com/4007/4495300744_5c8afb3149_o.png) no-repeat left center;">Listened to <a href="' + link + '" target="_blank">' + title + '</a>';
					ACTIVITY_ARRAY[COUNT][1] = relative_time(pubDate);
					ACTIVITY_ARRAY[COUNT][2] = get_delta(pubDate);
					COUNT++;
				});
				
				LASTFM_FINISHED = 1;
				
			});
		
		} else {
			LASTFM_FINISHED = 1;
		}
		
		if (FACEBOOK_RSS != '') {
			$.getJSON("http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20xml%20where%20url%3D%22"+encodeURIComponent(FACEBOOK_RSS)+"%22&format=json&callback=?", function(d) {
				//grab ever rss item from the json result request
				$(d.query.results.rss.channel.item).each(function() {
					//if set up to be infinite or the limit is not reached, keep grabbing items
					var title = this.title;
					var link = this.link;
					var description = this.description;
					var pubDate = this.pubDate;
					pubDate = pubDate.replace(/\,/g,'');
					
					//append to the div
					ACTIVITY_ARRAY[COUNT] = new Array();
					ACTIVITY_ARRAY[COUNT][0] = '<li style="background: url(http://farm5.static.flickr.com/4022/4494661487_35b0167583_o.png) no-repeat left center;">Posted <a href="' + link + '" target="_blank">' + title + '</a>';
					ACTIVITY_ARRAY[COUNT][1] = relative_time(pubDate);
					ACTIVITY_ARRAY[COUNT][2] = get_delta(pubDate);
					COUNT++;
				});
				
				FACEBOOK_FINISHED = 1;
				
			});
		} else {
			FACEBOOK_FINISHED = 1;
		}
		
		//Flickr
		if (FLICKR_RSS != '') {
			$.getJSON("http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20xml%20where%20url%3D%22"+encodeURIComponent(FLICKR_RSS)+"%22&format=json&callback=?", function(d) {
				//grab ever rss item from the json result request
				$(d.query.results.rss.channel.item).each(function() {
					//if set up to be infinite or the limit is not reached, keep grabbing items
					var title = this.title;
					var link = this.link;
					var description = this.description;
					var pubDate = this.pubDate;
					pubDate = pubDate.replace(/\,/g,'');
					title = title.toString();
					title = title.split(",");
					title = title[0];
					
					//append to the div
					ACTIVITY_ARRAY[COUNT] = new Array();
					ACTIVITY_ARRAY[COUNT][0] = '<li style="background: url(http://farm3.static.flickr.com/2727/4494661413_0228be5f32_o.png) no-repeat left center;">Uploaded <a href="' + link + '" target="_blank">' + title + '</a>';
					ACTIVITY_ARRAY[COUNT][1] = relative_time(pubDate);
					ACTIVITY_ARRAY[COUNT][2] = get_delta(pubDate);
					COUNT++;
				});
				
				FLICKR_FINISHED = 1;
				
			});
		} else {
			FLICKR_FINISHED = 1;
		}
		
		//Delicious
		if (DELICIOUS_RSS != '') {
			$.getJSON("http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20xml%20where%20url%3D%22"+encodeURIComponent(DELICIOUS_RSS)+"%22&format=json&callback=?", function(d) {
				//grab ever rss item from the json result request
				$(d.query.results.rss.channel.item).each(function() {
					//if set up to be infinite or the limit is not reached, keep grabbing items
					var title = this.title;
					var link = this.link;
					var description = this.description;
					var pubDate = this.pubDate;
					pubDate = pubDate.replace(/\,/g,'');
					
					//append to the div
					ACTIVITY_ARRAY[COUNT] = new Array();
					ACTIVITY_ARRAY[COUNT][0] = '<li style="background: url(http://farm5.static.flickr.com/4064/4495300640_2a7cbbb922_o.png) no-repeat left center;">Saved <a href="' + link + '" target="_blank">' + title + '</a>.';
					ACTIVITY_ARRAY[COUNT][1] = relative_time(pubDate);
					ACTIVITY_ARRAY[COUNT][2] = get_delta(pubDate);
					COUNT++;
				});
				
				DELICIOUS_FINISHED = 1;
				
			});
		} else {
			DELICIOUS_FINISHED = 1;
		}
		
		print_array($(this));
		
		if (typeof callback == 'function') { // make sure the callback is a function
			callback.call(this); // brings the scope to the callback
		}
		
		//Tumblr
		if (TUMBLR_RSS != '') {
			$.getJSON("http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20xml%20where%20url%3D%22"+encodeURIComponent(TUMBLR_RSS)+"%22&format=json&callback=?", function(d) {
				//grab ever rss item from the json result request
				$(d.query.results.rss.channel.item).each(function() {
					//if set up to be infinite or the limit is not reached, keep grabbing items
					var title = this.title;
					var link = this.link;
					var description = this.description;
					var pubDate = this.pubDate;
					pubDate = pubDate.replace(/\,/g,'');

					//append to the div
					ACTIVITY_ARRAY[COUNT] = new Array();
					ACTIVITY_ARRAY[COUNT][0] = '<li style="background: url(http://farm5.static.flickr.com/4022/4494661551_3d68321873_o.png) no-repeat left center;">Posted <a href="' + link + '" target="_blank">' + title + '</a>.';
					ACTIVITY_ARRAY[COUNT][1] = relative_time(pubDate);
					ACTIVITY_ARRAY[COUNT][2] = get_delta(pubDate);
					COUNT++;
				});

				TUMBLR_FINISHED = 1;

			});
		} else {
			TUMBLR_FINISHED = 1;
		}

			print_array($(this));

		if (typeof callback == 'function') { // make sure the callback is a function
			callback.call(this); // brings the scope to the callback
		}
		
		
		//Wordpress
		if (WORDPRESS_RSS != '') {
			$.getJSON("http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20xml%20where%20url%3D%22"+encodeURIComponent(WORDPRESS_RSS)+"%22&format=json&callback=?", function(d) {
				//grab ever rss item from the json result request
				$(d.query.results.rss.channel.item).each(function() {
					//if set up to be infinite or the limit is not reached, keep grabbing items
					var title = this.title;
					var link = this.link;
					var description = this.description;
					var pubDate = this.pubDate;
					pubDate = pubDate.replace(/\,/g,'');

					//append to the div
					ACTIVITY_ARRAY[COUNT] = new Array();
					ACTIVITY_ARRAY[COUNT][0] = '<li style="background: url(http://farm5.static.flickr.com/4060/4495300842_3f39a6b514_o.png) no-repeat left center;">Posted <a href="' + link + '" target="_blank">' + title + '</a> on Tumblr.';
					ACTIVITY_ARRAY[COUNT][1] = relative_time(pubDate);
					ACTIVITY_ARRAY[COUNT][2] = get_delta(pubDate);
					COUNT++;
				});

				WORDPRESS_FINISHED = 1;

			});
		} else {
			WORDPRESS_FINISHED = 1;
		}

			print_array($(this));

		if (typeof callback == 'function') { // make sure the callback is a function
			callback.call(this); // brings the scope to the callback
		}
		
	};
})(jQuery);

// Print the array! 
function print_array(obj) {
	
	if ( (LIMIT == 0) || (ACTIVITY_ARRAY.length < LIMIT) ) {
		LIMIT = ACTIVITY_ARRAY.length;
	}
	
	if ((FLICKR_FINISHED == 1) && (TWITTER_FINISHED == 1) && (FACEBOOK_FINISHED == 1) && (LASTFM_FINISHED == 1) && (DELICIOUS_FINISHED == 1) && (TUMBLR_FINISHED == 1) && (WORDPRESS_FINISHED == 1)) {
		
		CONTAINER.html("");
		
		ACTIVITY_ARRAY.sort(by(2,1));
		var html = '<ul>';
		for (j = 0; j < LIMIT; j++) {
			html += ACTIVITY_ARRAY[j][0] + ' (' + ACTIVITY_ARRAY[j][1] + ')</li>';
		}
		html += '</ul>';
		CONTAINER.append(html);
	} else {
		setTimeout("print_array()", 1000);
	}
}

// pubDate delta function
function get_delta(time_value) {
	var values = time_value.split(" ");
	time_value = values[2] + " " + values[1] + ", " + values[3] + " " + values[4];
	var parsed_date = Date.parse(time_value);
	var relative_to = (arguments.length > 1) ? arguments[1] : new Date();
	var delta = parseInt((relative_to.getTime() - parsed_date) / 1000);
	delta = delta + (relative_to.getTimezoneOffset() * 60);
	
	return delta;
}

// Function to return the relative time based off of delta.
function relative_time(time_value) {
	
	var delta = get_delta(time_value);

	if (delta < 60) {
		return 'less than a minute ago';
	} else if(delta < 120) {
		return 'about a minute ago';
	} else if(delta < (60*60)) {
		return (parseInt(delta / 60)).toString() + ' minutes ago';
	} else if(delta < (120*60)) {
		return 'about an hour ago';
	} else if(delta < (24*60*60)) {
		return 'about ' + (parseInt(delta / 3600)).toString() + ' hours ago';
	} else if(delta < (48*60*60)) {
		return '1 day ago';
	} else {
		return (parseInt(delta / 86400)).toString() + ' days ago';
	}
}

// Multi-Dementional Array sort.
function by(i,dir) {
	return function(a,b){a = a[i];b = b[i];return a == b ? 0 : (a < b ? -1*dir : dir)}
}


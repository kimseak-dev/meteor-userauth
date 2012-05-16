/*******************************************
* Users
*******************************************/

var addUser = function (name, username, password) {
	Meteor.call("addUser", getSessionToken(), name, username, password, function (error, result) {
		if (!error) {
			info("User " + name + " added successfully.");
		} else {
			info(error.reason);
		}
	});
};

var removeUser = function (user) {
	var name = user.name;
	Meteor.call("removeUser", getSessionToken(), user._id, function (error, result) {
		if (!error) {
			info("User " + name + " removed successfully.");
			forgetSessionToken();	// can only remove self, so since we're deleted, log out!
		} else {
			info(error.reason);
		}
	});
};

/*******************************************
* Notes
*******************************************/

var addNote = function (title, is_private) {
	Meteor.call("addNote", getSessionToken(), title, is_private, function (error, result) {
		if (!error) {
			info("Note '" + title + "' added successfully.");
		} else {
			info(error.reason);
		}
	});
};

var removeNote = function (note) {
	var title = note.title;
	Meteor.call("removeNote", getSessionToken(), note._id, function (error, result) {
		if (!error) {
			info("Note '" + title + "' removed successfully.");
		} else {
			info(error.reason);
		}
	});
};

/*******************************************
* Authentication
*******************************************/

var login = function (username, password) {
	Meteor.call("login", username, password, function (error, sessionToken) {
		if (!error) {
			rememberSessionToken(sessionToken);
			info("Password verified!");
		} else {
			info(error.reason);
		}
	});
};

var logout = function () {
	Meteor.call("logout", getSessionToken(), function (error, result) {
		forgetSessionToken();
		if (!error) {
			info("Logout successful.");
		} else {
			info(error.reason);
		}
	});
};
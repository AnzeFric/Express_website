var mongoose = require('mongoose');
var Schema = mongoose.Schema;

function formatDate() {
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();

    const formattedDay = String(day).padStart(2, '0');
    const formattedMonth = String(month).padStart(2, '0');
    const formattedHours = String(hours).padStart(2, '0');
    const formattedMinutes = String(minutes).padStart(2, '0');

    return `${formattedDay}/${formattedMonth}/${year} ${formattedHours}:${formattedMinutes}`;
}

var questionSchema = new Schema({
	'title': String,
	'description': String,
    'username' : String,
	'postedBy': {
		type: Schema.Types.ObjectId,
		ref: 'user'
	},
	'date': {
		type: String,
		default: formatDate 
	}
});

module.exports = mongoose.model('question', questionSchema);
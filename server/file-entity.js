FileEntity = function(request, config) {
	this.originalname = request.file.originalname,
	this.filetype = request.body.filetype,
	this.first_name = config.user_first_name,
	this.last_name = config.user_last_name,
	this.email = config.user_email,
	this.mimetype = request.file.mimetype,
	this.destination = request.file.destination,
	this.filename = request.file.filename,
	this.path = request.file.path,
	this.size = request.file.size 
}

module.exports = FileEntity;

ServerConfig = {
	serverport: 8888,
	cmshost: { hostEcm: 'http://127.0.0.1:8088' },
	cmscreds: {user: 'admin', passwd: '!Apollo' },
	filedir: './dist/server/mount/',
	dbdir: './dist/server/mount/',
	user_first_name: 'Ian',
	user_last_name: 'Hamilton',
	user_email: 'ian.hamilton@apollo.edu'
}

module.exports = ServerConfig;
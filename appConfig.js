var developmentDatabase = {
    postgres: {
    host: 'ec2-54-220-243-77.eu-west-1.compute.amazonaws.com',
    port: 5432,
    database: 'd8rl7f57jvgb4u',
    user: 'pfwhbmdqwdqmfc',
    password: 'c6ce7142b24fc69ab8159e4f592a3ab7f26fe6b8b832e6d75758ecc9eb18eb8d'
    }
    }
    
    var connectionString ="pfwhbmdqwdqmfc:c6ce7142b24fc69ab8159e4f592a3ab7f26fe6b8b832e6d75758ecc9eb18eb8d@ec2-54-220-243-77.eu-west-1.compute.amazonaws.com:5432/d8rl7f57jvgb4u?ssl=true";
    if (process.env.NODE_ENV == 'production') {
    //Production mode
    if (process.env.DATABASE_URL) {
    developmentDatabase =
    parseConnectionString(process.env.DATABASE_URL);
    } else {
    console.log("process.env.DATABASE_URL empty, connectionStringvariable used");
    developmentDatabase = parseConnectionString(connectionString);
    }
    }else{
    //Development mode
    developmentDatabase = parseConnectionString(connectionString);
    }
    function parseConnectionString(connectionString) {
    if (connectionString) {
    var myRegexp = /(\w+):(\w+)@(.+):(\w+)\/(\w+)/g;
    var match = myRegexp.exec(connectionString);
    if (match.length == 6) {
    developmentDatabase.postgres.user = match[1];
    developmentDatabase.postgres.password = match[2];
    developmentDatabase.postgres.host = match[3];
    developmentDatabase.postgres.port = Number(match[4]);
    developmentDatabase.postgres.database = match[5];
    developmentDatabase.postgres.ssl = { rejectUnauthorized: false };
    return developmentDatabase;
    }
    }
    console.log("connectionString cannot be parsed");
    return null;
    }
    module.exports = {
    hostname: "http://localhost",
    port: 5656,
    database: {
    postgres: developmentDatabase.postgres
    }
    }
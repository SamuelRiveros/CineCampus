const { MongoClient } =require("mongodb")

class Connect {
    user;
    port;
    #pass;
    #host;
    #cluster;
    #dbName;
    static instance;
    
    constructor() {
        if (typeof connect.instance === "object") {
            return connect.instance;
        }
        this.user = process.env.MONGO_USER;
        this.port = process.env.MONGO_PORT;
        this.setPass = process.env.MONGO_PWD;
        this.setHost = process.env.MONGO_HOST;
        this.setCluster = process.env.MONGO_CLUSTER;
        this.setDbName = process.env.MONGO_DB;
        this.#open();
        this.db = this.conexion.db(this.getDbName)
        connect.instance = this;
        return this;
    }

    set setPass(pass){
        this.#pass = pass;
    }

    set setHost(host){
        this.#host = host;
    }

    set setCluster(cluster){
        this.#cluster = cluster;
    }

    set setDbName(dbName){
        this.#dbName = dbName;
    }

    get getPass(){
        return this.#pass
    }

    get getHost(){
        return this.#host
    }

    get getCluster(){
        return this.#cluster
    }

    get getDbName(){
        return this.#dbName
    }

    async reconnect(){
        await this.#open();
    }

    async #open() {
        if (this.conexion && this.conexion.isConnected && this.conexion.isConnected()) {
            return;
        }
        
        if (this.user !== "mongo") {
            console.log(`No estamos conectados como user mongo, nos conectamos con el DbName para que funcione bien conectada, la db se llama ${this.user}`);
            this.conexion = new MongoClient(`${this.getHost}${this.user}:${this.getPass}@${this.getCluster}:${this.port}/${this.getDbName}`);
        } else if (this.user === "mongo") {
            console.log(`Estamos conectados como usuario mongo, quitamos el dbname para que la autenticacion funcione piola`);
            this.conexion = new MongoClient(`${this.getHost}${this.user}:${this.getPass}@${this.getCluster}:${this.port}`);
        }
        await this.conexion.connect();
    }

    async close() {
        if (this.conexion && this.conexion.isConnected && this.conexion.isConnected()) {
            await this.conexion.close();
        }
    }
}
module.exports = Connect
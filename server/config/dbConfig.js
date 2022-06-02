let dbURI = "mongodb://localhost:27017/myDB";
if(process.env.NODE_ENV === 'production') {
    dbURI = process.env.MONGO_URI;
}

export const config = {
    database: dbURI,
    userMongoClient: true,
    connectOptions: { useNewUrlParser: true,
                      useUnifiedTopology: true,
                    //   useCreateIndex: true,
                    //   useFindAndModify: false
                    }
}
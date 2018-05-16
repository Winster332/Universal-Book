using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using LM.Backend.Aggregates;
using MongoDB.Bson;
using MongoDB.Driver;

namespace LM.Backend.Storage
{
    public class Repository
    {
        public static Repository Instance => _instance ?? (_instance = new Repository());
        private static Repository _instance;
        private MongoClient Client { get; set; }
        private string MongoDatabaseName = "LMTests";
        public IMongoDatabase MongoDb { get; set; }

        private IMongoCollection<BsonDocument> Books => MongoDb.GetCollection<BsonDocument>(TypeCollection.Books.ToString());
        private IMongoCollection<BsonDocument> Parts => MongoDb.GetCollection<BsonDocument>(TypeCollection.Pages.ToString());
        private IMongoCollection<BsonDocument> Themes => MongoDb.GetCollection<BsonDocument>(TypeCollection.Themes.ToString());
        private IMongoCollection<BsonDocument> Pages => MongoDb.GetCollection<BsonDocument>(TypeCollection.Pages.ToString());
        private IMongoCollection<BsonDocument> Contents => MongoDb.GetCollection<BsonDocument>(TypeCollection.Contents.ToString());
        
        private Repository()
        {
            Client = new MongoClient();
            MongoDb = Client.GetDatabase(MongoDatabaseName);
        }

        public async Task<IList<dynamic>> Get(TypeCollection type)
        {
            var collection = MongoDb.GetCollection<BsonDocument>(type.ToString());
            var results = await collection.Aggregate()
                .Project<dynamic>(Builders<BsonDocument>.Projection
                    .Include("_id")
                    .Include("Name")
                    .Include("Themes")
                    .Include("Number")
                    .Include("ParentId")
                    .Include("Pages")
                    .Include("Contents")
                    .Include("Type")
                    .Include("Value")
                    .Include("Description")
                    .Include("Parts"))
                .ToListAsync();

            return results;
        }
        
        public async Task<List<dynamic>> Get(TypeCollection type, Guid? id)
        {
            var collection = MongoDb.GetCollection<BsonDocument>(type.ToString());
            var results = await collection.Aggregate()
                .Match(new BsonDocument("_id", id))
                .Project<dynamic>(Builders<BsonDocument>.Projection
                    .Include("_id")
                    .Include("Name")
                    .Include("Themes")
                    .Include("Number")
                    .Include("ParentId")
                    .Include("Pages")
                    .Include("Contents")
                    .Include("Description")
                    .Include("Type")
                    .Include("Value")
                    .Include("Parts"))
                .ToListAsync();

            return results;
        }
        
        public async Task Create(TypeCollection type, BsonDocument document)
        {
            var collection = MongoDb.GetCollection<BsonDocument>(type.ToString());
            await collection.InsertOneAsync(document);
        }

        public async Task Remove(TypeCollection type, Guid id)
        {
            var collection = MongoDb.GetCollection<BsonDocument>(type.ToString());
            await collection.DeleteOneAsync(new BsonDocument("_id", id));
        }
        
        public async Task Update(TypeCollection type, BsonDocument document)
        {
            var collection = MongoDb.GetCollection<BsonDocument>(type.ToString());
            await collection.ReplaceOneAsync(x => x["_id"] == document["_id"].AsGuid, document);
        }

        public async Task DropDatabase() => Client.DropDatabase(MongoDatabaseName);
    }
}
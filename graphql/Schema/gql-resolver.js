const GQLModel = require('./gql')

const gqlResolver = {
  GqlType: {
    __resolveReference: async (ref) => {
        return await GQLModel.findOne({ _id: ref._id });
      },
    },
  
  Query: {
    get: async (parent, args) => {
      return await GQLModel.findById(args.id)
    },
    getAll: async () => {
      return await GQLModel.find()
    },
  },
  Mutation: {
    addEntry: async (parent, args) => {
      let trader = new GQLModel(args)
      return await trader.save()
    },

    removeEntry: async (_, args) => {
      return await GQLModel.findOneAndDelete(args.id);
    },

    clearAll: async ()=> {
      await GQLModel.deleteMany();
      console.log('All entries successfully deleted');
      return true;
    },
  }
};
module.exports = gqlResolver
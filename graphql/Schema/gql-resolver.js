const TraderModel = require('./gql')

const traderResolver = {
  TraderType: {
    __resolveReference: async (ref) => {
        const currentTrader = TraderModel.findOne({ _id: ref._id });
        return currentTrader;
      },
    },
  
  Query: {
    trader: async (parent, args) => {
      return await TraderModel.findById(args.id)
    },
    traders: async () => {
      return await TraderModel.find()
    },
  },
  Mutation: {
    addTrader: async (parent, args) => {
      let trader = new TraderModel(args)
      return await trader.save()
    },

    updateTrader: async (_, args) => {
      let trader = await TraderModel.findById(args.id);
      if (!trader)
      {
          throw new Error(`Couldn't find trader with this id ${args.id}`);
      }

      if (args.name !== undefined) {
          trader.name = args.name;
      }
      if (args.desc !== undefined) {
          trader.desc = args.desc;
      }
      return await trader.save();
    },

  removeTrader: async (_, args) => {
      return await TraderModel.findOneAndDelete(args.id);
    },

  clearTraders: async ()=> {
      await TraderModel.deleteMany();
      console.log('All Traders successfully deleted');
      return true;
    },
  }
};
module.exports = traderResolver
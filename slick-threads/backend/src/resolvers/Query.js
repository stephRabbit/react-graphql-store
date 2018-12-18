const { forwardTo } = require('prisma-binding')

const Query = {
  // dogs(parent, args, ctx, info) {
  //   global.dogs = global.dogs || []
  //   return global.dogs
  // }

  // For not custom operations
  items: forwardTo('db'),

  // async items(parent, args, ctx, info) {
  //   const items = await ctx.db.query.items()
  //   return items
  // }

  item: forwardTo('db'),

  // async item(parent, args, ctx, info) {
  //   const item = await ctx.db.query.item(args, info)
  //   return item
  // }

  itemsConnection: forwardTo('db'),
}

module.exports = Query

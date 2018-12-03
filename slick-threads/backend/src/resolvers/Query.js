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
}

module.exports = Query

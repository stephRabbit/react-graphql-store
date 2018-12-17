const Mutations = {
  // createDog(parent, args, ctx, info) {
  //   global.dogs = global.dogs || []
  //   const newDog = { name: args.name }
  //   console.log(args)
  //   global.dogs.push(newDog)
  //   return newDog
  // }

  async createItem(parent, args, ctx, info) {
    // TODO:: Check if user is logged in
    const item = await ctx.db.mutation.createItem(
      {
        data: { ...args }
      },
      info
    )

    return item
  },

  async updateItem(parent, args, ctx, info) {
    // Copy updates
    const updates = { ...args }
    // Remove ID form updates
    delete updates.id
    // Execute update method
    const item = await ctx.db.mutation.updateItem(
      {
        data: updates,
        where: {
          id: args.id,
        },
      },
      info
    )

    return item
  },

  async deleteItem(parent, args, ctx, info) {
    const where = { id: args.id }
    // Find the item
    const item = await ctx.db.query.item({ where }, `{ id, title }`)

    // TODO:: Check if they own that item, or have permissions

    // Delete item
    const deletedItem = await ctx.db.mutation.deleteItem({ where }, info)
    return deletedItem
  },
}

module.exports = Mutations

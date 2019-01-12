const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

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

  async signup(parent, args, ctx, info) {
    args.email = args.email.toLowerCase()

    // Hash their password and Create the user in the database
    const password = await bcrypt.hash(args.password, 10)
    const user = await ctx.db.mutation.createUser(
      {
        data: {
          ...args,
          password,
          permissions: { set: ['USER'] },
        },
      },
      info
    )

    // Create the JWT token for them and Set jwt as a cookie on the response
    const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET)
    ctx.response.cookie('token', token, {
      httpOnly: true, // Don't allow cookies in js
      maxAge: 1000 * 60 * 60 * 24 * 365, // 1 year cookie
    })

    return user
  },
}

module.exports = Mutations

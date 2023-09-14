require('mongoose')
// const { set } = mongoose

function refactorSchema (schemaToRefactor) {
  if (!schemaToRefactor) {
    return
  }

  schemaToRefactor.set('toJSON', {
    transform: (doc, ret) => {
      ret.id = ret._id
      delete ret._id
      delete ret.__v
    }
  })
}

module.exports = {
  refactorSchema
}

const User = require("../models/User")

exports.updateUser = async (req, res) => {
  try {
    const { userID, cota } = req.body

    const user = await User.findByPk(userID)

    const updatedUser = await user.update({
      cota,
    })

    if (!updatedUser) {
      return res.status(401).json({
        error:
          "Houve um erro ao atualizar os dados do usuário, tente mais tarde!",
      })
    }

    res.status(200).json(user)
  } catch (err) {
    console.log(err)
  }
}

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params

    const user = await User.findByPk(id)

    await user.destroy()

    res.status(200).json("usuario removido com sucesso")
  } catch (err) {
    console.log(err)
    res.status(500).json("houve um erro ao excluir usuario")
  }
}

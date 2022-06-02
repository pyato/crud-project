import User from "../model/userModel";

const prodFieldProjection = {
    __v: false,
    //_id: false,
};

export const list = (req, res) => {
    User.find()
        .then(result => res.json(result))
        .catch(err => res.status(500).send({ errors: { global: "Server Error" } }))
};

//Add new user
export const create = (req, res) => {
    let user = new User(req.body)
    user.save()
        .then(() => { return res.send({ success: "Create Successfully" }) })
        .catch(err => res.status(404).send({ errors: { global: "Cann't add new User id"} }))
};

//Find user with id
export const get = (req, res) => {
    const id = req.params.id;
    User.findOne({ id: id })
        .then(user => {
            if (!user) {
                return res.status(404).send({
                    errors: {
                        global: "User not found with id " + id
                    }
                });
            }
            res.json(user); // default status = 200
        }).catch(err => {
            return res.status(500).send({
                errors: {
                    global: "Error retrieving User with id " + id
                }
            });
        });
};

//Find user with id and update
export const put = (req, res) => {
    const data = req.body || {};
    if (!data || data.id != req.params.id)
        return res.status(422).send({ error: 'id must be alphanumeric.' });
    User.findOneAndUpdate({ id: req.params.id }, { $set: data })
        .then(user => {
            if (!user) {
                return res.status(404).send({
                    errors: {
                        global: "User not found with id " + req.params.id
                    }
                });
            }
            res.send(user);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    errors: {
                        global: "User not found with id " + req.params.id
                    }
                });
            }
            return res.status(500).send({
                errors: {
                    global: "Error updating User with id " + req.params.id
                }
            });
        });
};

//Delete user with id
export const remove = (req, res) => {
    // const data = req.body || {};
    // if (!data || data.id != req.params.id)
    //     return res.status(422).send({ error: 'id must be alphanumeric.' });
    User.deleteOne({ id: req.params.id })
        .then(
            () => {
                return res.status(200).send({ success: true });
            }
        ).catch(() => {
            return res.status(404).send({
                errors: {
                    global: "User not found with id " + req.params.id
                }
            });
        })
};
const User = require('../models/user');
const Book = require('../models/book');

module.exports.add_book = async (req, res) => {
    try {
        if (req.body) {
            const userData = await User.findById(req.user._id);
            if (userData) {
                const checkData = await Book.findOne({ title: req.body.title });
                if (checkData) {
                    return res.status(200).json({ mes: "Post Data insert already", status: 1 })
                }
                else {
                    req.body.Created_date = new Date().toLocaleDateString();
                    req.body.Updated_date = new Date().toLocaleString();
                    req.body.borrowed = userData.id;
                    const newpost = await Book.create(req.body);
                    if (newpost) {
                        return res.status(200).json({ mes: "Post Data successfully insert", newpost: newpost, status: 1 })
                    }
                    else {
                        return res.status(200).json({ mes: "post not found", status: 0 })
                    }

                }
            }
            else {
                return res.status(200).json({ mes: "User not found", status: 0 })
            }
        }
        else {
            return res.status(200).json({ mes: "invliad Data", status: 0 })
        }
    } catch (error) {
        console.log(error);
        return res.status(400).json({ mes: "something worng", status: 0 })
    }
}
module.exports.viewbook = async (req, res) => {
    try {
        const viewData = await Book.find({ borrowed: req.user._id })
        if (viewData != "") {
            return res.status(200).json({
                msg: "Here is all post data", viewData: viewData, status: 1
            });
        } else {
            return res.status(200).json({ msg: "No post found", status: 0 });
        }
    } catch (error) {
        console.log(error);
        return res.status(400).json({ mes: "something worng", status: 0 })
    }
}

module.exports.deletebook = async (req, res) => {
    try {
        let deletedata = await Book.findByIdAndDelete(req.params.id, req.body)
        if (deletedata) {
            return res.status(200).json({ mes: "Delete record sucessfully", deletedata: deletedata, status: 1 });
        }
        else {
            return res.status(200).json({ mes: "invliad Data", status: 0 });

        }
    } catch (error) {
        console.log(error);
        return res.status(400).json({ mes: "something worng", status: 0 })
    }
}

module.exports.editbook = async (req, res) => {
    try {
        let editdata = await Book.findByIdAndUpdate(req.params.id, req.body)
        if (editdata) {
            return res.status(200).json({ mes: "Edit record sucessfully", editdata: editdata, status: 1 });
        }
        else {
            return res.status(200).json({ mes: "invliad Data", status: 0 });

        }
    } catch (error) {
        console.log(error);
        return res.status(400).json({ mes: "something worng", status: 0 })
    }
}
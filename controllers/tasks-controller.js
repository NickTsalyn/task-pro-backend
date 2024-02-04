import Task from "../models/Task.js";
import { HttpError} from "../helpers/index.js";
import ctrlWrapper from "../decorators/ctrlWrapper.js";


const getAll = async (req, res) => {
    const { _id: owner } = req.user;

    const result = await Task
        .find({ owner }, "-createdAt -updatedAt")
        // .populate("owner", ["name"]);
    
    res.json(result);
};

const addTask = async (req, res) => {
    const { _id: owner } = req.user;

    const result = await Task.create({...req.body, owner});
    res.status(201).json(result);
};

const editTask = async (req, res) => {
    const { id } = req.params;
    const { _id: owner } = req.user;

    const result = await Task.findOneAndUpdate({ _id: id, owner }, req.body);
        
    if (!result) {
        throw HttpError(404, `Contact with id=${id} not found!`);
    };

    res.json(result);
};

const deleteTask = async (req, res) => {
    const { id } = req.params;
    const { _id: owner } = req.user;
    const result = await Task.findOneAndDelete({ _id: id, owner });

    if (!result) {
        throw HttpError(404, `Task with id=${id} not found!`);
    };

    res.json({ message: "Task deleted" });
};


export default {
    getAll: ctrlWrapper(getAll),
    addTask: ctrlWrapper(addTask),
    editTask: ctrlWrapper(editTask),
    deleteTask: ctrlWrapper(deleteTask),
};
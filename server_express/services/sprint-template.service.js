var sprintTemplate = require('../models/sprint-template.model')

_this = this


exports.getSprints = async function(query, page, limit){
    var options = {
        page,
        limit
    }
    try {
        var todos = await sprintTemplate.paginate(query, options)
        return todos;
    } catch (e) {
        throw Error('Error while Paginating Todos')
    }
}

exports.createSprint = async function(todo){

    var newTodo = new sprintTemplate({
        title: todo.title,
        description: todo.description,
        date: new Date(),
        status: todo.status
    })

    try{
        var savedTodo = await newTodo.save()
        return savedTodo;
    }catch(e){
        throw Error("Error while Creating Todo")
    }
}

exports.updateSprint = async function(todo){
    var id = todo.id

    try{
        var oldTodo = await sprintTemplate.findById(id);
    }catch(e){
        throw Error("Error occured while Finding the Todo")
    }

    if(!oldTodo){
        return false;
    }

    console.log(oldTodo)

    oldTodo.title = todo.title
    oldTodo.description = todo.description
    oldTodo.status = todo.status


    console.log(oldTodo)

    try{
        var savedTodo = await oldTodo.save()
        return savedTodo;
    }catch(e){
        throw Error("And Error occured while updating the Todo");
    }
}

exports.deleteTodo = async function(id){
    
    try{
        var deleted = await sprintTemplate.remove({_id: id})
        if(deleted.result.n === 0){
            throw Error("Todo Could not be deleted")
        }
        return deleted
    }catch(e){
        throw Error("Error Occured while Deleting the Todo")
    }
}
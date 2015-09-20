var GUI = (function(){ //IIFE for all Views

    var TaskView = Backbone.View.extend({
    
    });
    
    var CreateTaskView = Backbone.View.extend({
    
    });
    var UnassignedTasksView = Backbone.View.extend({
        render: function() {
            // XXX not done
            var newTaskBtn = '<button id="newTask"> Create new Task </button>';
            this.$el.html('<div>' + newTaskBtn + '</div>');
        },
        events: {
            "click #newTask" : "CreateTaskView"
        }
    
    });
    var UserTasksView = Backbone.View.extend({
        render: function() {
            // XXX all tasks that belong or were created by user
        },
    
    });
    
    var UserView = Backbone.View.extend({
    
    });
    
    var LoginView = Backbone.View.extend({
    
    });
    
    
    // generic ctor to represent interface:
    function GUI(users,tasks,el) {
        // users is collection of User models
        // tasks is collection of Task models
        // el is selector for where GUI connects in DOM
    
        //...
    }

    return GUI;
}())

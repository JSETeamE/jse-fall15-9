var GUI = (function(){ //IIFE for all Views

    function useMustacheTemplates() {
        _.templateSettings = {
            interpolate: /\{\{(.+?)\}\}/g
        };
    }
    useMustacheTemplates();

    var TaskView = Backbone.View.extend({
        render: function(){
            this.$el.html(this.template(this.model.attributes));
        },
        initialize: function(){
            this.el.id = "hello";
            this.render();

        },
        events: {
            //"click assignBtn" : //change the state of the assignee
        },
        template: _.template('<div id=wholeview><div id=title>{{title}}</div><div id=des> {{description}}</div><div id=creator>{{creator}}</div><button id=assignBtn>Assign</button></div>')


    });


    var CreateTaskView = Backbone.View.extend({
        render: function(){
            this.$el.html(this.template());
        },
        initialize: function(opts){
            this.$el.addClass('createTask');
            this.render();
            this.username = opts.username;
        },

        events: {
            "click #createBtn" : "makeTask",
            "click #cancelBtn" : "cancel"
        },
        makeTask: function(){
            var title = $("#createTaskTitle").val();
            var description = $("#createTaskDescription").val();
            var creator = this.username;
            var freshTask = app.tasks.add({"title":title, "description":description, "creator":creator});
        },
        cancel: function(){
            this.remove();
        },

        template: _.template('<input type="text" id="createTaskTitle"></input> <input type="text" id="createTaskDescription"></input><button id="createBtn">create</button><button id="cancelBtn">cancel</button>')


    });

    var UnassignedTasksView = Backbone.View.extend({

    });

    var UserTasksView = Backbone.View.extend({

    });

    var UserView = Backbone.View.extend({

    });

    var LoginView = Backbone.View.extend({

    });


    // generic ctor to represent interface:
    function GUI(users,tasks,el) {
        //tests for first two views
        var taskview = new TaskView({model:app.tasks.models[0]});
        $("#app").append(taskview.el);
        var createTaskView = new CreateTaskView({username:'Elizabeth'});
        $("#app").append(createTaskView.el);

        // users is collection of User models
        // tasks is collection of Task models
        // el is selector for where GUI connects in DOM

        //...
    }

    return GUI;
}());

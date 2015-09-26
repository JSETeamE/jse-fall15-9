var GUI = (function(){ //IIFE for all Views


    function useMustacheTemplates() {
        _.templateSettings = {
            interpolate: /\{\{(.+?)\}\}/g
        };
    }
    useMustacheTemplates();

    var TaskView = Backbone.View.extend({
        render: function(){
            var self = this;
            var statusOption = ["unassigned", "assigned", "in progress", "done"];
            this.$el.html(this.template(this.model.attributes));
            //app.tasks.each(function(model){
              //  self.$("#userSelect").append('<option>' + model.attributes.username + '</option>');
            //});
            statusOption.forEach(function(status){
                self.$("#statusSelect").append('<option>' + status + '</option>');
            });
        },
        initialize: function(){
            //this.render();

        },
        events: {
            //"click assignBtn" : //change the state of the assignee
        },
        template: _.template('<div id=wholeview><div id=title>Task: {{title}}</div><div id=des>Details: {{description}}</div><div id=creator>Creator: {{creator}}</div><div id=status>Status: {{status}}</div>Change Status  <select id=statusSelect></select></div>')
    });

    var UnassignedTasksView = Backbone.View.extend({

        initialize: function(){
            this.render();
        },
        events: {
            //not currently using
            'click #unassignedTask': 'unassignedTask'
        },
        // unassignedTask: function(){
        //     var taskIndex = parseInt($('#tasks', this.$el).val());
        //     var tasks = this.collection.at(taskIndex);
        //     // replace login with userView
        //     var tasks = new UnassignedTasksView({model: tasks});
        // },
        render: function() {
            var self = this;
            var html = 'Do some work<br>';
            this.$el.html(html);
            this.collection.each(function(model){
                var task = model.attributes;
                var status = task.status;
                if (status === 'unassigned'){
                    var unTask = new TaskView({model: model});
                    unTask.render();
                    self.$el.append(unTask.$el);
                }
            });
            this.$el.append('<button id="newTask"> Create new Task </button>');
            return this; // enable chained calls
        },
        events: {
            "click #newTask" : "createTask"
        },
        createTask: function() {
            var tasks = new CreateTasksView({username: this.model.attributes.username});
            this.$el.append(tasks);
        }
    });
    var UserTasksView = Backbone.View.extend({

        render: function() {
            var self = this;
            var username = this.model.attributes.username;
            this.collection.each(function(model){
                var task = model.attributes;
                var assignee = task.assignee;
                var creator = task.creator;
                if ((assignee === username)||(creator === username)){
                    var task = new TaskView({model:model});
                    task.render();
                    self.$el.append(task.$el);
                }
            });
        },
        initialize: function(){
            this.render();
        }

    });
    var CreateTasksView = Backbone.View.extend({
        render: function(){
            this.$el.html(this.template());
            this.$el.prependTo($("#app"));
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
            var html = 'Welcome <select id=users>'
            var title = $("#createTaskTitle").val();
            var description = $("#createTaskDescription").val();
            var creator = this.username;
            var freshTask = app.tasks.add({"title":title, "description":description, "creator":creator});
        },
        cancel: function(){
            this.remove();
        },
        template: _.template('Task: <input type="text" id="createTaskTitle"> Details:<input type="text" id="createTaskDescription"><button id="createBtn">create</button><button id="cancelBtn">cancel</button>')
    });

    var LoginView = Backbone.View.extend({
        render: function(){
            var html = 'Select a User <select id=users>';
            var x = 0;
            this.collection.each(function(model){
                var username = model.attributes.username;
                html += '<option value=' + x + '>' + username + '</option>';
                ++x;
            });
            html += '</select><br /><button id=login>Login</button>';
            this.$el.html(html);
            $('#app').append(this.$el);
            return this; // enable chained calls
        },
        initialize: function(){
            this.render();
        },
        events: {
            'click #login': 'login'
        },
        login: function(){
            var userIndex = parseInt($('#users', this.$el).val());
            var user = this.collection.at(userIndex);
            // replace login with userView
            var user = new UserView({model: user});
            user.render();
        }

    });

    var UserView = Backbone.View.extend({
        //el: '#loginView',
        template: _.template("Welcome {{who}}"),
        render: function() {
            var user = this.model;
            var username = user.attributes.username;
            var welcomeMessage = this.template({who: username});
            var logoutButton = ' <button id=logout>Log out</button>';
            // this uses the UnassignedTaskView
            var unassigned = new UnassignedTasksView({collection: app.tasks, model: this.model});

            //create userTaskView
            var userTask = new UserTasksView({collection: app.tasks, model: this.model});

            //var html = welcomeMessage + logoutButton +'<div id=availableTask>' + unassignedHtml + '</div>' + '<div id=userTask>' + userTaskHtml + '</div>';
            app.gui.loginView.remove();
            this.$el.append(welcomeMessage + logoutButton);
            this.$el.append(unassigned.$el);
            this.$el.append(userTask.$el);
            $('#app').append(this.$el);
            //unassigned.render();
            //userTask.render();

        },
        events:{
             'click #logout': 'logout'
        },
        logout: function(){

            location.reload();
        }
    });

    // generic ctor to represent interface:
    function GUI(users,tasks,el) {
        //tests for first two views
        //var taskview = new TaskView({model:app.tasks.models[0]});
        //$("#app").append(taskview.el);
        //var createTaskView = new CreateTaskView({username:'Elizabeth'});
        //$("#app").append(createTaskView.el);

        // // users is collection of User models
        // _users = users;
        // // tasks is collection of Task models
        // _tasks = tasks;
        // // el is selector for where GUI connects in DOM
        // _el = el;
        // // loginview
        this.loginView = new LoginView({collection: app.users});

    }
    return GUI;
}());

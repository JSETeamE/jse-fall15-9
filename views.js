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
            this.$el.html(this.template(this.model.attributes));
            app.users.each(function(model){
                self.$("#userSelect").append('<option>' + model.attributes.username + '</option>');
            });
        },
        initialize: function(){
            //this.render();

        },
        events: {
            //"click assignBtn" : //change the state of the assignee
        },
        template: _.template('<div id=wholeview><div id=title>Task: {{title}}</div><div id=des>Details: {{description}}</div><div id=creator>Creator: {{creator}}</div><select id=userSelect></select><button id=assignBtn>Assign</button></div>')
    });

    var UnassignedTasksView = Backbone.View.extend({
        el: '#taskZone',

        initialize: function(){
            //this.render();
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
            // XXX broken, needs to supply username?
            // make new CreateTasksView
            var tasks = new CreateTasksView();
            this.$el.append(tasks);
        }
    });
    var UserTasksView = Backbone.View.extend({
        el: "#userTasks",
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

    });
    var CreateTasksView = Backbone.View.extend({
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
            var html = 'Welcome <select id=users>'
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

    var LoginView = Backbone.View.extend({
        el: '#taskZone',
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
        el: '#taskZone',
        template: _.template("Welcome {{who}}"),
        render: function() {
            var user = this.model;
            var username = user.attributes.username;
            var welcomeMessage = this.template({who: username});
            var logoutButton = ' <button id=logout>Log out</button>';
            // this uses the UnassignedTaskView
            var unassigned = new UnassignedTasksView({collection: app.tasks});
            var unassignedHtml = unassigned.$el.html();
            //create userTaskView
            var userTask = new UserTasksView({collection: app.tasks, model: this.model});
            var userTaskHtml = userTask.$el.html();
            var html = welcomeMessage + logoutButton +'<div id=availableTask>' + unassignedHtml + '</div>' + '<div id=userTask>' + userTaskHtml + '</div>';
            this.$el.html(html);
            unassigned.render();
            userTask.render();
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
        this.loginView = LoginView;

    }
    return GUI;
}());

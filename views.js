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

    var UnassignedTasksView = Backbone.View.extend({
         el: '#taskZone',
        
        initialize: function(){
            this.render();
        },
        events: {       
            'click #unasignedTask': 'unasignedTask'
        },
        unasignedTask: function(){
            var taskIndex = parseInt($('#tasks', this.$el).val());
            var tasks = this.collection.at(taskIndex);
            //alert('You are logged in as: ' + $('#users', this.$el).val());
            // replace login with userView
            var tasks = new UnassignedTasksView({model: tasks});
            //user.render();
        },  


        render: function() {

            var html = 'Do some work<br';
            var x = 0;
            this.collection.each(function(model){
                var task = model.attributes;
                var status = task.status;
                var description = task.description;
                html += '<select id =description>'
                ++x;

            });

            html += '<button id="newTask"> Create new Task </button>';
            this.$el.html(html);

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
        render: function() {
            // XXX all tasks that belong or were created by user
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
            //alert('You are logged in as: ' + $('#users', this.$el).val());
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
            var unassigned = new UnassignedTasksView({collection: _tasks});
            //unassigned.render();
            var unassignedHtml = unassigned.$el.html();

            var html = welcomeMessage + logoutButton +'<div id=availableTask>' + unassignedHtml + '</div>';
            
             this.$el.html(html);
        },
        events:{
             'click #logout': 'logout'
        },
        logout: function(){
            
            location.reload();
        } 
    });

    var _users = null;
    var _tasks = null;
    var _el = null;


    // generic ctor to represent interface:
    function GUI(users,tasks,el) {
        //tests for first two views
        //var taskview = new TaskView({model:app.tasks.models[0]});
        //$("#app").append(taskview.el);
        //var createTaskView = new CreateTaskView({username:'Elizabeth'});
        //$("#app").append(createTaskView.el);
        
        // users is collection of User models
        _users = users;
        // tasks is collection of Task models
        _tasks = tasks;
        // el is selector for where GUI connects in DOM
        _el = el;
        // loginview
        this.loginView = LoginView;

    }
    return GUI;
}());

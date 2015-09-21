var GUI = (function(){ //IIFE for all Views

    var TaskView = Backbone.View.extend({
    
    });
    
    var CreateTaskView = Backbone.View.extend({

    });
    var UnassignedTasksView = Backbone.View.extend({
        render: function() {
            var newTaskBtn = '<button id="newTask"> Create new Task </button>';
            this.$el.html(newTaskBtn);
        },
        events: {
            "click #newTask" : "newTask"
        },
        // helper function
        newTask: function() {
            // create a new task
            var newIssue = new IssueModel({
                // XXX this is not tested
                // grab values from input fields in CreateTasksViews
                title: '',
                description: '',
                creator: '', // this is person logged in?
                assignee: '', // dropdown choice
            });

            // XXX testing
            console.log('I work!');
        }
    });
    var UserTasksView = Backbone.View.extend({
        render: function() {
            // XXX all tasks that belong or were created by user
        },
    
    });
    var UserView = Backbone.View.extend({
        el: '#taskZone',
        render: function() {
            var unassigned = new UnassignedTasksView();
            unassigned.render();
            this.$el.html(unassigned.$el);
        }
    });
    
    var LoginView = Backbone.View.extend({
        el: '#taskZone',
        render: function(){
            var html = 'Select a User:<select id=users>';
            this.collection.each(function(model){
            var username = model.attributes.username;
            html += '<option value=' + username + '>' + username + '</option>';
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
        alert('You are logged in as: ' + $('#users', this.$el).val());
        // replace login with userView
        var user = new UserView();
        user.render();
    }  
    });
    
    
    // generic ctor to represent interface:
    function GUI(users,tasks,el) {
    // users is collection of User models
    this.users = users;
    // tasks is collection of Task models
    this.tasks = tasks;
    // el is selector for where GUI connects in DOM
    this.el = el;

    //...
    this.loginView = LoginView;
    }

    return GUI;
}())

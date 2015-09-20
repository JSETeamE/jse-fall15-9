var GUI = (function(){ //IIFE for all Views

    var TaskView = Backbone.View.extend({
    
    });
    
    var CreateTaskView = Backbone.View.extend({
    
    });
    
    var UnassignedTasksView = Backbone.View.extend({
    
    });
    
    var UserTasksView = Backbone.View.extend({
    
    });
    
    var UserView = Backbone.View.extend({
    
    });
    
    var LoginView = Backbone.View.extend({
        el: '#loginView',
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

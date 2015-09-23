var app = {};

$(function() { //when DOM is ready...
    app.users = new UserCollection([
        {username:'Elizabeth'},
        {username:'Emi'},
        {username:'Elijah'}
    ]);

    app.tasks = new TaskCollection([
        //XXX these are in `defaults`
        // test task 1
        {title: 'Pinball repair',
            description: 'Check standup switches on SBM',
            creator: 'Elijah',
            assignee: 'Elijah',
            status: 'unassigned'
        },
        // test task 2
        {title: 'Hack the Planet!',
            description: 'H4x0r the Gibson',
            creator: 'Elizabeth',
            assignee: 'Elizabeth',
            status: 'unassigned'
        },
        // test task 3
        {title: 'Bike ride',
            description: 'Ride bike for fun',
            creator: 'Emi',
            assignee: 'Emi',
            status: 'unassigned'
        }
    ]);
    app.gui = new GUI(app.users, app.tasks, '#app');// selector of main div
    app.loginView = new app.gui.loginView({collection: app.users});
    // app.unassignedTasksView = new app.gui.UnassignedTasksView({collection: app.tasks});
});

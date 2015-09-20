var app = {};

$(function() { //when DOM is ready...
    app.users = new UserCollection([
        {username:'Elizabeth'},
        {username:'Emi'},
        {username:'Elijah'}
    ]);

    app.tasks = new IssueCollection([
        //XXX these are in `defaults`
        // test task 1
        {title: 'Pinball repair',
            description: 'Check standup switches on SBM',
            creator: 'Elijah',
            assignee: 'Elijah',
            status: 'assigned'
        },
        // test task 2
        {title: 'Hack the Planet!',
            description: 'H4x0r the Gibson',
            creator: 'Elizabeth',
            assignee: 'Elizabeth',
            status: 'in progress'
        },
        // test task 3
        {title: 'Bike ride',
            description: 'Ride bike for fun',
            creator: 'Emi',
            assignee: 'Emi',
            status: 'done'
        }
    ]);

    app.gui = new GUI(app.users, app.tasks, '#app');// selector of main div
});

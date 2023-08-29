interface TaskProgress{

    isDone
    title
    // TODO: estimates, done,...
    subTasks
    
    [taskName: strings]: TaskProgress
    }
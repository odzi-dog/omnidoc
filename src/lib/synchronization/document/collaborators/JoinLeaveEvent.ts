export interface CollaboratorJoinEvent {
    type: 'join',
    
    id: string,
};

export interface CollaboratorLeaveEvent {
    type: 'leave',

    id: string,
};
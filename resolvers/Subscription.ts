export const Subscription = {
    cvAdded: {
        subscribe: (parent, args, { mock_database, pubSub }) => pubSub.subscribe("cvAdded"),
        resolve: (payload) => { return payload;},
    },
    cvModified: {
        subscribe: (parent, args, { mock_database, pubSub }) => pubSub.subscribe("cvModified"),
        resolve: (payload) => { return payload;},
    },
    cvDeleted: {
        subscribe: (parent, args, { mock_database, pubSub }) => pubSub.subscribe("cvDeleted"),
        resolve: (payload) => { return payload;},
    },
}
export const API = {
    FETCH_LIGHTS: function(token) {
        return `/api/${token}/lights`
    },
    PUT_LIGHT: function(token, id) {
        return `/api/${token}/lights/${id}/state`
    },
    CREATE_ALARM: function(token) {
        return `/api/${token}/schedules`
    },
    LIST_GROUP: function(token) {
        return `/api/${token}/groups`
    },
    CREATE_GROUP: function(token) {
        return `/api/${token}/groups`
    },
    LIST_SCHEDULES: function(token) {
        return `/api/${token}/schedules`
    },
    DELETE_SCHEDULE: function(token, id) {
        return `/api/${token}/schedules/${id}`; 
    }
};
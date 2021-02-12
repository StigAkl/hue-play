export const API = {
    FETCH_LIGHTS: function(token) {
        return `/api/${token}/lights`
    },
    PUT_LIGHT: function(token, id) {
        return `/api/${token}/lights/${id}/state`
    },
    CREATE_ALARM: function(token) {
        return `/api/${token}/schedules`
    }
};
/**
 * Created by user on 16-Sep-19.
 */

({
    doInit:function (component,event,helper) {
        helper.doInit1(component,event);
    },

    viewDetail:function (component,event,helper) {
        helper.viewDetail(component,event);

    },

    next:function (component,event,helper) {
        helper.next(component, event);
    },

    previous:function (component,event,helper) {
        helper.previous(component, event);
    },
    
    searchImage:function (component,event,helper) {
        helper.searchImage(component,event);
    }
});
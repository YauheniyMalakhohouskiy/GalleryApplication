/**
 * Created by user on 16-Sep-19.
 */

({
    doInit:function (component,event,helper) {
        helper.doInit1(component,event);
    },

    testik:function (component,event,helper) {
        var target = event.target;
        var element = component.get("v.paginationList");
        var dataEle = target.getAttribute("data-Index");
        alert(dataEle + element[dataEle].Name);
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
/**
 * Created by user on 16-Sep-19.
 */

({
    doInit:function (component,event,helper) {
        helper.doInit1(component,event);
    },

    testik:function (component,event,helper) {
        var target = event.target;
        var dataEle = target.getAttribute("data-Index");
        alert(dataEle);
    }
});
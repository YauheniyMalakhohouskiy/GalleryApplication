/**
 * Created by user on 16-Sep-19.
 */

({
    doInit1: function (component, event) {
        var documents = component.get("c.initDocument");
        documents.setCallback(this,function(a){
            var state = a.getState();
            console.log(state);
            if(state == "SUCCESS"){
                console.log('a.getReturnValue', a.getReturnValue());
                var pageSize = component.get("v.pageSize");
                component.set("v.Documents", a.getReturnValue());
                component.set("v.totalRecords", component.get("v.Documents").length);
                component.set("v.startPage",0);
                component.set("v.endPage",pageSize-1);
                var paginationList = [];
                for(var i=0; i< pageSize; i++){
                    if(component.get("v.Documents").length> i)
                        paginationList.push(a.getReturnValue()[i]);
                }
                component.set('v.paginationList', paginationList);
            } else if(state == "ERROR"){
                alert('Error in calling server side action');
            }
        });
        var orgId = component.get("c.initOrganizationId");
        orgId.setCallback(this,function(a){
            var state = a.getState();
            console.log(state);
            if(state == "SUCCESS"){
                console.log('a.getReturnValue', a.getReturnValue());
                component.set("v.organizationId", a.getReturnValue());
            } else if(state == "ERROR"){
                alert('Error in calling server side action');
            }
        });
        $A.enqueueAction(documents);
        $A.enqueueAction(orgId);
    },
    
    next:function (component,event) {
        var sObjectList = component.get("v.Documents");
        var end = component.get("v.endPage");
        var start = component.get("v.startPage");
        var pageSize = component.get("v.pageSize");
        var paginationlist = [];
        var counter = 0;
        for(var i=end+1; i<end+pageSize+1; i++){
            if(sObjectList.length > i){
                paginationlist.push(sObjectList[i]);
            }
            counter ++ ;
        }
        start = start + counter;
        end = end + counter;
        component.set("v.startPage",start);
        component.set("v.endPage",end);
        component.set("v.paginationList", paginationlist);
    },

    previous:function(component,event) {
        var sObjectList = component.get("v.Documents");
        var end = component.get("v.endPage");
        var start = component.get("v.startPage");
        var pageSize = component.get("v.pageSize");
        var paginationlist = [];
        var counter = 0;
        for(var i= start-pageSize; i < start ; i++){
            if(i > -1){
                paginationlist.push(sObjectList[i]);
                counter ++;
            }else{
                start++;
            }
        }
        start = start - counter;
        end = end - counter;
        component.set("v.startPage",start);
        component.set("v.endPage",end);
        component.set("v.paginationList", paginationlist);
    }
});
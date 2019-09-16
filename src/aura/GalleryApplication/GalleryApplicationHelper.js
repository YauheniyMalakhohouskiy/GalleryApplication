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
                component.set("v.Documents", a.getReturnValue());
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
    }
});
/**
 * Created by user on 16-Sep-19.
 */

({
    changeName:function (component,event) {
        var document = component.get("v.image");
        var searchName = component.find("Name");
        var newName = searchName.get("v.value");
        var changeName = component.get("c.changeNameImage");
        changeName.setParams({document:document,name:newName});
        changeName.setCallback(this, function (response) {
            changeName = response.getReturnValue();
        })

        $A.enqueueAction(changeName);
    },

    close:function (component,event) {
        component.destroy();
    }
});
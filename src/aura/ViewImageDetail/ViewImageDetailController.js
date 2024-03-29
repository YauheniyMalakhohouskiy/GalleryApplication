/**
 * Created by user on 16-Sep-19.
 */

({
    close:function (component,event,helper) {
        helper.close(component,event);
    },

    deleteImage:function (component,event,helper) {
        helper.deleteImage(component,event);
    },

    changeName:function (component,event,helper) {
        helper.changeName(component,event);
    },

    doSave: function(component, event, helper) {
        if (component.find("fileId").get("v.files").length > 0) {
            helper.uploadHelper(component, event);
        } else {
            alert("Please Select a Valid File");
        }
    },

    handleFilesChange: function(component, event, helper) {
        var fileName = "No File Selected..";
        if (event.getSource().get("v.files").length > 0) {
            fileName = event.getSource().get("v.files")[0]["name"];
        }
        component.set("v.fileName", fileName);
    }
});
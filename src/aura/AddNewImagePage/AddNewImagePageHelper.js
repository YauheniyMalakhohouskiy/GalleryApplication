/**
 * Created by user on 17-Sep-19.
 */

({
    MAX_FILE_SIZE: 4500000,
    CHUNK_SIZE: 750000,

    uploadHelper: function (component, event) {
        component.set("v.showLoadingSpinner", true);
        var fileInput = component.find("fileId").get("v.files");
        var file = fileInput[0];
        var nameImage = component.find("Name").get("v.value");
        if(nameImage == "" || nameImage == undefined) {
            component.set("v.showLoadingSpinner", false);
            component.set("v.fileName", "Alert : No name ");
            return;
        }
        var self = this;
        if (file.size > self.MAX_FILE_SIZE) {
            component.set("v.showLoadingSpinner", false);
            component.set("v.fileName", "Alert : File size cannot exceed " + self.MAX_FILE_SIZE + " bytes.\n" + " Selected file size: " + file.size);
            return;
        }
        var objFileReader = new FileReader();
        objFileReader.onload = $A.getCallback(function () {
            var fileContents = objFileReader.result;
            var base64 = "base64,";
            var dataStart = fileContents.indexOf(base64) + base64.length;

            fileContents = fileContents.substring(dataStart);
            self.uploadProcess(component, file, fileContents);
        });

        objFileReader.readAsDataURL(file);
    },

    uploadProcess: function(component, file, fileContents) {
        var startPosition = 0;
        var endPosition = Math.min(fileContents.length, startPosition + this.CHUNK_SIZE);
        this.uploadInChunk(component, file, fileContents, startPosition, endPosition, '');
    },

    uploadInChunk: function(component, file, fileContents, startPosition, endPosition, attachId) {
        var getchunk = fileContents.substring(startPosition, endPosition);
        var action = component.get("c.saveChunk");
        var nameImage = component.get("v.nameImage");
        if(file.type  != "image/jpeg" ||  nameImage == "") {
            component.set("v.showLoadingSpinner", false);
            component.set("v.fileName", "Alert : Type Alert ");
            return;
        }
        action.setParams({
            fileName: nameImage,
            base64Data: encodeURIComponent(getchunk),
            contentType: file.type,
        });

        action.setCallback(this, function(response) {
            attachId = response.getReturnValue();
            var state = response.getState();
            if (state === "SUCCESS") {
                startPosition = endPosition;
                endPosition = Math.min(fileContents.length, startPosition + this.CHUNK_SIZE);

                if (startPosition < endPosition) {
                    this.uploadInChunk(component, file, fileContents, startPosition, endPosition, attachId);
                } else {
                    alert("your Image is uploaded successfully");
                    component.set("v.showLoadingSpinner", false);
                }
            } else if (state === "INCOMPLETE") {
                alert("From server: " + response.getReturnValue());
            } else if (state === "ERROR") {
                var errors = response.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        console.log("Error message: " + errors[0].message);
                    }
                } else {
                    console.log("Unknown error");
                }
            }
        });
        $A.enqueueAction(action);

    },
    
    close:function (component,event) {
        var eventMy = $A.get("e.c:GalleryApplicationEvent");
        eventMy.fire();
        component.destroy();
    }

});
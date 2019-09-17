/**
 * Created by user on 16-Sep-19.
 */

({
    MAX_FILE_SIZE: 4500000,
    CHUNK_SIZE: 750000,

    changeName: function (component, event) {
        var document = component.get("v.image");
        var searchName = component.find("Name");
        var newName = searchName.get("v.value");
        var changeName = component.get("c.changeNameImage");
        changeName.setParams({document: document, name: newName});
        changeName.setCallback(this, function (response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                alert("Image name succesfully changed!");
            }
        });

        $A.enqueueAction(changeName);
    },

    close: function (component, event) {
        var eventMy = $A.get("e.c:GalleryApplicationEvent");
        eventMy.fire();
        component.destroy();

    },

    deleteImage: function (component, event) {
        var document = component.get("v.image");
        var deleteImage = component.get("c.deleteImages");
        deleteImage.setParams({document: document});
        deleteImage.setCallback(this, function (response) {
            var state = response.getState();

        });
        $A.enqueueAction(deleteImage);
        var eventMy = $A.get("e.c:GalleryApplicationEvent");
        eventMy.fire();
        component.destroy();
    },

    uploadHelper: function (component, event) {
        component.set("v.showLoadingSpinner", true);
        var fileInput = component.find("fileId").get("v.files");
        var file = fileInput[0];
        var self = this;
        if (file.size > self.MAX_FILE_SIZE) {
            component.set("v.showLoadingSpinner", false);
            component.set("v.fileName", 'Alert : File size cannot exceed ' + self.MAX_FILE_SIZE + ' bytes.\n' + ' Selected file size: ' + file.size);
            return;
        }

        var objFileReader = new FileReader();
        objFileReader.onload = $A.getCallback(function () {
            var fileContents = objFileReader.result;
            var base64 = 'base64,';
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
        if(file.type  != "image/jpeg") {
            component.set("v.showLoadingSpinner", false);
            component.set("v.fileName", 'Alert : Type Alert ');
            return;
        }
        var myImageName = component.get("v.image");
        var myId = myImageName.Id;
        action.setParams({
            fileName: myImageName.Name,
            idMy:myId,
            base64Data: encodeURIComponent(getchunk),
            contentType: file.type,
            fileId: attachId
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
                    alert('your File is uploaded successfully');
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
    }


});
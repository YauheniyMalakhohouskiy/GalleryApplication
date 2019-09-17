/**
 * Created by user on 18-Sep-19.
 */

@IsTest
private class TestViewImageDetailController {
    @IsTest
    static void testChangeNameImage() {
        Blob bodyBlob=Blob.valueOf('Unit Test Attachment Body');
        Document document = new Document(Name = 'Arsenal',FolderId = '0052v00000dEbiXAAS',Body = bodyBlob);
        insert document;
        ViewImageDetailController.changeNameImage(document,'aa');
        document = [SELECT Name FROM Document];
        System.assertEquals('aa',document.Name);
    }

    @IsTest
    static void testDeleteImages() {
        Blob bodyBlob=Blob.valueOf('Unit Test Attachment Body');
        Document document = new Document(Name = 'Arsenal',FolderId = '0052v00000dEbiXAAS',Body = bodyBlob);
        insert document;
        ViewImageDetailController.deleteImages(document);
        String exception1 = '';
        try {
            document = [SELECT Name FROM Document];
        } catch (QueryException e) {
            exception1 = e.getMessage();
        }
        System.assertEquals('List has no rows for assignment to SObject',exception1);
    }

    @IsTest
    static void testSaveChunk() {
        Blob bodyBlob=Blob.valueOf('Unit Test Attachment Body');
        Document document = new Document(Name = 'Arsenal',FolderId = '0052v00000dEbiXAAS',Body = bodyBlob);
        insert document;
        Document documentA = [SELECT Name FROM Document];
        String fileName = 'Arsenal';
        Id id = ViewImageDetailController.saveChunk(fileName,documentA.Id,'Unit Test Attachment Body','jpg');
        Document document1 = [SELECT Name FROM Document];

        System.assertEquals('Arsenal',document1.Name);
    }

}
/**
 * Created by user on 18-Sep-19.
 */

@IsTest
private class TestAddNewImagePageController {
    @IsTest
    static void testSaveChunk() {
        Blob bodyBlob=Blob.valueOf('Unit Test Attachment Body');
        Document document = new Document(Name = 'Arsenal',FolderId = '0052v00000dEbiXAAS',Body = bodyBlob);
        String fileName = 'Arsenal';
        String id = AddNewImagePageController.saveChunk(fileName,'Unit Test Attachment Body','jpg');
        Document document1 = [
                SELECT
                        Name
                FROM    Document
        ];
        System.assertEquals(fileName,document1.Name);
    }
}
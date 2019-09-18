/**
 * Created by user on 18-Sep-19.
 */

@IsTest
private class TestGalleryApplicationController {
    @IsTest
    static void testInitDocument() {
        List<Document> documents = new List<Document>();
        System.assertEquals(documents,GalleryApplicationController.initDocument());
    }

    @IsTest
    static void testInitOrganizationId() {
        String str = '&oid=00D2v0000028Yy3';
        System.assertEquals(str,GalleryApplicationController.initOrganizationId());
    }
}
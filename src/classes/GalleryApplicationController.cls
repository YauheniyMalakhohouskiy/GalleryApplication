/**
 * Created by user on 16-Sep-19.
 */

public with sharing class GalleryApplicationController {

    @AuraEnabled
    public static List<Document> initDocument() {
        List<Document> documents = [SELECT Id,Name,Type FROM Document LIMIT 20];
        return documents;
    }

    @AuraEnabled
    public static String initOrganizationId() {
        return '&oid=00D2v0000028Yy3';
    }
}
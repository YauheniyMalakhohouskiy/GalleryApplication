/**
 * Created by user on 16-Sep-19.
 */

public with sharing class ViewImageDetailController {

    @AuraEnabled
    public static void changeNameImage(Document document, String name) {
        document.Name = name;
        update document;
    }

    @AuraEnabled
    public static void deleteImages(Document document) {
        delete document;
    }

    @AuraEnabled
    public static Id saveChunk(String fileName, String idMy, String base64Data, String contentType) {

        appendToFile(fileName, idMy, base64Data, contentType);

        return Id.valueOf(idMy);
    }

    private static void appendToFile(String fileName, String idMy, String base64Data, String contentType) {
        base64Data = EncodingUtil.urlDecode(base64Data, 'UTF-8');

        Document a = [
                SELECT  Id,
                        Body,
                        FolderId,
                        Name
                FROM    Document
                WHERE   Id = :idMy
        ];
        delete a;
        Document oAttachment = new Document();
        oAttachment.Body = EncodingUtil.base64Decode(base64Data);
        oAttachment.Name = fileName;
        oAttachment.IsPublic = true;
        oAttachment.ContentType = contentType;
        oAttachment.FolderId = '0052v00000dEbiXAAS';

        insert oAttachment;

    }


}
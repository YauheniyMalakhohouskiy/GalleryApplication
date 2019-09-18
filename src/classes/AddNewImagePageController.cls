/**
 * Created by user on 17-Sep-19.
 */

public with sharing class AddNewImagePageController {

    @AuraEnabled
    public static String saveChunk(String fileName, String base64Data, String contentType) {

        saveTheFile(fileName, base64Data, contentType);

        return 'Yes';
    }

    public static Id saveTheFile(String fileName, String base64Data, String contentType) {
        base64Data = EncodingUtil.urlDecode(base64Data, 'UTF-8');

        Document oAttachment = new Document();
        oAttachment.Body = EncodingUtil.base64Decode(base64Data);
        oAttachment.Name = fileName;
        oAttachment.IsPublic = true;
        oAttachment.ContentType = contentType;
        oAttachment.FolderId = '0052v00000dEbiXAAS';

        insert oAttachment;

        return oAttachment.Id;
    }

}
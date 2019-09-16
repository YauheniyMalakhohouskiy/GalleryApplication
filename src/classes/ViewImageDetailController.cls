/**
 * Created by user on 16-Sep-19.
 */

public with sharing class ViewImageDetailController {

    @AuraEnabled
    public static String changeNameImage(Document document,String name) {
        document.Name = name;
        update document;
        return 'Nice';
    }
}
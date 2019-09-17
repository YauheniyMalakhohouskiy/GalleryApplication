/**
 * Created by user on 18-Sep-19.
 */

@IsTest
private class TestAddNewImagePageController {
    @IsTest
    static void testBehavior() {
        System.assertEquals('Yes',AddNewImagePageController.saveChunk('Name','ds','png'));
    }
}
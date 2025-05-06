Feature: User Authentication

Background:
Given The user navigates to the application
And The user clicks on the Login link

@reg
Scenario: login_should_be_success
When The user enters the username as "ortoni"
And The user enters the password as "Pass1234"
And The user clicks on Login button
Then Login should be success

Scenario: login_should_not_be_success
When The user enters the username as "abc_xyz"
And The user enters the password as "1234Pass"
And The user clicks on Login button
Then Login should fail
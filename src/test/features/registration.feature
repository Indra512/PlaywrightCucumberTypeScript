Feature: User Registration

@test
Scenario: register_the_user
Given I navigate to the register page
When I create a new user
Then I confirm user registration is success
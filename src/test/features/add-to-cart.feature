Feature: Add Products To Cart

Background:
Given The user navigates to the application
And The user clicks on the Login link

Scenario Outline: add_product_to_cart
When The user enters the username as "<username>"
And The user enters the password as "<password>"
And The user clicks on Login button
When The user search for a "<book>"
And The user adds the book to the cart
Then The cart badge should get updated

Examples:
| username  | password      | book           |
| alan_p    | Alan1234$     | Roomies        |
| John_Cena | John1234$     | The Simple Wild | 


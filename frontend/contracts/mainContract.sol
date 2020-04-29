pragma solidity >=0.4.21 <0.7.0;

contract mainContract{

    //All the keys are stored here
    string[] public keys;

    //All the account numbers are stored here
    string[] public accounts;

    struct Module{
        string code;
        string description;
        string moduleType;
        string grade;
        uint credit;
    }
    //maps the key to the account number
    mapping(string => string) public keyToAccount;

    //maps the students key to module
    mapping(string => Module) public keyToModule;

    //function for institution to add module to students account
    function addModule(string memory iKey, string memory sKey) public{
    }
}
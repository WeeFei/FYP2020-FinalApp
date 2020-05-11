pragma solidity >=0.4.21 <0.7.0;

contract mainContract{
    uint public moduleCount = 0;
    uint public recordCount = 0;

    struct Module{
        uint index;
        string code;
        string description;
        string moduleType;
        uint credit;
        bool isDeleted;
    }

    struct Record{
        uint index;
        string code;
        string grade;
        string student;
        bool isHidden;
    }

    //Allow us to get Module from code
    mapping (string => uint) codeToIndex;
    mapping (uint => Module) public modules;

    mapping(uint => Record) public records;

    constructor() public{
        createModule('IT2529', 'Database management systems', 'CM', 4);
        createModule('IT2951', 'Best Module ever', 'CM', 4);
        createRecord('IT2529', 'A', '0123456789');
    }

    function createModule(string memory code, string memory description, string memory moduleType, uint credit) public{
        moduleCount++;
        codeToIndex[code] = moduleCount;
        modules[moduleCount] = Module(moduleCount, code, description, moduleType, credit, false);
    }

    function deleteModule(string memory code) public{
        uint index = codeToIndex[code];
        modules[index].isDeleted = true;
    }

    function createRecord(string memory code, string memory grade, string memory student) public{
        uint index = codeToIndex[code];
        require(modules[index].isDeleted == false, "module does not exist");
        recordCount++;
        records[recordCount] = Record(recordCount, code, grade, student, false);
    }

    function hideRecord(uint index) public{
        records[index].isHidden = !records[index].isHidden;
    }
}
// SPDX-License-Identifier: MIT
pragma solidity =0.8.9;

library DataTypes {
    enum Sex {
        Male,
        Female,
        NotAnswered
    }

    enum BloodType {
        A,
        B,
        AB,
        O,
        NotAnswered
    }

    struct Profile {
        string firstName;
        string lastName;
        Sex sex;
        BloodType bloodType;
        uint8 age;
    }
}

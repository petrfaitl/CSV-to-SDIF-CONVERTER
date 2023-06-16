# Meet Entry SD3 SDIF File Description

## A0 -- File Description Record

Purpose:  Identify the file and the type of data to be
transmitted. Contact person and phone number
included to assist with use of information on the
file.

This record is mandatory for each transfer of data within this
file structure. Each file begins with this record and each file
has only one record of this type.

| start/ length | Mand | Type  | Description                                                                               |
|---------------|------|-------|-------------------------------------------------------------------------------------------|
| 1/2           | M1*  | CONST | "A0"                                                                                      |
| 3/1           | M2*  | CODE  | ORG Code 001, table checked                                                               |
| 4/8           |      | ALPHA | SDIF version number (same format as the version number from the title page)               |
| 12/2          | M1*  | CODE  | FILE Code 003, table checked                                                              |
| 14/30         |      |       | future use                                                                                |
| 44/20         | *    | ALPHA | software name                                                                             |
| 64/10         | *    | ALPHA | software version                                                                          |
| 74/20         | M1*  | ALPHA | contact name (person supplying or                                           sending data) |
| 94/12         | M1*  | PHONE | contact phone (area code and phone number of contact name in 74/20)                       |
| 106/8         | M1*  | DATE  | file creation or update                                                                   |
| 114/42        |      |       | future use                                                                                |
| 156/2         |      | ALPHA | submitted by LSC - for Top 16                                                             |
| 158/3         |      |       | future use                                                                                |

```python
def EmitA0 ():
    CreateDate = datetime.date.today()
    a0line = "{0:2}{1:1}{2:8}{3:2}{4:30}{5:20}{6:10}{7:20}{8:12}{9:8}{10:42}{11:2}{12:3}\r".format(
        "A0", "2", "3.0", "01", "", "NZMS SDIF Python", "v0.01", "NZ Masters Swimming", "095551234",
        CreateDate.strftime("%m%d%Y"),"", "", "")
    # print(a0line)
    return a0line
```

## B1 -- Meet Record

Purpose:  Identify the meet name, address, and dates.

This record is used to identify the meet name and address. The
meet name is required, plus the city, state, meet type, start
and end dates. Additional fields provide for the street address,
postal code and country code. Each file may only have one
record of this type.

| start/ length | Mand | Type  | Description                                                                 |
|---------------|------|-------|-----------------------------------------------------------------------------|
| 1/2           | M1   | CONST | "B1"                                                                        |
| 3/1           | M2   | CODE  | ORG Code 001, table checked                                                 |
| 4/8           |      |       | future use                                                                  |
| 12/30         | M1   | ALPHA | meet name                                                                   |
| 42/22         |      | ALPHA | meet address line one                                                       |
| 64/22         |      | ALPHA | meet address line two                                                       |
| 86/20         | M2   | ALPHA | meet city                                                                   |
| 106/2         | M2   | USPS  | meet state                                                                  |
| 108/10        |      | ALPHA | Postal Code, meet zip or foreign code                                       |
| 118/3         |      | CODE  | COUNTRY Code 004, table checked                                             |
| 121/1         | M2   | CODE  | MEET Code 005, table checked                                                |
| 122/8         | M1   | DATE  | meet start                                                                  |
| 130/8         | M2   | DATE  | meet end                                                                    |
| 138/4         |      | INT   | altitude of pool in feet above sea level                                    |
| 142/8         |      |       | future use                                                                  |
| 150/1         |      | CODE  | COURSE Code 013, table checked, default course set up in exporting software |
| 151/10        |      |       | future use                                                                  |

### Emit B1 - Meet record

```python
def EmitB1 (meetName, meetStartDate, meetEndDate, courseCode):
    # Emit B1 - Meet record
    b1line = "{0:2}{1:1}{2:8}{3:30}{4:22}{5:22}{6:20}{7:2}{8:10}{9:3}{10:1}{11:8}{12:8}{13:4}{14:8}{15:1}{16:10}\r".format(
        "B1","2","",meetName[:30],"","","","","","NZL","B",meetStartDate.strftime("%m%d%Y"),meetEndDate.strftime("%m%d%Y"),
        "", "", courseCode,"")
    return b1line
```

## C1 -- Team ID Record

Purpose:  Identify the team name, code and address. Region
code defines USS region for team.

This record is used to identify the team name, team code, plus
region. When used, more than one team record can be transmitted
for a single meet. The team name, USS team code and team
abbreviation are required. The USS region code is also required.
Additional fields provide for the street address, city, state,
postal code, and country code.

| start/length | Mand | Type  | Description                           |
|--------------|------|-------|---------------------------------------|
| 1/2          | M1   | CONST | "C1"                                  |
| 3/1          | M2   | CODE  | ORG Code 001, table checked           |
| 4/8          |      |       | future use                            |
| 12/6         | M1   | CODE  | TEAM Code 006                         |
| 18/30        | M1   | ALPHA | full team name                        |
| 48/16        |      | ALPHA | abbreviated team name                 |
| 64/22        |      | ALPHA | team address line one                 |
| 86/22        |      | ALPHA | team address line two                 |
| 108/20       |      | ALPHA | team city                             |
| 128/2        |      | USPS  | team state                            |
| 130/10       |      | ALPHA | Postal Code, team zip or foreign code |
| 140/3        |      | CODE  | COUNTRY Code 004, table checked       |
| 143/1        |      | CODE  | REGION Code 007, table checked        |
| 144/6        |      |       | future use                            |
| 150/1        |      | ALPHA | optional 5th char of team code        |
| 151/10       |      |       | future use                            |

```python
# Record C1 - Team id record
def EmitC1 (clubCode, clubName):
    return "{0:2}{1:1}{2:8}{3:6}{4:30}{5:16}{6:22}{7:22}{8:20}{9:2}{10:10}{11:3}{12:1}{13:6}{14:1}{15:10}\r".format(
    "C1","2", "", "  "+clubCode, clubName, "", "", "", "", "", "", "", "", "", "", "")

```

## D0 -- Individual Event Record

Purpose:  Identify the athlete by name, registration number, birth date and gender. Identify the stroke, distance, event
number and time of the swims.

This record is used to identify the athlete and the individual event. When used, one individual event record would be
submitted for each swimmer entered in an individual event. The athlete name, USS registration number, birth date and
gender code are required. Fields for the stroke, distance, event number, age range, and date of swim are also required.
Additional fields provide for the citizenship, age or class, seed time, prelim time, swim off time, finals time and pool
lanes used in competition.

NOTE:  Individual event records must be preceded by at least one C1 team ID record and one C2 team entry record. If
these two records are missing, the individual is assumed to be attached to the previous "team" that has proper coding.
Athlete registration data is not available to meet management programs and proper coding is essential.

| no | start/ length | Mand | Type  | Description                                            |
|----|---------------|------|-------|--------------------------------------------------------|
| 1  | 1/2           | M1   | CONST | "D0"                                                   |
| 2  | 3/1           | M2   | CODE  | ORG Code 001, table checked                            |
| 3  | 4/8           |      |       | future use                                             |
| 4  | 12/28         | M1   | NAME  | swimmer name                                           |
| 5  | 40/12         | M2   | ALPHA | USS#                                                   |
| 6  | 52/1          |      | CODE  | ATTACH Code 016, table checked                         |
| 7  | 53/3          |      | CODE  | CITIZEN Code 009, table checked                        |
| 8  | 56/8          | M2   | DATE  | swimmer birth date                                     |
| 9  | 64/2          |      | ALPHA | swimmer age or class (such as Jr or Sr)                |
| 10 | 66/1          | M1   | CODE  | SEX Code 010, table checked                            |
| 11 | 67/1          | M1#  | CODE  | EVENT SEX Code 011, table checked                      |
| 12 | 68/4          | M1#  | INT   | event distance                                         |
| 13 | 72/1          | M1#  | CODE  | STROKE Code 012, table checked                         |
| 14 | 73/4          |      | ALPHA | Event Number                                           |
| 15 | 77/4          | M1#  | CODE  | EVENT AGE Code 025, table checked                      |
| 16 | 81/8          | M2   | DATE  | date of swim                                           |
| 17 | 89/8          |      | TIME  | seed time                                              |
| 18 | 97/1          | *    | CODE  | COURSE Code 013, table checked                         |
| 19 | 98/8          |      | TIME  | prelim time                                            |
| 20 | 106/1         | *    | CODE  | COURSE Code 013, table checked                         |
| 21 | 107/8         |      | TIME  | swim-off time                                          |
| 22 | 115/1         | *    | CODE  | COURSE Code 013, table checked                         |
| 23 | 116/8         |      | TIME  | finals time                                            |
| 24 | 124/1         | *    | CODE  | COURSE Code 013, table checked                         |
| 25 | 125/2         |      | INT   | prelim heat number                                     |
| 26 | 127/2         |      | INT   | prelim lane number                                     |
| 27 | 129/2         |      | INT   | finals heat number                                     |
| 28 | 131/2         |      | INT   | finals lane number                                     |
| 29 | 133/3         | **   | INT   | prelim place ranking                                   |
| 30 | 136/3         | **   | INT   | finals place ranking                                   |
| 31 | 139/4         | **   | DEC   | points scored from finals                              |
| 32 | 143/2         |      | CODE  | EVENT TIME CLASS Code 014, table checked               |
| 33 | 145/1         |      | ALPHA | flight status of swimmer (subdivisionof Time Standard) |
| 34 | 146/15        |      |       | future use                                             |

\* This field is mandatory IF the immediately preceding time
field is NOT blank

\** This field is mandatory (M1) if a championship meet
(MEET Code 005 - 6,7)

\# Event age code 025, event sex code 011, event distance,

stroke code 012 and seed time are not mandatory (M1) for relay only swimmers.

Note - An additional record type will be used for open water
swimming. Multiple swim offs require multiple records.

```
# Record D0 - Individual event record
def EmitD0 (lastName, firstName, regNo,
            dateOfBirth, gender, eventDistance,
            eventStrokeCode, seedTime, courseCode, meetStartDate):
    fullName = lastName + ", " + firstName
    
    d0line = "{0:2}{1:1}{2:8}{3:28}{4:12}{5:1}{6:3}{7:8}{8:2}{9:1}{10:1}{11:>4}{12:1}{13:>4}{14:4}{15:8}{16:>8}{17:1}{18:63}\r".format(
    "D0","2","", fullName[:28],regNo,"","",dateOfBirth.strftime("%m%d%Y"),"",gender,"X", eventDistance, eventStrokeCode, 
    "", "20OV", meetStartDate.strftime("%m%d%Y"), seedTime, courseCode, "")
    return d0line
```

## D1 -- Individual Administrative Record

Purpose:  Identify the athlete by name, registration number, birth date and gender. Identify other administrative
information.

This record is used to identify the athlete and his/her
administrative information. When used, one individual
administrative record would be submitted for each swimmer in
the file. The athlete name, USS registration number, birth
date and gender code are required.

| start/length | Mand | Type  | Description                                                                                                         |
|--------------|------|-------|---------------------------------------------------------------------------------------------------------------------|
| 1/2          | M1*  | CONST | "D1"                                                                                                                |
| 3/1          | M2*  | CODE  | ORG Code 001, table checked                                                                                         |
| 4/8          |      |       | future use                                                                                                          |
| 12/6         | *    | CODE  | TEAM Code 006                                                                                                       |
| 18/1         |      | ALPHA | optional 5th char of team code                                                                                      |
| 19/28        | M1*  | NAME  | swimmer name                                                                                                        |
| 47/1         |      |       | future use                                                                                                          |
| 48/12        | M2*  | ALPHA | USS#                                                                                                                |
| 60/1         |      | CODE  | ATTACH Code 016, table checked                                                                                      |
| 61/3         | *    | CODE  | CITIZEN Code 009, table checked                                                                                     |
| 64/8         | M2*  | DATE  | swimmer birth date                                                                                                  |
| 72/2         |      | ALPHA | swimmer age or class (such as Jr or Sr)                                                                             |
| 74/1         | M1*  | CODE  | SEX Code 010, table checked                                                                                         |
| 75/30        |      | ALPHA | first admin info field                                                                                              |
| 105/20       | *    | ALPHA | fourth admin info field, used in submission of registration data for old member number if inits or birthdate change |
| 125/12       | *    | PHONE | first phone number for swimmer                                                                                      |
| 137/12       |      | PHONE | second phone number for swimmer                                                                                     |
| 149/8        | *    | DATE  | date swimmer registered with USS                                                                                    |
| 157/1        | *    | CODE  | MEMBER Code 021, table checked                                                                                      |
| 158/3        |      |       | future use                                                                                                          |

* required field for submission of registration data to LSC

```python
# Record D1 - Individual adminitrative record
def EmitD1 (lastName, firstName, regNo,
            dateOfBirth, gender, clubCode):
    fullName = lastName + ", " + firstName
    
    d1line = "{0:2}{1:1}{2:8}{3:6}{4:1}{5:28}{6:1}{7:12}{8:1}{9:3}{10:8}{11:2}{12:1}{13:86}\r".format(
    "D1","2","", "  " + clubCode, "", fullName[:28], "", regNo,"","",dateOfBirth.strftime("%m%d%Y"),"",gender,"")
    return d1line
```

## Z0 -- File Terminator Record

Purpose:  Identify the logical end of file for a file transmission. Record statistics and swim statistics are listed for
convenience.
This record is mandatory in each file. Each file ends with this record and each file has only one record of this type.
The first four fields are mandatory. Additional fields provide for text and record counts.

| #   | start/length | Mand | Type  | Description                  |
|-----|--------------|------|-------|------------------------------|
| 1   | 1/2          | M1   | CONST | "Z0"                         |
| 2   | 3/1          | M2   | CODE  | ORG Code 001, table checked  |
| 3   | 4/8          |      |       | future use                   |
| 4   | 12/2         | M1   | CODE  | FILE Code 003, table checked |
| 5   | 14/30        |      | ALPHA | notes (additional file info) |
| 6   | 44/3         |      | INT   | number of B records          |
| 7   | 47/3         |      | INT   | number of different meets    |
| 8   | 50/4         |      | INT   | number of C records          |
| 9   | 54/4         |      | INT   | number of different teams    |
| 10  | 58/6         |      | INT   | number of D records          |
| 11  | 64/6         |      | INT   | number of different swimmers |
| 12  | 70/5         |      | INT   | number of E records          |
| 13  | 75/6         |      | INT   | number of F records          |
| 14  | 81/6         |      | INT   | number of G records          |
| 15  | 87/5         |      | INT   | batch number                 |
| 16  | 92/3         |      | INT   | number of new members        |
| 17  | 	  95/3      |      | INT   | number of renew members      |
| 18  | 	  98/3      |      | INT   | number of member changes     |
| 19	 | 101/3        |      | INT   | number of member deletes     |
| 20	 | 104/57       |      |       | future use                   |

```python
# Record Z0 - File terminator record
def EmitZ0 ():
    # Emit Z0 record
    z0line = "{0:2}{1:1}{2:8}{3:2}{4:147}\r".format("Z0","2","","01","")
    return z0line

```


## Input CSV File Structure

Entries from 0 to 12 are important to stay as they are.

| Position | Mandatory | Fields                                    |
|----------|-----------|-------------------------------------------|
| 0        |           | Submission Time                           |
| 1        |           | Parent / Legal Guardian Name              |
| 2        |           | Email Address                             |         
| 3        |           | Phone                                     |
| 4        | *         | Team                                      |
| 5        | *         | Name - First Name                         |
| 6        | *         | Name - Middle Name                        | ,         
| 7        | *         | Name - Last Name                          | ,                  
| 8        | *         | Date of Birth                             |               
| 9        | *         | Gender                                    |
| 10       |           | Meet Date                                 |
| 11       | *         | Enter events                              |
| 12       |           | Number of events                          |
| 13       |           | Available for time-keeping?               |
| 14       |           | Helper's Name                             |
| 15       |           | Payment type                              |
| 16       |           | Entry Fee                                 |
| 17       |           | Card Name                                 |
| 18       |           | Address - Street Address                  |
| 19       |           | Address - Apartment, suite, etc           |
| 20       |           | Address - City                            |
| 21       |           | Address - State/Province                  |
| 22       |           | Address - Postcode                        |
| 23       |           | Address - Country                         |
| 24       |           | Credit / Debit Card - Mode                |
| 25       |           | Credit / Debit Card - Product / Plan Name |
| 26       |           | Credit / Debit Card - Payment type        |
| 27       |           | Credit / Debit Card - Amount              |
| 28       |           | Credit / Debit Card - Currency            |
| 29       |           | Credit / Debit Card - Quantity            |
| 30       |           | Credit / Debit Card - Transaction ID      |
| 31       |           | Credit / Debit Card - Status              |
| 32       |           | Credit / Debit Card - Manage              |
| 33       |           | T&C                                       |  

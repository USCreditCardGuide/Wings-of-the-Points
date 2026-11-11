# Wings of the Points

This is a chart to visually represent the transfer partnerships between rewards programs of US credit cards and airlines.

Live Demo -> [https://uscreditcardguide.github.io/Wings-of-the-Points/index.html](https://uscreditcardguide.github.io/Wings-of-the-Points/index.html)


## Usage

* Open **View transfer ratios** to jump to the tables by points program. The tables work on mobile and with JavaScript disabled.
* Move your mouse over a point or airline name to highlight its transfer relationships.
* Move your mouse over a line to see the transfer ratio and any card or bonus conditions.
* Use Ctrl+F (or Cmd+F) to find an airline or its frequent flyer program.

## Updating transfers

Edit [`_data/transfers.csv`](_data/transfers.csv). Each airline has one row. Change the relevant program's cell to update a transfer, or leave it empty if the program does not transfer to that airline. Ratios are written as points sent to points or miles received. Put any card eligibility or block bonus in the same cell as the ratio.

For a new airline, add a row with its code, program name, and alliance (`oneworld`, `skyteam`, `star`, or `none`). Logo images are optional. GitHub Pages reads the CSV when building `gh-pages` and uses it to generate both the chart data and the HTML tables.

## Notes

* Chase UR is short for Chase Ultimate Rewards points; AmEx MR is short for American Express Membership Rewards points; Citi TYP is short for Citi ThankYou Points; C1 is short for Capital One Rewards.
* Citi ratios depend on the card. Card conditions appear with the ratio for the route.
* Marriott rows list the base ratio and any bonus for a complete block of points. Amounts below a complete block convert at the base ratio. See the [Marriott transfer rules](https://www.marriott.com/loyalty/redeem/travel/points-to-miles.mi) and [United partnership details](https://travel-partner.marriott.com/united/en-us).
* Apart from Air France (AF), Flying Blue is also the frequent flyer program for KLM (KL) and TAROM (RO). These airlines are represented by the Air France node to save space.
* Apart from Lufthansa (LH), Miles & More is also the frequent flyer program for Austrian Airlines (OS), Brussels Airlines (SN), Croatia Airlines (OU), ITA Airways (AZ), LOT Polish Airlines (LO), and SWISS (LX). These airlines are represented by the Lufthansa node to save space.
* To save space, airlines sharing a frequent flyer program are generally grouped under a representative airline node, as with Flying Blue (Air France) and Miles & More (Lufthansa).


## Change Log

### 2026-11.04

* CM is now a transfer partner of C1 at ratio 1:0.75.
* CM is now a transfer partner of Citi at ratio 1:1.
(and the following old changes)
* Combined Alaska Mileage Plan and HawaiianMiles into Atmos Rewards under Alaska / Hawaiian Airlines.
* EK is no longer a transfer partner of UR; MR/TYP to EK ratio is lowered from 1:1 to 1:0.8; C1 to EK ratio is lowered from 1:1 to 1:0.75.
* EY is no longer a transfer partner of MR.
* VS is now a transfer partner of C1 at ratio 1:1.
* CZ is now a transfer partner of Marriott at 3:1.25.
* ET is now a transfer partner of Marriott at 3:1.25.
* SU is no longer a transfer partner of Marriott.
* SA is no longer a transfer partner of Marriott.
* Added Vueling Club (VY) as a transfer partner of Marriott at 3:1.25.
* Moved Scandinavian Airlines (SK) from Star Alliance to SkyTeam.
* Removed Czech Airlines (OK), whose OK Plus program has ended.
* Updated the loyalty program names for BA, IB, AM, AI, and NZ.
* Clarified Marriott transfer bonuses, Citi card eligibility, and shared frequent flyer programs in the README.
* Added Royal Air Maroc (AT) and Oman Air (WY) to oneworld as N/A.
* Added Kenya Airways (KQ, Asante Rewards) to SkyTeam as N/A and consolidated Shenzhen Airlines (ZH) under Air China (CA, PhoenixMiles).
* Corrected JetBlue's alphabetical position and removed transfer-ratio tooltips from N/A links.
* Replaced RawGit dependencies with a local copy of d3.chart; the Sankey implementation is already bundled locally.

### 2026-10-20

* B6 is now a transfer partner of Bilt at ratio 1:1.

### 2026-09-20

* JL is now a transfer partner of TYP at ratio 1:1.

### 2026-03-01

* The transfer ratio for MR to CX is lowered to 1:0.8 (from 1:1).

### 2026-01-25

* AeroMexico (AM) is no longer a transfer partner of Citi TYP.

### 2025-10-08

* EY is now a transfer partner of Bilt at ratio 1:1.

### 2025-09-23

* JL is now a transfer partner of C1 at ratio 1:0.75. QR is now a transfer partner of C1 at ratio 1:1.

### 2025-09-12

* OZ is not a transfer partner of Marriott any more.

### 2025-07-27

* AA is now a transfer partner of Citi TYP at ratio 1:1.

### 2025-07-06

* AMEX-Hawaiian transfer has terminated.

### 2025-05-22

* QR is now a transfer partner of Bilt points at ratio 1:1.

### 2025-05-13

* JL is now a transfer partner of Bilt points at ratio 1:1.

### 2025-05-12

* Bilt Rewards is added to this chart
* B6 is now a transfer partner of C1 points at ratio 1:0.6.
* Marriott -> UA ratio is increased to 3:1.5. (If you’re a United MileagePlus® member, you’ll get 10,000 bonus miles for every 60,000 points you transfer.)
* KE is no longer a transfer partner for Marriott.

### 2023-07-28
* QR is now a transfer partner of AmEx MR at ratio 1:1.

### 2022-11-01
* Marriott Bonvoy transfer ratio reduced from 3:1.25 to 3:1 for the following partners: AA, AV, DL.
* Marriott Bonvoy lost partner CZ.

### 2021-10-07
* Capital One Miles made most transfer ratios to be 1:1 now.

### 2021-08-03
* Air Canada (AC) Aeroplan is now a transfer partner of Chase UR.

### 2021-05-25
* El Al (LY) Matmid is no longer a transfer partner of MR points.

### 2021-04-19
* Capital One added the following transfer partners: BA, TP, TK. It also improved transfer ratio for several partners. Removed MU from MB transfer partners. AS joined Oneworld. LATAM left Oneworld.

### 2020-05-12
* Capital One lost transfer partners Qatar Airways (QR) and Hainan Airways (HU)

### 2020-04-19
* Emirates (EK) Skywards is now a transfer partner of Citi TYP.

### 2019-10-21
* AeroMexico (AM) Club Premier is now a transfer partner of Citi TYP. 

### 2019-08-25
* Emirates (EK) Skywards is now a transfer partner of Chase UR.

### 2019-08-18

* Garuda Indonesia (GA) GarudaMiles is no longer a transfer partner of Citi TYP.
* Delisted some airlines sharing the same frequent flyer programs (i.e. Flying Blue and Miles & More)

### 2019-06-07

* Lufthansa (LH) Miles and More program is no longer a transfer partner of Marriott Bonvoy as of 06/2019.
* Added the corresponding names of the frequent flyer program to the airlines.

### 2019-05-31
* Qantas (QF) is now a transfer partner of AmEx MR.

### 2019-05-25
* Forked from [Siriolabs](https://github.com/Siriolabs/Wings-of-the-Points) by physixfan and keep this repo up to date.
* Added C1 - Capital One Miles transfer partners.
* Added Aer Lingus (EI) to AmEx MR as they have a new partnership as of 06/2018.
* Added Avianca (AV) to AmEx MR as they have a new partnership as of 11/2018.
* Moved CZ from SkyTeam to non-Alliance as it left SkyTeam as of 01/2019.

### 2018-09-04
* Dealt with the Marriott/SPG merger mess.
* Added Avianca (AV) to Citi TYP as they have a new partnership as of 11/2017.
* Removed Korean Air (KE) from Chase UR as transfer agreements have ended as of 08/2018.
* Added JetBlue (B6) to Chase UR as they have a new partnership as of 08/2018.

### 2018-02-14
* Removed Virgin America (VX) as it is acquired by Alaska (AS).
* Add Cathay Dragon (KA) to Amex, Citi, Marriott, SPG as they share Asia Miles with CX.
* Add Aer Lingus (EI) and Iberia (IB) to Chase as these can be transferred directly as of 11/2017.


## Contributors

* [Martin Gao](http://www.yeekapp.com) (The original author and the owner of this chart)

* [Runjie Guan](http://anoxic.me) (Added the transfer rate box to the chart)

* [physixfan](https://www.uscreditcardguide.com) (Proposed this idea and keep updating)

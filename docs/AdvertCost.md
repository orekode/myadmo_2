# Advert Cost Calculation Formula

To calculate the cost of an advert, use the following formula:


`Total Cost` = `Base Cost` × (1 + `Duration Factor` + `Advert Duration Factor` + `Category Factor` + `Location Factor` + `Coverage Area Factor` + `Age Group Factor` + `User Estimate Factor`)


## Factors

1. **Base Cost**: A fixed starting cost for the advert.

2. **Duration Factor**: Represents the impact of the duration of the video.
   
   Duration Factor = k1 × (D_v / D_v_base)
   
   - `D_v`: Duration of the video (in minutes)
   - `D_v_base`: Base duration for the video (in minutes)
   - `k1`: Scaling coefficient for video duration

3. **Advert Duration Factor**: Represents the impact of the duration of the advert.
   
   Advert Duration Factor = k2 × (D_a / D_a_base)
   
   - `D_a`: Duration of the advert (in minutes)
   - `D_a_base`: Base duration for the advert (in minutes)
   - `k2`: Scaling coefficient for advert duration

4. **Category Factor**: Represents the impact of the number of categories the advert targets.
   
   Category Factor = k3 × (C / C_base)
   
   - `C`: Number of categories
   - `C_base`: Base number of categories
   - `k3`: Scaling coefficient for the number of categories

5. **Location Factor**: Represents the impact of the number of locations the advert covers.
   
   Location Factor = k4 × (L / L_base)
   
   - `L`: Number of locations
   - `L_base`: Base number of locations
   - `k4`: Scaling coefficient for the number of locations

6. **Coverage Area Factor**: Represents the impact of the coverage area of each location.
   
   Coverage Area Factor = k5 × (A_c / A_c_base)
   
   - `A_c`: Coverage area of each location (in square miles or kilometers)
   - `A_c_base`: Base coverage area
   - `k5`: Scaling coefficient for the coverage area

7. **Age Group Factor**: Represents the impact of the range of age groups targeted.
   
   Age Group Factor = k6 × (A / A_base)
   
   - `A`: Number of age groups
   - `A_base`: Base number of age groups
   - `k6`: Scaling coefficient for the number of age groups

8. **User Estimate Factor**: Represents the impact of the estimated total number of users.
   
   User Estimate Factor = k7 × (U / U_base)
   
   - `U`: Estimate of total users
   - `U_base`: Base estimate of users
   - `k7`: Scaling coefficient for the user estimate

## Example Calculation

Assume the following base values and coefficients:

- **Base Cost**: $1000
- **D_v_base**: 2 minutes, **k1**: 0.1
- **D_a_base**: 1 minute, **k2**: 0.2
- **C_base**: 1 category, **k3**: 0.3
- **L_base**: 1 location, **k4**: 0.4
- **A_c_base**: 100 square miles, **k5**: 0.25
- **A_base**: 1 age group, **k6**: 0.5
- **U_base**: 10,000 users, **k7**: 0.6

If the advert details are:

- **Video Duration (D_v)**: 3 minutes
- **Advert Duration (D_a)**: 2 minutes
- **Number of Categories (C)**: 2
- **Number of Locations (L)**: 3
- **Coverage Area of Each Location (A_c)**: 150 square miles
- **Number of Age Groups (A)**: 2
- **Estimated Users (U)**: 15,000

The factors would be:

- **Duration Factor**: `0.1 × (3 / 2) = 0.15`
- **Advert Duration Factor**: `0.2 × (2 / 1) = 0.4`
- **Category Factor**: `0.3 × (2 / 1) = 0.6`
- **Location Factor**: `0.4 × (3 / 1) = 1.2`
- **Coverage Area Factor**: `0.25 × (150 / 100) = 0.375`
- **Age Group Factor**: `0.5 × (2 / 1) = 1.0`
- **User Estimate Factor**: `0.6 × (15,000 / 10,000) = 0.9`

Thus, the **Total Cost** would be:


Total Cost = 1000 × (1 + 0.15 + 0.4 + 0.6 + 1.2 + 0.375 + 1.0 + 0.9) = 1000 × 4.65 = 4650


So, the cost of the advert would be **$4650**.
